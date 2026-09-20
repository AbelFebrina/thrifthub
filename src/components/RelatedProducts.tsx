'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types';
import ProductCard from './ProductCard';

interface RelatedProductsProps {
  products: Product[];
  title?: string;
}

export default function RelatedProducts({ products, title = 'Produk Serupa' }: RelatedProductsProps) {
  if (products.length === 0) return null;
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -280, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 280, behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollLeft);
    }
  };

  const canScrollLeft = scrollPosition > 10;
  const canScrollRight = scrollRef.current && scrollPosition < scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10;

  return (
    <section className="space-y-6">
      <h2 className="font-display text-xl font-bold text-neutral-900">{title}</h2>
      
      {/* Carousel on mobile, grid on desktop */}
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-visible lg:pb-0"
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="default"
            />
          ))}
        </div>

        {/* Navigation arrows (mobile only) */}
        <div className="lg:hidden flex items-center justify-between absolute inset-y-0 left-0 right-0 pointer-events-none">
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className="flex items-center justify-center h-full w-12 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-auto hover:bg-white transition-opacity disabled:opacity-0 disabled:pointer-events-none z-10"
            aria-label="Produk sebelumnya"
          >
            <ChevronLeft className="h-6 w-6 text-neutral-600" />
          </button>
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className="flex items-center justify-center h-full w-12 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-auto hover:bg-white transition-opacity disabled:opacity-0 disabled:pointer-events-none z-10 ml-auto"
            aria-label="Produk selanjutnya"
          >
            <ChevronRight className="h-6 w-6 text-neutral-600" />
          </button>
        </div>
      </div>
    </section>
  );
}
