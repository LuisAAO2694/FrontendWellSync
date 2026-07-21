import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { T as createAstro, i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_kq8-ajON.mjs";
import { t as createComponent } from "./compiler_DeBOvG5Q.mjs";
import { t as $$AppLayout } from "./AppLayout_DAj2vUm7.mjs";
import { n as decodeSessionPayload, r as getSessionToken, t as clearSessionCookie } from "./auth_C9PP6UDM.mjs";
import { n as ApiError, r as apiFetch } from "./api-client_1o2yY7LR.mjs";
//#region src/pages/dashboard/index.astro
var dashboard_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const token = getSessionToken(Astro.cookies);
	const payload = decodeSessionPayload(token);
	if (!payload) {
		clearSessionCookie(Astro.cookies);
		return Astro.redirect("/login");
	}
	let usuario = null;
	let errorMessage = null;
	try {
		usuario = await apiFetch(`/api/usuarios/${payload.id}`, { token });
	} catch (e) {
		if (e instanceof ApiError && e.statusCode === 401) {
			clearSessionCookie(Astro.cookies);
			return Astro.redirect("/login");
		}
		errorMessage = e instanceof Error ? e.message : "Error desconocido";
	}
	return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Dashboard" }, { "default": ($$result) => renderTemplate`${errorMessage && renderTemplate`${maybeRenderHead($$result)}<p class="text-red-600">${errorMessage}</p>`}${usuario && renderTemplate`<div class="max-w-md bg-white rounded-lg shadow p-6"><h1 class="text-2xl font-bold mb-2">Hola, ${usuario.nombre}</h1><p class="text-gray-600">${usuario.email}</p></div>`}` })}`;
}, "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/dashboard/index.astro", void 0);
var $$file = "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/dashboard/index.astro";
var $$url = "/dashboard";
//#endregion
//#region \0virtual:astro:page:src/pages/dashboard/index@_@astro
var page = () => dashboard_exports;
//#endregion
export { page };
