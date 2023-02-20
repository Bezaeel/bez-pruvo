import axios from "axios";
import { RoutingKeys } from "../../enums/routingKeys.enum";
import { IMessageBroker, RabbitMQ } from "../../providers/rabbitmq/publisher";
import {
  IConvertCurrency,
  IConvertCurrencyService,
  ResponseFromAPI,
} from "../../types/convert-currency.types";
import { INotificationService } from "../../types/notification.types";
import { BaseResponse } from "../../utils/baseResponse";
import Logger from "../../utils/logger";


export class ConvertCurrencyService implements IConvertCurrencyService {
  private readonly broker: IMessageBroker;
  private readonly logger: Logger;
  notificationService: INotificationService
  constructor(_notificationService: INotificationService, logger: Logger) {
    this.broker = new RabbitMQ();
    this.notificationService = _notificationService;
    this.logger = logger;
  }

  public async ask(): Promise<string>{
    this.broker.publish({name: "Talabi"}, RoutingKeys.ASK);
    return "ask Talabi..";
  }

  public async convertCurrency(request: IConvertCurrency): Promise<BaseResponse<boolean>> {
    try {
      // fetch from openexchange api
      const url = `${process.env.API_URL}/convert/${request.amount}/${request.currFrom}/${request.currTo}?app_id=${process.env.APP_ID!}`;
      this.logger.log(url);
      const {data, status} = await axios.get<ResponseFromAPI>(
        url,
        {
          headers: {
            Accept: 'application/json',
          }
        }
      );

      // publish the result to queue
      this.broker.publish(data, RoutingKeys.SEND_EMAIL)
      return new BaseResponse("success", null!, true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        this.logger.log('error message: ', error.message);
        return new BaseResponse(error.message, null!, false);
      } else {
        this.logger.log(`unexpected error: ${error.message}`);
        return new BaseResponse(`error: ${error.message}`, null!, false!);
      }
    }
  }
}
