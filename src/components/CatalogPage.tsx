'use client';

import { Suspense } from 'react';
import CatalogPageContent from './CatalogPageContent';

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Suspense fallback={<CatalogSkeleton />}>
        <CatalogPageContent />
      </Suspense>
    </div>
  );
}

function CatalogSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-pulse space-y-8">
        {/* Header Skeleton */}
        <div className="space-y-4">
          <div className="h-4 bg-neutral-200 rounded w-48" />
          <div className="h-8 bg-neutral-200 rounded w-64" />
          <div className="h-4 bg-neutral-200 rounded w-80" />
        </div>
        
        {/* Category Pills Skeleton */}
        <div className="flex gap-2 overflow-x-auto">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-8 w-28 bg-neutral-200 rounded-full shrink-0" />
          ))}
        </div>

        {/* Filter Info Bar Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="h-6 bg-neutral-200 rounded w-48" />
          <div className="flex gap-2">
            <div className="h-6 bg-neutral-200 rounded w-24" />
            <div className="h-6 bg-neutral-200 rounded w-24" />
          </div>
        </div>

        {/* Main Layout Skeleton */}
        <div className="flex gap-6 lg:gap-8">
          {/* Sidebar Skeleton */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="animate-pulse space-y-6 p-4 bg-white rounded-2xl border border-neutral-200">
              <div className="h-6 bg-neutral-200 rounded w-1/2" />
              <div className="h-6 bg-neutral-200 rounded w-1/3" />
              <div className="h-6 bg-neutral-200 rounded w-1/4" />
              <div className="h-6 bg-neutral-200 rounded w-1/3" />
              <div className="h-6 bg-neutral-200 rounded w-1/2" />
            </div>
          </aside>

          {/* Main Content Skeleton */}
          <div className="flex-1 min-w-0">
            {/* Top Bar Skeleton */}
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-white rounded-xl border border-neutral-200 animate-pulse">
              <div className="h-8 bg-neutral-200 rounded w-48" />
              <div className="flex items-center gap-2">
                <div className="h-8 bg-neutral-200 rounded w-32" />
                <div className="h-8 bg-neutral-200 rounded w-32" />
              </div>
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/5] rounded-xl bg-neutral-200" />
                  <div className="mt-2.5 h-4 bg-neutral-200 rounded w-3/4" />
                  <div className="mt-1 h-4 bg-neutral-200 rounded w-1/2" />
                  <div className="mt-1 h-3 bg-neutral-200 rounded w-1/3" />
                </div>
              ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="mt-8 flex justify-center animate-pulse">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-10 w-10 bg-neutral-200 rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Bar Skeleton */}
        <div className="mt-12 grid grid-cols-3 gap-6 animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-neutral-200 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
