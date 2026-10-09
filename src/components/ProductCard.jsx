import Link from "next/link";
const toBn = (n) => Number(n).toLocaleString("bn-BD");

const UNITS = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

function ChangeBadge({ change }) {
    // console.log(change);
    
  if (!change || change.dir === "flat") {
    return (
      <span className="shrink-0 rounded-full bg-gray-100 px-2 py-1 text-[10px] font-semibold text-gray-500">
        — ০.০%
      </span>
    );
  }

  const up = change.dir === "up";

  return (
    <span
      className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${
        up
          ? "bg-red-50 text-red-600"
          : "bg-green-50 text-green-600"
      }`}
    >
      {up ? "▲" : "▼"}{" "}
      {toBn(Math.abs(Number(change.pct) || 0).toFixed(1))}%
    </span>
  );
}

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/product/${product.id}`}
      aria-label={`${product.nameBn} পণ্যের বিস্তারিত দেখুন`}
      className="group block rounded-xl border border-[#e1e9e0] bg-[#fafcf9] p-3 transition duration-200 hover:border-green-300 hover:shadow-sm sm:p-3.5"
    >
      <div className="flex items-center gap-2.5">
        {/* Small emoji box */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f5ef] text-xl transition group-hover:scale-105">
          {product.image || "🛒"}
        </div>

        {/* Name and unit */}
        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold text-[#202b22]">
            {product.nameBn}
          </h3>

          <p className="mt-0.5 text-[10px] text-gray-500">
            প্রতি {UNITS[product.unit] ?? product.unit}
          </p>
        </div>
      </div>

      {/* Price and change badge */}
      <div className="mt-2.5 flex items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[10px] text-gray-500">
            আজকের দাম
          </p>

          <p className="mt-0.5 text-sm font-bold text-[#202b22]">
            {toBn(product.today)}{" "}
            <span className="text-[11px] font-medium">টাকা</span>
          </p>
        </div>

        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
}