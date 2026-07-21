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

interface BackendValidationErrorBody {
    errors: string[];
}

function extractErrorMessage(data: unknown): string {
    if (typeof data !== 'object' || data === null) {
        return 'Error desconocido del servidor';
    }
    if ('error' in data) {
        const error = (data as { error: unknown }).error;
        if (typeof error === 'string') {
            return error;
        }
        if (typeof error === 'object' && error !== null && typeof (error as { message?: unknown }).message === 'string') {
            return (error as BackendErrorBody['error']).message;
        }
    }
    if ('errors' in data && Array.isArray((data as BackendValidationErrorBody).errors)) {
        return (data as BackendValidationErrorBody).errors.join('. ');
    }
    return 'Error desconocido del servidor';
}

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
    const url = `${getApiBaseUrl()}${path}`;
    const headers: Record<string, string> = {};
    if (options.token) {
        headers.Authorization = `Bearer ${options.token}`;
    }

    const esFormData = options.body instanceof FormData;
    if (!esFormData) {
        headers['Content-Type'] = 'application/json';
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    let response: Response;
    try {
        response = await fetch(url, {
            method: options.method ?? 'GET',
            headers,
            signal: controller.signal,
            body:
                options.body === undefined
                    ? undefined
                    : esFormData
                      ? (options.body as FormData)
                      : JSON.stringify(options.body),
        });
    } catch (e) {
        clearTimeout(timeoutId);
        if (e instanceof DOMException && e.name === 'AbortError') {
            throw new ApiConnectionError('El servidor no respondió a tiempo. Intenta de nuevo más tarde.');
        }
        throw new ApiConnectionError('No se pudo contactar al servidor. Verifica que el backend esté corriendo.');
    }
    clearTimeout(timeoutId);

    let data: T | BackendErrorBody;
    try {
        data = (await response.json()) as T | BackendErrorBody;
    } catch {
        if (!response.ok) {
            throw new ApiError('Error desconocido del servidor', response.status);
        }
        return undefined as T;
    }

    if (!response.ok) {
        throw new ApiError(extractErrorMessage(data), response.status);
    }

    return data as T;
}
