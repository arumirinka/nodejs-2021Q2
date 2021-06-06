import { NextFunction, Request, Response } from 'express';

interface LogError extends Error {
  code?: number;
}

export const errorHandler = (err: LogError, _req: Request, res: Response, _next: NextFunction) => {
  const error = err;
  if (!error.code) {
    error.code = 500;
    error.message = 'Internal Server Error';
  }
  res.status(error.code).send(`${err.code} ${err.message}`);
};

export const exitOnUnErr = () => {
  const {exit} = process;
  setTimeout(() => {
    exit(1);
  }, 500);
};
