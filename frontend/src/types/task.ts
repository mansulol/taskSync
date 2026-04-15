export interface TaskProps {
  id: string;
  title: string;
  description: string;
  category: string;
  status: TaskStatus;
  createdAt: string;
}

export const TASK_STATUS = {
  pending: "pending",
  done: "done",
} as const;

export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];

