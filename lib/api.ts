import {
    LoginPayload,
    LoginResponse,
    RegisterPayload,
    RegisterResponse,
    ArticlePayload
} from "@/components/constants";

import axios from "@/lib/axiosClient";

export const getCurrentUser = async () => {
    try {
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
        };
    }
};

export async function login(payload: LoginPayload): Promise<LoginResponse> {
    try {
        const res = await axios.post("/api/auth/login/", payload);
        return res.data;
    } catch (error: any) {
        const message = error.response?.data?.message || "Login failed";
        throw new Error(message);
    }
}

export async function register(payload: RegisterPayload): Promise<RegisterResponse> {
    try {
        const res = await axios.post("/api/auth/register/", payload);
        return res.data;
    } catch (error: any) {
        console.error("Registration failed", error);

        if (error.response?.data && typeof error.response.data === "object") {
            // Let the component handle the structure
            throw { fieldErrors: error.response.data };
        }

        throw new Error("Registration failed");
    }
}

// Request email verification
export async function verifyEmail(token: string): Promise<{ message: string }> {
    try {
        const res = await axios.get(`/api/auth/verify-email/?token=${token}`);
        return res.data;
    } catch (error: any) {
        const message =
          error.response?.data?.detail || error.message || "Verification failed";
        throw new Error(message);
    }
}

// Resend verification email
export async function resendVerificationEmail(email: string): Promise<{ message: string }> {
    try {
        const res = await axios.post("/api/auth/resend-verification/", { email });
        return res.data;
    } catch (error: any) {
        const message =
          error.response?.data?.detail || error.message || "Resend failed";
        throw new Error(message);
    }
}

export async function logout() {
    try {
        const res = await axios.post("/api/auth/logout/");
        sessionStorage.removeItem("user");
        window.location.href = "/";
        return res.data;
    } catch (error) {
        console.error("Logout failed", error);
    }
}

export async function dashboard(page = 1, category = "") {
    try {
        const params: Record<string, any> = { page };
        if (category && category !== "All") {
            params.category = category;
        }

        const res = await axios.get("/api/auth/dashboard/", { params });
        return res.data;
    } catch (error: any) {
        const message =
          error.response?.data?.message || "Failed to load dashboard data";
        throw new Error(message);
    }
}

export async function getArticles(categoryOrUrl?: string, isNextPageUrl = false) {
    try {
        let url: string;

        if (isNextPageUrl && categoryOrUrl) {
            // Full URL for pagination
            return (await axios.get(categoryOrUrl)).data;
        }

        url = "/api/articles/";
        if (categoryOrUrl && categoryOrUrl !== "All") {
            url += `?category=${encodeURIComponent(categoryOrUrl)}`;
        }

        const res = await axios.get(url);
        return res.data;
    } catch (error: any) {
        throw new Error("Failed to fetch articles");
    }
}

export async function getArticle(slug: string) {
    try {
        const res = await axios.get(`/api/articles/${slug}/`);
        return res.data;
    } catch (error: any) {
        const message = error.response?.data?.message || "Failed to fetch article";
        throw new Error(message);
    }
}

export async function createArticle(payload: ArticlePayload) {
    try {
        const res = await axios.post("/api/articles/", payload);
        return res.data;
    } catch (error: any) {
        const message = error.response?.data?.message || "Failed to create article";
        throw new Error(message);
    }
}



// import {
//     api_url,
//     LoginPayload,
//     LoginResponse,
//     ArticlePayload
// } from "@/components/constants";
//
// import axios from "@/lib/axiosClient";
//
// export const getCurrentUser = async () => {
//     try{
//         const res = await axios.get("/api/auth/me/");
//         return {
//             ok: true,
//             data: res.data,
//             error: null,
//         };
//     } catch (error: any) {
//         return {
//             ok: false,
//             data: null,
//             error: error.response?.data?.detail || error.message || "Unknown error",
//         }
//     }
// };
//
// export async function login(payload: LoginPayload): Promise<LoginResponse> {
//     const response = await fetch(`${api_url}/api/auth/login/`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify(payload),
//     });
//
//     if (!response.ok) {
//         const error = await response.json().catch(() => ({}));
//         throw new Error(error.message || "Login failed");
//     }
//
//     return response.json();
// }
//
//
// export async function logout() {
//     try {
//         const response = await fetch(`${api_url}/api/auth/logout/`, {
//             method: "POST",
//             credentials: "include",
//         });
//         sessionStorage.removeItem("user");
//         window.location.href = "/";
//         return response.json();
//     } catch (error) {
//         console.error("Logout failed", error);
//     }
// }
//
//
// export async function dashboard() {
//     const response = await fetch(`${api_url}/api/auth/dashboard/`, {
//         method: "GET",
//         credentials: "include",
//     });
//
//     if (!response.ok) {
//         const error = await response.json().catch(() => ({}));
//         throw new Error(error.message || "Failed to load dashboard data");
//     }
//     const data = await response.json()
//
//     console.log(data)
//
//     return data;
// }
//
//
// export async function getArticles(
//   categoryOrUrl?: string,
//   isNextPageUrl = false
// ) {
//     let url: string;
//
//     if (isNextPageUrl && categoryOrUrl) {
//         url = categoryOrUrl;
//     } else {
//         url = `${api_url}/api/articles/`;
//         if (categoryOrUrl && categoryOrUrl !== "All") {
//             url += `?category=${encodeURIComponent(categoryOrUrl)}`;
//         }
//     }
//     const response = await fetch(url, {
//         method: "GET",
//         credentials: "include",
//     });
//
//     return response.json();
// }
//
//
//
// export async function getArticle(slug: string) {
//     const response = await fetch(`${api_url}/api/articles/${slug}/`, {
//         method: "GET",
//         credentials: "include",
//     });
//
//     if (!response.ok) {
//         const error = await response.json().catch(() => ({}));
//         throw new Error(error.message || "Failed to fetch article");
//     }
//
//     return await response.json();
// }
//
//
// export async function createArticle(payload: ArticlePayload) {
//     console.log(payload)
//     const response = await fetch(`${api_url}/api/articles/`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify(payload),
//     });
//
//     if (!response.ok) {
//         const error = await response.json().catch(() => ({}));
//         throw new Error(error.message || "Failed to create article");
//     }
//
//     return await response.json();
// }