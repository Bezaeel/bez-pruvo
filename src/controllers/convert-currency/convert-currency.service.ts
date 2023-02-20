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


export class ConvertCurrencyService implements IConvertCurrencyService {
  private readonly broker: IMessageBroker;
  notificationService: INotificationService
  constructor(_notificationService: INotificationService) {
    this.broker = new RabbitMQ();
    this.notificationService = _notificationService;

  }

  public async ask(): Promise<string>{
    this.broker.publish({name: "Talabi"}, RoutingKeys.ASK);
    return "ask Talabi..";
  }

  public async convertCurrency(request: IConvertCurrency): Promise<BaseResponse<boolean>> {
    try {
      // fetch from api
      console.log(request);
      const url = `${process.env.API_URL}/convert/${request.amount}/${request.currFrom}/${request.currTo}?app_id=${process.env.APP_ID!}`;
      console.log(url);
      const {data, status} = await axios.get<ResponseFromAPI>(
        url,
        {
          headers: {
            Accept: 'application/json',
          }
        }
      );

      // publish the result to queue
      console.log('should send mail');
      this.broker.publish(data, RoutingKeys.SEND_EMAIL)
      return new BaseResponse("Ask Talabi..", null!, true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return new BaseResponse(error.message, null!, false);
      } else {
        console.log('unexpected error: ', error);
        return new BaseResponse("An unexpected error occurred", null!, false!);
      }
    }
  }
}
