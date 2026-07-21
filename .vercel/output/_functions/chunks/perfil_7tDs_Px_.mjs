import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { T as createAstro, g as addAttribute, i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_kq8-ajON.mjs";
import { t as createComponent } from "./compiler_DeBOvG5Q.mjs";
import { t as $$AppLayout } from "./AppLayout_DAj2vUm7.mjs";
import { n as decodeSessionPayload, r as getSessionToken, t as clearSessionCookie } from "./auth_C9PP6UDM.mjs";
import { i as getApiBaseUrl, n as ApiError, r as apiFetch } from "./api-client_1o2yY7LR.mjs";
//#region src/pages/perfil.astro
var perfil_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Perfil,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Perfil = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Perfil;
	const token = getSessionToken(Astro.cookies);
	const payload = decodeSessionPayload(token);
	if (!payload) {
		clearSessionCookie(Astro.cookies);
		return Astro.redirect("/login");
	}
	function esUsuario(valor) {
		return typeof valor === "object" && valor !== null && typeof valor._id === "string" && typeof valor.nombre === "string" && typeof valor.email === "string";
	}
	let errorMessage = null;
	let fotoErrorMessage = null;
	let valoresPerfil = null;
	let usuario = null;
	if (Astro.request.method === "POST") {
		const formData = await Astro.request.formData();
		if (formData.has("guardarPerfil")) {
			const nombre = String(formData.get("nombre") ?? "").trim();
			const email = String(formData.get("email") ?? "").trim();
			const password = String(formData.get("password") ?? "");
			valoresPerfil = {
				nombre,
				email
			};
			const erroresLocales = [];
			if (!nombre) erroresLocales.push("El nombre no puede estar vacío");
			if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) erroresLocales.push("Email no válido");
			if (password && password.length < 8) erroresLocales.push("La contraseña debe tener al menos 8 caracteres");
			if (erroresLocales.length === 0) try {
				const respuesta = await apiFetch(`/api/usuarios/${payload.id}`, {
					method: "PUT",
					token,
					body: {
						nombre,
						email,
						...password ? { password } : {}
					}
				});
				if (esUsuario(respuesta)) usuario = respuesta;
			} catch (e) {
				if (e instanceof ApiError && e.statusCode === 401) {
					clearSessionCookie(Astro.cookies);
					return Astro.redirect("/login");
				}
				errorMessage = e instanceof Error ? e.message : "Error desconocido";
			}
			else errorMessage = erroresLocales.join(". ");
		}
		if (formData.has("subirFoto")) {
			const archivo = formData.get("foto");
			if (archivo instanceof File && archivo.size > 0) {
				const fotoFormData = new FormData();
				fotoFormData.append("foto", archivo);
				try {
					const respuesta = await apiFetch(`/api/usuarios/${payload.id}/foto-perfil`, {
						method: "POST",
						token,
						body: fotoFormData
					});
					if (esUsuario(respuesta)) usuario = respuesta;
				} catch (e) {
					if (e instanceof ApiError && e.statusCode === 401) {
						clearSessionCookie(Astro.cookies);
						return Astro.redirect("/login");
					}
					fotoErrorMessage = e instanceof Error ? e.message : "Error desconocido";
				}
			} else fotoErrorMessage = "Selecciona un archivo";
		}
	}
	if (!usuario) try {
		usuario = await apiFetch(`/api/usuarios/${payload.id}`, { token });
	} catch (e) {
		if (e instanceof ApiError && e.statusCode === 401) {
			clearSessionCookie(Astro.cookies);
			return Astro.redirect("/login");
		}
		if (!errorMessage) errorMessage = e instanceof Error ? e.message : "Error desconocido";
	}
	if (!valoresPerfil && usuario) valoresPerfil = {
		nombre: usuario.nombre,
		email: usuario.email
	};
	const apiBaseUrl = getApiBaseUrl();
	return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Mi perfil" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="max-w-md bg-white rounded-lg shadow p-6 flex flex-col gap-6"><h1 class="text-2xl font-bold">Mi perfil</h1>${usuario && renderTemplate`<div class="flex flex-col items-center gap-3">${usuario.fotoPerfil ? renderTemplate`<img${addAttribute(`${apiBaseUrl}${usuario.fotoPerfil}`, "src")} alt="Foto de perfil" class="w-24 h-24 rounded-full object-cover">` : renderTemplate`<div class="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">Sin foto</div>`}${fotoErrorMessage && renderTemplate`<p class="text-red-600 text-sm">${fotoErrorMessage}</p>`}<form method="POST" enctype="multipart/form-data" class="flex items-center gap-2"><input type="file" name="foto" accept="image/jpeg,image/png,image/webp" class="text-sm"><button type="submit" name="subirFoto" value="1" class="bg-gray-800 text-white rounded px-3 py-2 text-sm">Subir foto</button></form></div>`}${errorMessage && renderTemplate`<p class="text-red-600">${errorMessage}</p>`}${valoresPerfil && renderTemplate`<form method="POST" class="flex flex-col gap-3"><label class="text-sm text-gray-600">Nombre<input type="text" name="nombre" required${addAttribute(valoresPerfil.nombre, "value")} class="border rounded px-3 py-2 w-full"></label><label class="text-sm text-gray-600">Email<input type="email" name="email" required${addAttribute(valoresPerfil.email, "value")} class="border rounded px-3 py-2 w-full"></label><label class="text-sm text-gray-600">Nueva contraseña (dejar vacío para no cambiar)<input type="password" name="password" class="border rounded px-3 py-2 w-full"></label><button type="submit" name="guardarPerfil" value="1" class="bg-blue-600 text-white rounded px-3 py-2">Guardar cambios</button></form>`}</div>` })}`;
}, "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/perfil.astro", void 0);
var $$file = "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/perfil.astro";
var $$url = "/perfil";
//#endregion
//#region \0virtual:astro:page:src/pages/perfil@_@astro
var page = () => perfil_exports;
//#endregion
export { page };
