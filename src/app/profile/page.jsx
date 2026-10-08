"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Image from "next/image";

const ProfilePage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="rounded-3xl border border-gray-200 bg-white px-8 py-8 text-center shadow-lg">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
            🛒
          </div>

          <h2 className="mt-4 text-xl font-bold text-gray-900">সাইন ইন করুন</h2>

          <p className="mt-2 text-sm text-gray-500">
            আপনার প্রোফাইল দেখতে সাইন ইন করুন।
          </p>
        </div>
      </div>
    );
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { data, error } = await authClient.updateUser({
        name,
        image,
      });

      if (error) {
        toast.error(error.message || "প্রোফাইল আপডেট করা যায়নি");
        return;
      }

      if (data) {
        toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
      }
    } catch (error) {
      console.log(error);
      toast.error("কিছু সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[80vh] overflow-hidden bg-gray-50 px-4 py-8 sm:py-10">
      {/* Background Decoration */}
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-green-100 blur-3xl" />

      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-50 blur-3xl" />

      <div className="relative mx-auto max-w-2xl">
        {/* Profile Card */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
          {/* Cover */}
          <div className="h-32 bg-linear-to-r from-green-700 via-green-600 to-emerald-400">
            <div className="flex h-full items-center justify-center">
              <span className="text-4xl">🛒</span>
            </div>
          </div>

          {/* Profile Image */}
          <div className="-mt-16 flex justify-center">
            <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-green-100 shadow-xl">
              {image ? (
                <Image
                  width={128}
                  height={128}
                  src={image}
                  alt={name || "User"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-green-600">
                  {name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* User Information */}
          <div className="px-6 pb-6 pt-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>

            <p className="mt-1 text-sm text-gray-500">{user.email}</p>

            <span
              className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                user.emailVerified
                  ? "bg-green-50 text-green-600"
                  : "bg-yellow-50 text-yellow-600"
              }`}
            >
              {user.emailVerified
                ? "✓ ইমেইল ভেরিফাই করা হয়েছে"
                : "ইমেইল ভেরিফাই করা হয়নি"}
            </span>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Update Form */}
          <form onSubmit={handleUpdateProfile} className="space-y-5 p-6 sm:p-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                প্রোফাইল আপডেট করুন
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                আপনার নাম এবং প্রোফাইল ছবি আপডেট করুন।
              </p>
            </div>

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                নাম
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition-all duration-300 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                required
              />
            </div>

            {/* Profile Image */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                প্রোফাইল ছবির URL
              </label>

              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/profile.jpg"
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition-all duration-300 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
              />

              <p className="mt-2 text-xs text-gray-400">
                আপনার প্রোফাইল ছবির সরাসরি image URL ব্যবহার করুন।
              </p>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                ইমেইল
              </label>

              <input
                type="email"
                value={user.email}
                disabled
                className="h-12 w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 px-4 text-sm text-gray-500"
              />

              <p className="mt-2 text-xs text-gray-400">
                এখান থেকে আপনার ইমেইল পরিবর্তন করা যাবে না।
              </p>
            </div>

            {/* Update Button */}
            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-xl bg-green-600 font-semibold text-white shadow-lg shadow-green-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "আপডেট হচ্ছে..." : "প্রোফাইল আপডেট করুন"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
