"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { register } from "@/lib/api";
import { useRouter } from "next/navigation";

interface RegisterFormData {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

interface FormField {
  id: keyof RegisterFormData;
  label: string;
  type: string;
  placeholder: string;
  autoFocus?: boolean;
}

export const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string[]>>>({});


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setError(null);

    try {
      await register(formData);
      // Redirect to login page with a success message in the URL
      router.replace(
        "/login?registered=1"
      );
    } catch (err: any) {
      if (err.fieldErrors && typeof err.fieldErrors === "object") {
        const fieldErrors: Partial<Record<keyof RegisterFormData, string[]>> = {};

        for (const key in err.fieldErrors) {
          if (Array.isArray(err.fieldErrors[key])) {
            fieldErrors[key as keyof RegisterFormData] = err.fieldErrors[key];
          }
        }

        setErrors(fieldErrors);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }  finally {
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
      id: "first_name",
      label: "First Name",
      type: "text",
      placeholder: "Enter your first name",
    },
    {
      id: "last_name",
      label: "Last Name",
      type: "text",
      placeholder: "Enter your last name",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "Create a password",
    },
  ];

  return (
    <section className="max-w-md mx-auto px-6 py-16 mt-16">
      <h2 className="text-2xl text-center font-serif mb-8 text-white">Register</h2>

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
            {errors[id] && (
              <div className="text-red-500 text-xs text-center mt-1">
                {errors[id]?.map((msg, idx) => (
                  <p key={idx}>{msg}</p>
                ))}
              </div>
            )}
          </div>
        ))}


        {error && (
          <div className="text-red-500 text-sm text-center space-y-1">
            {error.split("\n").map((msg, idx) => (
              <p key={idx}>{msg}</p>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-primary hover:bg-gradient-primary text-white py-2 px-4 rounded-md transition duration-200 disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-sm text-center">Already have an account? <a href="/login" className="transition-colors">Login</a></p>
      </form>
    </section>
  );
};
