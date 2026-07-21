import type { AstroCookies } from 'astro';

const SESSION_COOKIE_NAME = 'wellsync_session';

export function setSessionCookie(cookies: AstroCookies, token: string): void {
    cookies.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: import.meta.env.PROD,
        sameSite: 'lax',
        path: '/',
    });
}

export function getSessionToken(cookies: AstroCookies): string | undefined {
    return cookies.get(SESSION_COOKIE_NAME)?.value;
}

export function clearSessionCookie(cookies: AstroCookies): void {
    cookies.delete(SESSION_COOKIE_NAME, { path: '/' });
}

export interface SessionPayload {
    id: string;
    rol: 'usuario' | 'administrador';
}

// Decodifica el payload del JWT sin verificar la firma (la verificación real la hace el backend
// en cada llamada). Solo se usa para leer el id/rol y saber qué pedirle al backend.
export function decodeSessionPayload(token: string): SessionPayload | null {
    try {
        const payloadSegment = token.split('.')[1];
        if (!payloadSegment) return null;

        const json = Buffer.from(payloadSegment, 'base64').toString('utf-8');
        const payload = JSON.parse(json) as Record<string, unknown>;

        if (typeof payload.id === 'string' && (payload.rol === 'usuario' || payload.rol === 'administrador')) {
            return { id: payload.id, rol: payload.rol };
        }
        return null;
    } catch {
        return null;
    }
}
