import type { APIRoute } from 'astro';
import { apiFetch, ApiConnectionError, ApiError } from '../../lib/api-client';
import { setSessionCookie } from '../../lib/auth';

export const POST: APIRoute = async ({ request, cookies }) => {
    const body = await request.json();
    const { idToken } = body as { idToken?: unknown };

    if (typeof idToken !== 'string' || idToken.trim().length === 0) {
        return new Response(JSON.stringify({ success: false, message: 'idToken de Google es obligatorio' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const result = await apiFetch<{ token: string }>('/api/usuarios/google', {
            method: 'POST',
            body: { idToken },
        });
        setSessionCookie(cookies, result.token);
        return new Response(JSON.stringify({ success: true }), {
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
