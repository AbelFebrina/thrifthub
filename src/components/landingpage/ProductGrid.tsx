'use client';

import { Heart, Star, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: number;
  brand: string;
  name: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  condition: string;
  store: string;
  location: string;
  rating: number;
  sold: number;
  image: string;
}

const products: Product[] = [
  { id: 1, brand: 'Urban Thrift', name: 'Oversized Hoodie Vintage', originalPrice: 220000, salePrice: 110000, discount: 50, condition: 'Like New', store: 'Urban Store', location: 'Klojen', rating: 4.8, sold: 34, image: 'https://picsum.photos/seed/pg1/400/500' },
  { id: 2, brand: 'Retro Lab', name: 'Levi 501 Retro Fit', originalPrice: 280000, salePrice: 168000, discount: 40, condition: 'Sangat Baik', store: 'Denim Corner', location: 'Lowokwaru', rating: 4.9, sold: 21, image: 'https://picsum.photos/seed/pg2/400/500' },
  { id: 3, brand: 'Street Mix', name: 'Graphic Tee Band Collection', originalPrice: 95000, salePrice: 47500, discount: 50, condition: 'Bagus', store: 'Retro Closet', location: 'Blimbing', rating: 4.5, sold: 56, image: 'https://picsum.photos/seed/pg3/400/500' },
  { id: 4, brand: 'Classic Vintage', name: 'Leather Belt Genuine', originalPrice: 150000, salePrice: 90000, discount: 40, condition: 'Like New', store: 'Accessory Hub', location: 'Singosari', rating: 4.7, sold: 18, image: 'https://picsum.photos/seed/pg4/400/500' },
  { id: 5, brand: 'Thrift Co', name: 'Canvas Tote Bag Minimalis', originalPrice: 120000, salePrice: 72000, discount: 40, condition: 'Sangat Baik', store: 'Bag Lady', location: 'Kepanjen', rating: 4.6, sold: 42, image: 'https://picsum.photos/seed/pg5/400/500' },
  { id: 6, brand: 'Street Lab', name: 'Sneakers Runner Classic', originalPrice: 320000, salePrice: 192000, discount: 40, condition: 'Like New', store: 'Sole Station', location: 'Singosari', rating: 4.8, sold: 29, image: 'https://picsum.photos/seed/pg6/400/500' },
  { id: 7, brand: 'Urban Thrift', name: 'Military Jacket Camo', originalPrice: 275000, salePrice: 137500, discount: 50, condition: 'Sangat Baik', store: 'Urban Store', location: 'Klojen', rating: 4.9, sold: 15, image: 'https://picsum.photos/seed/pg7/400/500' },
  { id: 8, brand: 'Retro Wear', name: 'Polo Shirt Heritage', originalPrice: 130000, salePrice: 65000, discount: 50, condition: 'Bagus', store: 'Retro Closet', location: 'Blimbing', rating: 4.4, sold: 38, image: 'https://picsum.photos/seed/pg8/400/500' },
];

function formatIDR(num: number) {
  return `Rp ${num.toLocaleString('id-ID')}`;
}

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, i) => (
    <Star key={i} className={`h-3 w-3 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300'}`} />
  ));
}

export default function ProductGrid() {
  return (
    <section className="relative py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-2">
          <div>
            <p className="mb-1 text-xs font-semibold tracking-widest text-[#E17100] uppercase">PRODUK BARU MASUK</p>
            <h2 className="text-2xl font-bold text-neutral-900">Produk Baru Masuk</h2>
          </div>
          <Link href="/produk" className="text-sm font-medium text-[#E17100] hover:underline">
            Lihat Semua →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl overflow-hidden border border-neutral-100 hover:shadow-md transition-shadow cursor-pointer">
              {/* Image */}
              <div className="relative aspect-[4/5]">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                {/* Badges */}
                <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                  -{product.discount}%
                </span>
                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-medium rounded-full px-2 py-0.5">
                  {product.condition}
                </span>
              </div>

              {/* Info */}
              <div className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-neutral-500">{product.brand}</span>
                  <div className="flex items-center gap-0.5">
                    {renderStars(product.rating)}
                    <span className="text-[10px] text-neutral-400 ml-1">{product.rating}</span>
                  </div>
                </div>
                <p className="text-sm font-bold text-neutral-900 truncate">{product.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-lg font-bold text-[#E17100]">{formatIDR(product.salePrice)}</span>
                  <span className="text-xs text-neutral-400 line-through">{formatIDR(product.originalPrice)}</span>
                </div>
                <p className="text-[10px] text-neutral-400 mt-1">{product.store} · {product.location} · {product.sold} terjual</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

