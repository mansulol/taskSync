import axios from "axios";
import type { TaskProps } from "@/types/task";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_BACKEND_URI || "http://localhost:8000/api/tasks",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

interface ApiResponse {
  task?: TaskProps,
  error?: string | null,
  message?: string | null
}


export async function fetchTasks(): Promise<TaskProps[]> {
  const { data } = await api.get<TaskProps[]>("");
  return data;
}

export async function createTask(
  payload: TaskProps,
): Promise<TaskProps> {
  const params = new URLSearchParams();
  params.append("title", payload.title);
  params.append("description", payload.description);
  params.append("category", payload.category.name);

  const response = await api.post<ApiResponse>("", params);
  console.log("Created task:", response.data.task);
  return response.data.task!;
}

export async function toggleTaskStatus(id: string): Promise<TaskProps> {
  const response = await api.patch<ApiResponse>(`/${id}/status`);
  return response.data.task!;
}

export async function deleteTask(id: string): Promise<void> {
  await api.delete(`/${id}`);
}
