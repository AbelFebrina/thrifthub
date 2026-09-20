'use client';

import { useState, useMemo } from 'react';
import { Star, MapPin, CheckCircle2, Package, Search, Filter, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Store, Product } from '@/types';
import ProductCard from './ProductCard';

interface StorePageContentProps {
  store: Store;
  products: Product[];
  avgRating: number;
}

export default function StorePageContent({ store, products: initialProducts, avgRating }: StorePageContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCondition, setSelectedCondition] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('terbaru');

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCondition) {
      result = result.filter(p => p.condition === selectedCondition);
    }

    switch (sortBy) {
      case 'harga-termurah':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'harga-termahal':
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return result;
  }, [initialProducts, searchQuery, selectedCondition, sortBy]);

  return (
    <div className="min-h-screen bg-cream font-sans antialiased">
      <main className="pt-16">
        {/* Banner */}
        <div className="relative h-48 sm:h-56 lg:h-72 overflow-hidden">
          <img
            src={store.banner}
            alt={`${store.name} banner`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12">
            <div className="max-w-7xl mx-auto flex items-end gap-4 sm:gap-6">
              <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl overflow-hidden border-4 border-amber-500/80 bg-white/20 backdrop-blur-sm shrink-0">
                <img
                  src={store.image}
                  alt={store.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="pb-2">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white">
                  {store.name}
                </h1>
                <div className="mt-1 flex items-center gap-2 flex-wrap">
                  {store.verified && (
                    <span className="flex items-center gap-1 rounded-full bg-green-500/90 px-2.5 py-0.5 text-xs font-semibold text-white">
                      <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                      Terverifikasi
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-white/80 text-sm">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    {store.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Banner */}
        <div className="bg-white border-b border-neutral-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              {store.description}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Stats Row */}
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl bg-white border border-neutral-200 p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-amber-600">
                <Package className="h-5 w-5" aria-hidden="true" />
                <span className="text-2xl font-bold">{initialProducts.length}</span>
              </div>
              <p className="mt-1 text-xs text-neutral-500">Produk</p>
            </div>
            <div className="rounded-xl bg-white border border-neutral-200 p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-amber-600">
                <Star className="h-5 w-5 fill-amber-500" aria-hidden="true" />
                <span className="text-2xl font-bold">{avgRating}</span>
              </div>
              <p className="mt-1 text-xs text-neutral-500">Rating Rata-rata</p>
            </div>
            <div className="rounded-xl bg-white border border-neutral-200 p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-amber-600">
                <Star className="h-5 w-5 fill-amber-500" aria-hidden="true" />
                <span className="text-2xl font-bold">{store.rating}</span>
              </div>
              <p className="mt-1 text-xs text-neutral-500">Rating Toko</p>
            </div>
            <div className="rounded-xl bg-white border border-neutral-200 p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-amber-600">
                <Star className="h-5 w-5 fill-amber-500" aria-hidden="true" />
                <span className="text-2xl font-bold">{store.reviews.toLocaleString('id-ID')}</span>
              </div>
              <p className="mt-1 text-xs text-neutral-500">Review</p>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="mb-6 rounded-xl bg-white border border-neutral-200 p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" aria-hidden="true" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari produk di toko ini..."
                  className="w-full rounded-lg border border-neutral-300 bg-neutral-50 pl-10 pr-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              {/* Condition Filter */}
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-700 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 appearance-none cursor-pointer"
              >
                <option value="">Semua Kondisi</option>
                <option value="Sangat Baik">Sangat Baik</option>
                <option value="Baik">Baik</option>
                <option value="Cukup">Cukup</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-700 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 appearance-none cursor-pointer"
              >
                <option value="terbaru">Terbaru</option>
                <option value="harga-termurah">Harga Termurah</option>
                <option value="harga-termahal">Harga Termahal</option>
              </select>

              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <Filter className="h-4 w-4" aria-hidden="true" />
                <span>{filteredProducts.length} produk</span>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} variant="default" />
              ))}
            </div>
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <Package className="h-16 w-16 text-neutral-300" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold text-neutral-900">Produk tidak ditemukan</h3>
              <p className="mt-1 text-neutral-500">Coba ubah filter atau kata kunci pencarian Anda.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

