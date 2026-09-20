import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatsBar from '@/components/landingpage/StatsBar';
import CategorySection from '@/components/landingpage/CategorySection';
import FlashSaleSection from '@/components/landingpage/FlashSaleSection';
import LatestProductsSection from '@/components/LatestProductsSection';
import FeaturedProductsSection from '@/components/FeaturedProductsSection';
import TestimonialSection from '@/components/TestimonialSection';
import FeaturedStoresSection from '@/components/FeaturedStoresSection';
import NewsletterBar from '@/components/NewsletterBar';
import SellerCTASection from '@/components/SellerCTASection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream font-sans antialiased">
      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        <CategorySection />
        <FlashSaleSection />
        <LatestProductsSection />
        <FeaturedProductsSection />
        <TestimonialSection />
        <FeaturedStoresSection />
        <NewsletterBar />
        <SellerCTASection />
        <Footer />
      </main>
    </div>
  );
}

