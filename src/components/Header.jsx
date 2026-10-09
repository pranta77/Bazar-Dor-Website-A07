import Image from "next/image";
import Navliks from "./Navliks";
import Link from "next/link";
import UserInfo from "./UserInfo";

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
              {date}
            </div>
          </div>
          <UserInfo />
        </div>
        <Navliks />
      </div>
    </header>
  );
};

export default Header;
