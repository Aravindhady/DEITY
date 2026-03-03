export function BlogsSection() {
  return (
    <section className="w-full bg-black overflow-hidden py-12 lg:py-[100px] px-4 lg:px-[62px]">
      <div className="relative">
        {/* Header */}
        <div className="flex justify-between items-start mb-12 lg:mb-[97px] flex-wrap gap-4">
          <h2 className="text-white text-right font-semibold text-[clamp(80px,15vw,200px)] leading-none uppercase">
            BLOGS
          </h2>
          <span className="text-[#D9D9D9] text-xl font-semibold uppercase self-end">
            Explore MORE&gt;
          </span>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[30px]">
          {/* Blog Post 1 */}
          <div className="group cursor-pointer">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/bc750eee33ae44cdbbb29e7782c245bb33617b37?width=1358"
              alt="The Deity Stall"
              className="w-full aspect-[679/385] object-cover mb-6 lg:mb-[50px]"
            />
            <div className="flex flex-col gap-4">
              <h3 className="text-white text-right font-semibold text-5xl lg:text-[64px] uppercase leading-tight">
                THE DEITY STALL
              </h3>
              <div className="flex justify-between items-center">
                <p className="text-white text-right font-light text-3xl lg:text-[40px] uppercase">
                  THE TRUST
                </p>
                <span className="text-[#D9D9D9] text-xl font-semibold uppercase">
                  Explore MORE&gt;
                </span>
              </div>
            </div>
          </div>

          {/* Blog Post 2 */}
          <div className="group cursor-pointer">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/292eb4b1d30ca1b4ae20855ec605667e6e9bfe61?width=1358"
              alt="The Review"
              className="w-full aspect-[679/385] object-cover mb-6 lg:mb-[50px]"
            />
            <div className="flex flex-col gap-4">
              <h3 className="text-white text-right font-semibold text-5xl lg:text-[64px] uppercase leading-tight">
                THE REVIEW
              </h3>
              <div className="flex justify-between items-center">
                <p className="text-white text-right font-light text-3xl lg:text-[40px] uppercase">
                  It Peaked Here
                </p>
                <span className="text-[#D9D9D9] text-xl font-semibold uppercase">
                  Explore MORE&gt;
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
