import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { i as setSessionCookie } from "./auth_C9PP6UDM.mjs";
import { n as ApiError, r as apiFetch, t as ApiConnectionError } from "./api-client_1o2yY7LR.mjs";
//#region src/pages/api/google-login.ts
var google_login_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = async ({ request, cookies }) => {
	const { idToken } = await request.json();
	if (typeof idToken !== "string" || idToken.trim().length === 0) return new Response(JSON.stringify({
		success: false,
		message: "idToken de Google es obligatorio"
	}), {
		status: 400,
		headers: { "Content-Type": "application/json" }
	});
	try {
		setSessionCookie(cookies, (await apiFetch("/api/usuarios/google", {
			method: "POST",
			body: { idToken }
		})).token);
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (e) {
		if (e instanceof ApiError) return new Response(JSON.stringify({
			success: false,
			message: e.message
		}), {
			status: e.statusCode,
			headers: { "Content-Type": "application/json" }
		});
		if (e instanceof ApiConnectionError) return new Response(JSON.stringify({
			success: false,
			message: e.message
		}), {
			status: 503,
			headers: { "Content-Type": "application/json" }
		});
		throw e;
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/google-login@_@ts
var page = () => google_login_exports;
//#endregion
export { page };
