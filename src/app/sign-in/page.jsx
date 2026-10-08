"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const SignInPage = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      setLoading(true);

      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error("ইমেইল অথবা পাসওয়ার্ড সঠিক নয়");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("সাইন ইন করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSubmit = async () => {
    try {
      setGoogleLoading(true);

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error("Google দিয়ে সাইন ইন করা যায়নি");
      }
    } catch (error) {
      console.error(error);
      toast.error("Google দিয়ে সাইন ইন করতে সমস্যা হয়েছে");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-green-50/30 px-4 py-10">
      {/* Background */}
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-green-100 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-100 blur-3xl" />

      <div className="relative w-full max-w-md">
        <form
          onSubmit={handleOnSubmit}
          className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl shadow-green-100/50 sm:p-8"
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-green-400 to-green-600 text-3xl shadow-lg shadow-green-200">
              🛒
            </div>

            <h1 className="text-3xl font-bold text-gray-900">স্বাগতম!</h1>

            <p className="mt-2 text-sm text-gray-500">
              আপনার বাজার দর অ্যাকাউন্টে সাইন ইন করুন
            </p>
          </div>

          {/* Email */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              ইমেইল
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="আপনার ইমেইল লিখুন"
              autoComplete="email"
              required
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-700"
              >
                পাসওয়ার্ড
              </label>

              <Link
                href="/forgot-password"
                className="text-xs font-medium text-green-600 hover:text-green-700"
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                autoComplete="current-password"
                required
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 pr-12 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-400 hover:bg-green-50 hover:text-green-600"
                aria-label={
                  showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখান"
                }
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Remember */}
          <label className="mb-6 flex cursor-pointer items-center gap-2 text-sm text-gray-500">
            <input
              type="checkbox"
              className="checkbox checkbox-sm border-gray-300 checked:border-green-600 checked:bg-green-600"
            />
            আমাকে মনে রাখুন
          </label>

          {/* Sign In */}
          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-xl bg-green-600 font-semibold text-white shadow-lg shadow-green-200 transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="loading loading-spinner loading-sm" />
                সাইন ইন হচ্ছে...
              </span>
            ) : (
              "সাইন ইন করুন"
            )}
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleSubmit}
            disabled={googleLoading}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white font-semibold text-gray-700 transition hover:bg-gray-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M21.35 12.23c0-.79-.07-1.55-.2-2.27H12v4.3h5.23a4.47 4.47 0 01-1.94 2.93v2.43h3.14c1.84-1.69 2.92-4.18 2.92-7.39z"
              />
              <path
                fill="#34A853"
                d="M12 21.85c2.63 0 4.84-.87 6.45-2.36l-3.14-2.43c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.29v2.5A9.75 9.75 0 0012 21.85z"
              />
              <path
                fill="#FBBC05"
                d="M6.54 13.95a5.86 5.86 0 010-3.9v-2.5H3.29a9.8 9.8 0 000 8.9l3.25-2.5z"
              />
              <path
                fill="#EA4335"
                d="M12 6.02c1.43 0 2.72.49 3.73 1.46l2.8-2.8C16.83 3.1 14.63 2.15 12 2.15a9.75 9.75 0 00-8.71 5.4l3.25 2.5C7.31 7.74 9.46 6.02 12 6.02z"
              />
            </svg>

            {googleLoading
              ? "Google দিয়ে সাইন ইন হচ্ছে..."
              : "Google দিয়ে সাইন ইন"}
          </button>

          {/* Sign Up */}
          <p className="mt-7 text-center text-sm text-gray-500">
            আপনার কোনো অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="font-bold text-green-600 hover:text-green-700"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default SignInPage;
