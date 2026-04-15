import { useState } from "react";

import { Check, Undo2, Trash2, Loader2, Badge } from "lucide-react";
import { AlertDialog, AlertDialogTrigger, AlertDialogHeader, AlertDialogFooter, Button, AlertDialogContainer } from "@heroui/react";
import type { Task } from "@/types/common";


interface TaskCardProps {
    task: Task;
    onToggle: (id: string) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

export function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
    const [toggling, setToggling] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleToggle = async () => {
        setToggling(true);
        try {
            await onToggle(task.id);
        } finally {
            setToggling(false);
        }
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await onDelete(task.id);
        } finally {
            setDeleting(false);
        }
    };

    const isCompleted = task.status === true;

    return (
        <div
            className={`group flex items-start gap-4 rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md ${isCompleted ? "border-accent/30 opacity-75" : "border-border"
                }`}
        >
            {/* Toggle button */}
            <button
                onClick={handleToggle}
                disabled={toggling}
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${isCompleted
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-muted-foreground/30 hover:border-primary"
                    }`}
            >
                {toggling ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                ) : isCompleted ? (
                    <Check className="h-3 w-3" />
                ) : null}
            </button>

            {/* Content */}
            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                    <h3
                        className={`font-medium text-card-foreground ${isCompleted ? "line-through opacity-60" : ""
                            }`}
                    >
                        {task.title}
                    </h3>
                    <Badge 
                        // variant="outline" className={`text-xs ${categoryColors[task.category] || ""}`}
                        >
                        {task.category.name}
                    </Badge>
                    <Badge
                        // variant={isCompleted ? "default" : "secondary"}
                        className={`text-xs ${isCompleted ? "bg-accent text-accent-foreground" : ""}`}
                    >
                        {task.status}
                    </Badge>
                </div>
                {task.description && (
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                )}
            </div>

            {/* Actions */}
            <div className="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                    variant="ghost"
                    size="md"
                    onClick={handleToggle}
                    isDisabled={toggling}
                    // title={isCompleted ? "Marcar pendiente" : "Marcar completada"}
                    className="h-8 w-8"
                >
                    {toggling ? <Loader2 className="h-4 w-4 animate-spin" /> : isCompleted ? <Undo2 className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                </Button>

                <AlertDialog>
                    <AlertDialogTrigger>
                        <Button variant="ghost" size="md" className="h-8 w-8 text-destructive hover:text-destructive" isDisabled={deleting}>
                            {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContainer>
                        <AlertDialogHeader>
                            <h4>¿Eliminar tarea?</h4>
                            <p>
                                Esta acción no se puede deshacer. La tarea &quot;{task.title}&quot; será eliminada permanentemente.
                            </p>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <Button variant="outline" onClick={handleDelete}>
                                Cancelar
                            </Button>
                            <Button variant="danger" onClick={handleDelete}>
                                Eliminar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContainer>
                </AlertDialog>
            </div>
        </div>
    );
}