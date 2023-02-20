import "express-async-errors";
import express from "express";

import { createConvertCurrencyRouter } from "../../routers/curreny-converter.router";
import { serverErrorHandler } from "../../utils/error";
import type { IConvertCurrencyController } from "../../types/convert-currency.types";


export const appFactory = (
  convertCurrencyController: IConvertCurrencyController,
  cors: any
) => {
  const app = express();
  const convertCurrencyRouter = createConvertCurrencyRouter(convertCurrencyController);

  
  app.use(cors);

  app.use(express.json());
  app.use(convertCurrencyRouter);

  // app.use(notFoundHandler);
  app.use(serverErrorHandler);

  return app;
};
