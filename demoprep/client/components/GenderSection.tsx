import { ArrowUpRight } from "lucide-react";

export function GenderSection() {
  return (
    <section className="w-full bg-white overflow-hidden relative min-h-[1127px] py-12 lg:py-0">
      {/* Large Typography Background */}
      <div className="absolute right-0 top-0 lg:left-[248px] lg:top-[-1px] pointer-events-none z-0">
        <h2 className="text-deity-green text-right font-black text-[clamp(80px,15vw,250px)] leading-[95%] uppercase">
          Be The
          <br />
          God
          <br />
          You Seek
        </h2>
      </div>

      {/* Outlined Text */}
      <div 
        className="absolute right-0 lg:left-[248px] top-[443px] pointer-events-none z-0"
        style={{
          WebkitTextStroke: '3px rgba(2, 56, 22, 0.12)',
          color: 'transparent'
        }}
      >
        <h2 className="text-right font-black text-[clamp(80px,15vw,250px)] leading-normal uppercase">
          You Seek
        </h2>
      </div>

      {/* Images */}
      <div className="relative z-10 px-4 lg:px-0">
        {/* Divine Masculine */}
        <div className="absolute left-4 lg:left-[235px] top-[150px] flex flex-col gap-11">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/761e65a907e50e46ab4ccec695424cdcbdc1b233?width=806"
            alt="Divine Masculine"
            className="w-full max-w-[403px] h-auto"
          />
          <div className="flex justify-between items-end">
            <span className="text-black text-xl font-semibold underline uppercase">
              Divine Masculine
            </span>
            <ArrowUpRight className="w-[30px] h-[30px]" strokeWidth={2.5} />
          </div>
        </div>

        {/* Divine Feminine */}
        <div className="absolute right-4 lg:right-[235px] top-[301px] flex flex-col gap-[50px]">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/8c2800af79a61c9b6c17a9d0bf293a0c91f53e36?width=806"
            alt="Divine Feminine"
            className="w-full max-w-[403px] h-auto"
          />
          <div className="flex justify-between items-end">
            <span className="text-black text-xl font-semibold underline uppercase">
              Divine Feminine
            </span>
            <ArrowUpRight className="w-[30px] h-[30px]" strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </section>
  );
}
