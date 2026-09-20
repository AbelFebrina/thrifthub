'use client';

import { ShoppingCart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const stores = [
  { name: 'Malang Vintage', rating: 4.9, verified: 128, image: 'https://picsum.photos/seed/ts1/200/200' },
  { name: 'Denim Corner', rating: 4.8, verified: 95, image: 'https://picsum.photos/seed/ts2/200/200' },
  { name: 'Retro Closet', rating: 4.7, verified: 87, image: 'https://picsum.photos/seed/ts3/200/200' },
  { name: 'Street Lab', rating: 4.9, verified: 112, image: 'https://picsum.photos/seed/ts4/200/200' },
  { name: 'Thrift Hub Malang', rating: 4.6, verified: 76, image: 'https://picsum.photos/seed/ts5/200/200' },
];

export default function VerifiedStores() {
  return (
    <section className="py-16 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Toko Terverifikasi Malang</h2>
            <p className="text-sm text-slate-400 mt-1">Seller terkurasi dengan rating tinggi, produk berkualitas & layanan terpercaya.</p>
          </div>
          <Link
            href="/toko"
            className="inline-flex items-center gap-2 rounded-lg border border-white/30 text-white px-4 py-2 text-sm hover:bg-white/10 transition-colors"
          >
            Lihat Semua Toko →
          </Link>
        </div>

        {/* Store Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {stores.map((store) => (
            <div key={store.name} className="bg-slate-800 rounded-xl p-4 text-center">
              <div className="mx-auto w-14 h-14 rounded-full overflow-hidden mb-3 border-2 border-slate-700">
                <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-sm font-bold text-white">{store.name}</p>
              <p className="text-xs text-yellow-400 mt-0.5">⭐ {store.rating}</p>
              <span className="inline-block mt-1 bg-green-600/20 text-green-400 text-[10px] font-medium rounded-full px-2 py-0.5">
                ✅ Terverifikasi {store.verified} pcs
              </span>
              <Link
                href={`/toko/${store.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="block mt-2 bg-[#E17100] text-white rounded-lg py-1.5 text-xs font-semibold hover:bg-orange-600 transition-colors"
              >
                Kunjungi Toko →
              </Link>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="bg-slate-800 rounded-xl p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex-1">
            <p className="text-white font-medium text-sm">Dapatkan update drop terbaru, promo eksklusif, & tips thrift.</p>
            <p className="text-sm text-slate-500 mt-1">Bergabung dengan 10.000+ thrifter Malang. No spam, unsubscribe kapan saja.</p>
          </div>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email kamu"
              className="bg-slate-700 border-none rounded-lg px-4 py-2.5 text-white placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#E17100]/30 w-64"
              aria-label="Email untuk newsletter"
            />
            <button className="bg-[#E17100] text-white rounded-lg px-4 py-2.5 text-sm font-semibold hover:bg-orange-600 transition-colors">
              Kirim
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

