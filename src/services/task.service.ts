import { PrismaClient } from "@prisma/client";
import { Task, TaskStatus } from "../interfaces/task.interface";

const prisma = new PrismaClient();

export class TaskService {
  public async createTask(taskData: Task, user: { id: number; role: string }) {
    const taskWithUser = { ...taskData, userId: user?.id };
    return prisma.task.create({ data: taskWithUser });
  }

  public async getTaskById(id: number) {
    return prisma.task.findUnique({ where: { id } });
  }

  public async getAllTasks(status?: TaskStatus, search?: string, sort?: string, page = 1, pageSize = 10, user?: { id: number; role: string }) {
    let where: any = {};
    if (user?.role === "USER") {
      // If user's role is "USER", filter tasks by user's id
      where = { ...where, userId: user.id };
    }
    if (status) {
      where = { ...where, status };
    }
    if (search) {
      where = { ...where, OR: [{ title: { contains: search } }, { description: { contains: search } }] };
    }

    const orderBy = sort ? { [this.getOrderBy(sort)]: this.getOrder(sort) } : {};

    const [tasks, totalTasks] = await prisma.$transaction([
      prisma.task.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.task.count({ where }),
    ]);
    return {
      tasks,
      totalTasks,
      currentPage: page,
      totalPages: Math.ceil(totalTasks / pageSize),
    };
  }

  private getOrderBy(sortBy: string): string {
    const parts = sortBy.split("_");
    return parts[0];
  }

  private getOrder(sortBy: string): "asc" | "desc" {
    const parts = sortBy.split("_");
    return parts[1] === "desc" ? "desc" : "asc";
  }

  public async updateTask(id: number, taskData: Task) {
    return prisma.task.update({ where: { id }, data: taskData });
  }

  public async deleteTask(id: number) {
    return prisma.task.delete({ where: { id } });
  }
}
