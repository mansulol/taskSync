import { useEffect } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import { TaskForm } from "@components/taskForm";
import { TaskCard } from "@components/taskCard";
import { AlertCircle, ClipboardList } from "lucide-react";
import { Button, Skeleton } from "@heroui/react";

export default function HomePage() {
    // Extraemos todo del store de Zustand
    const {
        tasks, isLoading, isError,
        getTasks, addTask
    } = useTaskStore();

    useEffect(() => {
        getTasks();
    }, [getTasks]);

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-2xl px-4 py-10">
                {/* Header */}
                <div className="mb-8 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                        <ClipboardList className="h-5 w-5" />
                    </div>
                    <div>
                        <h1 className="font-display text-2xl font-bold text-foreground">Gestor de Tareas</h1>
                        <p className="text-sm text-muted-foreground">Organiza tu día de forma eficiente</p>
                    </div>
                </div>

                {/* Form */}
                <div className="mb-8">
                    <TaskForm onSubmit={addTask} />
                </div>

                {/* Task list */}
                {isLoading && (
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-20 w-full rounded-xl" />
                        ))}
                    </div>
                )}

                {!isLoading && tasks.length === 0 && (
                    <div className="flex flex-col items-center gap-2 py-16 text-center">
                        <ClipboardList className="h-12 w-12 text-muted-foreground/40" />
                        <p className="text-muted-foreground">No hay tareas aún. ¡Crea la primera!</p>
                    </div>
                )}

                {!isLoading && tasks.length > 0 && (
                    <div className="space-y-3">
                        {tasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}