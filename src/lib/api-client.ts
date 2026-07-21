import { getApiBaseUrl } from './config';

export class ApiError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class ApiConnectionError extends Error {}

interface ApiFetchOptions {
    method?: string;
    body?: unknown;
    token?: string;
}

interface BackendErrorBody {
    success: false;
    error: { message: string; statusCode: number };
}

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
    const url = `${getApiBaseUrl()}${path}`;
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (options.token) {
        headers.Authorization = `Bearer ${options.token}`;
    }

    let response: Response;
    try {
        response = await fetch(url, {
            method: options.method ?? 'GET',
            headers,
            body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
        });
    } catch {
        throw new ApiConnectionError('No se pudo contactar al servidor. Verifica que el backend esté corriendo.');
    }

    const data = (await response.json()) as T | BackendErrorBody;

    if (!response.ok) {
        const message =
            typeof data === 'object' && data !== null && 'error' in data
                ? (data as BackendErrorBody).error.message
                : 'Error desconocido del servidor';
        throw new ApiError(message, response.status);
    }

    return data as T;
}
