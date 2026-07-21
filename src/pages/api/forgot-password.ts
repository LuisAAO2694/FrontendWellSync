import type { APIRoute } from 'astro';
import { apiFetch, ApiConnectionError, ApiError } from '../../lib/api-client';

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();
    const { email } = body as { email?: unknown };

    if (typeof email !== 'string') {
        return new Response(JSON.stringify({ success: false, message: 'Email es obligatorio' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        await apiFetch('/api/usuarios/forgot-password', {
            method: 'POST',
            body: { email },
        });
        return new Response(JSON.stringify({ success: true, message: 'Si el email existe, recibirás un enlace de recuperación' }), {
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
