"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // কমন লগইন লজিক যা নরমাল এবং ডেমো দুইটার জন্যই কাজ করবে
  const executeLogin = async (loginEmail: string, loginPassword: string) => {
    setLoading(true);
    setError("");

    const trimmedPassword = loginPassword.trim();
    if (!trimmedPassword) {
      setError("Password cannot be empty or just spaces.");
      setLoading(false);
      return;
    }

    try {
      const { error: authError } = await authClient.signIn.email({
        email: loginEmail.trim(),
        password: trimmedPassword,
        callbackURL: "/",
      });

      if (authError) {
        setError(authError.message || "Invalid email or password.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ফর্ম সাবমিট হ্যান্ডলার (নরমাল ইউজার)
  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    await executeLogin(email, password);
  };

  // 🎯 ডেমো অটো-ফিল এবং ইনস্ট্যান্ট লগইন ফাংশন
  const handleDemoLogin = async () => {
    const demoEmail = "demo@example.com"; // অ্যাসাইনমেন্ট গাইডের ডেমো ইমেইল
    const demoPassword = "password123"; // অ্যাসাইনমেন্ট গাইডের ডেমো পাসওয়ার্ড

    setEmail(demoEmail);
    setPassword(demoPassword);

    // ফিল করার সাথে সাথেই লগইন প্রসেস রান করে দেবে
    await executeLogin(demoEmail, demoPassword);
  };

  const handlePasswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-12 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl shadow-black/40">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Enter your credentials to access your account
          </p>
        </div>

        {/* 💡 Highlighted Demo Login CTA for Teachers */}
        <div className="rounded-xl border border-zinc-700/60 bg-zinc-850 p-4 text-center space-y-2">
          <p className="text-xs text-zinc-400 font-medium">
            Testing or grading this project? Use the one-click demo login:
          </p>
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={loading}
            className="inline-flex items-center justify-center w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-200 shadow-sm transition-all hover:bg-zinc-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ⚡ Quick Demo Login
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="mt-6 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4 rounded-md">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-300"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-zinc-100 placeholder-zinc-500 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 sm:text-sm"
                placeholder="name@example.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-300"
              >
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  onKeyDown={handlePasswordKeyDown}
                  className="block w-full rounded-lg border border-zinc-700 bg-zinc-950 pl-3 pr-10 py-2.5 text-zinc-100 placeholder-zinc-500 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 sm:text-sm"
                  placeholder="••••••••"
                />

                {/* Show/Hide Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-600"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-lg bg-zinc-50 px-4 py-2.5 text-sm font-semibold text-zinc-950 shadow transition-colors hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          {/* Register / Sign up Redirect Section */}
          <div className="text-center text-sm text-zinc-400 mt-4">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-zinc-200 hover:text-white underline underline-offset-4 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
