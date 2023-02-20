export type INotificationService = {
  sendMail<T>(message: T): Promise<boolean>;
};