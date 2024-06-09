import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import bcrypt from "bcryptjs";

const authService = new AuthService();
export class AuthController {
  // USER REGISTRATION
  public async signup(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const userPayload = req.body;
    const findUser = await authService.getUser(userPayload?.email);
    if (!findUser) {
      const user = await authService.signup(userPayload);

      return res.status(201).json({ status: true, message: "User created successfully" });
    } else return res.status(400).json({ status: false, message: "User already exist!" });
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const userPayload = req.body;
    const findUser = await authService.getUser(userPayload?.email);
    if (findUser) {
      // PASSWORD COMPARE
      const isMatch = await bcrypt.compare(userPayload?.password, findUser!.password);
      if (!isMatch) return res.status(403).json({ status: false, message: "Incorrect password. Please enter the correct password" });
      const token = await authService.tokenGenerate(findUser.id, findUser?.role);
      const { password, ...rest } = findUser;
      const newObj = {
        token,
        ...rest,
      };
      return res.status(200).json({ status: true, message: "Login successful. Welcome back!", data: newObj });
    } else return res.status(403).json({ status: false, message: "Invalid credentials. Please input correct credentials." });
  }
}
