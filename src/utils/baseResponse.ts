export class BaseResponse<T>{
  data: T | null;
  status: boolean;
  message: string;

  // constructor(message: string, data: {new (): T; }) {
  constructor(message: string, data?: T, status?: boolean) {
    this.data = data ?? null
    this.message = message
    this.status = status ?? false
  }
}