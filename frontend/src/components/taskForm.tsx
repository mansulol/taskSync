import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Button, Input } from "@heroui/react";
import { type TaskProps } from "@/types/task";
import { toast } from "sonner";

export function TaskForm({ onSubmit }: { onSubmit: (payload: TaskProps) => Promise<void> }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("General");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            toast.error("El título es obligatorio");
            return;
        }
        setIsSubmitting(true);
        try {
            await onSubmit({ title: title.trim(), description: description.trim(), category: { id: "", name: category }, status: false, id: "", createdAt: new Date().toISOString() });
        } catch {
            toast.error("Error al crear la tarea. Intenta de nuevo.");
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
                className="w-full"
                    placeholder="Descripción (opcional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    disabled={isSubmitting}
                />
            </div>


            <div className="flex gap-3" >
                <div className="space-y-2 flex-2">
                    <Input
                        placeholder="Categoría de la tarea"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        maxLength={100}
                        disabled={isSubmitting}
                    />
                </div>
                <div className="flex items-end gap-3">
                    <Button type="submit" variant="solid" color="primary" isDisabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                        Crear
                    </Button>
                </div>
            </div>
        </form>
    );
}