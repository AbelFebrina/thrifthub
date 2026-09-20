'use client';

import { Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface FeaturedProduct {
  id: number;
  brand: string;
  name: string;
  description: string;
  originalPrice: number;
  salePrice: number;
  condition: string;
  store: string;
  rating: number;
  image: string;
}

const featuredProducts: FeaturedProduct[] = [
  { id: 1, brand: 'Premium Thrift', name: 'Leather Jacket Premium', description: 'Jaket leather asli vintage dengan detail authentic patina.', originalPrice: 450000, salePrice: 270000, condition: 'Like New', store: 'Elite Vintage', rating: 5.0, image: 'https://picsum.photos/seed/fp1/400/500' },
  { id: 2, brand: 'Street Heritage', name: 'Denim Omni Fit Jeans', description: 'Denim premium dengan potongan slim fit yang timeless.', originalPrice: 320000, salePrice: 192000, condition: 'Sangat Baik', store: 'Denim Corner', rating: 4.9, image: 'https://picsum.photos/seed/fp2/400/500' },
  { id: 3, brand: 'Retro Atelier', name: 'Canvas Sneaker Platform', description: 'Sneaker platform dengan desain retro dan sol tebal premium.', originalPrice: 280000, salePrice: 168000, condition: 'Like New', store: 'Sole Station', rating: 4.8, image: 'https://picsum.photos/seed/fp3/400/500' },
];

function formatIDR(num: number) {
  return `Rp ${num.toLocaleString('id-ID')}`;
}

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="mb-2 text-xs font-semibold tracking-widest text-[#E17100] uppercase">Produk Unggulan</p>
          <h2 className="relative inline-block font-display text-3xl font-bold text-white sm:text-4xl">
            Produk Pilihan
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#E17100]" aria-hidden="true" />
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl overflow-hidden">
              {/* Image */}
              <div className="relative aspect-[4/5]">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 bg-[#E17100] text-white text-xs font-bold rounded-full px-2 py-0.5">
                  {product.condition}
                </span>
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-xs text-[#E17100] font-medium">{product.brand}</p>
                <h3 className="text-base font-bold text-neutral-900 mt-0.5">{product.name}</h3>
                <p className="text-xs text-neutral-500 mt-1 line-clamp-2">{product.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-bold text-[#E17100]">{formatIDR(product.salePrice)}</span>
                  <span className="text-xs text-neutral-400 line-through">{formatIDR(product.originalPrice)}</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300'}`} />
                  ))}
                  <span className="text-xs text-neutral-400 ml-1">{product.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-10 text-center">
          <Link
            href="/produk"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 text-white px-6 py-2.5 text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Lihat Semua Produk <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

