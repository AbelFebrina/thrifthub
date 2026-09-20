'use client';

import Link from 'next/link';
import { MapPin, Star, ArrowRight, Users } from 'lucide-react';
import { stores } from '@/data/stores';

interface StoreCardProps {
  storeId: number;
}

export default function StoreCard({ storeId }: StoreCardProps) {
  const store = stores.find(s => s.id === storeId);

  if (!store) return null;

  return (
    <Link
      href={`/toko/${store.slug}`}
      className="group relative overflow-hidden rounded-2xl bg-neutral-50 border border-neutral-200 p-6 hover:border-amber-300 hover:shadow-lg hover:bg-white transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <div className="h-16 w-16 rounded-xl overflow-hidden border-2 border-amber-300 bg-neutral-100">
            <img
              src={store.image}
              alt={store.name}
              className="h-full w-full object-cover"
            />
          </div>
          {store.mall && (
            <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white text-[10px] font-bold">
              ★
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-neutral-900 group-hover:text-amber-600 transition-colors truncate">
            {store.name}
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-neutral-500">
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{store.location}</span>
          </p>
          <div className="mt-3 flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1 text-neutral-600">
              <Star className="h-4 w-4 text-amber-500 fill-current" aria-hidden="true" />
              {store.rating}
            </span>
            <span className="flex items-center gap-1 text-neutral-600">
              <Users className="h-4 w-4" aria-hidden="true" />
              {store.reviews.toLocaleString('id-ID')} review
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-amber-600 py-3 text-sm font-semibold text-white transition-all duration-200 group-hover:bg-amber-500 group-hover:shadow-lg group-hover:shadow-amber-600/25">
        <span>Lihat Toko</span>
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-neutral-500">
        <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-green-700">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden="true" />
          Terverifikasi
        </span>
      </div>
    </Link>
  );
}
