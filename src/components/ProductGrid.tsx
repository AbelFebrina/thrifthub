'use client';

import { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  view?: string;
  onQuickAdd?: (productId: number) => void;
  onToggleWishlist?: (productId: number) => void;
  isInWishlist?: (productId: number) => boolean;
}

export default function ProductGrid({ products, isLoading = false, view, onQuickAdd, onToggleWishlist, isInWishlist }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[4/5] rounded-xl bg-neutral-200" />
            <div className="mt-2.5 h-4 bg-neutral-200 rounded w-3/4" />
            <div className="mt-1 h-4 bg-neutral-200 rounded w-1/2" />
            <div className="mt-1 h-3 bg-neutral-200 rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  if (view === 'list') {
    return (
      <div className="space-y-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} variant="list" onQuickAdd={onQuickAdd} onToggleWishlist={onToggleWishlist} isInWishlist={isInWishlist?.(product.id)} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} variant="default" onQuickAdd={onQuickAdd} onToggleWishlist={onToggleWishlist} isInWishlist={isInWishlist?.(product.id)} />
      ))}
    </div>
  );
}

