import winston, { Logger as WinstonLogger } from "winston";
import { ILOGLEVEL } from "../types/ILogLevel";

/**
 * Logger class logs messages
 * These messages will be printed to console.log if DEBUG=* is defined in the environment variables
 */
export default class Logger {
  name: string;

  logLevel: ILOGLEVEL | string;

  private readonly logger: WinstonLogger;

  constructor(name: string) {
    this.name = name;

    this.logLevel = process.env.LOG_LEVEL?.toLowerCase() || "info";

    const opts: winston.LoggerOptions = {
      exitOnError: false,
      format: winston.format.combine(
        winston.format.label({
          label: name,
        }),
        winston.format.timestamp({
          format: "MMM-DD-YYYY HH:mm:ss",
        }),
        winston.format.printf((info) => {
          return `${info.level}: ${info.label}: ${[info.timestamp]}: ${
            info.message
          }`;
        })
      ),
    };

    opts.transports = [
      new winston.transports.Console({ level: this.logLevel }),
    ];

    this.logger = winston.createLogger(opts);
  }

  /** logs a message */
  public log (
    value: string | Error,
    level: ILOGLEVEL | string = "default"
  ): void {
    const logLevel = level === "default" ? this.logLevel : level;

    if (value instanceof Error) {
      this.logger.log("error", value.message);
    }
    this.logger.log(logLevel, value);
  }
}
