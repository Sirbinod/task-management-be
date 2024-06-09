import { body } from "express-validator";
import { validatorHandler } from "../middlewares/validatorHandler";

const signUpSchema = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").notEmpty().isEmail().withMessage("Email must be a valid email address"),
  body("password").notEmpty().withMessage("Password is required"),
];

const loginSchema = [
  body("email").notEmpty().isEmail().withMessage("Email must be a valid email address"),
  body("password").notEmpty().withMessage("Password is required"),
];

const validateSignUp = validatorHandler(signUpSchema);
const validateLogin = validatorHandler(loginSchema);

export { validateSignUp, validateLogin };
