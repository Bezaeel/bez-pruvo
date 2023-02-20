import * as amqp from 'amqplib';
import { RoutingKeys } from '../../enums/routingKeys.enum';
// const amqp = require('amqplib');

export interface IMessageBroker {
  publish(payload: any, routing_key: RoutingKeys): Promise<boolean>;

  consume(): void;
}

export class RabbitMQ implements IMessageBroker {
  consume(): void {
    throw new Error("Method not implemented.");
  }

  async publish(payload: any, routing_key: RoutingKeys): Promise<boolean> {
    try {

      const _url: string = process.env.RABBITMQ_URL!
      const connection = await amqp.connect(_url);
      const channel = await connection.createChannel();
      const exchange_name = 'bez-pruvo-exchange';
      const exchange_type = 'topic';

      await channel.assertExchange(exchange_name, exchange_type, {
        durable: true,
      });

      channel.publish(
        exchange_name,
        routing_key,
        Buffer.from(JSON.stringify(payload)),
      );
      console.info('message published');
      channel.close();
      return true;
    } catch (error) {
      console.error('RABBITMQ_URL => %s', process.env.RABBITMQ_URL, error);
      return false;
    }
  }
}
