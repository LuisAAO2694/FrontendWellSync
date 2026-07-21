import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { T as createAstro, g as addAttribute, i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_kq8-ajON.mjs";
import { t as createComponent } from "./compiler_DeBOvG5Q.mjs";
import { n as renderScript, t as $$AppLayout } from "./AppLayout_DAj2vUm7.mjs";
import { r as getSessionToken, t as clearSessionCookie } from "./auth_C9PP6UDM.mjs";
import { n as ApiError, r as apiFetch } from "./api-client_1o2yY7LR.mjs";
import { t as CATEGORIAS_HABITO } from "./habito-categorias_C5ulbLC6.mjs";
//#region src/pages/habitos/[id]/editar.astro
var editar_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Editar,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Editar = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Editar;
	const token = getSessionToken(Astro.cookies);
	const { id } = Astro.params;
	let errorMessage = null;
	let valores = {
		nombre: "",
		categoriaSeleccionada: "",
		categoriaOtro: "",
		metaDiaria: "",
		horarioRecordatorio: ""
	};
	if (Astro.request.method === "POST") {
		const formData = await Astro.request.formData();
		const nombre = String(formData.get("nombre") ?? "").trim();
		const categoriaSeleccionada = String(formData.get("categoria") ?? "").trim();
		const categoriaOtro = String(formData.get("categoriaOtro") ?? "").trim();
		const metaDiaria = String(formData.get("metaDiaria") ?? "").trim();
		const horarioRecordatorio = String(formData.get("horarioRecordatorio") ?? "").trim();
		const categoria = categoriaSeleccionada === "Otro" ? categoriaOtro : categoriaSeleccionada;
		valores = {
			nombre,
			categoriaSeleccionada,
			categoriaOtro,
			metaDiaria,
			horarioRecordatorio
		};
		const erroresLocales = [];
		if (!nombre) erroresLocales.push("El nombre del hábito es obligatorio");
		if (!categoria) erroresLocales.push("La categoría es obligatoria");
		if (!metaDiaria) erroresLocales.push("La meta diaria es obligatoria");
		if (erroresLocales.length === 0) try {
			await apiFetch(`/api/habitos/${id}`, {
				method: "PUT",
				token,
				body: {
					nombre,
					categoria,
					metaDiaria,
					horarioRecordatorio: horarioRecordatorio || void 0
				}
			});
			return Astro.redirect("/habitos");
		} catch (e) {
			if (e instanceof ApiError && e.statusCode === 401) {
				clearSessionCookie(Astro.cookies);
				return Astro.redirect("/login");
			}
			errorMessage = e instanceof Error ? e.message : "Error desconocido";
		}
		else errorMessage = erroresLocales.join(". ");
	} else {
		let habito = null;
		try {
			habito = await apiFetch(`/api/habitos/${id}`, { token });
		} catch (e) {
			if (e instanceof ApiError && e.statusCode === 401) {
				clearSessionCookie(Astro.cookies);
				return Astro.redirect("/login");
			}
			return Astro.redirect("/habitos?error=" + encodeURIComponent("Hábito no encontrado"));
		}
		const categoriaEsSugerida = CATEGORIAS_HABITO.includes(habito.categoria);
		valores = {
			nombre: habito.nombre,
			categoriaSeleccionada: categoriaEsSugerida ? habito.categoria : "Otro",
			categoriaOtro: categoriaEsSugerida ? "" : habito.categoria,
			metaDiaria: habito.metaDiaria,
			horarioRecordatorio: habito.horarioRecordatorio ?? ""
		};
	}
	return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Editar hábito" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="max-w-md bg-white rounded-lg shadow p-6"><h1 class="text-2xl font-bold mb-4">Editar hábito</h1>${errorMessage && renderTemplate`<p class="text-red-600 mb-3">${errorMessage}</p>`}<form method="POST" class="flex flex-col gap-3"><input type="text" name="nombre" placeholder="Nombre" required${addAttribute(valores.nombre, "value")} class="border rounded px-3 py-2"><select id="categoria-select" name="categoria" required class="border rounded px-3 py-2"><option value="" disabled${addAttribute(!valores.categoriaSeleccionada, "selected")}>Selecciona una categoría</option>${CATEGORIAS_HABITO.map((cat) => renderTemplate`<option${addAttribute(cat, "value")}${addAttribute(valores.categoriaSeleccionada === cat, "selected")}>${cat}</option>`)}<option value="Otro"${addAttribute(valores.categoriaSeleccionada === "Otro", "selected")}>Otro</option></select><input type="text" id="categoria-otro" name="categoriaOtro" placeholder="Especifica la categoría"${addAttribute(valores.categoriaOtro, "value")}${addAttribute(`border rounded px-3 py-2 ${valores.categoriaSeleccionada === "Otro" ? "" : "hidden"}`, "class")}><input type="text" name="metaDiaria" placeholder="Meta diaria" required${addAttribute(valores.metaDiaria, "value")} class="border rounded px-3 py-2"><label class="text-sm text-gray-600">Recordatorio (opcional)<input type="time" name="horarioRecordatorio"${addAttribute(valores.horarioRecordatorio, "value")} class="border rounded px-3 py-2 w-full"></label><button type="submit" class="bg-blue-600 text-white rounded px-3 py-2">Guardar cambios</button></form></div>${renderScript($$result, "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/habitos/[id]/editar.astro?astro&type=script&index=0&lang.ts")}` })}`;
}, "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/habitos/[id]/editar.astro", void 0);
var $$file = "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/habitos/[id]/editar.astro";
var $$url = "/habitos/[id]/editar";
//#endregion
//#region \0virtual:astro:page:src/pages/habitos/[id]/editar@_@astro
var page = () => editar_exports;
//#endregion
export { page };
