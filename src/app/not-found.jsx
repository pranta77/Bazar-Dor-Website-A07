import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-6 text-7xl">🛒</div>

        <h1 className="text-6xl font-extrabold text-red-600">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          পেজটি খুঁজে পাওয়া যায়নি
        </h2>

        <p className="mx-auto mt-3 max-w-md text-gray-500">
          দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে
          অথবা ঠিকানাটি ভুল হয়েছে।
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
};

export default NotFound;