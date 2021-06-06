import { createLogger, format, transports } from 'winston';
import path from 'path';
import { finished } from 'stream';
import { NextFunction, Request, Response } from 'express';

interface LogError extends Error {
  code?: number;
}

const logger = createLogger({
  level: 'silly',
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(__dirname, '../../logs/error.log'),
      level: 'error',
      format: format.combine(format.timestamp(), format.json())
    }),
    new transports.File({
      filename: path.join(__dirname, '../../logs/info.log'),
      level: 'info',
      format: format.combine(format.timestamp(), format.json())
    })
  ]
});

export const logInfo = (req: Request, res: Response, next: NextFunction) => {
  next();

  finished(res, () => {
    logger.info(
      `Method: ${req.method}, Url: ${req.originalUrl}, Query parameters: ${JSON.stringify(
        req.query
      )}, Path parameters: ${JSON.stringify(req.params || {})}, Body: ${JSON.stringify(req.body)}.
      Response status code: ${res.statusCode}.`
    );
  });
};

export const logError = (err: LogError, req: Request, _res: Response, next: NextFunction) => {
  next();

  finished(req, () => {
    logger.error(
      `Error code: ${err.code || 500}, Message: ${err.message ||
        'Internal Server Error'}, Method: ${req.method}, Url: ${
        req.originalUrl
      }, Query parameters: ${JSON.stringify(req.query)}, Path parameters: ${
        JSON.stringify(req.params || {})}, Body: ${JSON.stringify(
        req.body
      )}. Details: ${err.stack}.`
    );
  });
};

export const logUnErrors = (message: string, err: LogError) => {
  logger.error(
    `Error: ${err.code || 500} ${message} ${err.message}. Details: ${err.stack}.`
  );
};
