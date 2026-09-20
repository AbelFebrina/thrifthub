import Navbar from '@/components/Navbar';
import CatalogPage from '@/components/CatalogPage';
import Footer from '@/components/Footer';

export default function ProdukPage() {
  return (
    <div className="min-h-screen bg-cream font-sans antialiased">
      <Navbar />
      <CatalogPage />
      <Footer />
    </div>
  );
}
