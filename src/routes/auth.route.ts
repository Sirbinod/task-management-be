import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validateLogin, validateSignUp } from "../validators/user.validator";

const router = Router();
const authController = new AuthController();

router.post("/signup", validateSignUp, authController.signup);
router.post("/login", validateLogin, authController.login);

export default router;
