import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { T as createAstro, g as addAttribute, i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_kq8-ajON.mjs";
import { t as createComponent } from "./compiler_DeBOvG5Q.mjs";
import { n as renderScript, t as $$AppLayout } from "./AppLayout_DAj2vUm7.mjs";
import { n as decodeSessionPayload, r as getSessionToken, t as clearSessionCookie } from "./auth_C9PP6UDM.mjs";
import { n as ApiError, r as apiFetch } from "./api-client_1o2yY7LR.mjs";
//#region src/pages/usuarios/index.astro
var usuarios_exports = /* @__PURE__ */ __exportAll({
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
	if (Astro.request.method === "POST") {
		const formData = await Astro.request.formData();
		const id = String(formData.get("id") ?? "");
		try {
			await apiFetch(`/api/usuarios/${id}`, {
				method: "DELETE",
				token
			});
			return Astro.redirect("/usuarios");
		} catch (e) {
			if (e instanceof ApiError && e.statusCode === 401) {
				clearSessionCookie(Astro.cookies);
				return Astro.redirect("/login");
			}
			const message = e instanceof Error ? e.message : "Error desconocido";
			return Astro.redirect(`/usuarios?error=${encodeURIComponent(message)}`);
		}
	}
	let usuarios = [];
	let errorMessage = Astro.url.searchParams.get("error");
	try {
		usuarios = await apiFetch("/api/usuarios", { token });
	} catch (e) {
		if (e instanceof ApiError && e.statusCode === 401) {
			clearSessionCookie(Astro.cookies);
			return Astro.redirect("/login");
		}
		errorMessage = e instanceof Error ? e.message : "Error desconocido";
	}
	return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Usuarios" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<h1 class="text-2xl font-bold mb-4">Usuarios</h1>${errorMessage && renderTemplate`<p class="text-red-600 mb-3">${errorMessage}</p>`}<table class="w-full bg-white rounded-lg shadow overflow-hidden"><thead class="bg-gray-100 text-left"><tr><th class="p-3">Nombre</th><th class="p-3">Email</th><th class="p-3">Rol</th><th class="p-3">Fecha de registro</th><th class="p-3">Acciones</th></tr></thead><tbody>${usuarios.map((usuario) => renderTemplate`<tr><td class="p-3">${usuario.nombre}</td><td class="p-3">${usuario.email}</td><td class="p-3">${usuario.rol}</td><td class="p-3">${new Date(usuario.fechaRegistro).toLocaleDateString("es-MX", { timeZone: "UTC" })}</td><td class="p-3">${usuario._id !== payload.id && renderTemplate`<form method="POST" class="confirmar-eliminar"><input type="hidden" name="id"${addAttribute(usuario._id, "value")}><button type="submit" class="text-red-600">Eliminar</button></form>`}</td></tr>`)}</tbody></table>${renderScript($$result, "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/usuarios/index.astro?astro&type=script&index=0&lang.ts")}` })}`;
}, "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/usuarios/index.astro", void 0);
var $$file = "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/usuarios/index.astro";
var $$url = "/usuarios";
//#endregion
//#region \0virtual:astro:page:src/pages/usuarios/index@_@astro
var page = () => usuarios_exports;
//#endregion
export { page };
