
import ProductCard from "./ProductCard";

const ProductSection = ({ title, subtitle, products, icon }) => {
  return (
    <section className="py-10 sm:py-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            {title}
            <span>{icon}</span>
          </h2>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            {subtitle}
          </p>
        </div>

        {products.length === 0 ? (
          <p className="rounded-xl bg-white p-6 text-center text-gray-500">
            এই মুহূর্তে কোনো পণ্য পাওয়া যায়নি।
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;
