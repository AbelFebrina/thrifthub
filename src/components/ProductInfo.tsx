'use client';

import { useState, useContext } from 'react';
import { Heart, ShoppingCart, Minus, Plus, Shield, Truck, RotateCcw, CheckCircle, MapPin, Star, Share2, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/types';
import { formatPrice } from '@/utils/price';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';

interface ProductInfoProps {
  product: Product;
}

function getConditionBadgeColor(condition: string) {
  switch (condition) {
    case 'Sangat Baik': return 'bg-rose-100 text-rose-800';
    case 'Like New': return 'bg-emerald-100 text-emerald-800';
    case 'Baik': return 'bg-amber-100 text-amber-800';
    case 'Cukup': return 'bg-orange-100 text-orange-800';
    default: return 'bg-neutral-100 text-neutral-800';
  }
}

function formatNumber(num: number): string {
  if (num >= 1000) return `${(num / 1000).toFixed(1).replace('.0', '')}k`;
  return String(num);
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const { isLoggedIn } = useAuth();
  
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(() => isInWishlist(product.id));
  const [selectedSize, setSelectedSize] = useState<string | null>(product.size);
  const [selectedColor, setSelectedColor] = useState<string | null>(product.color || null);
  
  const discount = product.originalPrice
    ? Math.round(100 - (product.price / product.originalPrice) * 100)
    : 0;
  const isOutOfStock = product.stock <= 0;
  const maxQuantity = Math.min(product.stock, 99);

  const handleQuantityChange = (delta: number) => {
    const newQty = quantity + delta;
    if (newQty >= 1 && newQty <= maxQuantity) {
      setQuantity(newQty);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOutOfStock) return;
    addToCart(product.id, quantity);
    showToast(`${product.name} x${quantity} ditambahkan ke keranjang`, 'success');
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOutOfStock) return;
    if (!isLoggedIn) {
      showToast('Silakan login terlebih dahulu', 'error');
      return;
    }
    addToCart(product.id, quantity);
    showToast('Melanjutkan ke checkout...', 'info');
    // Router push ke checkout akan di-handle di parent atau via callback
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
    setIsWishlisted(!isWishlisted);
    showToast(isWishlisted ? 'Dihapus dari wishlist' : 'Ditambahkan ke wishlist', 'success');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.shortDescription || product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link produk disalin ke clipboard', 'success');
    }
  };

  // Parse available sizes from product data or use common sizes
  const availableSizes = product.size ? [product.size] : ['S', 'M', 'L', 'XL', 'All Size'];
  const availableColors = product.color ? [product.color] : [];

  return (
    <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
        {/* Category & Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium">
            {product.category}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getConditionBadgeColor(product.condition)}`}>
            {product.condition}
          </span>
          {discount > 0 && (
            <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-bold">
              -{discount}%
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">{product.name}</h1>

        {/* Rating & Sold */}
        <div className="flex items-center gap-3 flex-wrap mb-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
            <span className="font-semibold text-neutral-900">{product.storeRating?.toFixed(1) || '5.0'}</span>
            <span className="text-neutral-500 text-sm">({product.reviewCount || 0})</span>
          </div>
          <span className="text-neutral-500 text-sm">|</span>
          <span className="text-neutral-500 text-sm">Terjual {formatNumber(product.sold || 0)}</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3 flex-wrap mb-4">
          <span className="text-2xl sm:text-3xl font-bold text-[#E17100]">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-lg text-neutral-400 line-through">{formatPrice(product.originalPrice)}</span>
          )}
          {product.stock > 0 && product.stock <= 5 && (
            <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium">
              Sisa {product.stock}
            </span>
          )}
        </div>

        {/* Size Selection */}
        {availableSizes.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-2">Ukuran</label>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all min-w-[48px] ${
                    selectedSize === size
                      ? 'border-2 border-[#E17100] bg-[#E17100]/5 text-[#E17100]'
                      : 'border border-neutral-300 bg-white text-neutral-700 hover:border-[#E17100]/50 hover:bg-neutral-50'
                  }`}
                  aria-pressed={selectedSize === size}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Color Selection */}
        {availableColors.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-2">Warna</label>
            <div className="flex flex-wrap gap-2">
              {availableColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                    selectedColor === color
                      ? 'border-2 border-[#E17100] bg-[#E17100]/5 text-[#E17100]'
                      : 'border border-neutral-300 bg-white text-neutral-700 hover:border-[#E17100]/50 hover:bg-neutral-50'
                  }`}
                  aria-pressed={selectedColor === color}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-neutral-700 mb-2 flex items-center gap-2">
            Jumlah
            <span className="text-xs text-neutral-500 font-normal">Stok: {product.stock}</span>
          </label>
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-neutral-300 rounded-xl overflow-hidden">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1 || isOutOfStock}
                className="p-3 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Kurangi jumlah"
              >
                <Minus className="h-5 w-5" />
              </button>
              <span className="w-16 text-center font-semibold text-neutral-900 border-x border-neutral-300">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= maxQuantity || isOutOfStock}
                className="p-3 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Tambah jumlah"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            {isOutOfStock && (
              <span className="text-sm text-red-500">Stok habis</span>
            )}
          </div>
        </div>

        {/* Action Buttons - Full width on mobile, side by side on desktop */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
              isOutOfStock
                ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                : 'border-2 border-[#E17100] text-[#E17100] bg-white hover:bg-[#E17100]/5 hover:border-[#E17100]'
            }`}
          >
            <ShoppingCart className="h-6 w-6" aria-hidden="true" />
            + Keranjang
          </button>
          <button
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
              isOutOfStock
                ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                : 'bg-[#E17100] text-white hover:bg-orange-600 hover:shadow-lg hover:shadow-[#E17100]/25'
            }`}
          >
            Beli Sekarang
          </button>
        </div>

        {/* Secondary Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-neutral-200">
          <button
            onClick={handleToggleWishlist}
            className={`p-3 rounded-xl transition-colors ${
              isWishlisted ? 'bg-red-100 text-red-500' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
            aria-label={isWishlisted ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}
          >
            <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-3 rounded-xl bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors"
            aria-label="Bagikan produk"
          >
            <Share2 className="h-6 w-6" />
          </button>
          <Link
            href={`/chat?to=${product.storeId}`}
            className="p-3 rounded-xl bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors"
            aria-label="Chat dengan seller"
          >
            <MessageSquare className="h-6 w-6" />
          </Link>
        </div>

        {/* Store Info Compact */}
        <div className="pt-4 border-t border-neutral-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center overflow-hidden shrink-0">
              <img
                src={`https://picsum.photos/seed/${product.store.toLowerCase().replace(/\s+/g, '-')}/80/80`}
                alt={product.store}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <Link
                href={`/toko/${product.store.toLowerCase().replace(/\s+/g, '-')}`}
                className="font-semibold text-neutral-900 hover:text-[#E17100] truncate block"
              >
                {product.store}
              </Link>
              <div className="flex items-center gap-2 mt-0.5">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                <span className="text-sm font-medium text-neutral-700">{product.storeRating?.toFixed(1) || '5.0'}</span>
                <span className="text-xs text-neutral-500">({product.reviewCount || 0})</span>
                <span className="px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-medium">
                  Terverifikasi
                </span>
              </div>
            </div>
            <Link
              href={`/toko/${product.store.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-3 py-1.5 text-xs font-semibold text-[#E17100] border border-[#E17100] rounded-lg hover:bg-[#E17100]/5 transition-colors whitespace-nowrap"
            >
              Kunjungi Toko
            </Link>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="pt-4 border-t border-neutral-200 space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-100">
            <MapPin className="h-5 w-5 text-blue-600 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-blue-800">Dikirim dari</p>
              <p className="text-sm text-blue-700">{product.location}, Malang</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-green-50 border border-green-100">
            <Truck className="h-5 w-5 text-green-600 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-green-800">Estimasi Pengiriman</p>
              <p className="text-sm text-green-700">1-3 hari kerja (J&T, GoSend, Grab, COD Malang)</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-100">
            <RotateCcw className="h-5 w-5 text-amber-600 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-amber-800">Garansi Deskripsi</p>
              <p className="text-sm text-amber-700">Retur 3 hari jika tidak sesuai deskripsi</p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-200">
          <div className="flex flex-col items-center gap-1.5 text-center">
            <Shield className="h-6 w-6 text-[#E17100]" />
            <span className="text-xs font-medium text-neutral-700">Rekber Aman</span>
            <span className="text-[10px] text-neutral-500">Dana aman sampai barang sampai</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 text-center">
            <Truck className="h-6 w-6 text-[#E17100]" />
            <span className="text-xs font-medium text-neutral-700">Kirim Cepat</span>
            <span className="text-[10px] text-neutral-500">J&T, GoSend, Grab, COD</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 text-center">
            <RotateCcw className="h-6 w-6 text-[#E17100]" />
            <span className="text-xs font-medium text-neutral-700">Retur Mudah</span>
            <span className="text-[10px] text-neutral-500">Garansi deskripsi 3 hari</span>
          </div>
        </div>
      </div>
    </div>
  );
}
