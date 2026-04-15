import { type TaskProps, TASK_STATUS } from "@/types/task";

// Simulated delay to mimic network latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let tasks: TaskProps[] = [
  {
    id: "1",
    title: "Revisar pull requests",
    description: "Revisar los PRs pendientes del equipo frontend",
    category: "trabajo",
    status: TASK_STATUS.pending,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Hacer ejercicio",
    description: "30 minutos de cardio",
    category: "salud",
    status: TASK_STATUS.done,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Estudiar React Query",
    description: "Leer la documentación sobre mutations",
    category: "estudio",
    status: TASK_STATUS.pending,
    createdAt: new Date().toISOString(),
  },
];

// ──── API functions (swap these for real fetch calls) ────

export async function fetchTasks(): Promise<TaskProps[]> {
  await delay(600);
  return [...tasks];
}

export async function createTask(payload: TaskProps): Promise<TaskProps> {
  await delay(400);
  const newTask: TaskProps = {
    ...payload,
    status: TASK_STATUS.pending,
    createdAt: new Date().toISOString(),
  };
  tasks = [newTask, ...tasks];
  return newTask;
}

export async function toggleTaskStatus(id: string): Promise<TaskProps> {
  await delay(300);
  const task = tasks.find((t) => t.id === id);
  if (!task) throw new Error("Tarea no encontrada");
  const newStatus: TASK_STATUS =
    task.status === TASK_STATUS.pending ? TASK_STATUS.done : TASK_STATUS.pending;
  task.status = newStatus;
  return { ...task };
}

export async function deleteTask(id: string): Promise<void> {
  await delay(300);
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) throw new Error("Tarea no encontrada");
  tasks.splice(idx, 1);
}
