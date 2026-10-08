"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const UserInfo = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("সাইন আউট করা যায়নি");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("সাইন আউট করতে সমস্যা হয়েছে");
    }
  };

  // Prevent UI flickering while checking session
  if (isPending) {
    return (
      <div className="flex h-10 w-24 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm">
        <span className="loading loading-spinner loading-sm text-green-600" />
      </div>
    );
  }

  return (
    <>
      {user ? (
        <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white p-1.5 shadow-md sm:gap-3 sm:px-2">
          {/* User Image */}
          <Link href="/profile" className="shrink-0">
            <div className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-green-100 sm:h-10 sm:w-10">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-green-100 text-sm font-bold text-green-700">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
            </div>
          </Link>

          {/* User Info */}
          <div className="hidden min-w-0 sm:block">
            <h3 className="max-w-30 truncate text-sm font-bold text-gray-900 md:max-w-35">
              {user.name || "ব্যবহারকারী"}
            </h3>

            <p className="max-w-35 truncate text-xs text-gray-500 md:max-w-40">
              {user.email}
            </p>
          </div>

          {/* Sign Out */}
          <button
            type="button"
            onClick={handleSignOut}
            title="সাইন আউট"
            aria-label="সাইন আউট"
            className="group flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600 transition-all duration-300 hover:bg-green-600 hover:text-white hover:shadow-md hover:shadow-green-200 sm:h-9 sm:w-9"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3-6l3 3m0 0l-3 3m3-3H9"
              />
            </svg>
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-white p-1 shadow-md sm:gap-2">
          {/* Sign In */}
          <Link
            href="/sign-in"
            className="rounded-full px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-700 sm:px-4 sm:text-sm"
          >
            সাইন ইন
          </Link>

          {/* Sign Up */}
          <Link
            href="/sign-up"
            className="rounded-full bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700 sm:px-4 sm:text-sm"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </>
  );
};

export default UserInfo;