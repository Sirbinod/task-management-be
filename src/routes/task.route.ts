import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { validateCreateTask, validateUpdateTask } from "../validators/task.validator";
import { Authenticated, Authorization } from "../middlewares/authHandler";

const router = Router();
const taskController = new TaskController();

router.post("/", [Authenticated, Authorization("USER"), validateCreateTask], taskController.createTask);
router.get("/", Authenticated, taskController.getAllTasks);
router.get("/:id", Authenticated, taskController.getTaskById);
router.put("/:id", [Authenticated, Authorization("USER"), validateUpdateTask], taskController.updateTask);
router.delete("/:id", [Authenticated, Authorization("USER")], taskController.deleteTask);

export default router;
