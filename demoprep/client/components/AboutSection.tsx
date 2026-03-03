export function AboutSection() {
  return (
    <section className="w-full bg-deity-dark overflow-hidden relative min-h-[1115px] py-12 lg:py-0 px-4 lg:px-[108px]">
      {/* Images */}
      <div className="relative pt-12 lg:pt-[150px]">
        {/* Left Small Image */}
        <div className="mb-8 lg:mb-0">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/9526c63ea52c966348d9766359752a810f52a2ba?width=836"
            alt="About Deity"
            className="w-full max-w-[418px] h-auto object-cover"
          />
        </div>

        {/* Right Large Image */}
        <div className="lg:absolute lg:left-[566px] lg:top-[150px]">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/e906d024f07afeefb0d25d562d7c6ddf5c743978?width=1676"
            alt="About Deity Brand"
            className="w-full max-w-[838px] h-auto object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mt-12 lg:mt-0 lg:absolute lg:left-[108px] lg:top-[723px] max-w-full">
        <h2 className="text-white text-7xl lg:text-[72px] font-normal mb-12 lg:mb-[50px]">
          About Us
        </h2>
        
        <div className="lg:absolute lg:left-[458px] lg:top-[50px] max-w-[786px]">
          <p className="text-white text-xl leading-relaxed mb-8">
            Creating a fashion revolution since 2024, Deity stands as a symbol of refined elegance 
            and quiet strength. Every creation embodies sophistication that transcends trends, 
            capturing the essence of modern divinity in its purest form. At Deity, we believe true 
            style lies in presence, not excess. Each piece is a reflection of minimal perfection — 
            where design meets emotion, and simplicity meets superiority. Wearing Deity isn't about 
            following fashion; it's about defining it. Because with Deity, you don't just wear clothing — 
            you wear confidence, grace, and an unspoken aura of distinction.
          </p>
          
          <button className="text-deity-green-light text-xl font-bold hover:opacity-70 transition-opacity">
            Explore More
          </button>
        </div>
      </div>
    </section>
  );
}
