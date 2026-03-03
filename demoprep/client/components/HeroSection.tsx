export function HeroSection() {
  return (
    <section className="w-full h-[982px] relative overflow-hidden bg-white">
      {/* Background Image */}
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/b16e2db84ff593019f6811e7b93ae4a8dd651004?width=3024"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay Text (first hero has text overlay) */}
      <div className="absolute left-[144px] top-[74px]">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/34780ea5503ba43d7c0f1d888d8390a22d28b640?width=2448"
          alt="Transcend Your Style"
          className="w-full max-w-[1224px] h-auto"
        />
      </div>
    </section>
  );
}

export function HeroSectionWithCTA() {
  return (
    <section className="w-full h-[982px] relative overflow-hidden bg-white">
      {/* Background Image */}
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/b16e2db84ff593019f6811e7b93ae4a8dd651004?width=3024"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* CTA Buttons */}
      <div className="absolute bottom-[67px] left-1/2 transform -translate-x-1/2 flex gap-[50px] flex-wrap justify-center px-4">
        <button className="w-[364px] h-[74px] flex items-center justify-center border border-white/50 bg-[rgba(217,217,217,0.1)] backdrop-blur-[5px] text-white text-2xl font-extralight hover:bg-white/20 transition-all">
          Shop All
        </button>
        <button className="w-[364px] h-[74px] flex items-center justify-center border border-white/50 bg-[rgba(217,217,217,0.1)] backdrop-blur-[5px] text-white text-2xl font-extralight hover:bg-white/20 transition-all">
          Enter Deity Black
        </button>
      </div>
    </section>
  );
}
