'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types';
import { products } from '@/data/products';

interface WishlistContextType {
  wishlistItems: Product[];
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlistItems: [],
  toggleWishlist: () => {},
  isInWishlist: () => false,
  wishlistCount: 0,
});

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('thrifthub_wishlist');
    if (saved) {
      try { setWishlistIds(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('thrifthub_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  const toggleWishlist = (productId: number) => {
    setWishlistIds(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: number) => wishlistIds.includes(productId);

  const wishlistItems = products.filter(p => wishlistIds.includes(p.id));

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isInWishlist, wishlistCount: wishlistIds.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}

