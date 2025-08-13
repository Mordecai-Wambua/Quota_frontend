"use client";

import { useEffect, useState, FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyEmail, resendVerificationEmail } from "@/lib/api";

export function Verify() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"verifying" | "success" | "expired" | "error">("verifying");
  const [message, setMessage] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [resendMsg, setResendMsg] = useState<string | null>(null);

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Verification token missing.");
        return;
      }

      try {
        const res = await verifyEmail(token);

        if (res?.message === "Email has already been verified") {
          setStatus("success");
          setMessage("Email was already verified. Redirecting to login...");

          setTimeout(() => {
            router.replace("/login");
          }, 3000);
          return;
        }

        setStatus("success");
        setMessage("Email verified successfully! Redirecting to login...");

        setTimeout(() => {
          router.replace("/login");
        }, 3000);
      } catch (err: any) {
        const msg = err?.response?.data?.message || err.message;

        if (msg.includes("expired")) {
          setStatus("expired");
          setMessage("Your verification link has expired.");
        } else {
          setStatus("error");
          setMessage(msg || "Verification failed.");
        }
      }
    };

    verify();
  }, [token, router]);



  const handleResend = async (e: FormEvent) => {
    e.preventDefault();
    setResendMsg(null);

    try {
      const res = await resendVerificationEmail(email);
      setResendMsg(res.message || "A new verification email has been sent.");
    } catch (err: any) {
      setResendMsg(err.message);
    }
  };

  return (
    <section className="max-w-md mx-auto px-6 py-16 mt-16 text-white">
      <h1 className="text-2xl text-center font-bold mb-6">Email Verification</h1>

      {status === "verifying" && <p className="text-center">Verifying your token...</p>}

      {status === "expired" && (
        <div className="space-y-4 text-center">
          <p className="text-yellow-400">{message}</p>
          <form onSubmit={handleResend} className="space-y-4">
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-[#2a2a2a] text-white border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-green-600 py-2 px-4 rounded hover:bg-green-700"
            >
              Resend Verification Email
            </button>
          </form>
          {resendMsg && <p className="text-sm text-gray-300">{resendMsg}</p>}
        </div>
      )}

      {status === "success" && (
        <div className="text-center space-y-4 text-green-400">
          <p>{message}</p>
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        </div>
      )}


      {status === "error" && (
        <p className="text-red-500 text-center">{message || "Something went wrong."}</p>
      )}
    </section>
  );
}
