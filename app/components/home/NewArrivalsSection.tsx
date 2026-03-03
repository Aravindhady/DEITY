export function NewArrivals() {
  const products = [
    {
      id: 1,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/845d9ec6dc8ed7ce7c26d679e7bcff838fe9568c?width=646",
      name: "Product Name",
      price: "$999",
    },
    {
      id: 2,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/fbe47e47ab8fa99ec02b41a905515ed69259b5e7?width=646",
      name: "Product Name",
      price: "$999",
    },
    {
      id: 3,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/99c728a7feeca223329fb263b764503ac040bad8?width=646",
      name: "Product Name",
      price: "$999",
    },
  ];

  return (
    <section className="w-full bg-white overflow-hidden py-12 lg:py-[150px] px-4 lg:px-[108px]">
      {/* Section Title */}
      <h2 className="text-6xl lg:text-[64px] font-medium mb-8 lg:mb-12">
        New
        <br />
        Arrival
      </h2>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {products.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            {/* Product Image */}
            <div className="relative overflow-hidden mb-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-[323/508] object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Info */}
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-semibold">{product.name}</h3>
              <span className="text-2xl font-semibold text-deity-red">
                {product.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NewArrivals;