import { NextFunction, Request, RequestHandler, Response } from 'express';

export const tryCatchErrors = (fn: RequestHandler) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    return await fn(req, res, next);
  } catch (err) {
    return next(err);
  }
};
