import Link from "next/link";

const Navliks = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/bazardor/categories`);
  const data = await res.json();

  return (
    <nav className="border-t border-gray-100">
      <div className="mx-auto max-w-7xl overflow-x-auto px-2 py-3 sm:px-4">
        <div className="flex min-w-max items-center justify-start gap-2 sm:justify-center sm:gap-3">
          <Link href={"/"}>হোম</Link>
          {data?.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-red-50 hover:text-red-600 sm:px-4"
            >
              <span className="text-base">{category.icon}</span>

              <span className="whitespace-nowrap">{category.nameBn}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navliks;
