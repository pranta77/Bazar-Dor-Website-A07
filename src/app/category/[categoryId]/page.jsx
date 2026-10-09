import { notFound } from "next/navigation";
import CategoryProducts from "@/components/CategoryProducts";

const CategoryDetailsPage = async ({ params }) => {
  const { categoryId } = await params;

  const categoryRes = await fetch(
    `${process.env.BACKEND_URL}/api/bazardor/categories`,
    {
      cache: "no-store",
    },
  );

  const categories = await categoryRes.json();

  const category = categories.find((item) => item.slug === categoryId);

  if (!category) {
    notFound();
  }

  const res = await fetch(
    `${process.env.BACKEND_URL}/api/bazardor/products?category=${categoryId}`,
    {
      cache: "no-store",
    },
  );

  const data = await res.json();

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 bg-base-300 rounded-xl p-2">
          <span className="text-4xl">{category.icon}</span>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {category.nameBn}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              মোট {data.length} টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </div>

      <CategoryProducts products={data} />
    </main>
  );
};

export default CategoryDetailsPage;
