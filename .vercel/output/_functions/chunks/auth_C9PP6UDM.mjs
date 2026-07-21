//#region src/lib/auth.ts
var SESSION_COOKIE_NAME = "wellsync_session";
function setSessionCookie(cookies, token) {
	cookies.set(SESSION_COOKIE_NAME, token, {
		httpOnly: true,
		secure: true,
		sameSite: "lax",
		path: "/"
	});
}
function getSessionToken(cookies) {
	return cookies.get(SESSION_COOKIE_NAME)?.value;
}
function clearSessionCookie(cookies) {
	cookies.delete(SESSION_COOKIE_NAME, { path: "/" });
}
function decodeSessionPayload(token) {
	try {
		const payloadSegment = token.split(".")[1];
		if (!payloadSegment) return null;
		const json = Buffer.from(payloadSegment, "base64").toString("utf-8");
		const payload = JSON.parse(json);
		if (typeof payload.id === "string" && (payload.rol === "usuario" || payload.rol === "administrador")) return {
			id: payload.id,
			rol: payload.rol
		};
		return null;
	} catch {
		return null;
	}
}
//#endregion
export { setSessionCookie as i, decodeSessionPayload as n, getSessionToken as r, clearSessionCookie as t };
