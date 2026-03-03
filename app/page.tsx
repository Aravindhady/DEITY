import { HeroSection } from './components/home/HeroSection';
import GenderSection from './components/home/GenderSection';
import CategoriesSection from './components/home/CategoriesSection';
import NewArrivalsSection from './components/home/NewArrivalsSection';
import AboutSection from './components/home/AboutSection';
import LimitedEditionsSection from './components/home/LimitedEditionsSection';
import SupremacySection from './components/home/SupremacySection';
import BlogsSection from './components/home/BlogsSection';
import TranscendStyleSection from './components/home/TranscendStyleSection';
import NewsletterSection from './components/home/NewsletterSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Be The God You Seek Section */}
      <GenderSection />

      {/* 3. Product Categories - Unisex T-shirt grid */}
      <CategoriesSection />

      {/* 4. New Arrivals Section */}
      <NewArrivalsSection />

      {/* 5. About Us Section */}
      <AboutSection />

      {/* 6. Limited Editions - 3 Product Categories */}
      <LimitedEditionsSection />

      {/* 7. Supremacy Section */}
      <SupremacySection />

      {/* 8. Blogs Section */}
      <BlogsSection />

      {/* 9. Transcend Your Style Section */}
      <TranscendStyleSection />

      {/* 10. Newsletter - Unlock Exclusive Drops */}
      <NewsletterSection />
    </div>
  );
}
