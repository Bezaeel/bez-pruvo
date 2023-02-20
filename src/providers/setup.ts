import { connect, ChannelWrapper } from "amqp-connection-manager";
import Logger from "../utils/logger";
import Consumer from "./rabbitmq/consumer";

export let Channel: ChannelWrapper;

export const connectToRabbitMQ = (): Promise<ChannelWrapper> => {
    if (Channel) {
        return Promise.resolve(Channel);
    }

    const connString = process.env.RABBITMQ_URL;

    const conn = connect([connString!], {
       heartbeatIntervalInSeconds: 20,
        reconnectTimeInSeconds: 5,
    });

    Channel = conn.createChannel({
      setup: async (channel:any ) => {
        await channel.assertExchange("bez-pruvo-exchange", "fanout");
      }
    });

    return Promise.resolve(Channel);
};



export async function initInfra(logger: Logger) {
  await Consumer.fetchConvert(logger);
  await Consumer.sendMail(logger);
}