import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { T as createAstro, g as addAttribute, i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_kq8-ajON.mjs";
import { t as createComponent } from "./compiler_DeBOvG5Q.mjs";
import { t as $$AppLayout } from "./AppLayout_DAj2vUm7.mjs";
import { r as getSessionToken, t as clearSessionCookie } from "./auth_C9PP6UDM.mjs";
import { n as ApiError, r as apiFetch } from "./api-client_1o2yY7LR.mjs";
//#region src/pages/calorias.astro
var calorias_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Calorias,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Calorias = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Calorias;
	const token = getSessionToken(Astro.cookies);
	const actividad = Astro.url.searchParams.get("actividad") ?? "";
	const weight = Astro.url.searchParams.get("weight") ?? "";
	const duration = Astro.url.searchParams.get("duration") ?? "";
	let errorMessage = null;
	let resultados = null;
	if (actividad) {
		const params = new URLSearchParams({ actividad });
		if (weight) params.set("weight", weight);
		if (duration) params.set("duration", duration);
		try {
			resultados = await apiFetch(`/api/calorias/calcular?${params.toString()}`, { token });
		} catch (e) {
			if (e instanceof ApiError && e.statusCode === 401) {
				clearSessionCookie(Astro.cookies);
				return Astro.redirect("/login");
			}
			errorMessage = e instanceof Error ? e.message : "Error desconocido";
		}
	}
	return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Calorías" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="max-w-md bg-white rounded-lg shadow p-6"><h1 class="text-2xl font-bold mb-4">Calculadora de calorías</h1><form method="GET" class="flex flex-col gap-3"><label class="text-sm text-gray-600">Actividad<input type="text" name="actividad" required${addAttribute(actividad, "value")} placeholder="ej. running" class="border rounded px-3 py-2 w-full"></label><label class="text-sm text-gray-600">Peso en libras (opcional)<input type="number" name="weight" min="1"${addAttribute(weight, "value")} class="border rounded px-3 py-2 w-full"></label><label class="text-sm text-gray-600">Duración en minutos (opcional)<input type="number" name="duration" min="1"${addAttribute(duration, "value")} class="border rounded px-3 py-2 w-full"></label><button type="submit" class="bg-blue-600 text-white rounded px-3 py-2">Calcular</button></form>${errorMessage && renderTemplate`<p class="text-red-600 mt-3">${errorMessage}</p>`}${resultados && resultados.length > 0 && renderTemplate`<div class="mt-4 flex flex-col gap-2">${resultados.map((item) => renderTemplate`<div class="border rounded p-3">${Object.entries(item).map(([clave, valor]) => renderTemplate`<p class="text-sm"><span class="font-semibold">${clave}:</span> ${String(valor)}</p>`)}</div>`)}</div>`}</div>` })}`;
}, "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/calorias.astro", void 0);
var $$file = "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/calorias.astro";
var $$url = "/calorias";
//#endregion
//#region \0virtual:astro:page:src/pages/calorias@_@astro
var page = () => calorias_exports;
//#endregion
export { page };
