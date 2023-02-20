import { HTTP } from "../types/consts";

export class BadRequestException extends Error {
  status: number;

  constructor(message: string) {
    super();
    this.name = "BAD_REQUEST";
    this.message = message;
    this.status = HTTP.BAD_REQUEST;
  }
}
