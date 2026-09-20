import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TokoPage() {
  return (
    <div className="min-h-screen bg-cream font-sans antialiased">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-[#221e1a] mb-2">Semua Toko</h1>
          <p className="text-[#a09080] text-sm mb-8">Temukan toko thrift favoritmu di Malang.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Thrift Station', location: 'Malang', items: 120, img: 'https://i.pravatar.cc/400x250?img=1' },
              { name: 'Vintage Bliss', location: 'Kedungkandang', items: 85, img: 'https://i.pravatar.cc/400x250?img=2' },
              { name: 'Rag Shop', location: 'Lowokwaru', items: 200, img: 'https://i.pravatar.cc/400x250?img=3' },
              { name: 'Second Style', location: 'Blimbing', items: 60, img: 'https://i.pravatar.cc/400x250?img=4' },
              { name: 'Preloved Corner', location: 'Singosari', items: 95, img: 'https://i.pravatar.cc/400x250?img=5' },
              { name: 'Thrift ID', location: 'Batu', items: 150, img: 'https://i.pravatar.cc/400x250?img=6' },
            ].map((toko) => (
              <Link key={toko.name} href={`/toko/${toko.name.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white rounded-xl border border-[#e8dcc8] overflow-hidden hover:shadow-md transition-shadow group">
                <img src={toko.img} alt={toko.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="p-4">
                  <p className="font-display font-bold text-[#221e1a]">{toko.name}</p>
                  <p className="text-[10px] text-[#a09080] mt-0.5">{toko.location}</p>
                  <p className="text-[10px] text-[#8a5a2b] font-medium mt-1">{toko.items} produk</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

