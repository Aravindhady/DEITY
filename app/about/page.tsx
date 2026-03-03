import AboutHero from '@/app/components/about/AboutHero';
import AboutContent from '@/app/components/about/AboutContent';
import FeaturedCategories from '@/app/components/about/FeaturedCategories';

export default function AboutPage() {
  return (
    <div className="pt-16">
      <AboutHero />
      <AboutContent />
      <FeaturedCategories />
    </div>
  );
}
