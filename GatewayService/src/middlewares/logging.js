import { createLogger, format, transports } from 'winston';
import fs from 'fs';
// import LogConstants from '../utils/constants/logConstants'

const environment = "dev1"
const logger = createLogger({
  level: 'silly',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: 'micro' },
  transports: []
});

if (environment !== "dev") {
  logger.add(new transports.Console({
    level: 'silly',
    format: format.combine(
      format.colorize(),
      format.simple(),
    ),
  }));
} else {
  const logDir = './logs';
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
  logger.add(new transports.File({
    filename: `${logDir}/error.log`,
    level: 'error',
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.json(),
    ),
  }));
  logger.add(new transports.File({
    filename: `${logDir}/warn.log`,
    level: 'warn',
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.json(),
    ),
  }));
  logger.add(new transports.File({
    filename: `${logDir}/access.log`,
    level: 'info',
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.json(),
    ),
  }));
  logger.add(new transports.File({
    filename: `${logDir}/debug.log`,
    level: 'debug',
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.json(),
    ),
  }));
  logger.add(new transports.File({
    filename: `${logDir}/fatal.log`,
    level: 'fatal',
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.json(),
    ),
  }));
}

const requestLogger = (req, res, next) => {
    logger.info(`${req.method} ${req.url}`) 
    next();
}
const log = (level, message) => {
    logger.log(level, message) 
}

export default {log, requestLogger};

