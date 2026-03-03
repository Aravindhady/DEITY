'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

export function HeroSection() {
  const { scrollY } = useScroll();

  // Logo animations
  const logoScale = useTransform(scrollY, [0, 200], [1, 0.8]);
  const logoY = useTransform(scrollY, [100, 300], [0, -150]);
  const logoOpacity = useTransform(scrollY, [150, 300], [1, 0]);

  // Button animations
  const buttonsOpacity = useTransform(scrollY, [200, 400], [0, 1]);
  const buttonsY = useTransform(scrollY, [200, 400], [50, 0]);

  return (
    <section className="w-full h-screen relative overflow-hidden bg-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/b16e2db84ff593019f6811e7b93ae4a8dd651004?width=3840"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Logo - Top Center */}
      <motion.div
        style={{ y: logoY, opacity: logoOpacity, scale: logoScale }}
        className="absolute inset-x-0 top-0 flex items-start justify-center pt-[80px] md:pt-[100px] lg:pt-[150px] z-10"
      >
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/ce8c81733e0b44e1212bc869b27316bbf45f4529?width=428"
          alt="DEITY"
          className="w-[50vw] md:w-[40vw] lg:w-[30vw] max-w-[600px] h-auto object-contain brightness-0 invert"
        />
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        style={{ opacity: buttonsOpacity, y: buttonsY }}
        className="absolute bottom-[50px] md:bottom-[67px] left-0 w-full flex gap-[15px] md:gap-[20px] lg:gap-[50px] flex-wrap justify-center px-4 z-30"
      >
        <Link href="/collections" className="w-[280px] md:w-[300px] lg:w-[364px] h-[50px] md:h-[60px] lg:h-[74px] flex items-center justify-center border border-white bg-black/20 backdrop-blur-md text-white text-lg md:text-xl lg:text-2xl font-light tracking-wide uppercase hover:bg-white hover:text-black transition-all duration-300">
          Shop All
        </Link>
        <Link href="/collections/deity-black" className="w-[280px] md:w-[300px] lg:w-[364px] h-[50px] md:h-[60px] lg:h-[74px] flex items-center justify-center border border-white bg-black/20 backdrop-blur-md text-white text-lg md:text-xl lg:text-2xl font-light tracking-wide uppercase hover:bg-white hover:text-black transition-all duration-300">
          Enter Deity Black
        </Link>
      </motion.div>
    </section>
  );
}

export default HeroSection;
