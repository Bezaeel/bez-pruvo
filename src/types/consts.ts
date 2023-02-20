import "dotenv/config";

export const HTTP = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  REDIRECT_FOUND: 302,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INVALID_FORMAT: 422,
  SERVER_ERROR: 500
};


export const PORT = process.env.PORT as string;
export const DATABASE_URL = process.env.DATABASE_URL as string;
export const NODE_ENV = process.env.NODE_ENV as string;



export const getAllowedHosts = (): string[] => {
  return process.env.ALLOWED_HOSTS ? process.env.ALLOWED_HOSTS.split(',') : [];
};