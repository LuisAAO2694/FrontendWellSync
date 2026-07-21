import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { T as createAstro, g as addAttribute, i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_kq8-ajON.mjs";
import { t as createComponent } from "./compiler_DeBOvG5Q.mjs";
import { t as $$AppLayout } from "./AppLayout_DAj2vUm7.mjs";
import { r as getSessionToken, t as clearSessionCookie } from "./auth_C9PP6UDM.mjs";
import { n as ApiError, r as apiFetch } from "./api-client_1o2yY7LR.mjs";
//#region src/pages/registros/nuevo.astro
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
	let valores = {
		fecha: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		nivelEnergia: "3",
		habitosMarcados: /* @__PURE__ */ new Set()
	};
	let habitosActivos = [];
	try {
		habitosActivos = (await apiFetch("/api/habitos", { token })).filter((h) => h.activo);
	} catch (e) {
		if (e instanceof ApiError && e.statusCode === 401) {
			clearSessionCookie(Astro.cookies);
			return Astro.redirect("/login");
		}
		errorMessage = e instanceof Error ? e.message : "Error desconocido";
	}
	if (Astro.request.method === "POST") {
		const formData = await Astro.request.formData();
		const fecha = String(formData.get("fecha") ?? "");
		const nivelEnergia = Number(formData.get("nivelEnergia"));
		const habitosMarcados = new Set(habitosActivos.filter((h) => formData.get(`habito_${h._id}`) === "on").map((h) => h._id));
		valores = {
			fecha,
			nivelEnergia: String(nivelEnergia),
			habitosMarcados
		};
		const erroresLocales = [];
		if (!fecha || isNaN(new Date(fecha).getTime())) erroresLocales.push("La fecha no es válida");
		if (isNaN(nivelEnergia) || nivelEnergia < 1 || nivelEnergia > 5) erroresLocales.push("El nivel de energía debe ser un número entre 1 y 5");
		if (erroresLocales.length === 0) try {
			await apiFetch("/api/registros-diarios", {
				method: "POST",
				token,
				body: {
					fecha,
					nivelEnergia,
					habitosCompletados: habitosActivos.map((h) => ({
						habito: h._id,
						completado: habitosMarcados.has(h._id)
					}))
				}
			});
			return Astro.redirect("/registros");
		} catch (e) {
			if (e instanceof ApiError && e.statusCode === 401) {
				clearSessionCookie(Astro.cookies);
				return Astro.redirect("/login");
			}
			errorMessage = e instanceof Error ? e.message : "Error desconocido";
		}
		else errorMessage = erroresLocales.join(". ");
	}
	return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Nuevo registro" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="max-w-md bg-white rounded-lg shadow p-6"><h1 class="text-2xl font-bold mb-4">Nuevo registro diario</h1>${errorMessage && renderTemplate`<p class="text-red-600 mb-3">${errorMessage}</p>`}<form method="POST" class="flex flex-col gap-3"><label class="text-sm text-gray-600">Fecha<input type="date" name="fecha" required${addAttribute(valores.fecha, "value")} class="border rounded px-3 py-2 w-full"></label><label class="text-sm text-gray-600">Nivel de energía<select name="nivelEnergia" required class="border rounded px-3 py-2 w-full"><option value="1"${addAttribute(valores.nivelEnergia === "1", "selected")}>1 - Muy bajo</option><option value="2"${addAttribute(valores.nivelEnergia === "2", "selected")}>2 - Bajo</option><option value="3"${addAttribute(valores.nivelEnergia === "3", "selected")}>3 - Medio</option><option value="4"${addAttribute(valores.nivelEnergia === "4", "selected")}>4 - Alto</option><option value="5"${addAttribute(valores.nivelEnergia === "5", "selected")}>5 - Muy alto</option></select></label>${habitosActivos.length > 0 && renderTemplate`<fieldset class="border rounded px-3 py-2"><legend class="text-sm text-gray-600 px-1">Hábitos completados</legend>${habitosActivos.map((h) => renderTemplate`<label class="flex items-center gap-2"><input type="checkbox"${addAttribute(`habito_${h._id}`, "name")}${addAttribute(valores.habitosMarcados.has(h._id), "checked")}>${h.nombre}</label>`)}</fieldset>`}<button type="submit" class="bg-blue-600 text-white rounded px-3 py-2">Guardar</button></form></div>` })}`;
}, "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/registros/nuevo.astro", void 0);
var $$file = "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/registros/nuevo.astro";
var $$url = "/registros/nuevo";
//#endregion
//#region \0virtual:astro:page:src/pages/registros/nuevo@_@astro
var page = () => nuevo_exports;
//#endregion
export { page };
