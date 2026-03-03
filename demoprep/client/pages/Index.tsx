import { Header } from "@/components/Header";
import { HeroSection, HeroSectionWithCTA } from "@/components/HeroSection";
import { NewArrivals } from "@/components/NewArrivals";
import { ProductCategories } from "@/components/ProductCategories";
import { GenderSection } from "@/components/GenderSection";
import { DeityImageSection } from "@/components/DeityImageSection";
import { BrandPhilosophy } from "@/components/BrandPhilosophy";
import { BlogsSection } from "@/components/BlogsSection";
import { AboutSection } from "@/components/AboutSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Footer } from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Main Content */}
      <main>
        {/* First Hero - with text overlay */}
        <HeroSection />
        
        {/* New Arrivals Section */}
        <NewArrivals />
        
        {/* Product Categories Grid */}
        <ProductCategories />
        
        {/* Gender Section - Be The God You Seek */}
        <GenderSection />

        {/* Deity Brand Image */}
        <DeityImageSection />

        {/* Brand Philosophy - with asterisks */}
        <BrandPhilosophy />
        
        {/* Blogs Section */}
        <BlogsSection />
        
        {/* Second Hero - with CTA buttons */}
        <HeroSectionWithCTA />
        
        {/* About Us Section */}
        <AboutSection />
        
        {/* Newsletter/CTA Section */}
        <NewsletterSection />
      </main>
      
      <Footer />
    </div>
  );
}
