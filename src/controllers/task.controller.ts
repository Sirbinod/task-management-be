import { Request, Response } from "express";
import { TaskService } from "../services/task.service";
import { TaskStatus } from "../interfaces/task.interface";
import { CustomRequest } from "../interfaces/common.interface";

const taskService = new TaskService();

export class TaskController {
  async createTask(req: CustomRequest, res: Response): Promise<Response> {
    const taskData = req.body;
    const user = req?.user;
    const task = await taskService.createTask(taskData, user!);
    return res.json({ status: true, message: "Task created successfully", data: task });
  }

  async getTaskById(req: Request, res: Response): Promise<Response> {
    const taskId = parseInt(req.params.id);
    const task = await taskService.getTaskById(taskId);
    if (!task) {
      return res.status(404).json({ status: false, message: "Task not found" });
    }
    return res.json({ status: true, data: task });
  }

  async getAllTasks(req: CustomRequest, res: Response): Promise<Response> {
    const { status, search, sort, page, pageSize } = req.query;
    const user = req.user;
    const tasks = await taskService.getAllTasks(
      status as TaskStatus,
      search as string,
      sort as string,
      parseInt(page as string) || 1,
      parseInt(pageSize as string) || 10,
      user
    );
    return res.json({ status: true, data: tasks });
  }

  async updateTask(req: Request, res: Response): Promise<Response> {
    const taskId = parseInt(req.params.id);
    const taskData = req.body;
    const updatedTask = await taskService.updateTask(taskId, taskData);
    if (!updatedTask) {
      return res.status(404).json({ status: false, message: "Task not found" });
    }
    return res.json({ status: true, message: "Task updated successfully", data: updatedTask });
  }

  async deleteTask(req: Request, res: Response): Promise<Response> {
    const taskId = parseInt(req.params.id);
    const deletedTask = await taskService.deleteTask(taskId);
    if (!deletedTask) {
      return res.status(404).json({ status: false, message: "Task not found" });
    }
    return res.json({ status: true, message: "Task deleted successfully", data: deletedTask });
  }
}
