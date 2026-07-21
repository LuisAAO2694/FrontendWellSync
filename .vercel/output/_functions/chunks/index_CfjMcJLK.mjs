import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { T as createAstro, g as addAttribute, i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_kq8-ajON.mjs";
import { t as createComponent } from "./compiler_DeBOvG5Q.mjs";
import { n as renderScript, t as $$AppLayout } from "./AppLayout_DAj2vUm7.mjs";
import { r as getSessionToken, t as clearSessionCookie } from "./auth_C9PP6UDM.mjs";
import { n as ApiError, r as apiFetch } from "./api-client_1o2yY7LR.mjs";
//#region src/pages/habitos/index.astro
var habitos_exports = /* @__PURE__ */ __exportAll({
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
		const intent = formData.get("intent");
		const id = String(formData.get("id") ?? "");
		try {
			if (intent === "toggle") {
				const nuevoActivo = formData.get("nuevoActivo") === "true";
				await apiFetch(`/api/habitos/${id}`, {
					method: "PUT",
					token,
					body: { activo: nuevoActivo }
				});
			} else if (intent === "delete") await apiFetch(`/api/habitos/${id}`, {
				method: "DELETE",
				token
			});
			return Astro.redirect("/habitos");
		} catch (e) {
			if (e instanceof ApiError && e.statusCode === 401) {
				clearSessionCookie(Astro.cookies);
				return Astro.redirect("/login");
			}
			const message = e instanceof Error ? e.message : "Error desconocido";
			return Astro.redirect(`/habitos?error=${encodeURIComponent(message)}`);
		}
	}
	let habitos = [];
	let errorMessage = Astro.url.searchParams.get("error");
	try {
		habitos = await apiFetch("/api/habitos", { token });
	} catch (e) {
		if (e instanceof ApiError && e.statusCode === 401) {
			clearSessionCookie(Astro.cookies);
			return Astro.redirect("/login");
		}
		errorMessage = e instanceof Error ? e.message : "Error desconocido";
	}
	return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Hábitos" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="flex items-center justify-between mb-4"><h1 class="text-2xl font-bold">Hábitos</h1><a href="/habitos/nuevo" class="bg-blue-600 text-white rounded px-3 py-2">+ Nuevo hábito</a></div>${errorMessage && renderTemplate`<p class="text-red-600 mb-3">${errorMessage}</p>`}<table class="w-full bg-white rounded-lg shadow overflow-hidden"><thead class="bg-gray-100 text-left"><tr><th class="p-3">Nombre</th><th class="p-3">Categoría</th><th class="p-3">Meta diaria</th><th class="p-3">Estado</th><th class="p-3">Acciones</th></tr></thead><tbody>${habitos.map((habito) => renderTemplate`<tr${addAttribute(habito.activo ? "" : "opacity-50", "class")}><td class="p-3">${habito.nombre}</td><td class="p-3">${habito.categoria}</td><td class="p-3">${habito.metaDiaria}</td><td class="p-3"><span${addAttribute(habito.activo ? "text-green-700" : "text-gray-500", "class")}>${habito.activo ? "Activo" : "Pausado"}</span></td><td class="p-3 flex gap-2"><a${addAttribute(`/habitos/${habito._id}/editar`, "href")} class="text-blue-600">Editar</a><form method="POST"><input type="hidden" name="intent" value="toggle"><input type="hidden" name="id"${addAttribute(habito._id, "value")}><input type="hidden" name="nuevoActivo"${addAttribute((!habito.activo).toString(), "value")}><button type="submit" class="text-gray-700">${habito.activo ? "Pausar" : "Reactivar"}</button></form><form method="POST" class="confirmar-eliminar"><input type="hidden" name="intent" value="delete"><input type="hidden" name="id"${addAttribute(habito._id, "value")}><button type="submit" class="text-red-600">Eliminar</button></form></td></tr>`)}</tbody></table>${renderScript($$result, "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/habitos/index.astro?astro&type=script&index=0&lang.ts")}` })}`;
}, "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/habitos/index.astro", void 0);
var $$file = "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/habitos/index.astro";
var $$url = "/habitos";
//#endregion
//#region \0virtual:astro:page:src/pages/habitos/index@_@astro
var page = () => habitos_exports;
//#endregion
export { page };
