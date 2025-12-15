import axios, { type AxiosInstance } from 'axios';
import type { TaskInterface , ApiTask} from '../types';

export interface ToggleTaskPayload {
    taskId: number;
}

export interface UpdateTaskPayload extends TaskInterface {}


const BASE_URL_REMOTE: string = 'https://dcivrq2ii7llurhec6l6w5r3za0nkwjp.lambda-url.us-east-2.on.aws/'; 

const BASE_URL_LOCAL: string = 'http://localhost:3000/tasks'; 



const createApiClient = (baseUrl: string, token: string): AxiosInstance => {
    
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
    };

    return axios.create({
        baseURL: baseUrl,
        headers: headers,
    });
};


export async function getTasks(token: string): Promise<ApiTask[]> {
    try {
        const apiClient = createApiClient(BASE_URL_LOCAL, token);
        const response = await apiClient.get<ApiTask[]>('/');
        return response.data;
    } catch (error) {
        console.error('Error al obtener tareas (Local):', error);
        throw error;
    }
}



export async function createTask(token: string, payload: TaskInterface): Promise<ApiTask> {
    try {
        const apiClient = createApiClient(BASE_URL_LOCAL, token);
        const response = await apiClient.post<ApiTask>('/', payload);
        return response.data;
    } catch (error) {
        console.error('Error al crear tarea (Local):', error);
        throw error;
    }
}


export async function updateTask(token: string, payload: ApiTask): Promise<ApiTask> {
    try {
        const apiClient = createApiClient(BASE_URL_LOCAL, token);
        const response = await apiClient.put<ApiTask>(`/${payload.id}`, payload); 
        return response.data;
    } catch (error) {
        console.error('Error al editar tarea (Local):', error);
        throw error;
    }
}


export async function markAsComplete(token: string, taskId: number): Promise<ApiTask> {
    try {
        const apiClient = createApiClient(BASE_URL_REMOTE, token);
        const payload: ToggleTaskPayload = { taskId };
        
        const response = await apiClient.patch<ApiTask>('/', payload); 
        
        return response.data;
    } catch (error) {
        console.error(`Error al alternar tarea (Remoto) con ID ${taskId}:`, error);
        throw error;
    }
}


export async function deleteTask(token: string, taskId: number): Promise<void> {
    try {
        const apiClient = createApiClient(BASE_URL_LOCAL, token);
        await apiClient.delete<void>(`/${taskId}`);
    } catch (error) {
        console.error(`Error al eliminar tarea (Local) con ID ${taskId}:`, error);
        throw error;
    }
}


export async function getTask(token: string, taskId: number): Promise<ApiTask> {
    try {
        const apiClient = createApiClient(BASE_URL_LOCAL, token);
        const response = await apiClient.get<ApiTask>(`/${taskId}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener tarea (Local) con ID ${taskId}:`, error);
        throw error;
    }
}