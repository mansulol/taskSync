export interface TaskProps {
  id: string;
  title: string;
  description: string;
  category: string;
  status: TASK_STATUS;
  createdAt: string;
}

export enum TASK_STATUS {
  pending,
  done
}
