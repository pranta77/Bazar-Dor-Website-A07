import ProductSection from "./ProductSection";

const Products = async () => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/bazardor/products`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();

  // Section A: Top 6 products whose prices increased
  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // Section B: Top 6 products whose prices decreased
  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#f1f5ee]">
      {/* Section A: Price Increases */}
      <ProductSection
        title="আজ দাম বেড়েছে"
        subtitle="আজ যেসব পণ্যের দাম সবচেয়ে বেশি বেড়েছে।"
        products={risers}
        icon="▲"
      />

      {/* Section B: Price Decreases */}
      <ProductSection
        title="আজ দাম কমেছে"
        subtitle="আজ যেসব পণ্যের দাম সবচেয়ে বেশি কমেছে।"
        products={fallers}
        icon="▼"
      />

      {/* Section C: All Products */}
      <section id="সব-পণ্য" className="scroll-mt-24">
        <ProductSection
          title="সব পণ্য"
          subtitle="আপনার প্রয়োজনীয় সব পণ্যের আজকের বাজারদর এক নজরে দেখুন।"
          products={products}
          icon="🛒"
        />
      </section>
    </main>
  );
};

export default Products;