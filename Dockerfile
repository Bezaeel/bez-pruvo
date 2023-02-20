FROM node:16.4-buster AS builder

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# copy over source code
COPY src ./src
COPY tsconfig.json ./tsconfig.json

# Build
RUN npm run build

# Cleaning image
RUN npm prune


FROM node:16.4-buster-slim
RUN apt-get update
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 7000
RUN printf "ls\nnpm run start:prod\n" > entrypoint.sh
CMD ["/bin/sh", "entrypoint.sh"]
