'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import Link from 'next/link';

interface FlashProduct {
  id: number;
  name: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  stockLeft: number;
  soldPercent: number;
  image: string;
  condition: string;
  store: string;
  category: string;
}

const flashProducts: FlashProduct[] = [
  {
    id: 1,
    name: 'Bomber Jacket Vintage MA-1',
    originalPrice: 250000,
    salePrice: 125000,
    discount: 50,
    stockLeft: 12,
    soldPercent: 78,
    image: 'https://picsum.photos/seed/flash1/400/500',
    condition: 'Like New',
    store: 'Malang Vintage',
    category: 'Outerwear'
  },
  {
    id: 2,
    name: 'Denim Oversized Jeans Levi\'s 501',
    originalPrice: 180000,
    salePrice: 90000,
    discount: 50,
    stockLeft: 8,
    soldPercent: 65,
    image: 'https://picsum.photos/seed/flash2/400/500',
    condition: 'Sangat Baik',
    store: 'Denim Corner',
    category: 'Bawahan'
  },
  {
    id: 3,
    name: 'Band Tee 90s Soundgarden Bootleg',
    originalPrice: 120000,
    salePrice: 60000,
    discount: 50,
    stockLeft: 23,
    soldPercent: 42,
    image: 'https://picsum.photos/seed/flash3/400/500',
    condition: 'Bagus',
    store: 'Retro Closet',
    category: 'Atasan'
  },
  {
    id: 4,
    name: 'Converse Chuck 70s High Faded Black',
    originalPrice: 350000,
    salePrice: 175000,
    discount: 50,
    stockLeft: 5,
    soldPercent: 91,
    image: 'https://picsum.photos/seed/flash4/400/500',
    condition: 'Like New',
    store: 'Sole Station',
    category: 'Sepatu'
  },
];

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 13 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <span className="text-white/80 text-xs font-medium tracking-wider uppercase">BERAKHIR:</span>
      {[
        { value: timeLeft.hours },
        { value: timeLeft.minutes },
        { value: timeLeft.seconds },
      ].map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          <div className="bg-neutral-900/50 text-white font-mono font-bold text-sm rounded px-2 py-1 min-w-[2.5rem] text-center">
            {String(item.value).padStart(2, '0')}
          </div>
          {index < 2 && <span className="text-white/60 text-xs font-mono">:</span>}
        </div>
      ))}
    </div>
  );
}

function getConditionColor(condition: string) {
  switch (condition) {
    case 'Sangat Baik': return 'bg-rose-500 text-white';
    case 'Like New': return 'bg-emerald-500 text-white';
    case 'Bagus': return 'bg-blue-500 text-white';
    default: return 'bg-neutral-500 text-white';
  }
}

export default function FlashSaleSection() {
  return (
    <section className="relative py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flash Sale Card - full width within container, no extra padding/margin */}
        <div className="relative bg-gradient-to-r from-orange-400 via-red-500 to-red-700 rounded-2xl sm:rounded-none overflow-hidden">
          {/* Decorative ambient glow */}
          <div className="absolute -top-1/2 -right-1/4 w-[300px] h-[300px] bg-orange-300/30 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[300px] h-[300px] bg-red-400/20 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

          {/* Top-left Badge */}
          <div className="relative z-10 absolute top-4 left-4 sm:left-6 bg-neutral-900/40 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-[10px] font-semibold tracking-wider uppercase text-white">TOKO MALANG FLASH DROP</span>
          </div>

          {/* Header */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 p-4 sm:p-6">
            <div className="pt-2">
              <h2 className="text-white font-bold text-lg sm:text-xl">⚡ FLASH SALE HARI INI</h2>
              <p className="mt-1 text-white/70 text-xs sm:text-sm max-w-xs">
                Diskon kilat produk thrift curated edisi terbatas, auto-refresh setiap 6 jam!
              </p>
            </div>
            <CountdownTimer />
          </div>

          {/* Product Grid */}
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 p-4 sm:p-6 pb-6">
            {flashProducts.map((product) => (
              <Link key={product.id} href={`/produk/${product.id}`} className="group block">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                  {/* Image with badges */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    {/* Discount badge top-left */}
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold rounded-full px-2 py-0.5">
                      -{product.discount}%
                    </span>
                    {/* Condition badge top-right */}
                    <span className={`absolute top-2 right-2 text-[10px] font-medium rounded-full px-2 py-0.5 ${getConditionColor(product.condition)}`}>
                      {product.condition}
                    </span>
                    {/* Wishlist heart bottom-right */}
                    <button
                      type="button"
                      className="absolute bottom-2 right-2 p-1.5 rounded-full bg-white/90 backdrop-blur-sm text-neutral-600 hover:text-red-500 hover:bg-white transition-colors"
                      aria-label="Tambah ke wishlist"
                    >
                      <Heart className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-3 space-y-1.5">
                    {/* Store name + category */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-neutral-900 truncate pr-2">{product.store}</span>
                      <span className="text-[10px] text-neutral-500 whitespace-nowrap">{product.category}</span>
                    </div>
                    {/* Product name */}
                    <h3 className="text-sm font-bold text-neutral-900 truncate group-hover:text-[#E17100] transition-colors">{product.name}</h3>
                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-[#E17100]">Rp {product.salePrice.toLocaleString('id-ID')}</span>
                      <span className="text-xs text-neutral-400 line-through">Rp {product.originalPrice.toLocaleString('id-ID')}</span>
                    </div>
                    {/* Stock + sold */}
                    <div className="flex items-center justify-between text-[10px] text-neutral-500">
                      <span>Sisa {product.stockLeft} pcs</span>
                      <span>{product.soldPercent}% Terjual</span>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full h-1 bg-red-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: `${product.soldPercent}%` }} />
                    </div>
                    {/* CTA Button */}
                    <button className="w-full mt-2 bg-neutral-900 text-white rounded-lg py-2 text-xs font-semibold hover:bg-neutral-800 active:scale-[0.98] transition-colors">
                      ⚡ Sikat Sekarang
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
