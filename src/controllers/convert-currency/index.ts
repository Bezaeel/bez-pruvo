import { IConvertCurrencyService } from "../../types/convert-currency.types";
import { INotificationService } from "../../types/notification.types";
import Logger from "../../utils/logger";
import { ConvertCurrencyController } from "./convert-currency.controller";
import { ConvertCurrencyService } from "./convert-currency.service";

export const createConvertCurrencyController = (convertCurrencyService: IConvertCurrencyService) => {
  return ConvertCurrencyController(convertCurrencyService);
};


export const createConvertCurrencyService = (notificationService: INotificationService, logger: Logger) => {
  return new ConvertCurrencyService(notificationService, logger);
}