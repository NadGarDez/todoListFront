export interface TaskInterface {
    id: number;
    title: string;
    labels: string[];
    description: string;
    done: boolean
}

export type ApiTask = TaskInterface &  {
    createdAt: string;
    updatedAt: string;
}
