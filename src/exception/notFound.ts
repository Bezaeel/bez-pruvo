import { HTTP } from "../types/consts";

export class NotFoundException extends Error {
  status: number;

  constructor(message: string) {
    super();
    this.name = "NOT_FOUND";
    this.message = message;
    this.status = HTTP.NOT_FOUND;
  }
}
