export interface Task {
  id?: number;
  title: string;
  description?: string | null;
  status: TaskStatus;
  dueDate: Date;
  isArchived?: boolean;
}

export enum TaskStatus {
  Pending = "Pending",
  InProgress = "InProgress",
  Completed = "Completed",
}
