import Image from "next/image";

import Navliks from "./Navliks";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto container px-4">
        {/* Top section */}
        <div className="flex items-center justify-between py-4">
          {/* Logo + Date */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500 shadow-md shadow-green-200 transition-all duration-300 hover:-translate-y-1 hover:bg-green-600 hover:shadow-lg">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর"
                width={32}
                height={32}
                className="transition-transform duration-300 hover:scale-110"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-2xl font-bold">বাজার দর</span>

              {/* <CurrentDate /> */}
              {date}
            </div>
          </div>

          {/* Authentication */}
          <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white p-1 shadow-sm">
            <button className="rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-red-600">
              সাইন ইন
            </button>

            <button className="rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700">
              সাইন আপ
            </button>
          </div>
        </div>
        <Navliks />

        {/* Price ticker will come here */}
      </div>
    </header>
  );
};

export default Header;
