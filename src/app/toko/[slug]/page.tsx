import { ShoppingBag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TokoDetailPage() {
  return (
    <div className="min-h-screen bg-cream font-sans antialiased">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-[#221e1a] mb-2">Detail Toko</h1>
          <p className="text-[#a09080] text-sm mb-8">Informasi toko akan ditampilkan di sini.</p>
          <div className="bg-white rounded-xl border border-[#e8dcc8] p-8 text-center">
            <ShoppingBag className="h-16 w-16 text-[#b8895a] mx-auto mb-4" />
            <h2 className="font-display text-xl font-bold text-[#3e3028]">Halaman Toko</h2>
            <p className="text-[#a09080] text-sm mt-2">Detail toko akan dimuat di sini.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
