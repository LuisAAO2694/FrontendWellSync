import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { t as clearSessionCookie } from "./auth_C9PP6UDM.mjs";
//#region src/pages/api/logout.ts
var logout_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = async ({ cookies }) => {
	clearSessionCookie(cookies);
	return new Response(JSON.stringify({ success: true }), {
		status: 200,
		headers: { "Content-Type": "application/json" }
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/logout@_@ts
var page = () => logout_exports;
//#endregion
export { page };
