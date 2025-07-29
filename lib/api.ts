import {
    api_url,
    LoginPayload,
    LoginResponse,
    ArticlePayload
} from "@/components/constants";

import axios from "@/lib/axiosClient";

export const getCurrentUser = async () => {
    try{
        const res = await axios.get("/api/auth/me/");
        return {
            ok: true,
            data: res.data,
            error: null,
        };
    } catch (error: any) {
        return {
            ok: false,
            data: null,
            error: error.response?.data?.detail || error.message || "Unknown error",
        }
    }
};

export async function login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await fetch(`${api_url}/api/auth/login/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Login failed");
    }

    return response.json();
}


export async function logout() {
    try {
        const response = await fetch(`${api_url}/api/auth/logout/`, {
            method: "POST",
            credentials: "include",
        });
        sessionStorage.removeItem("user");
        window.location.href = "/";
        return response.json();
    } catch (error) {
        console.error("Logout failed", error);
    }
}


export async function dashboard() {
    const response = await fetch(`${api_url}/api/auth/dashboard/`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Failed to load dashboard data");
    }
    const data = await response.json()

    console.log(data)

    return data;
}


export async function getArticles(
  categoryOrUrl?: string,
  isNextPageUrl = false
) {
    let url: string;

    if (isNextPageUrl && categoryOrUrl) {
        url = categoryOrUrl;
    } else {
        url = `${api_url}/api/articles/`;
        if (categoryOrUrl && categoryOrUrl !== "All") {
            url += `?category=${encodeURIComponent(categoryOrUrl)}`;
        }
    }
    const response = await fetch(url, {
        method: "GET",
        credentials: "include",
    });

    return response.json();
}



export async function getArticle(slug: string) {
    const response = await fetch(`${api_url}/api/articles/${slug}/`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Failed to fetch article");
    }

    return await response.json();
}


export async function createArticle(payload: ArticlePayload) {
    console.log(payload)
    const response = await fetch(`${api_url}/api/articles/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Failed to create article");
    }

    return await response.json();
}