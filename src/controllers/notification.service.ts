import { RoutingKeys } from "../enums/routingKeys.enum";
import { INotificationService } from "../types/notification.types";
import Logger from "../utils/logger";

// this will send email
export class NotificationService implements INotificationService {
  logger: Logger
  constructor(log: Logger) {
    this.logger = log;
   }
  
  async sendMail<T>(message: T): Promise<string> {
    this.logger.log("mail sent");
    return "Ask Talabi";
  }
}