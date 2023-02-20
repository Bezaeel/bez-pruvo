import { Request, Response, NextFunction } from "express";

export class StatusError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super();
    this.message = message;
    this.status = status;
  }
}


export const serverErrorHandler = (
  err: StatusError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //do not show stack traces for errors in CI environment
  !process.env.IN_CI && console.error(err.stack);

  return res.status(err.status || 500).json({ ERROR: err.message})
};
