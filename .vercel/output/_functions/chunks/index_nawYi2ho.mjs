import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { T as createAstro, g as addAttribute, i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_kq8-ajON.mjs";
import { t as createComponent } from "./compiler_DeBOvG5Q.mjs";
import { t as $$AppLayout } from "./AppLayout_DAj2vUm7.mjs";
import { n as decodeSessionPayload, r as getSessionToken, t as clearSessionCookie } from "./auth_C9PP6UDM.mjs";
import { n as ApiError, r as apiFetch } from "./api-client_1o2yY7LR.mjs";
//#region src/pages/reportes/index.astro
var reportes_exports = /* @__PURE__ */ __exportAll({
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
	const esAdmin = payload.rol === "administrador";
	if (Astro.request.method === "POST" && esAdmin) {
		const formData = await Astro.request.formData();
		const id = String(formData.get("id") ?? "");
		const estado = String(formData.get("estado") ?? "");
		try {
			await apiFetch(`/api/reportes/${id}`, {
				method: "PUT",
				token,
				body: { estado }
			});
			return Astro.redirect("/reportes");
		} catch (e) {
			if (e instanceof ApiError && e.statusCode === 401) {
				clearSessionCookie(Astro.cookies);
				return Astro.redirect("/login");
			}
			const message = e instanceof Error ? e.message : "Error desconocido";
			return Astro.redirect(`/reportes?error=${encodeURIComponent(message)}`);
		}
	}
	let reportes = [];
	let nombresUsuarios = /* @__PURE__ */ new Map();
	let errorMessage = Astro.url.searchParams.get("error");
	try {
		reportes = await apiFetch("/api/reportes", { token });
		reportes.sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime());
		if (esAdmin) {
			const usuarios = await apiFetch("/api/usuarios", { token });
			nombresUsuarios = new Map(usuarios.map((u) => [u._id, u.nombre]));
		}
	} catch (e) {
		if (e instanceof ApiError && e.statusCode === 401) {
			clearSessionCookie(Astro.cookies);
			return Astro.redirect("/login");
		}
		errorMessage = e instanceof Error ? e.message : "Error desconocido";
	}
	const ESTADOS = [
		"abierto",
		"en_proceso",
		"resuelto"
	];
	return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Reportes" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="flex items-center justify-between mb-4"><h1 class="text-2xl font-bold">${esAdmin ? "Todos los reportes" : "Mis reportes"}</h1><a href="/reportes/nuevo" class="bg-blue-600 text-white rounded px-3 py-2">+ Nuevo reporte</a></div>${errorMessage && renderTemplate`<p class="text-red-600 mb-3">${errorMessage}</p>`}<table class="w-full bg-white rounded-lg shadow overflow-hidden"><thead class="bg-gray-100 text-left"><tr><th class="p-3">Tipo</th><th class="p-3">Descripción</th>${esAdmin && renderTemplate`<th class="p-3">Reportado por</th>`}<th class="p-3">Fecha</th><th class="p-3">Estado</th></tr></thead><tbody>${reportes.map((reporte) => renderTemplate`<tr><td class="p-3">${reporte.tipo}</td><td class="p-3">${reporte.descripcion}</td>${esAdmin && renderTemplate`<td class="p-3">${nombresUsuarios.get(reporte.usuario) ?? "—"}</td>`}<td class="p-3">${new Date(reporte.fechaCreacion).toLocaleDateString("es-MX", { timeZone: "UTC" })}</td><td class="p-3">${esAdmin ? renderTemplate`<form method="POST" class="flex items-center gap-2"><input type="hidden" name="id"${addAttribute(reporte._id, "value")}><select name="estado" class="border rounded px-2 py-1 text-sm">${ESTADOS.map((estado) => renderTemplate`<option${addAttribute(estado, "value")}${addAttribute(reporte.estado === estado, "selected")}>${estado}</option>`)}</select><button type="submit" class="text-blue-600 text-sm">Guardar</button></form>` : renderTemplate`<span>${reporte.estado}</span>`}</td></tr>`)}</tbody></table>` })}`;
}, "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/reportes/index.astro", void 0);
var $$file = "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/reportes/index.astro";
var $$url = "/reportes";
//#endregion
//#region \0virtual:astro:page:src/pages/reportes/index@_@astro
var page = () => reportes_exports;
//#endregion
export { page };
