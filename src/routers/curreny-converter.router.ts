import express from "express";
import { validCreateRequest } from "../middlewares/request";

import type { IConvertCurrencyController } from "../types/convert-currency.types"

export const createConvertCurrencyRouter = (
  convertCurrencyController: IConvertCurrencyController
) => {
  const convertCurrencyRouter = express.Router();

  convertCurrencyRouter.get("/ask", convertCurrencyController.ask);
  convertCurrencyRouter.post("/convert", validCreateRequest, convertCurrencyController.convertCurrency);
  return convertCurrencyRouter;
};
