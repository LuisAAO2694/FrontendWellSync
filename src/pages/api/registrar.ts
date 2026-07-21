import type { APIRoute } from 'astro';
import { apiFetch, ApiConnectionError, ApiError } from '../../lib/api-client';

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();
    const { nombre, email, password } = body as { nombre?: unknown; email?: unknown; password?: unknown };

    if (typeof nombre !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
        return new Response(JSON.stringify({ success: false, message: 'Nombre, email y contraseña son obligatorios' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        await apiFetch('/api/usuarios', {
            method: 'POST',
            body: { nombre, email, password },
        });
        return new Response(JSON.stringify({ success: true }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (e) {
        if (e instanceof ApiError) {
            return new Response(JSON.stringify({ success: false, message: e.message }), {
                status: e.statusCode,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        if (e instanceof ApiConnectionError) {
            return new Response(JSON.stringify({ success: false, message: e.message }), {
                status: 503,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        throw e;
    }
};
