import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { _ as defineScriptVars, h as renderHead, u as renderTemplate } from "./server_kq8-ajON.mjs";
import { t as createComponent } from "./compiler_DeBOvG5Q.mjs";
/* empty css                 */
//#region src/pages/login.astro
var login_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Login,
	file: () => $$file,
	url: () => $$url
});
var $$Login = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`<html lang="es"><head><meta charset="utf-8"><title>WellSync — Iniciar sesión</title>${renderTemplate`<script src="https://accounts.google.com/gsi/client" async defer><\/script>`}${renderHead($$result)}</head><body class="min-h-screen flex items-center justify-center bg-gray-50"><div class="w-full max-w-sm p-6 bg-white rounded-lg shadow"><h1 class="text-2xl font-bold mb-4">Iniciar sesión</h1><form id="login-form" class="flex flex-col gap-3"><input type="email" name="email" placeholder="Correo" required class="border rounded px-3 py-2"><input type="password" name="password" placeholder="Contraseña" required class="border rounded px-3 py-2"><button type="submit" class="bg-blue-600 text-white rounded px-3 py-2">Entrar</button></form><p id="login-error" class="text-red-600 mt-2 hidden"></p>${renderTemplate`<div class="mt-4"><div id="google-button"></div></div>`}</div><script>(function(){${defineScriptVars({ googleClientId: "0213281908-rsa65k2uq04png6rij8pogpg871mp32c.apps.googleusercontent.com" })}
            const form = document.getElementById('login-form');
            const errorEl = document.getElementById('login-error');

            function showError(message) {
                errorEl.textContent = message;
                errorEl.classList.remove('hidden');
            }

            form.addEventListener('submit', async (event) => {
                event.preventDefault();
                errorEl.classList.add('hidden');

                const formData = new FormData(form);
                const email = formData.get('email');
                const password = formData.get('password');

                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });
                const data = await response.json();

                if (data.success) {
                    window.location.href = '/dashboard';
                } else {
                    showError(data.message ?? 'No se pudo iniciar sesión');
                }
            });

            function handleGoogleCredential(googleResponse) {
                fetch('/api/google-login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ idToken: googleResponse.credential }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.success) {
                            window.location.href = '/dashboard';
                        } else {
                            showError(data.message ?? 'No se pudo iniciar sesión con Google');
                        }
                    });
            }

            if (googleClientId) {
                window.addEventListener('load', () => {
                    window.google.accounts.id.initialize({
                        client_id: googleClientId,
                        callback: handleGoogleCredential,
                    });
                    window.google.accounts.id.renderButton(document.getElementById('google-button'), {
                        theme: 'outline',
                        size: 'large',
                    });
                });
            }
        })();<\/script></body></html>`;
}, "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/login.astro", void 0);
var $$file = "/Users/luisalfonsoacostaortiz/Documents/ITESO/ITESO 5/DESARROLLO DE TECNOLOGIAS EN EL SERVIDOR/FrontendWellSync/src/pages/login.astro";
var $$url = "/login";
//#endregion
//#region \0virtual:astro:page:src/pages/login@_@astro
var page = () => login_exports;
//#endregion
export { page };
