import type { NextFunction, Request, Response } from "express";
import * as Curr from "../supported-currency.json"
import { BaseResponse } from "../utils/baseResponse";

export const supportedCurr = Object.keys(Curr);

export type IConvertCurrency = {
  amount: string;
  currFrom: string;
  currTo: string;
};

export type ResponseFromAPI = {
  disclaimer: string;
  meta: meta;
  response: number;
}

type meta = {
  rate: number;
  timestamp: number
}

export type IConvertCurrencyController = {
  ask: (req: Request, res: Response, next: NextFunction) => void;
  convertCurrency: (req: Request, res: Response, next: NextFunction) => void;
};

export type IConvertCurrencyService = {
  ask: () => Promise<string>;
  convertCurrency: (convertCurrency: IConvertCurrency) => Promise<BaseResponse<boolean>>;
};