'use client';

import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { Heart, ShoppingCart, PackageOpen } from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
  const { isLoggedIn } = useAuth();
  const { wishlistItems, toggleWishlist } = useWishlist();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f7f2ea] via-[#faf6f0] to-[#f0e8dc] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-md w-full text-center">
          <div className="h-2 bg-gradient-to-r from-[#8a5a2b] to-[#b8895a]" />
          <div className="p-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[#8a5a2b] to-[#b8895a] rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-10 w-10 text-white" />
            </div>
            <h1 className="font-display text-2xl font-bold text-[#3e3028] mb-2">Login Dulu!</h1>
            <p className="text-[#a09080] text-sm mb-6">Kamu perlu login untuk melihat wishlist-mu.</p>
            <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-[#8a5a2b] px-8 py-3 text-white font-semibold hover:bg-[#705548] transition-colors">
              Masuk <Heart className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f2ea] via-[#faf6f0] to-[#f0e8dc]">
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-[#8a5a2b] to-[#b8895a] rounded-2xl flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-[#3e3028]">Wishlist</h1>
              <p className="text-[#a09080] text-sm">{wishlistItems.length} produk tersimpan</p>
            </div>
          </div>

          {/* Empty State */}
          {wishlistItems.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-sm border border-[#e8dcc8] p-12 text-center">
              <div className="w-24 h-24 bg-[#f7f2ea] rounded-full flex items-center justify-center mx-auto mb-6">
                <PackageOpen className="h-12 w-12 text-[#b8895a]" />
              </div>
              <h2 className="font-display text-2xl font-bold text-[#3e3028] mb-3">Wishlist Kosong</h2>
              <p className="text-[#a09080] text-sm mb-2">Belum ada produk yang kamu simpan.</p>
              <p className="text-[#705548] text-sm mb-8">Temukan produk thrift favoritmu dan tambahkan ke wishlist!</p>
              <Link href="/produk" className="inline-flex items-center gap-2 rounded-xl bg-[#8a5a2b] px-8 py-3 text-white font-semibold hover:bg-[#705548] transition-colors">
                Jelajahi Produk <ShoppingCart className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <>
              {/* Actions Bar */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-[#a09080]">
                  {wishlistItems.length} item{wishlistItems.length > 1 ? 's' : ''} — Klik hati untuk menghapus
                </p>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {wishlistItems.map((product) => (
                  <div key={product.id} className="relative group">
                    <ProductCard
                      product={product}
                      variant="wishlist"
                      isInWishlist={true}
                      onRemoveFromWishlist={() => toggleWishlist(product.id)}
                    />
                  </div>
                ))}
              </div>

              {/* Checkout CTA */}
              <div className="mt-10 bg-white rounded-2xl border border-[#e8dcc8] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-[#3e3028]">{wishlistItems.length} item di wishlist</p>
                  <p className="text-sm text-[#a09080]">Tambahkan ke keranjang untuk melanjutkan belanja</p>
                </div>
                <Link href="/produk" className="inline-flex items-center gap-2 rounded-xl bg-[#8a5a2b] px-6 py-3 text-white font-semibold text-sm hover:bg-[#705548] transition-colors">
                  Jelajahi Lebih Banyak <ShoppingCart className="h-4 w-4" />
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

