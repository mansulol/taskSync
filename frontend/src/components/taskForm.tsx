import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Button, Input } from "@heroui/react";
import type { TaskProps } from "@/types/task";

export function TaskForm({ onSubmit }: { onSubmit: (payload: TaskProps) => Promise<void> }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("General");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            setError("El título es obligatorio");
            return;
        }
        setError(null);
        setIsSubmitting(true);
        try {
            await onSubmit({ title: title.trim(), description: description.trim(), category, status: "pending", id: "", createdAt: new Date().toISOString() });
            setTitle("");
            setDescription("");
            setCategory("trabajo");
        } catch {
            setError("Error al crear la tarea. Intenta de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border bg-card p-5 shadow-sm">
            <h2 className="font-display text-lg font-semibold text-card-foreground">Nueva tarea</h2>

            <div className="space-y-2">
                <Input
                    placeholder="Título de la tarea"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={100}
                    disabled={isSubmitting}
                />
            </div>

            <div className="space-y-2">
                <textarea
                    placeholder="Descripción (opcional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={500}
                    rows={2}
                    disabled={isSubmitting}
                />
            </div>

            <div className="space-y-2">
                <Input
                    placeholder="Categoría"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    maxLength={100}
                    disabled={isSubmitting}
                />
            </div>

            <div className="flex items-end gap-3">
                <Button type="submit" variant="bordered" isDisabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                    Crear
                </Button>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}
        </form>
    );
}