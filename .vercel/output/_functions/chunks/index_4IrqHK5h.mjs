import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { T as createAstro, g as addAttribute, i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_kq8-ajON.mjs";
import { t as createComponent } from "./compiler_DeBOvG5Q.mjs";
import { n as renderScript, t as $$AppLayout } from "./AppLayout_DAj2vUm7.mjs";
import { r as getSessionToken, t as clearSessionCookie } from "./auth_C9PP6UDM.mjs";
import { n as ApiError, r as apiFetch } from "./api-client_1o2yY7LR.mjs";
//#region src/pages/logros/index.astro
var logros_exports = /* @__PURE__ */ __exportAll({
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
			await apiFetch(`/api/logros/${id}`, {
				method: "DELETE",
				token
			});
			return Astro.redirect("/logros");
		} catch (e) {
			if (e instanceof ApiError && e.statusCode === 401) {
				clearSessionCookie(Astro.cookies);
				return Astro.redirect("/login");
			}
			const message = e instanceof Error ? e.message : "Error desconocido";
			return Astro.redirect(`/logros?error=${encodeURIComponent(message)}`);
		}
	}
	let logros = [];
	let nombresHabitos = /* @__PURE__ */ new Map();
	let errorMessage = Astro.url.searchParams.get("error");
	try {
		const [logrosResp, habitosResp] = await Promise.all([apiFetch("/api/logros", { token }), apiFetch("/api/habitos", { token })]);
		logros = logrosResp;
		nombresHabitos = new Map(habitosResp.map((h) => [h._id, h.nombre]));
		logros.sort((a, b) => new Date(b.fechaObtenido).getTime() - new Date(a.fechaObtenido).getTime());
	} catch (e) {
		if (e instanceof ApiError && e.statusCode === 401) {
			clearSessionCookie(Astro.cookies);
			return Astro.redirect("/login");
		}
		errorMessage = e instanceof Error ? e.message : "Error desconocido";
	}
	return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Logros" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<h1 class="text-2xl font-bold mb-4">Logros</h1>${errorMessage && renderTemplate`<p class="text-red-600 mb-3">${errorMessage}</p>`}<table class="w-full bg-white rounded-lg shadow overflow-hidden"><thead class="bg-gray-100 text-left"><tr><th class="p-3">Tipo</th><th class="p-3">Fecha obtenida</th><th class="p-3">Hábito relacionado</th><th class="p-3">Acciones</th></tr></thead><tbody>${logros.map((logro) => renderTemplate`<tr><td class="p-3">${logro.tipo}</td><td class="p-3">${new Date(logro.fechaObtenido).toLocaleDateString("es-MX", { timeZone: "UTC" })}</td><td class="p-3">${logro.habitoRelacionado ? nombresHabitos.get(logro.habitoRelacionado) ?? "—" : "—"}</td><td class="p-3"><form method="POST" class="confirmar-eliminar"><input type="hidden" name="id"${addAttribute(logro._id, "value")}><button type="submit" class="text-red-600">Eliminar</button></form></td></tr>`)}</tbody></table>${renderScript($$result, "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/logros/index.astro?astro&type=script&index=0&lang.ts")}` })}`;
}, "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/logros/index.astro", void 0);
var $$file = "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/logros/index.astro";
var $$url = "/logros";
//#endregion
//#region \0virtual:astro:page:src/pages/logros/index@_@astro
var page = () => logros_exports;
//#endregion
export { page };
