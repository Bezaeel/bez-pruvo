import cors from 'cors';
import { createConvertCurrencyService, createConvertCurrencyController } from '../../controllers/convert-currency';
import { NODE_ENV, getAllowedHosts, HTTP } from '../../types/consts';
import { IConvertCurrencyController } from '../../types/convert-currency.types';
import { appFactory } from './app';
import '../../utils/validateEnv';
import { NotificationService } from '../../controllers/notification.service';
import Logger from '../../utils/logger';
import { initInfra } from '../setup';



const corsOptions: cors.CorsOptions = {
  origin: process.env.NODE_ENV === NODE_ENV ? getAllowedHosts() : '*',
  optionsSuccessStatus: HTTP.OK,
};

// inject dependencies
const logger = new Logger("bez-pruvo");
const corsMiddleware = cors(corsOptions);
const notificationService = new NotificationService(logger)
const converCurrencyService = createConvertCurrencyService(notificationService, logger);
const converCurrencyController: IConvertCurrencyController = createConvertCurrencyController(
  converCurrencyService
);

initInfra(logger);

const app =  appFactory(converCurrencyController, corsMiddleware)
export default app;