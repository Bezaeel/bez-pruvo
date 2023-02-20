import { NextFunction, Response, Request } from "express";
import { BadRequestException } from "../exception/badRequest";
import { InvalidFormatException } from "../exception/invalidFormat";

export const validCreateRequest = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!("currTo" in request.body))
    throw new BadRequestException("currTo is required");

    if (!("currFrom" in request.body))
      throw new BadRequestException("currFrom is required");

    if (!("amount" in request.body))
      throw new BadRequestException("amount is required");

    
  if ("currFrom" in request.body) {
    if (!request.body.currFrom.match(/^[A-Z]{3}$/))
      throw new InvalidFormatException(
        "Currency code does not match specified regex pattern (/^[A-Z]{3}$/)"
      );
  }

  if ("currTo" in request.body) {
    if (!request.body.currTo.match(/^[A-Z]{3}$/))
      throw new InvalidFormatException(
        "Currency code does not match specified regex pattern (/^[A-Z]{3}$/)"
      );
  }

  next();
};
