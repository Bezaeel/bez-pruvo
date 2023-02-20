import { HTTP } from "../types/consts";

export class InvalidFormatException extends Error {
  status: number;

  constructor(message: string) {
    super();
    this.name = "INVALID_FORMAT";
    this.message = message;
    this.status = HTTP.INVALID_FORMAT;
  }
}
