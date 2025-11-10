"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { Loader2 } from "lucide-react";

interface AuthFormProps {
  mode: "signin" | "signup";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const { login, register, loading } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (mode === "signup") {
        await register({ name: form.name, email: form.email, password: form.password });
      } else {
        await login({ email: form.email, password: form.password });
      }
      router.push("/");
    } catch {
      // errors handled in AuthProvider toast
    }
  };

  const isSignup = mode === "signup";

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-pink-50/90 via-white/70 to-rose-50/90 dark:from-[#121212] dark:via-[#1A1A1A] dark:to-[#121212] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/80 dark:bg-[#1F1F1F]/90 backdrop-blur-xl border border-pink-200/60 dark:border-pink-900/30 rounded-3xl shadow-2xl shadow-pink-500/20 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {isSignup ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {isSignup
              ? "Unlock AI-powered fitness plans tailored just for you."
              : "Sign in to continue your personalized fitness journey."}
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {isSignup && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="block w-full px-4 py-3 rounded-2xl bg-white/90 dark:bg-white/10 border border-pink-300/60 dark:border-pink-900/40 focus:ring-2 focus:ring-pink-500/60 focus:border-transparent transition text-gray-900 dark:text-white"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="block w-full px-4 py-3 rounded-2xl bg-white/90 dark:bg-white/10 border border-pink-300/60 dark:border-pink-900/40 focus:ring-2 focus:ring-pink-500/60 focus:border-transparent transition text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              className="block w-full px-4 py-3 rounded-2xl bg-white/90 dark:bg-white/10 border border-pink-300/60 dark:border-pink-900/40 focus:ring-2 focus:ring-pink-500/60 focus:border-transparent transition text-gray-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold shadow-lg shadow-pink-500/25 hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : isSignup ? (
              "Create account"
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <div className="mt-6 text-sm text-center text-gray-600 dark:text-gray-300">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <Link href="/signin" className="text-pink-600 dark:text-pink-400 font-semibold">
                Sign in
              </Link>
            </>
          ) : (
            <>
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-pink-600 dark:text-pink-400 font-semibold">
                Create one
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

