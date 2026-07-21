import { T as createAstro, g as addAttribute, h as renderHead, s as renderSlot, u as renderTemplate, v as createRenderInstruction } from "./server_kq8-ajON.mjs";
import { t as createComponent } from "./compiler_DeBOvG5Q.mjs";
import { n as decodeSessionPayload, r as getSessionToken } from "./auth_C9PP6UDM.mjs";
/* empty css                 */
//#region node_modules/astro/dist/runtime/server/render/script.js
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
//#endregion
//#region src/layouts/AppLayout.astro
createAstro("https://astro.build");
var $$AppLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$AppLayout;
	const { title } = Astro.props;
	const token = getSessionToken(Astro.cookies);
	const esAdmin = (token ? decodeSessionPayload(token) : null)?.rol === "administrador";
	function esActivo(href) {
		const pathname = Astro.url.pathname;
		return pathname === href || pathname.startsWith(`${href}/`);
	}
	function claseLink(href) {
		return esActivo(href) ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-gray-900";
	}
	const enlaces = [
		{
			href: "/dashboard",
			texto: "Dashboard"
		},
		{
			href: "/habitos",
			texto: "Hábitos"
		},
		{
			href: "/registros",
			texto: "Registros"
		},
		{
			href: "/entrenamientos",
			texto: "Entrenamientos"
		},
		{
			href: "/perfil",
			texto: "Mi perfil"
		},
		{
			href: "/logros",
			texto: "Logros"
		},
		{
			href: "/notificaciones",
			texto: "Notificaciones"
		},
		{
			href: "/calorias",
			texto: "Calorías"
		},
		{
			href: "/reportes",
			texto: "Reportes"
		},
		...esAdmin ? [{
			href: "/usuarios",
			texto: "Usuarios"
		}] : []
	];
	return renderTemplate`<html lang="es"><head><meta charset="utf-8"><title>WellSync — ${title}</title>${renderHead($$result)}</head><body class="min-h-screen bg-gray-50"><nav class="bg-white shadow px-6 py-3 flex items-center justify-between"><div class="flex gap-4 items-center"><span class="font-bold">WellSync</span>${enlaces.map((enlace) => renderTemplate`<a${addAttribute(enlace.href, "href")}${addAttribute(claseLink(enlace.href), "class")}${addAttribute(esActivo(enlace.href) ? "page" : void 0, "aria-current")}>${enlace.texto}</a>`)}</div><form id="logout-form"><button type="submit" class="text-gray-600 hover:text-gray-900">Cerrar sesión</button></form></nav><main class="p-6">${renderSlot($$result, $$slots["default"])}</main>${renderScript($$result, "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/layouts/AppLayout.astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/layouts/AppLayout.astro", void 0);
//#endregion
export { renderScript as n, $$AppLayout as t };
