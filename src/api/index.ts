import axios, { type AxiosInstance } from 'axios';
import type { TaskInterface } from '../types';


export type ApiTask = TaskInterface &  {
    createdAt: string;
    updatedAt: string;
}


export interface ToggleTaskPayload {
    taskId: number;
}

const BASE_URL_REMOTE: string = 'https://[lambda-id].lambda-url.[region].on.aws'; 

const BASE_URL_LOCAL: string = 'http://localhost:3000/tasks'; 

const apiClientLocal: AxiosInstance = axios.create({
    baseURL: BASE_URL_LOCAL,
    headers: { 'Content-Type': 'application/json' },
});


const apiClientRemote: AxiosInstance = axios.create({
    baseURL: BASE_URL_REMOTE,
    headers: { 'Content-Type': 'application/json' },
});


// funciones


export async function getTasks(): Promise<ApiTask[]> {
    try {
        const response = await apiClientLocal.get<ApiTask[]>('/');
        return response.data;
    } catch (error) {
        console.error('Error al obtener tareas (Local):', error);
        throw error;
    }
}


export async function createTask(payload: TaskInterface): Promise<ApiTask> {
    try {
        const response = await apiClientLocal.post<ApiTask>('/', payload);
        return response.data;
    } catch (error) {
        console.error('Error al crear tarea (Local):', error);
        throw error;
    }
}


export async function toggleTask(taskId: number): Promise<ApiTask> {
    try {
        const payload: ToggleTaskPayload = { taskId };
        
        const response = await apiClientRemote.patch<ApiTask>('/', payload); 
        
        return response.data;
    } catch (error) {
        console.error(`Error al alternar tarea (Remoto) con ID ${taskId}:`, error);
        throw error;
    }
}


export async function deleteTask(taskId: number): Promise<void> {
    try {
        await apiClientLocal.delete<void>(`/${taskId}`);
    } catch (error) {
        console.error(`Error al eliminar tarea (Local) con ID ${taskId}:`, error);
        throw error;
    }
}

export async function getTask(taskId: number): Promise<void> {
    try {
        await apiClientLocal.get<ApiTask>(`/${taskId}`);
    } catch (error) {
        console.error(`Error al eliminar tarea (Local) con ID ${taskId}:`, error);
        throw error;
    }
}