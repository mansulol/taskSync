import { create } from "zustand";
import {
  fetchTasks,
  createTask,
  toggleTaskStatus,
  deleteTask,
} from "@/services/task.service";
import type { TaskProps } from "@/types/task";
import { toast } from "sonner"; 

interface TaskState {
  tasks: TaskProps[];
  isLoading: boolean;
  isError: boolean;
  // Acciones
  getTasks: () => Promise<void>;
  addTask: (data: TaskProps) => Promise<void>;
  updateTask: (id: string) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  isLoading: false,
  isError: false,

  getTasks: async () => {
    set({ isLoading: true, isError: false });
    try {
      const data = await fetchTasks();
      set({ tasks: data, isLoading: false });
    } catch (error) {
      set({ isError: true, isLoading: false });
    }
  },

  addTask: async (payload) => {
    try {
      const newTask = await createTask(payload);
      set((state) => ({ tasks: [...state.tasks, newTask] }));
      toast.success("Tarea creada exitosamente");
    } catch (error) {
      toast.error("Error al crear tarea");
    }
  },

  updateTask: async (id) => {
    try {
      const updated = await toggleTaskStatus(id);
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? updated : t)),
      }));
      toast.success(`Tarea marcada como ${updated.status}`);
    } catch (error) {
      toast.error("Error al actualizar la tarea");
    }
  },

  removeTask: async (id) => {
    try {
      await deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
      }));
      toast.success("Tarea eliminada");
    } catch (error) {
      toast.error("Error al eliminar la tarea");
    }
  },
}));
