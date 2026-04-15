import axios from "axios";
import type { TaskProps } from "@/types/task";

// 1. Configuración de la instancia de Axios
const api = axios.create({
  baseURL:
    import.meta.env.VITE_BACKEND_URI || "http://localhost:8000/api/tasks",
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Funciones del servicio
export async function fetchTasks(): Promise<TaskProps[]> {
  const { data } = await api.get<TaskProps[]>("/");
  return data;
}

export async function createTask(
  payload: TaskProps,
): Promise<TaskProps> {
  const { data } = await api.post<TaskProps>("/", payload);
  return data;
}

export async function toggleTaskStatus(id: string): Promise<TaskProps> {
  // Usamos PATCH para actualizaciones parciales
  // El endpoint dependerá de cómo esté diseñado tu backend (ej: /:id/toggle o solo /:id)
  const { data } = await api.patch<TaskProps>(`/${id}/toggle`);
  return data;
}

export async function deleteTask(id: string): Promise<void> {
  await api.delete(`/${id}`);
}
