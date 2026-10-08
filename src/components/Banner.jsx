import Image from "next/image";
import Link from "next/link";
import React from "react";

const Banner = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return (
    <section className="overflow-hidden rounded-3xl bg-green-50">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-2 lg:px-10 lg:py-16">
        {/* Left Content */}
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-green-700">
            {date}
          </p>

          <h1 className="max-w-xl text-2xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-gray-600 sm:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          {/* CTA */}
          <Link
            href="#সব-পণ্য"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 font-semibold text-white shadow-lg shadow-red-200 transition hover:-translate-y-1 hover:bg-red-700"
          >
            সব পণ্য দেখুন
            <span>↓</span>
          </Link>
        </div>

        {/* Right Image */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl shadow-xl">
            <Image loading="lazy"
              src="/bazar-hero.png"
              alt="বাজারের পণ্য"
              width={700}
              height={500}
              className="h-64 w-full object-cover transition duration-500 hover:scale-105 sm:h-80 lg:h-95"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
