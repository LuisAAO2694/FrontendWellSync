import { defineMiddleware } from 'astro:middleware';
import { getSessionToken } from './lib/auth';

const PROTECTED_PREFIXES = ['/dashboard', '/habitos', '/registros'];

export const onRequest = defineMiddleware((context, next) => {
    const isProtected = PROTECTED_PREFIXES.some((prefix) => context.url.pathname.startsWith(prefix));

    if (!isProtected) {
        return next();
    }

    const token = getSessionToken(context.cookies);
    if (!token) {
        return context.redirect('/login');
    }

    return next();
});
