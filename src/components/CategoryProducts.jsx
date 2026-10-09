// "use client";

// import { useState } from "react";
// import Link from "next/link";

// const toBn = (n) => Number(n).toLocaleString("bn-BD");

// const UNITS = {
//   kg: "কেজি",
//   litre: "লিটার",
//   dozen: "ডজন",
//   piece: "পিস",
// };

// function ChangeBadge({ change }) {
//   if (change.dir === "flat") {
//     return (
//       <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500">
//         — ০.০%
//       </span>
//     );
//   }

//   const up = change.dir === "up";

//   return (
//     <span
//       className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
//         up ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
//       }`}
//     >
//       {up ? "▲" : "▼"} {toBn(Math.abs(change.pct).toFixed(1))}%
//     </span>
//   );
// }

// const CategoryProducts = ({ products }) => {
//   const [sort, setSort] = useState("default");

//   if (products.length === 0) {
//     return (
//       <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
//         <div className="text-6xl">🛒</div>

//         <h2 className="mt-4 text-2xl font-bold text-gray-900">
//           কোনো পণ্য পাওয়া যায়নি
//         </h2>

//         <p className="mt-2 text-sm text-gray-500">
//           এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
//         </p>

//         <Link
//           href="/"
//           className="mt-6 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
//         >
//           হোম পেজে ফিরে যান
//         </Link>
//       </div>
//     );
//   }

//   const sortedProducts = [...products].sort((a, b) => {
//     if (sort === "low") {
//       return Number(a.today) - Number(b.today);
//     }

//     if (sort === "high") {
//       return Number(b.today) - Number(a.today);
//     }

//     return 0;
//   });

//   return (
//     <>
//       {/* Sort */}
//       <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//         <p className="text-sm text-gray-500">
//           মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে
//         </p>

//         <div className="flex items-center gap-2 rounded-xl  ">
//           <label htmlFor="sort" className="text-sm font-medium text-gray-700">
//             সাজান:
//           </label>

//           <select
//             id="sort"
//             value={sort}
//             onChange={(e) => setSort(e.target.value)}
//             className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
//           >
//             <option value="default">ডিফল্ট</option>
//             <option value="low">দাম: কম থেকে বেশি</option>
//             <option value="high">দাম: বেশি থেকে কম</option>
//           </select>
//         </div>
//       </div>

//       {/* Product Cards */}
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//         {sortedProducts.map((product) => (
//           <Link
//             key={product.id}
//             href={`/product/${product.id}`}
//             className="group rounded-2xl border border-gray-200 bg-[#f9fbf8] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
//           >
//             {/* Product */}
//             <div className="flex items-center gap-3">
//               <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-2xl transition-transform duration-300 group-hover:scale-105">
//                 {product.image}
//               </div>

//               <div className="min-w-0">
//                 <h3 className="truncate text-lg font-semibold leading-tight text-gray-900">
//                   {product.nameBn}
//                 </h3>

//                 <p className="mt-1 text-xs text-gray-500">
//                   প্রতি {UNITS[product.unit] ?? product.unit}
//                 </p>
//               </div>
//             </div>

//             {/* Price */}
//             <p className="mt-4 text-xs text-gray-600">আজকের দাম</p>

//             <div className="mt-1 flex items-center justify-between gap-3">
//               <p className="text-xl font-bold text-gray-900">
//                 {toBn(product.today)}{" "}
//                 <span className="text-sm font-medium">টাকা</span>
//               </p>

//               <ChangeBadge change={product.change} />
//             </div>
//           </Link>
//         ))}
//       </div>
//     </>
//   );
// };

// export default CategoryProducts;
