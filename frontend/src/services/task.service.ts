import type { Task, CreateTaskPayload, TaskStatus } from "@/types/task";

// Simulated delay to mimic network latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let tasks: Task[] = [
  {
    id: "1",
    title: "Revisar pull requests",
    description: "Revisar los PRs pendientes del equipo frontend",
    category: "trabajo",
    status: "pendiente",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Hacer ejercicio",
    description: "30 minutos de cardio",
    category: "salud",
    status: "completada",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Estudiar React Query",
    description: "Leer la documentación sobre mutations",
    category: "estudio",
    status: "pendiente",
    createdAt: new Date().toISOString(),
  },
];

let nextId = 4;

// ──── API functions (swap these for real fetch calls) ────

export async function fetchTasks(): Promise<Task[]> {
  await delay(600);
  return [...tasks];
}

export async function createTask(payload: CreateTaskPayload): Promise<Task> {
  await delay(400);
  const newTask: Task = {
    id: String(nextId++),
    ...payload,
    status: "pendiente",
    createdAt: new Date().toISOString(),
  };
  tasks = [newTask, ...tasks];
  return newTask;
}

export async function toggleTaskStatus(id: string): Promise<Task> {
  await delay(300);
  const task = tasks.find((t) => t.id === id);
  if (!task) throw new Error("Tarea no encontrada");
  const newStatus: TaskStatus =
    task.status === "pendiente" ? "completada" : "pendiente";
  task.status = newStatus;
  return { ...task };
}

export async function deleteTask(id: string): Promise<void> {
  await delay(300);
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) throw new Error("Tarea no encontrada");
  tasks.splice(idx, 1);
}
