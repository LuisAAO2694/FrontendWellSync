import type { APIRoute } from 'astro';
import { apiFetch, ApiConnectionError, ApiError } from '../../lib/api-client';

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();
    const { token, password } = body as { token?: unknown; password?: unknown };

    if (typeof token !== 'string' || typeof password !== 'string') {
        return new Response(JSON.stringify({ success: false, message: 'Token y contraseña son obligatorios' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    if (password.length < 8) {
        return new Response(JSON.stringify({ success: false, message: 'La contraseña debe tener al menos 8 caracteres' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        await apiFetch('/api/usuarios/reset-password', {
            method: 'POST',
            body: { token, password },
        });
        return new Response(JSON.stringify({ success: true, message: 'Contraseña actualizada correctamente' }), {
            status: 200,
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
