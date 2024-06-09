import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { CustomRequest } from "../interfaces/common.interface";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const Authenticated = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ status: false, code: "unauthorized", message: "Unauthorized access!" });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    req.user = { id: decoded.id, role: decoded.role };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) return res.status(401).json({ status: false, code: "tokenExpired", message: "Token Expired" });
    return res.status(403).json({ status: false, code: "invalidToken", message: "Token not valid" });
  }
};

const Authorization = (role: string) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const userRoles = req?.user?.role;
    if (!userRoles || !userRoles.includes(role)) {
      return res.status(403).json({ status: false, message: "Forbidden – You don’t have permission to access" });
    }
    next();
  };
};

export { Authenticated, Authorization };
