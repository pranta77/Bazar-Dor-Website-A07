
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";

const UNITS = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

const toBn = (value) =>
  Number(value).toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });

const ProductDetailPage = async ({ params }) => {
  // Login protection
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const { productId } = await params;

  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products/${productId}`,
    { cache: "no-store" }
  );

  if (res.status === 404) notFound();

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
  }

  const data = await res.json();
  const product = data.data ?? data;
//   console.log(product);
  

  if (!product || !product.id) notFound();

  // Actual market data from your API
  const markets = Array.isArray(product.markets)
    ? product.markets
    : [];

  const allPrices = markets.flatMap((market) =>
    [Number(market.min), Number(market.max)].filter(
      Number.isFinite
    )
  );

  const minPrice = allPrices.length
    ? Math.min(...allPrices)
    : null;

  const maxPrice = allPrices.length
    ? Math.max(...allPrices)
    : null;

  const avgPrice = allPrices.length
    ? allPrices.reduce((sum, price) => sum + price, 0) /
      allPrices.length
    : null;

  const unit = UNITS[product.unit] ?? product.unit;
  const change = product.change;

  const isUp = change?.dir === "up";
  const isDown = change?.dir === "down";

  return (
    <main className="min-h-screen bg-[#f0f5ef] px-3 py-5 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl space-y-4">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-900"
        >
          ← হোম পেজে ফিরে যান
        </Link>

        {/* Product summary */}
        <section className="flex flex-col gap-4 rounded-xl border border-[#e1e9e0] bg-[#fafcf9] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f0f5ef] text-3xl sm:h-16 sm:w-16 sm:text-4xl">
              {product.image || product.categoryIcon || "🛒"}
            </div>

            <div className="min-w-0">
              <h1 className="text-xl font-extrabold text-[#202b22] sm:text-2xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-600">
                প্রতি {unit}
              </p>

              <p className="mt-1 text-xs text-gray-600">
                গতকালের তুলনায় আজ দাম{" "}
                {isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত"}।
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800">
                  {product.categoryIcon} {product.categoryNameBn}
                </span>
              </div>
            </div>
          </div>

          <div className="shrink-0 rounded-xl bg-[#f0f5ef] px-5 py-3 sm:text-right">
            <p className="text-xs text-gray-500">আজকের দাম</p>

            <p className="mt-1 text-2xl font-extrabold text-[#202b22]">
              {toBn(product.today)} টাকা
            </p>

            <p className="text-xs text-gray-500">প্রতি {unit}</p>

            <p
              className={`mt-1 text-xs font-bold ${
                isUp
                  ? "text-green-700"
                  : isDown
                    ? "text-red-600"
                    : "text-gray-500"
              }`}
            >
              {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
              {toBn(Math.abs(Number(change?.pct) || 0).toFixed(1))}%
            </p>
          </div>
        </section>

        {/* Price summary */}
        <section className="rounded-xl border border-[#e1e9e0] bg-[#fafcf9] p-4 sm:p-5">
          <h2 className="mb-3 text-base font-bold text-[#202b22]">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <PriceSummary
              title="সর্বনিম্ন দাম"
              price={minPrice}
              unit={unit}
              color="green"
              description="সবচেয়ে কম দামের বাজার"
            />

            <PriceSummary
              title="সর্বোচ্চ দাম"
              price={maxPrice}
              unit={unit}
              color="red"
              description="সবচেয়ে বেশি দামের বাজার"
            />

            <PriceSummary
              title="গড় দাম"
              price={avgPrice}
              unit={unit}
              color="green"
              description="সব বাজারের গড় মূল্য"
            />
          </div>
        </section>

        {/* Market-wise prices */}
        <section className="rounded-xl border border-[#e1e9e0] bg-[#fafcf9] p-4 sm:p-5">
          <h2 className="mb-4 text-base font-bold text-[#202b22]">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {markets.length === 0 ? (
            <p className="rounded-xl border border-dashed border-gray-300 px-4 py-10 text-center text-sm text-gray-500">
              এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
            </p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-[#e1e9e0]">
              <table className="w-full min-w-150 border-collapse text-left text-sm">
                <thead className="bg-[#f3f7f2] text-xs text-gray-600">
                  <tr>
                    <th className="px-3 py-3 font-semibold">বাজার</th>
                    <th className="px-3 py-3 font-semibold">বিভাগ</th>
                    <th className="px-3 py-3 text-right font-semibold">
                      সর্বনিম্ন
                    </th>
                    <th className="px-3 py-3 text-right font-semibold">
                      সর্বোচ্চ
                    </th>
                    <th className="px-3 py-3 text-right font-semibold">
                      গড়
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, index) => {
                    const average =
                      (Number(market.min) + Number(market.max)) / 2;

                    return (
                      <tr
                        key={`${market.market}-${index}`}
                        className="border-t border-[#e1e9e0] hover:bg-green-50/50"
                      >
                        <td className="px-3 py-3 font-medium text-gray-800">
                          {market.market}
                        </td>

                        <td className="px-3 py-3 text-gray-600">
                          {market.division}
                        </td>

                        <td className="px-3 py-3 text-right text-gray-700">
                          {toBn(market.min)} টাকা
                        </td>

                        <td className="px-3 py-3 text-right text-gray-700">
                          {toBn(market.max)} টাকা
                        </td>

                        <td className="px-3 py-3 text-right font-bold text-[#202b22]">
                          {toBn(average)} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <p className="mt-3 text-xs text-gray-500">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </section>

        {/* Price history */}
        <section className="rounded-xl border border-[#e1e9e0] bg-[#fafcf9] p-4 sm:p-5">
          <h2 className="mb-3 text-base font-bold text-[#202b22]">
            আগের দামের তুলনা
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <PriceSummary
              title="গতকাল"
              price={product.yesterday}
              unit={unit}
              color="green"
              description="গতকালের দাম"
            />

            <PriceSummary
              title="গত সপ্তাহ"
              price={product.lastWeek}
              unit={unit}
              color="green"
              description="এক সপ্তাহ আগের দাম"
            />

            <PriceSummary
              title="গত মাস"
              price={product.lastMonth}
              unit={unit}
              color="green"
              description="এক মাস আগের দাম"
            />
          </div>
        </section>
      </div>
    </main>
  );
};

function PriceSummary({ title, price, unit, color, description }) {
  const priceColor =
    color === "red" ? "text-red-600" : "text-green-700";

  return (
    <div className="rounded-xl border border-[#e1e9e0] p-4">
      <p className="text-xs font-medium text-gray-600">{title}</p>

      <p className={`mt-1 text-xl font-extrabold ${priceColor}`}>
        {price == null || !Number.isFinite(Number(price))
          ? "—"
          : `${toBn(price)} টাকা`}
      </p>

      <p className="mt-1 text-xs text-gray-500">
        {price == null ? "তথ্য পাওয়া যায়নি" : `প্রতি ${unit}`}
      </p>

      <p className="mt-1 text-xs text-gray-500">{description}</p>
    </div>
  );
}

export default ProductDetailPage;
