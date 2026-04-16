export interface TaskProps {
  id: string;
  title: string;
  description: string;
  category: CategoryProps;
  status: boolean;
  createdAt: string;
}

export interface CategoryProps {
  id: string;
  name: string;
}