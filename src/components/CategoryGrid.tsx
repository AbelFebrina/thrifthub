'use client';

import Link from 'next/link';
import {
  Shirt,
  Briefcase,
  Footprints,
  ShoppingBag,
  Gem,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

const categories = [
  { slug: 'atasan', label: 'Atasan', icon: Shirt },
  { slug: 'bawahan', label: 'Bawahan', icon: Briefcase },
  { slug: 'outerwear', label: 'Jaket & Outer', icon: Sparkles },
  { slug: 'dress', label: 'Dress', icon: ShoppingBag },
  { slug: 'sepatu', label: 'Sepatu', icon: Footprints },
  { slug: 'tas', label: 'Tas', icon: ShoppingBag },
  { slug: 'aksesoris', label: 'Aksesoris', icon: Gem },
];

export default function CategoryGrid() {
  return (
    <section id="kategori" className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-center justify-between">
          <div className="text-center sm:text-left">
            <p className="mb-2 text-sm font-semibold tracking-widest text-amber-600 uppercase">Kategori Pilihan</p>
            <h2 className="font-display text-3xl font-bold text-neutral-900 sm:text-4xl">Jelajahi per Kategori</h2>
          </div>
          <Link
            href="#produk"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
          >
            Lihat Semua
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`#produk?kategori=${cat.slug}`}
              className="group flex flex-col items-center gap-3 rounded-2xl p-6 bg-neutral-50 border border-neutral-200 hover:border-amber-300 hover:shadow-lg hover:bg-white transition-all duration-300"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-100 group-hover:scale-105 transition-all duration-300">
                <cat.icon className="h-8 w-8" aria-hidden="true" />
              </div>
              <span className="text-center font-medium text-neutral-900 group-hover:text-amber-600 transition-colors">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link
            href="#produk"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
          >
            Lihat Semua
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
