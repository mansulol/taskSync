export interface Task {
    id: string;
    title: string;
    description?: string;
    category: TaskCategory;
    status: boolean;
    createdAt: string;
}

export interface TaskCategory {
    id: string;
    name: string;
};