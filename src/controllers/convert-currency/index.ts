import { IConvertCurrencyService } from "../../types/convert-currency.types";
import { INotificationService } from "../../types/notification.types";
import { ConvertCurrencyController } from "./convert-currency.controller";
import { ConvertCurrencyService } from "./convert-currency.service";

export const createConvertCurrencyController = (convertCurrencyService: IConvertCurrencyService) => {
  return ConvertCurrencyController(convertCurrencyService);
};


export const createConvertCurrencyService = (notificationService: INotificationService) => {
  return new ConvertCurrencyService(notificationService);
}