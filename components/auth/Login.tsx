"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { login } from "@/lib/api";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";


interface LoginFormData {
    email: string;
    password: string;
}

interface FormField {
    id: keyof LoginFormData;
    label: string;
    type: string;
    placeholder: string;
    autoFocus?: boolean;
}

export const Login = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { setUser } = useUser()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await login(formData);
            console.log("Login successful:", res);
            setUser(res.user);

            router.replace("/dashboard");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    const formFields: FormField[] = [
        {
            id: "email",
            label: "Email",
            type: "email",
            placeholder: "Enter your email",
            autoFocus: true,
        },
        {
            id: "password",
            label: "Password",
            type: "password",
            placeholder: "Enter your password",
        },
    ];

    return (
        <section className="max-w-md mx-auto px-6 py-16 mt-16">
            <h2 className="text-2xl text-center font-serif mb-8 text-white">Login</h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-[#1a1a1a] p-6 rounded-xl shadow-md"
            >
                {formFields.map(({ id, label, type, placeholder, autoFocus }) => (
                    <div key={id} className="flex flex-col space-y-2">
                        <label htmlFor={id} className="text-sm font-medium text-gray-300">
                            {label}
                        </label>
                        <input
                            id={id}
                            type={type}
                            placeholder={placeholder}
                            autoFocus={autoFocus}
                            value={formData[id]}
                            onChange={handleChange}
                            className="bg-[#2a2a2a] text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>
                ))}

                {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200 disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "Log In"}
                </button>
            </form>
        </section>
    );
};
