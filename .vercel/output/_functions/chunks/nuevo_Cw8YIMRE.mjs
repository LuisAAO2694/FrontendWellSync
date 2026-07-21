import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { T as createAstro, g as addAttribute, i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_kq8-ajON.mjs";
import { t as createComponent } from "./compiler_DeBOvG5Q.mjs";
import { t as $$AppLayout } from "./AppLayout_DAj2vUm7.mjs";
import { r as getSessionToken, t as clearSessionCookie } from "./auth_C9PP6UDM.mjs";
import { n as ApiError, r as apiFetch } from "./api-client_1o2yY7LR.mjs";
import { t as procesarFormularioEntrenamiento } from "./entrenamiento-form_Bs77IWkz.mjs";
//#region src/pages/entrenamientos/nuevo.astro
var nuevo_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Nuevo,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Nuevo = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Nuevo;
	const token = getSessionToken(Astro.cookies);
	let errorMessage = null;
	let busquedaError = null;
	let fecha = "";
	let hora = "";
	let notasGenerales = "";
	let q = "";
	let ejerciciosElegidos = [];
	let resultadosBusqueda = [];
	if (Astro.request.method === "POST") {
		const formData = await Astro.request.formData();
		let estado;
		try {
			estado = await procesarFormularioEntrenamiento(formData, token);
		} catch (e) {
			if (e instanceof ApiError && e.statusCode === 401) {
				clearSessionCookie(Astro.cookies);
				return Astro.redirect("/login");
			}
			throw e;
		}
		({fecha, hora, notasGenerales, q, ejerciciosElegidos, resultadosBusqueda, busquedaError} = estado);
		if (formData.has("guardar")) if (estado.erroresValidacion.length === 0) try {
			await apiFetch("/api/entrenamientos", {
				method: "POST",
				token,
				body: {
					fecha,
					hora,
					...notasGenerales ? { notasGenerales } : {},
					ejercicios: ejerciciosElegidos.map((e) => ({
						exerciseId: e.exerciseId,
						nombre: e.nombre,
						series: e.series,
						repeticiones: e.repeticiones,
						peso: e.peso,
						...e.notaPersonal ? { notaPersonal: e.notaPersonal } : {}
					}))
				}
			});
			return Astro.redirect("/entrenamientos");
		} catch (e) {
			if (e instanceof ApiError && e.statusCode === 401) {
				clearSessionCookie(Astro.cookies);
				return Astro.redirect("/login");
			}
			errorMessage = e instanceof Error ? e.message : "Error desconocido";
		}
		else errorMessage = estado.erroresValidacion.join(". ");
	}
	return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Nuevo entrenamiento" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="max-w-2xl bg-white rounded-lg shadow p-6"><h1 class="text-2xl font-bold mb-4">Nuevo entrenamiento</h1>${errorMessage && renderTemplate`<p class="text-red-600 mb-3">${errorMessage}</p>`}<form method="POST" class="flex flex-col gap-4"><div class="border rounded p-3"><label class="text-sm text-gray-600">Buscar ejercicio</label><div class="flex gap-2 mt-1"><input type="text" name="q"${addAttribute(q, "value")} class="border rounded px-3 py-2 flex-1" placeholder="ej. press de banca"><button type="submit" name="buscar" value="1" class="bg-gray-800 text-white rounded px-3 py-2">Buscar</button></div>${busquedaError && renderTemplate`<p class="text-red-600 text-sm mt-2">${busquedaError}</p>`}${resultadosBusqueda.length > 0 && renderTemplate`<ul class="mt-3 flex flex-col gap-2">${resultadosBusqueda.filter((r) => !ejerciciosElegidos.some((e) => e.exerciseId === r.exerciseId)).map((r) => renderTemplate`<li class="flex items-center justify-between border rounded px-3 py-2"><span>${r.name}</span><button type="submit" name="agregar"${addAttribute(`${r.exerciseId}::${r.name}`, "value")} class="text-blue-600 text-sm">Agregar</button></li>`)}</ul>`}</div><div class="flex gap-3"><label class="text-sm text-gray-600 flex-1">Fecha<input type="date" name="fecha" required${addAttribute(fecha, "value")} class="border rounded px-3 py-2 w-full"></label><label class="text-sm text-gray-600 flex-1">Hora<input type="time" name="hora" required${addAttribute(hora, "value")} class="border rounded px-3 py-2 w-full"></label></div><label class="text-sm text-gray-600">Notas generales (opcional)<textarea name="notasGenerales" class="border rounded px-3 py-2 w-full">${notasGenerales}</textarea></label>${ejerciciosElegidos.map((ej, i) => renderTemplate`<div class="border rounded p-3 flex flex-col gap-2"><input type="hidden"${addAttribute(`ej_${i}_exerciseId`, "name")}${addAttribute(ej.exerciseId, "value")}><input type="hidden"${addAttribute(`ej_${i}_nombre`, "name")}${addAttribute(ej.nombre, "value")}><div class="flex items-center justify-between"><strong>${ej.nombre}</strong><button type="submit" name="quitar"${addAttribute(ej.exerciseId, "value")} class="text-red-600 text-sm">Quitar</button></div><div class="flex gap-2"><label class="text-xs text-gray-600">Series<input type="number"${addAttribute(`ej_${i}_series`, "name")} min="1" required${addAttribute(ej.series, "value")} class="border rounded px-2 py-1 w-full"></label><label class="text-xs text-gray-600">Repeticiones<input type="number"${addAttribute(`ej_${i}_repeticiones`, "name")} min="1" required${addAttribute(ej.repeticiones, "value")} class="border rounded px-2 py-1 w-full"></label><label class="text-xs text-gray-600">Peso (kg)<input type="number"${addAttribute(`ej_${i}_peso`, "name")} min="0" required${addAttribute(ej.peso, "value")} class="border rounded px-2 py-1 w-full"></label></div><label class="text-xs text-gray-600">Nota personal (opcional)<input type="text"${addAttribute(`ej_${i}_notaPersonal`, "name")}${addAttribute(ej.notaPersonal, "value")} class="border rounded px-2 py-1 w-full"></label></div>`)}<button type="submit" name="guardar" value="1" class="bg-blue-600 text-white rounded px-3 py-2">Guardar entrenamiento</button></form></div>` })}`;
}, "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/entrenamientos/nuevo.astro", void 0);
var $$file = "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/entrenamientos/nuevo.astro";
var $$url = "/entrenamientos/nuevo";
//#endregion
//#region \0virtual:astro:page:src/pages/entrenamientos/nuevo@_@astro
var page = () => nuevo_exports;
//#endregion
export { page };
