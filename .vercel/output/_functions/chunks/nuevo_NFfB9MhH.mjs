import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { T as createAstro, g as addAttribute, i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_kq8-ajON.mjs";
import { t as createComponent } from "./compiler_DeBOvG5Q.mjs";
import { n as renderScript, t as $$AppLayout } from "./AppLayout_DAj2vUm7.mjs";
import { r as getSessionToken, t as clearSessionCookie } from "./auth_C9PP6UDM.mjs";
import { n as ApiError, r as apiFetch } from "./api-client_1o2yY7LR.mjs";
//#region src/lib/reporte-tipos.ts
var TIPOS_REPORTE = [
	"Bug",
	"Sugerencia",
	"Contenido inapropiado"
];
//#endregion
//#region src/pages/reportes/nuevo.astro
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
		tipoSeleccionado: "",
		tipoOtro: "",
		descripcion: ""
	};
	if (Astro.request.method === "POST") {
		const formData = await Astro.request.formData();
		const tipoSeleccionado = String(formData.get("tipo") ?? "").trim();
		const tipoOtro = String(formData.get("tipoOtro") ?? "").trim();
		const descripcion = String(formData.get("descripcion") ?? "").trim();
		const tipo = tipoSeleccionado === "Otro" ? tipoOtro : tipoSeleccionado;
		valores = {
			tipoSeleccionado,
			tipoOtro,
			descripcion
		};
		const erroresLocales = [];
		if (!tipo) erroresLocales.push("El tipo de reporte es obligatorio");
		if (!descripcion) erroresLocales.push("La descripción es obligatoria");
		if (erroresLocales.length === 0) try {
			await apiFetch("/api/reportes", {
				method: "POST",
				token,
				body: {
					tipo,
					descripcion
				}
			});
			return Astro.redirect("/reportes");
		} catch (e) {
			if (e instanceof ApiError && e.statusCode === 401) {
				clearSessionCookie(Astro.cookies);
				return Astro.redirect("/login");
			}
			errorMessage = e instanceof Error ? e.message : "Error desconocido";
		}
		else errorMessage = erroresLocales.join(". ");
	}
	return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Nuevo reporte" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="max-w-md bg-white rounded-lg shadow p-6"><h1 class="text-2xl font-bold mb-4">Nuevo reporte</h1>${errorMessage && renderTemplate`<p class="text-red-600 mb-3">${errorMessage}</p>`}<form method="POST" class="flex flex-col gap-3"><select id="tipo-select" name="tipo" required class="border rounded px-3 py-2"><option value="" disabled${addAttribute(!valores.tipoSeleccionado, "selected")}>Selecciona un tipo</option>${TIPOS_REPORTE.map((t) => renderTemplate`<option${addAttribute(t, "value")}${addAttribute(valores.tipoSeleccionado === t, "selected")}>${t}</option>`)}<option value="Otro"${addAttribute(valores.tipoSeleccionado === "Otro", "selected")}>Otro</option></select><input type="text" id="tipo-otro" name="tipoOtro" placeholder="Especifica el tipo"${addAttribute(valores.tipoOtro, "value")}${addAttribute(`border rounded px-3 py-2 ${valores.tipoSeleccionado === "Otro" ? "" : "hidden"}`, "class")}><textarea name="descripcion" required placeholder="Describe el problema o sugerencia" class="border rounded px-3 py-2">${valores.descripcion}</textarea><button type="submit" class="bg-blue-600 text-white rounded px-3 py-2">Enviar reporte</button></form></div>${renderScript($$result, "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/reportes/nuevo.astro?astro&type=script&index=0&lang.ts")}` })}`;
}, "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/reportes/nuevo.astro", void 0);
var $$file = "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/reportes/nuevo.astro";
var $$url = "/reportes/nuevo";
//#endregion
//#region \0virtual:astro:page:src/pages/reportes/nuevo@_@astro
var page = () => nuevo_exports;
//#endregion
export { page };
