'use client';

import { Product } from '@/types';
import { Star, Tag, MapPin, Heart, ShoppingCart, Check } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { useState } from 'react';

function formatPrice(price: number) {
  return 'Rp' + price.toLocaleString('id-ID');
}

function getConditionColor(condition: string) {
  switch (condition) {
    case 'Sangat Baik': return 'bg-green-100 text-green-800';
    case 'Baik': return 'bg-amber-100 text-amber-800';
    case 'Cukup': return 'bg-orange-100 text-orange-800';
    default: return 'bg-neutral-100 text-neutral-800';
  }
}

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'featured' | 'wishlist' | 'list';
  isInWishlist?: boolean;
  onRemoveFromWishlist?: () => void;
  onQuickAdd?: (productId: number) => void;
  onToggleWishlist?: (productId: number) => void;
}

export default function ProductCard({ product, variant = 'default', isInWishlist, onRemoveFromWishlist, onQuickAdd, onToggleWishlist }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const [added, setAdded] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const discount = product.originalPrice
    ? Math.round(100 - (product.price / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    showToast(`${product.name} ditambahkan ke keranjang`, 'success');
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickAdd) {
      onQuickAdd(product.id);
    } else {
      handleAddToCart();
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(product.id);
    } else {
      toggleWishlist(product.id);
    }
  };

  const cardBody = (
    <article
      className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-neutral-200 hover:ring-amber-300 hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setShowQuickActions(true)}
      onMouseLeave={() => setShowQuickActions(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        {discount > 0 && (
          <span className="absolute right-1.5 top-1.5 rounded-full bg-amber-600 px-1.5 py-0.5 text-[10px] font-bold text-white">-{discount}%</span>
        )}
        <span className={`absolute left-1.5 top-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${getConditionColor(product.condition)}`}>{product.condition}</span>

        {/* Quick Actions Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2`}
        >
          <button
            type="button"
            onClick={handleQuickAdd}
            className="flex items-center gap-1.5 rounded-full bg-[#E17100] px-4 py-2.5 text-white text-sm font-semibold shadow-lg hover:bg-orange-600 transition-colors active:scale-[0.95]"
          >
            <ShoppingCart className="h-4 w-4" aria-hidden="true" />
            + Keranjang
          </button>
        </div>

        {/* Quick action buttons when not hovering (always visible on list) */}
        <div className={`absolute bottom-2 left-2 right-2 flex gap-2 transition-all duration-200 ${showQuickActions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <button
            type="button"
            onClick={handleToggleWishlist}
            className={`flex items-center justify-center rounded-full p-2 backdrop-blur-sm transition-colors ${
              isInWishlist ? 'bg-red-500 text-white' : 'bg-white/90 text-neutral-600 hover:text-red-500'
            }`}
            aria-label={isInWishlist ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}
          >
            <Heart className="h-4 w-4 fill-current" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={handleQuickAdd}
            className="flex items-center justify-center rounded-full bg-[#E17100] px-3 py-2 text-white text-xs font-semibold backdrop-blur-sm hover:bg-orange-600 transition-colors"
          >
            <ShoppingCart className="h-3.5 w-3.5" aria-hidden="true" />
            Keranjang
          </button>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-2.5">
        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
          <span className="font-medium text-neutral-700 truncate">{product.store}</span>
          <Star className="h-3.5 w-3.5 text-amber-500 fill-current shrink-0" aria-hidden="true" /><span>{product.storeRating}</span>
        </div>
        <h3 className="line-clamp-2 text-sm font-semibold text-neutral-900 group-hover:text-amber-600 transition-colors">{product.name}</h3>
        <div className="mt-1.5 flex items-baseline gap-1.5">
          <span className="text-base font-bold text-amber-700">{formatPrice(product.price)}</span>
          {product.originalPrice && <span className="text-xs text-neutral-400 line-through">{formatPrice(product.originalPrice)}</span>}
        </div>
        <div className="mt-auto flex items-center justify-between pt-1.5 text-[10px] text-neutral-500">
          <span className="flex items-center gap-0.5"><MapPin className="h-2.5 w-2.5" aria-hidden="true" />{product.location}</span>
          <span>Terjual {product.sold}</span>
        </div>
      </div>
    </article>
  );

  const listBody = (
    <article className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-neutral-200 hover:ring-amber-300 hover:shadow-lg transition-all duration-300">
      <div className="relative flex aspect-[2/3] sm:aspect-auto overflow-hidden">
        <div className="relative w-40 h-40 shrink-0 sm:w-32 sm:h-32">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
          {discount > 0 && (
            <span className="absolute right-1.5 top-1.5 rounded-full bg-amber-600 px-1.5 py-0.5 text-[10px] font-bold text-white">-{discount}%</span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                <span className="font-medium text-neutral-700 truncate">{product.store}</span>
                <Star className="h-3.5 w-3.5 text-amber-500 fill-current shrink-0" aria-hidden="true" /><span>{product.storeRating}</span>
              </div>
              <h3 className="mt-0.5 line-clamp-1 text-sm font-semibold text-neutral-900 group-hover:text-amber-600 transition-colors">{product.name}</h3>
              <p className="mt-0.5 text-xs text-neutral-500 line-clamp-2">{product.description}</p>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-lg font-bold text-amber-700">{formatPrice(product.price)}</span>
                {product.originalPrice && <span className="text-xs text-neutral-400 line-through">{formatPrice(product.originalPrice)}</span>}
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${getConditionColor(product.condition)}`}>{product.condition}</span>
            <span className="text-[10px] text-neutral-500">{product.size}</span>
            <span className="text-[10px] text-neutral-500">{product.location}</span>
          </div>
        </div>
      </div>
      {/* Quick Actions for List */}
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`flex items-center justify-center rounded-full p-2 backdrop-blur-sm transition-colors ${
            isInWishlist ? 'bg-red-500 text-white' : 'bg-white/90 text-neutral-600 hover:text-red-500'
          }`}
          aria-label={isInWishlist ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}
        >
          <Heart className="h-4 w-4 fill-current" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={handleQuickAdd}
          className="flex items-center gap-1.5 rounded-full bg-[#E17100] px-3 py-2 text-white text-xs font-semibold backdrop-blur-sm hover:bg-orange-600 transition-colors"
        >
          <ShoppingCart className="h-3.5 w-3.5" aria-hidden="true" />
          + Keranjang
        </button>
      </div>
      <div className="flex items-center justify-between p-3 pt-0">
        <div className="flex items-center gap-2 text-[10px] text-neutral-500">
          <span className="flex items-center gap-0.5"><MapPin className="h-2.5 w-2.5" aria-hidden="true" />{product.location}</span>
          <span>Terjual {product.sold}</span>
        </div>
        <span className="text-[10px] text-neutral-500">{product.category}</span>
      </div>
    </article>
  );

  if (variant === 'featured') {
    return (
      <Link href={`/produk/${product.slug}`} className="group block">
        <article className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-neutral-200 hover:ring-amber-300 hover:shadow-lg transition-all duration-300">
          <div className="relative aspect-[4/5] overflow-hidden">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
            {discount > 0 && <span className="absolute right-2 top-2 rounded-full bg-amber-600 px-1.5 py-0.5 text-[10px] font-bold text-white">-{discount}%</span>}
            <span className={`absolute left-2 top-2 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${getConditionColor(product.condition)}`}>{product.condition}</span>
            <button type="button" className="absolute right-2 bottom-2 p-1.5 rounded-full bg-white/90 backdrop-blur-sm text-neutral-600 hover:text-red-500 hover:bg-white transition-colors" aria-label="Tambah ke wishlist">
              <Heart className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className="flex flex-1 flex-col p-3">
            <div className="flex items-center gap-1.5 text-xs text-neutral-500">
              <span className="font-medium text-neutral-700 truncate">{product.store}</span>
              <Star className="h-3.5 w-3.5 text-amber-500 fill-current shrink-0" aria-hidden="true" /><span>{product.storeRating}</span>
            </div>
            <h3 className="mt-1.5 line-clamp-2 text-base font-semibold text-neutral-900 group-hover:text-amber-600 transition-colors">{product.name}</h3>
            <p className="mt-1.5 line-clamp-2 text-xs text-neutral-600">{product.description}</p>
            <div className="mt-auto flex items-baseline gap-2">
              <span className="text-lg font-bold text-amber-700">{formatPrice(product.price)}</span>
              {product.originalPrice && <span className="text-xs text-neutral-400 line-through">{formatPrice(product.originalPrice)}</span>}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-neutral-500">
              <span className="flex items-center gap-0.5"><Tag className="h-3 w-3" aria-hidden="true" />{product.category}</span>
              <span className="flex items-center gap-0.5"><MapPin className="h-3 w-3" aria-hidden="true" />{product.location}</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === 'list') {
    return <>{listBody}</>;
  }

  return (
    <Link href={`/produk/${product.slug}`} className="group block">
      {cardBody}
    </Link>
  );
}

