//#region src/lib/config.ts
function getApiBaseUrl() {
	return "https://backendwellsync.onrender.com";
}
//#endregion
//#region src/lib/api-client.ts
var ApiError = class extends Error {
	statusCode;
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
	}
};
var ApiConnectionError = class extends Error {};
function extractErrorMessage(data) {
	if (typeof data !== "object" || data === null) return "Error desconocido del servidor";
	if ("error" in data) {
		const error = data.error;
		if (typeof error === "string") return error;
		if (typeof error === "object" && error !== null && typeof error.message === "string") return error.message;
	}
	if ("errors" in data && Array.isArray(data.errors)) return data.errors.join(". ");
	return "Error desconocido del servidor";
}
async function apiFetch(path, options = {}) {
	const url = `${getApiBaseUrl()}${path}`;
	const headers = {};
	if (options.token) headers.Authorization = `Bearer ${options.token}`;
	const esFormData = options.body instanceof FormData;
	if (!esFormData) headers["Content-Type"] = "application/json";
	let response;
	try {
		response = await fetch(url, {
			method: options.method ?? "GET",
			headers,
			body: options.body === void 0 ? void 0 : esFormData ? options.body : JSON.stringify(options.body)
		});
	} catch {
		throw new ApiConnectionError("No se pudo contactar al servidor. Verifica que el backend esté corriendo.");
	}
	let data;
	try {
		data = await response.json();
	} catch {
		if (!response.ok) throw new ApiError("Error desconocido del servidor", response.status);
		return;
	}
	if (!response.ok) throw new ApiError(extractErrorMessage(data), response.status);
	return data;
}
//#endregion
export { getApiBaseUrl as i, ApiError as n, apiFetch as r, ApiConnectionError as t };
