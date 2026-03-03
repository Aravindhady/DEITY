import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import { CartDrawer } from './components/CartDrawer';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'DEITY - Refined Elegance and Quiet Strength',
  description: 'DEITY - Fashion brand symbolizing refined elegance and quiet strength',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
          <Toaster position="bottom-right" />
        </CartProvider>
      </body>
    </html>
  );
}
