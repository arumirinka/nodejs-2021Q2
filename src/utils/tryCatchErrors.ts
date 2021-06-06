import { NextFunction, Request, Response } from 'express';

export const tryCatchErrors = (fn: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    return await fn(req, res, next);
  } catch (err) {
    return next(err);
  }
};
