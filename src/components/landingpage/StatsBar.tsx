'use client';

import { Star } from 'lucide-react';

export default function StatsBar() {
  return (
    <section className="relative py-12 bg-[#E5E5E5] overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-orange-400/15 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* Stat 1 */}
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-bold text-neutral-900">500+</p>
            <p className="mt-1 text-sm text-neutral-600">Produk thrift aktif</p>
          </div>

          {/* Stat 2 */}
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-bold text-neutral-900">50+</p>
            <p className="mt-1 text-sm text-neutral-600">Toko terverifikasi</p>
          </div>

          {/* Stat 3 */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5">
              <p className="text-3xl sm:text-4xl font-bold text-neutral-900 leading-none">4.8</p>
              <Star className="h-7 w-7 fill-amber-400 text-amber-400 shrink-0" aria-hidden="true" />
            </div>
            <p className="mt-1 text-sm text-neutral-600">Rating rata-rata</p>
          </div>

          {/* Stat 4 */}
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-bold text-neutral-900">Malang</p>
            <p className="mt-1 text-sm text-neutral-600">Dan sekitarnya</p>
          </div>
        </div>
      </div>
    </section>
  );
}
