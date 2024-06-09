import { Request, Response, NextFunction } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("Error Log", err);
  if (err instanceof PrismaClientKnownRequestError) {
    // Prisma known request error
    return res.status(500).json({ status: false, message: "Database error" });
  } else {
    // Other internal server errors
    return res.status(500).json({ status: false, message: "Something Wrong" });
  }
};
