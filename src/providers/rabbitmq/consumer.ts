import { ConvertCurrencyService } from "../../controllers/convert-currency/convert-currency.service";
import { RoutingKeys } from "../../enums/routingKeys.enum";
import { IConvertCurrency, IConvertCurrencyService } from "../../types/convert-currency.types";
import * as amqp from 'amqplib'
import { NotificationService } from "../../controllers/notification.service";
import Logger from "../../utils/logger";


export default class Consumer{
  static async fetchConvert(logger: Logger): Promise<void> {
    try {
      const connection = await amqp.connect(process.env.RABBITMQ_URL!);
      const channel = await connection.createChannel();
      const queue_name = RoutingKeys.FETCH_CONVERT;
      const exchange_name = 'bez-pruvo-exchange';
      const exchange_type = 'topic';

      await channel.assertQueue(queue_name);
      await channel.bindQueue(queue_name, exchange_name, queue_name);
      await channel.consume(queue_name, async (msg: any) => {
        const message = msg?.content?.toString();
        const jsonp = JSON.parse(message) as IConvertCurrency
        const notificationService = new NotificationService(logger);
        const isAcknowledged = await (await new ConvertCurrencyService(notificationService, logger).convertCurrency(jsonp)).status;
        if(isAcknowledged) {
          channel.ack(msg);
        }
        channel.ack(msg);
      });
    } catch (error) {
      logger.error('error consuming from message broker');
    }
  }

  static async sendMail(logger: Logger): Promise<void> {
    try {
      const connection = await amqp.connect(process.env.RABBITMQ_URL!);
      const channel = await connection.createChannel();
      const queue_name = RoutingKeys.SEND_EMAIL;
      const exchange_name = 'bez-pruvo-exchange';
      const exchange_type = 'topic';

      await channel.assertQueue(queue_name);
      await channel.assertExchange(exchange_name, exchange_type, {
        durable: true,
      });
      await channel.prefetch(1);
      await channel.bindQueue(queue_name, exchange_name, queue_name);
      await channel.consume(queue_name, async (msg: any) => {
        const message = msg?.content?.toString();

        const isAcknowledged = await new NotificationService(logger).sendMail(message);
        if(isAcknowledged) {
          channel.ack(msg);
        }
      });
    } catch (error) {
      logger.error('error consuming from message broker');
    }
  }
}