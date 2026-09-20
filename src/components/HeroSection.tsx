'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Search:', searchQuery);
    }
  };

  return (
    <section className="relative min-h-[85vh] flex items-center pt-16">
      <div className="absolute inset-0 z-0">
        <img
          src="/herosection3.png" 
          alt="Thrift clothing collection"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/85 via-neutral-900/60 to-neutral-900/95" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 pb-8">
        <div className="max-w-3xl text-center mx-auto">
          <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Semua Toko Thrift Malang dalam Satu Tempat
          </h1>
          <p className="mt-4 text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Temukan ribuan produk preloved unik dari seller lokal terverifikasi dengan transaksi aman via rekber & COD.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#produk"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-amber-500 w-full sm:w-auto"
            >
              <Search className="h-5 w-5" aria-hidden="true" />
              Mulai Belanja
            </Link>
            <Link
              href="#jual"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 bg-white/10 px-8 py-3 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 w-full sm:w-auto"
            >
              Buka Toko
            </Link>
          </div>

          {/* Large Search Bar */}
          <form onSubmit={handleSearch} className="mt-10 max-w-2xl mx-auto">
            <div className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-2 shadow-2xl">
              <div className="flex flex-col sm:flex-row gap-2">
                <label htmlFor="hero-search" className="sr-only">
                  Cari produk thrift
                </label>
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-neutral-400" aria-hidden="true" />
                  <input
                    type="search"
                    id="hero-search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari jaket vintage, band tee, denim, sneakers..."
                    className="w-full rounded-lg bg-white/5 border border-white/10 pl-12 pr-4 py-4 text-white placeholder-neutral-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-colors text-base"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-lg bg-amber-600 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-amber-500 flex items-center justify-center gap-2 whitespace-nowrap"
                  disabled={!searchQuery.trim()}
                >
                  <Search className="h-5 w-5" aria-hidden="true" />
                  Cari
                </button>
              </div>
            </div>
            <p className="mt-3 text-sm text-neutral-500 text-center">
              Contoh: &ldquo;jaket bomber&rdquo;, &ldquo;levis 501&rdquo;, &ldquo;converse 70s&rdquo;, &ldquo;kemeja flanell&rdquo;
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
