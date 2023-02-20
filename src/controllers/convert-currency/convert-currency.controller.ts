import { Request, Response } from "express";
import {
  IConvertCurrencyController,
  IConvertCurrencyService,
} from "../../types/convert-currency.types";
import { BaseResponse } from "../../utils/baseResponse";
import { RabbitMQ } from "../../providers/rabbitmq/publisher";
import { RoutingKeys } from "../../enums/routingKeys.enum";
import { HTTP } from "../../types/consts";

export const ConvertCurrencyController = (
  converCurrencyService: IConvertCurrencyService
): IConvertCurrencyController => {
  return {
    async ask(req: Request, res: Response) {
      const result = await converCurrencyService.ask();

      const res_ = new BaseResponse("Ask Talabi");
      
      return res.status(HTTP.OK).json(res_);
    },
    async convertCurrency(req: Request, res: Response) {
      // publish request
      const broker = new RabbitMQ();
      broker.publish(req.body, RoutingKeys.FETCH_CONVERT);
      return res.status(HTTP.CREATED).json({ message: req.body });
    },
  };
};
