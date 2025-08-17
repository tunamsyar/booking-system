import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/HttpError";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      error: err.message,
      details: err.details,
    });
  } else {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
}
