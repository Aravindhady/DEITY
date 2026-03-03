import { ArrowUpRight } from "lucide-react";

export function ProductCategories() {
  const categories = [
    {
      name: "Unisex T-shirt",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/44383246268ece1516c7ea433486d7932fef38cd?width=1060",
      span: "row-span-2",
    },
    {
      name: "Jackets",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/71090b066028e1ae4e9d6e3465d7b9f4aefdbf90?width=726",
    },
    {
      name: "Cords",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/0acace9e8f69eda5463fbc87832d512c2b95f65e?width=726",
    },
    {
      name: "Accessories",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/61b89f8c199c5b5334a8d1b457b64b1d702ac24d?width=726",
    },
    {
      name: "Bottom Wear",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/ce79e349cfbadf83055ac362bfb1147882acfc7e?width=726",
    },
  ];

  return (
    <section className="w-full bg-white overflow-hidden py-12 lg:py-0 px-4 lg:px-[78px]">
      <div className="grid grid-cols-1 lg:grid-cols-[530px_1fr] gap-8 lg:gap-12">
        {/* Large Unisex T-shirt */}
        <div className="relative group cursor-pointer">
          <img
            src={categories[0].image}
            alt={categories[0].name}
            className="w-full aspect-[530/1008] object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
            <h3 className="text-3xl lg:text-[32px] font-normal">
              {categories[0].name}
            </h3>
            <ArrowUpRight className="w-10 h-10 lg:w-12 lg:h-12" strokeWidth={2} />
          </div>
        </div>

        {/* Right Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 auto-rows-max">
          {categories.slice(1).map((category) => (
            <div key={category.name} className="relative group cursor-pointer">
              <img
                src={category.image}
                alt={category.name}
                className="w-full aspect-[363/306] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
                <h3 className="text-2xl lg:text-[32px] font-normal">
                  {category.name}
                </h3>
                <ArrowUpRight className="w-10 h-10 lg:w-12 lg:h-12" strokeWidth={2} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductCategories;
