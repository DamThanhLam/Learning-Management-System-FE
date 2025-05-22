import { BASE_URL_AUTH_SERVICE } from "./BaseURL";

export const refreshToken = async () => {
    try {
        const res = await fetch(`${BASE_URL_AUTH_SERVICE}/refresh`, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + window.localStorage.getItem("refresh_token"),
            }
        });
        if (!res.ok) throw new Error("Failed to refresh token");
        const data = await res.json();
        window.localStorage.setItem("access_token", data.access_token)
        return data;
    } catch (error) {
        console.error("refreshToken error:", error);
        throw error;
    }
};

export const checkLogin = async () => {
    try {
        const res = await fetch(`${BASE_URL_AUTH_SERVICE}/verify-token`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + window.localStorage.getItem("access_token"),
            }
        });
        if (!res.ok) throw new Error("Token verification failed");
        const data = await res.json();
        return data;
    } catch (e) {
        throw e;
    }
};
