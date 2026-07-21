import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { T as createAstro, g as addAttribute, i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_kq8-ajON.mjs";
import { t as createComponent } from "./compiler_DeBOvG5Q.mjs";
import { t as $$AppLayout } from "./AppLayout_DAj2vUm7.mjs";
import { r as getSessionToken, t as clearSessionCookie } from "./auth_C9PP6UDM.mjs";
import { n as ApiError, r as apiFetch } from "./api-client_1o2yY7LR.mjs";
//#region src/pages/notificaciones.astro
var notificaciones_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Notificaciones,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Notificaciones = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Notificaciones;
	const token = getSessionToken(Astro.cookies);
	if (Astro.request.method === "POST") {
		const formData = await Astro.request.formData();
		try {
			if (formData.has("marcarLeida")) await apiFetch(`/api/notificaciones/${String(formData.get("id") ?? "")}/leer`, {
				method: "PATCH",
				token
			});
			else if (formData.has("marcarTodas")) await apiFetch("/api/notificaciones/leer-todas", {
				method: "PATCH",
				token
			});
			return Astro.redirect("/notificaciones");
		} catch (e) {
			if (e instanceof ApiError && e.statusCode === 401) {
				clearSessionCookie(Astro.cookies);
				return Astro.redirect("/login");
			}
			const message = e instanceof Error ? e.message : "Error desconocido";
			return Astro.redirect(`/notificaciones?error=${encodeURIComponent(message)}`);
		}
	}
	let notificaciones = [];
	let errorMessage = Astro.url.searchParams.get("error");
	try {
		notificaciones = await apiFetch("/api/notificaciones", { token });
	} catch (e) {
		if (e instanceof ApiError && e.statusCode === 401) {
			clearSessionCookie(Astro.cookies);
			return Astro.redirect("/login");
		}
		errorMessage = e instanceof Error ? e.message : "Error desconocido";
	}
	const noLeidas = notificaciones.filter((n) => !n.leida).length;
	return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Notificaciones" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="flex items-center justify-between mb-4"><h1 class="text-2xl font-bold">Notificaciones ${noLeidas > 0 && renderTemplate`<span class="text-sm text-red-600">(${noLeidas} sin leer)</span>`}</h1>${noLeidas > 0 && renderTemplate`<form method="POST"><button type="submit" name="marcarTodas" value="1" class="bg-gray-800 text-white rounded px-3 py-2 text-sm">Marcar todas leídas</button></form>`}</div>${errorMessage && renderTemplate`<p class="text-red-600 mb-3">${errorMessage}</p>`}<ul class="flex flex-col gap-2">${notificaciones.map((n) => renderTemplate`<li${addAttribute(`bg-white rounded-lg shadow p-3 flex items-center justify-between ${n.leida ? "opacity-60" : ""}`, "class")}><div><p>${n.mensaje}</p><p class="text-xs text-gray-500">${new Date(n.fecha).toLocaleString("es-MX", { timeZone: "UTC" })}</p></div>${!n.leida && renderTemplate`<form method="POST"><input type="hidden" name="id"${addAttribute(n._id, "value")}><button type="submit" name="marcarLeida" value="1" class="text-blue-600 text-sm">Marcar leída</button></form>`}</li>`)}</ul>` })}`;
}, "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/notificaciones.astro", void 0);
var $$file = "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/notificaciones.astro";
var $$url = "/notificaciones";
//#endregion
//#region \0virtual:astro:page:src/pages/notificaciones@_@astro
var page = () => notificaciones_exports;
//#endregion
export { page };
