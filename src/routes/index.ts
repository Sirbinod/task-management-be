import express, { Request, Response } from "express";
import authRoutes from "./auth.route";
import taskRoutes from "./task.route";

const router = express.Router();

// auth routes
router.use("/auth", authRoutes);

// task routes
router.use("/tasks", taskRoutes);

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ status: true, msg: "Task Management run successfully" });
});

// To catch unavailable route
router.use("/*", (req: Request, res: Response) => {
  res.status(404).json({ status: false, msg: "Route Not Found : Task Management" });
});

export default router;
