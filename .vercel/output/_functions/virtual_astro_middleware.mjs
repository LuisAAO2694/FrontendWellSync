import { O as defineMiddleware, _ as sequence } from "./chunks/render_CtJ4TBpd.mjs";
import { r as getSessionToken } from "./chunks/auth_C9PP6UDM.mjs";
//#region src/middleware.ts
var PROTECTED_PREFIXES = [
	"/dashboard",
	"/habitos",
	"/registros",
	"/entrenamientos",
	"/perfil",
	"/logros",
	"/notificaciones",
	"/calorias",
	"/reportes",
	"/usuarios"
];
//#endregion
//#region \0virtual:astro:middleware
var onRequest = sequence(defineMiddleware((context, next) => {
	if (!PROTECTED_PREFIXES.some((prefix) => context.url.pathname.startsWith(prefix))) return next();
	if (!getSessionToken(context.cookies)) return context.redirect("/login");
	return next();
}));
//#endregion
export { onRequest };
