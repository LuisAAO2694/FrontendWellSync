import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { T as createAstro, g as addAttribute, i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_kq8-ajON.mjs";
import { t as createComponent } from "./compiler_DeBOvG5Q.mjs";
import { n as renderScript, t as $$AppLayout } from "./AppLayout_DAj2vUm7.mjs";
import { r as getSessionToken, t as clearSessionCookie } from "./auth_C9PP6UDM.mjs";
import { n as ApiError, r as apiFetch } from "./api-client_1o2yY7LR.mjs";
//#region src/pages/registros/index.astro
var registros_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const token = getSessionToken(Astro.cookies);
	if (Astro.request.method === "POST") {
		const formData = await Astro.request.formData();
		const id = String(formData.get("id") ?? "");
		try {
			await apiFetch(`/api/registros-diarios/${id}`, {
				method: "DELETE",
				token
			});
			return Astro.redirect("/registros");
		} catch (e) {
			if (e instanceof ApiError && e.statusCode === 401) {
				clearSessionCookie(Astro.cookies);
				return Astro.redirect("/login");
			}
			const message = e instanceof Error ? e.message : "Error desconocido";
			return Astro.redirect(`/registros?error=${encodeURIComponent(message)}`);
		}
	}
	let registros = [];
	let errorMessage = Astro.url.searchParams.get("error");
	try {
		registros = await apiFetch("/api/registros-diarios", { token });
		registros.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
	} catch (e) {
		if (e instanceof ApiError && e.statusCode === 401) {
			clearSessionCookie(Astro.cookies);
			return Astro.redirect("/login");
		}
		errorMessage = e instanceof Error ? e.message : "Error desconocido";
	}
	return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Registros diarios" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="flex items-center justify-between mb-4"><h1 class="text-2xl font-bold">Registros diarios</h1><a href="/registros/nuevo" class="bg-blue-600 text-white rounded px-3 py-2">+ Nuevo registro</a></div>${errorMessage && renderTemplate`<p class="text-red-600 mb-3">${errorMessage}</p>`}<table class="w-full bg-white rounded-lg shadow overflow-hidden"><thead class="bg-gray-100 text-left"><tr><th class="p-3">Fecha</th><th class="p-3">Nivel de energía</th><th class="p-3">Hábitos completados</th><th class="p-3">Acciones</th></tr></thead><tbody>${registros.map((registro) => {
		const completados = registro.habitosCompletados.filter((hc) => hc.completado).length;
		const total = registro.habitosCompletados.length;
		return renderTemplate`<tr><td class="p-3">${new Date(registro.fecha).toLocaleDateString("es-MX", { timeZone: "UTC" })}</td><td class="p-3">${registro.nivelEnergia} / 5</td><td class="p-3">${completados} / ${total}</td><td class="p-3 flex gap-2"><a${addAttribute(`/registros/${registro._id}/editar`, "href")} class="text-blue-600">Editar</a><form method="POST" class="confirmar-eliminar"><input type="hidden" name="id"${addAttribute(registro._id, "value")}><button type="submit" class="text-red-600">Eliminar</button></form></td></tr>`;
	})}</tbody></table>${renderScript($$result, "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/registros/index.astro?astro&type=script&index=0&lang.ts")}` })}`;
}, "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/registros/index.astro", void 0);
var $$file = "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/registros/index.astro";
var $$url = "/registros";
//#endregion
//#region \0virtual:astro:page:src/pages/registros/index@_@astro
var page = () => registros_exports;
//#endregion
export { page };
