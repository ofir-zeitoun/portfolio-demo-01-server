import { Request, Response } from "express";
import status from "http-status";

export const errorHandler = (err: TypeError, _req: Request, res: Response) => {
  res.status(res.statusCode ?? status.INTERNAL_SERVER_ERROR);

  res.json({
    message: err.message,
    stack: process.env.ENV_MODE === "production" ? null : err.stack,
  });
};
