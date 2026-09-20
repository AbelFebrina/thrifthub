'use client';

import { Shirt, ShoppingCart, Crown, Sparkles, Footprints, ShoppingBag, Gem } from 'lucide-react';
import Link from 'next/link';

const categories = [
  { label: 'Atasan', slug: 'atasan', subtitle: 'T-shirt, Kaos, Polo', icon: Shirt },
  { label: 'Bawahan', slug: 'bawahan', subtitle: 'Denim, Chino, Cargo', icon: ShoppingCart },
  { label: 'Jaket & Outer', slug: 'outer', subtitle: 'Bomber, Hoodie, Parka', icon: Crown },
  { label: 'Dress', slug: 'dress', subtitle: 'Vintage, Maxi, Aline', icon: Sparkles },
  { label: 'Sepatu', slug: 'sepatu', subtitle: 'Sneakers, Boots', icon: Footprints },
  { label: 'Tas', slug: 'tas', subtitle: 'Tote, Backpack, Sling', icon: ShoppingBag },
  { label: 'Aksesoris', slug: 'aksesoris', subtitle: 'Topi, Belt, Kacamata', icon: Gem },
];

export default function CategorySection() {
  return (
    <section className="relative py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-2">
          <div>
            <p className="mb-1 text-xs font-semibold tracking-widest text-[#E17100] uppercase">KATEGORI PILIHAN</p>
            <h2 className="text-2xl font-bold text-neutral-900">Jelajahi per Kategori</h2>
          </div>
          <Link
            href="/produk"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#E17100] hover:text-[#E17100]/80 transition-colors cursor-pointer"
          >
            Lihat Semua
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={`/produk?kategori=${cat.slug}`}
              className="group flex flex-col items-center rounded-xl border p-4 text-center transition-all duration-200 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 hover:border-[#E17100]/50 border-neutral-200 bg-white"
            >
              <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-orange-50 group-hover:bg-[#E17100]/10 transition-colors duration-200">
                <cat.icon className="h-6 w-6 text-[#E17100] group-hover:scale-110 transition-transform duration-200" aria-hidden="true" />
              </div>
              <p className="text-sm font-semibold text-neutral-900 group-hover:text-[#E17100] transition-colors">{cat.label}</p>
              <p className="mt-0.5 text-xs text-neutral-500">{cat.subtitle}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
