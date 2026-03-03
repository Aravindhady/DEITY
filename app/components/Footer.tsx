'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-white overflow-hidden relative h-[755px] border-t border-gray-100">
      {/* Large Deity Text - Full Screen Width */}
      <div className="absolute inset-x-0 top-[335px] flex items-center justify-center pointer-events-none px-4">
        <h2 className="font-imprima text-[clamp(120px,35vw,800px)] leading-none uppercase text-black select-none whitespace-nowrap">
          Deity
        </h2>
      </div>

      {/* Top Section with Divider and Social Icons */}
      <div className="absolute left-0 right-0 top-[198px] px-8 lg:px-[33px]">
        <div className="h-px bg-black w-full max-w-[1445px] mx-auto" />
      </div>

      {/* Social Icons */}
      <div className="absolute top-[100px] left-1/2 transform -translate-x-1/2 flex items-center gap-10">
        {/* Instagram */}
        <a href="#" className="hover:opacity-70 transition-opacity" aria-label="Instagram">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 22C6 14.458 6 10.686 8.344 8.344C10.688 6.002 14.458 6 22 6H26C33.542 6 37.314 6 39.656 8.344C41.998 10.688 42 14.458 42 22V26C42 33.542 42 37.314 39.656 39.656C37.312 41.998 33.542 42 26 42H22C14.458 42 10.686 42 8.344 39.656C6.002 37.312 6 33.542 6 26V22Z" stroke="black" strokeWidth="3" />
            <path d="M33 18C34.6569 18 36 16.6569 36 15C36 13.3431 34.6569 12 33 12C31.3431 12 30 13.3431 30 15C30 16.6569 31.3431 18 33 18Z" fill="black" />
            <path d="M24 31C27.866 31 31 27.866 31 24C31 20.134 27.866 17 24 17C20.134 17 17 20.134 17 24C17 27.866 20.134 31 24 31Z" stroke="black" strokeWidth="3" />
          </svg>
        </a>

        {/* Twitter/X */}
        <a href="#" className="hover:opacity-70 transition-opacity" aria-label="Twitter">
          <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.235 17.753L35.8925 2.5625H32.8925L21.905 15.7517L13.125 2.5625H3L16.275 22.509L3 38.4375H6L17.605 24.5077L26.8775 38.4375H37.0025L23.235 17.753ZM19.1275 22.6833L17.7825 20.6973L7.08 4.89437H11.6875L20.3225 17.6479L21.6675 19.6339L32.895 36.2132H28.2875L19.1275 22.6833Z" fill="black" />
          </svg>
        </a>
      </div>

      {/* Footer Links - Above DEITY Text */}
      <div className="absolute top-[220px] left-0 right-0 px-4 lg:px-8">
        <div className="flex items-center gap-4 lg:gap-10 xl:gap-16 flex-wrap justify-center text-xs font-semibold uppercase">
          <span className="text-black">© 2025, Deity</span>
          <Link href="/refund-policy" className="text-black hover:opacity-70 transition-opacity">
            Refund policy
          </Link>
          <Link href="/privacy-policy" className="text-black hover:opacity-70 transition-opacity">
            Privacy policy
          </Link>
          <Link href="/terms-of-service" className="text-black hover:opacity-70 transition-opacity">
            terms of service
          </Link>
          <Link href="/shipping-policy" className="text-black hover:opacity-70 transition-opacity">
            Shipping Policy
          </Link>
          <Link href="/contact" className="text-black hover:opacity-70 transition-opacity">
            contact information
          </Link>
        </div>
      </div>
    </footer>
  );
}
