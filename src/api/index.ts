import axios, { type AxiosInstance } from 'axios';
import type { TaskInterface , ApiTask} from '../types';

export interface ToggleTaskPayload {
    taskId: number;
}

// Interfaces para payloads
export interface UpdateTaskPayload extends TaskInterface {}


const BASE_URL_REMOTE: string = 'https://[lambda-id].lambda-url.[region].on.aws'; 

const BASE_URL_LOCAL: string = 'http://localhost:3000/tasks'; 


/**
 * Factoría que crea y devuelve una instancia de Axios configurada
 * con el token de autorización proporcionado.
 * @param baseUrl La URL base para la instancia (Local o Remota).
 * @param token El token JWT actual.
 * @returns Una instancia de Axios.
 */
const createApiClient = (baseUrl: string, token: string): AxiosInstance => {
    
    // Configuración de encabezados con el token
    const headers = {
        'Content-Type': 'application/json',
        // El token siempre se añade si la función es llamada, no se chequea aquí si es nulo
        'Authorization': `Bearer ${token}`, 
    };

    return axios.create({
        baseURL: baseUrl,
        headers: headers,
    });
};



/**
 * GET: Recupera la lista completa de tareas (LOCAL).
 * @param token El token JWT actual para el encabezado Authorization.
 */
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


/**
 * POST: Crea una nueva tarea (LOCAL).
 * @param token El token JWT actual.
 * @param payload El cuerpo de la solicitud (título, etc.).
 */
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

/**
 * PUT: Edita una tarea (LOCAL).
 * @param token El token JWT actual.
 * @param payload El cuerpo de la solicitud con los datos actualizados.
 */
export async function updateTask(token: string, payload: ApiTask): Promise<ApiTask> {
    try {
        const apiClient = createApiClient(BASE_URL_LOCAL, token);
        // Asumiendo que el endpoint PUT en local usa la ruta base y el ID está en el payload
        const response = await apiClient.put<ApiTask>(`/${payload.id}`, payload); 
        return response.data;
    } catch (error) {
        console.error('Error al editar tarea (Local):', error);
        throw error;
    }
}


/**
 * PATCH: Alterna el estado 'done' de una tarea (REMOTO/LAMBDA).
 * @param token El token JWT actual.
 * @param taskId El ID de la tarea a alternar.
 */
export async function toggleTask(token: string, taskId: number): Promise<ApiTask> {
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


/**
 * DELETE: Elimina una tarea por ID (LOCAL).
 * @param token El token JWT actual.
 * @param taskId El ID de la tarea a eliminar.
 */
export async function deleteTask(token: string, taskId: number): Promise<void> {
    try {
        const apiClient = createApiClient(BASE_URL_LOCAL, token);
        await apiClient.delete<void>(`/${taskId}`);
    } catch (error) {
        console.error(`Error al eliminar tarea (Local) con ID ${taskId}:`, error);
        throw error;
    }
}

/**
 * GET: Obtiene una tarea específica (LOCAL).
 * @param token El token JWT actual.
 * @param taskId El ID de la tarea a obtener.
 */
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