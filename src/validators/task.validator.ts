import { body, param } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { validatorHandler } from "../middlewares/validatorHandler";

const createTaskSchema = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").optional().isString().withMessage("Description must be a string"),
  body("status").optional(),
  body("dueDate").notEmpty().withMessage("Due Date is required"),
];

const updateTaskSchema = [
  param("id").isInt().withMessage("Invalid task ID"),
  body("title").optional().notEmpty().withMessage("Title is required"),
  body("description").optional().isString().withMessage("Description must be a string"),
  body("status").optional().notEmpty().withMessage("Status is required"),
  body("dueDate").optional().isISO8601().toDate().withMessage("Invalid due date"),
];

const validateCreateTask = validatorHandler(createTaskSchema);
const validateUpdateTask = validatorHandler(updateTaskSchema);

export { validateCreateTask, validateUpdateTask };
