import { useState } from "react";

import { Check, Undo2, Trash2, Loader2, Trash } from "lucide-react";
import { Button, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/react";
import { type TaskProps } from "@/types/task";
import { useTaskStore } from "@/store/useTaskStore";


export function TaskCard({ task }: { task: TaskProps }) {
    const [toggling, setToggling] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { updateTask, removeTask } = useTaskStore((state) => state)

    const handleToggle = async () => {
        setToggling(true);
        try {
            await updateTask(task.id);
        } finally {
            setToggling(false);
        }
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await removeTask(task.id);
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
                    <Chip className={isCompleted ? "bg-gray-300" : "bg-blue-300"} >
                        {task.category?.name || "Sin categoría"}
                    </Chip>
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
                    onPress={handleToggle}
                    isDisabled={toggling}
                    className="h-8 w-8"
                >
                    {toggling ? <Loader2 className="h-4 w-4 animate-spin" /> : isCompleted ? <Undo2 className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                </Button>

                {isCompleted && <Button
                    variant="ghost"
                    size="md"
                    onPress={onOpen}
                    isDisabled={toggling}
                    className="h-8 w-8 bg-red-400"
                    isIconOnly
                >
                    <Trash size={18} color="white" />
                </Button>}

                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    backdrop="blur"
                    placement="center"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    ¿Eliminar tarea?
                                </ModalHeader>
                                <ModalBody>
                                    <p>
                                        Esta acción no se puede deshacer. La tarea <b>&quot;{task.title}&quot;</b> será eliminada permanentemente.
                                    </p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button variant="light" onPress={onClose}>
                                        Cancelar
                                    </Button>
                                    <Button
                                        color="danger"
                                        isLoading={deleting}
                                        onPress={async () => {
                                            await handleDelete();
                                            onClose();
                                        }}
                                    >
                                        Eliminar
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
}