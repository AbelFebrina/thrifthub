import { stores } from '@/data/stores';
import Link from 'next/link';
import { MapPin, Star, ArrowRight, Users } from 'lucide-react';

export default function FeaturedStoresSection() {
  return (
    <section id="toko-pilihan" className="py-12 sm:py-16 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="text-center lg:text-left">
            <p className="mb-2 text-xs font-semibold tracking-widest text-[#E17100] uppercase">TOKO PILIHAN</p>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Toko Terverifikasi Malang</h2>
            <p className="mt-3 max-w-2xl mx-auto lg:mx-0 text-neutral-400 text-sm">
              Seller terkurasi dengan rating tinggi, produk berkualitas & layanan terpercaya.
            </p>
          </div>
          <Link
            href="/toko"
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#E17100] bg-transparent px-6 py-3 text-base font-semibold text-[#E17100] transition-colors hover:bg-[#E17100] hover:text-white"
          >
            Lihat Semua Toko
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stores.map((store) => (
            <article
              key={store.id}
              className="group relative overflow-hidden rounded-2xl bg-neutral-900/50 border border-neutral-800 p-5 hover:border-[#E17100]/50 hover:shadow-lg hover:bg-neutral-900 transition-all duration-300"
            >
              {/* Store avatar */}
              <div className="flex flex-col items-center text-center mb-4">
                <div className="relative shrink-0 mb-3">
                  <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-neutral-700 bg-neutral-800">
                    <img
                      src={store.image}
                      alt={store.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {store.mall && (
                    <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#E17100] text-white text-[10px] font-bold">
                      ★
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-white group-hover:text-[#E17100] transition-colors truncate w-full">
                  {store.name}
                </h3>
                <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-neutral-400">
                  <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="truncate">{store.location}</span>
                </p>
              </div>

              {/* Stats row */}
              <div className="flex items-center justify-between mb-3">
                <div className="text-center">
                  <p className="text-lg font-bold text-white">{store.reviews.toLocaleString('id-ID')}+</p>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wide">Produk Terjual</p>
                </div>
                <div className="flex items-center gap-1 text-center">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                  <span className="text-lg font-bold text-white">{store.rating}</span>
                </div>
              </div>

              {/* Verified badge */}
              <div className="mb-4 flex items-center justify-center gap-2 text-xs text-neutral-400">
                <span className="flex items-center gap-1 rounded-full bg-green-900/30 px-2 py-1 text-green-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" aria-hidden="true" />
                  Terverifikasi
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" aria-hidden="true" />
                  {store.reviews.toLocaleString('id-ID')} review
                </span>
              </div>

              {/* CTA Button */}
              <Link
                href={`/toko/${store.slug}`}
                className="block w-full rounded-xl bg-[#E17100] py-2.5 text-center text-sm font-semibold text-white transition-all duration-200 hover:bg-[#E17100]/90 hover:shadow-lg hover:shadow-[#E17100]/25 flex items-center justify-center gap-2"
              >
                <span>Kunjungi Toko</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
