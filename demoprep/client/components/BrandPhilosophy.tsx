export function BrandPhilosophy() {
  return (
    <section className="w-full bg-deity-dark overflow-hidden relative min-h-[1213px] py-12 lg:py-0 px-4 lg:px-[108px]">
      {/* Brand Description */}
      <div className="relative z-10 max-w-[786px] pt-12 lg:pt-[150px] mb-12 lg:mb-[68px]">
        <p className="text-white text-xl leading-relaxed">
          Deity is where elegance meets quiet strength. Every piece is crafted with intention — 
          refined, timeless, and effortlessly superior. We believe true luxury lies in restraint; 
          in the way subtle details speak louder than excess. Our designs move beyond trends, 
          embracing purity in form and purpose. Each silhouette captures a balance of power and grace, 
          created for those who understand that sophistication isn't shown — it's felt. Deity is not 
          about being seen; it's about being remembered, softly yet completely.
        </p>
      </div>

      {/* Image */}
      <div className="relative z-10 mb-12 lg:mb-0">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/ca2ed56d48d08d91788a4bc27ad321d8f6416228?width=806"
          alt="Brand Philosophy"
          className="w-full max-w-[403px] h-auto object-cover"
        />
      </div>

      {/* Asterisk Decorations */}
      <div className="absolute right-0 lg:right-[150px] top-[193px] pointer-events-none">
        <span className="font-joti text-deity-green text-[clamp(200px,25vw,600px)] leading-none">
          *
        </span>
      </div>
      <div className="absolute right-0 lg:right-[50px] bottom-[200px] lg:bottom-[150px] pointer-events-none">
        <span className="font-joti text-white text-[clamp(150px,20vw,400px)] leading-none">
          *
        </span>
      </div>

      {/* Supremacy Section */}
      <div className="absolute left-4 lg:left-[561px] bottom-[200px] lg:bottom-[285px] max-w-[460px] z-10">
        <h3 className="text-white text-5xl font-semibold mb-6">Supremacy</h3>
        <p className="text-white text-xl leading-relaxed">
          Deity is not just about the product — it's about the experience. The luxury, the elegance, 
          and the unmistakable Deity look you embody while wearing it are truly unmatchable.
        </p>
      </div>

      {/* Since 2024 */}
      <div className="absolute right-4 lg:right-[150px] bottom-[100px] lg:bottom-[150px] z-10">
        <div className="relative">
          <span className="text-white font-bold text-[clamp(64px,10vw,128px)] leading-none block">
            24
          </span>
          <span className="text-white font-bold text-[clamp(64px,10vw,128px)] leading-none block -mt-8 lg:-mt-12 -ml-4 lg:-ml-8">
            20
          </span>
        </div>
      </div>
    </section>
  );
}
