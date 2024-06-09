import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../interfaces/user.interface";

const prisma = new PrismaClient();

export class AuthService {
  // USER
  public async getUser(email: string) {
    const newUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return newUser;
  }

  // USER REGISTRATION
  public async signup(user: User) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user?.password, salt);
    const newUser = await prisma.user.create({
      data: user,
    });
    return newUser;
  }
  public async tokenGenerate(id: number, role: string) {
    const jwtSecret: string = process.env.JWT_SECRET!;
    const expires: number = Number(process.env.TOKEN_EXPIRES_IN);
    return jwt.sign({ id, role }, jwtSecret, { expiresIn: expires });
  }
}
