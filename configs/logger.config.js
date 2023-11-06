import winston from "winston";
const { combine, timestamp, printf, splat } = winston.format;

export const logger = winston.createLogger({
    format: combine(
        timestamp(),
        splat(),
        printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
      ),
    transports: [
        new winston.transports.File({ filename: 'webapp.log' }),
    ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'prod') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}