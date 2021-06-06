import { createLogger, format, transports } from 'winston';
import path from 'path';
import { finished } from 'stream';
import { NextFunction, Request, Response } from 'express';

const logger = createLogger({
  level: 'silly',
  transports: [
    new transports.Console(),
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
