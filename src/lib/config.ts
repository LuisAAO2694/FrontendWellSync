export function getApiBaseUrl(): string {
    const url = import.meta.env.PUBLIC_API_URL;
    if (!url) {
        throw new Error('PUBLIC_API_URL no está configurada. Revisa tu archivo .env');
    }
    return url;
}

export function getGoogleClientId(): string {
    const clientId = import.meta.env.PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) {
        throw new Error('PUBLIC_GOOGLE_CLIENT_ID no está configurada. Revisa tu archivo .env');
    }
    return clientId;
}
