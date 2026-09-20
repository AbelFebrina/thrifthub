'use client';

import { useState, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { products } from '@/data/products';
import { stores } from '@/data/stores';
import { Product } from '@/types';
import { Trash2, Minus, Plus, ArrowRight, ShoppingCart, Tag, X, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import ConfirmModal from '@/components/ConfirmModal';

function formatPrice(price: number) {
  return 'Rp ' + price.toLocaleString('id-ID');
}

function getConditionColor(condition: string) {
  switch (condition) {
    case 'Sangat Baik': return 'bg-rose-100 text-rose-800';
    case 'Like New': return 'bg-emerald-100 text-emerald-800';
    case 'Baik': return 'bg-amber-100 text-amber-800';
    case 'Cukup': return 'bg-orange-100 text-orange-800';
    default: return 'bg-neutral-100 text-neutral-800';
  }
}

interface CartItemData {
  productId: number;
  quantity: number;
  selected: boolean;
  product: Product;
}

interface StoreGroup {
  storeId: number;
  store: string;
  items: CartItemData[];
}

export default function KeranjangPage() {
  const { isLoggedIn } = useAuth();
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    updateSelection, 
    toggleSelectAll, 
    toggleStoreSelection,
    clearSelected,
    selectedCount, 
    selectedTotal,
    selectedItems,
    isAllSelected,
    promoCode,
    setPromoCode,
    appliedPromo,
    applyPromo,
    removePromo,
    cartTotal,
    cartCount
  } = useCart();
  const { showToast } = useToast();
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [promoInput, setPromoInput] = useState('');
  const [expandedStores, setExpandedStores] = useState<Record<number, boolean>>({});

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-neutral-200 p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="h-10 w-10 text-neutral-400" />
          </div>
          <h1 className="font-display text-2xl font-bold text-neutral-900 mb-2">Login Dulu!</h1>
          <p className="text-neutral-500 text-sm mb-6">Kamu perlu login untuk melihat keranjang.</p>
          <Link href="/login" className="inline-flex items-center gap-2 rounded-lg bg-[#E17100] px-6 py-3 text-white font-medium text-sm hover:bg-orange-600 transition-colors">
            Masuk <ShoppingCart className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  // Group items by store
  const groupedItems: StoreGroup[] = useMemo(() => {
    const groups: Record<number, { store: string; storeId: number; items: CartItemData[] }> = {};
    
    items.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (!product) return;
      const storeId = product.storeId;
      if (!groups[storeId]) {
        groups[storeId] = { store: product.store, storeId, items: [] };
      }
      groups[storeId].items.push({ ...item, product });
    });
    
    return Object.values(groups);
  }, [items]);

  // Store totals
  const storeTotals = useMemo(() => {
    const totals: Record<number, number> = {};
    groupedItems.forEach(group => {
      totals[group.storeId] = group.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity, 
        0
      );
    });
    return totals;
  }, [groupedItems]);

  // Store selected totals
  const storeSelectedTotals = useMemo(() => {
    const totals: Record<number, { count: number; total: number }> = {};
    groupedItems.forEach(group => {
      const selected = group.items.filter(i => i.selected);
      totals[group.storeId] = {
        count: selected.reduce((sum, i) => sum + i.quantity, 0),
        total: selected.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
      };
    });
    return totals;
  }, [groupedItems]);

  // Promo discount calculation
  const promoDiscount = useMemo(() => {
    if (!appliedPromo) return 0;
    if (appliedPromo.type === 'percent') {
      return Math.floor(selectedTotal * appliedPromo.discount / 100);
    }
    return Math.min(appliedPromo.discount, selectedTotal);
  }, [appliedPromo, selectedTotal]);

  const finalTotal = selectedTotal - promoDiscount;

  const handleRemove = (productId: number) => {
    removeFromCart(productId);
    showToast('Item dihapus dari keranjang', 'info');
    setDeleteTarget(null);
  };

  const handleQuantityChange = (productId: number, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      showToast('Item dihapus dari keranjang', 'info');
      return;
    }
    updateQuantity(productId, newQty);
  };

  const handlePromoApply = () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    if (applyPromo()) {
      setPromoInput('');
      showToast(`Kode promo "${code}" berhasil diterapkan!`, 'success');
    } else {
      showToast('Kode promo tidak valid', 'error');
    }
  };

  const handlePromoRemove = () => {
    removePromo();
    setPromoInput('');
    showToast('Kode promo dihapus', 'info');
  };

  const handleCheckout = () => {
    if (selectedCount === 0) return;
    // Navigate to checkout with selected items
    // For now just show toast
    showToast('Melanjutkan ke checkout...', 'info');
  };

  const toggleStoreExpanded = (storeId: number) => {
    setExpandedStores(prev => ({ ...prev, [storeId]: !prev[storeId] }));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream">
        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-6">
              <Link href="/" className="hover:text-[#E17100] transition-colors">Beranda</Link>
              <ArrowRight className="h-3 w-3" />
              <span className="text-neutral-900 font-medium">Keranjang</span>
            </nav>
            <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
              <div className="w-28 h-28 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="h-14 w-14 text-neutral-400" />
              </div>
              <h1 className="font-display text-3xl font-bold text-neutral-900 mb-3">Keranjangmu Masih Kosong</h1>
              <p className="text-neutral-500 text-sm mb-8 max-w-md mx-auto">Temukan produk thrift favoritmu dan tambahkan ke keranjang untuk mulai berbelanja.</p>
              <Link href="/produk" className="inline-flex items-center gap-2 rounded-lg bg-[#E17100] px-8 py-3.5 text-white font-medium text-sm hover:bg-orange-600 transition-colors">
                Jelajahi Produk <ShoppingCart className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <main className="pt-24 pb-32 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-6">
            <Link href="/" className="hover:text-[#E17100] transition-colors">Beranda</Link>
            <ArrowRight className="h-3 w-3" />
            <span className="text-neutral-900 font-medium">Keranjang Belanja</span>
          </nav>

          {/* Page Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="font-display text-3xl font-bold text-neutral-900">Keranjang Belanja</h1>
            <span className="text-sm text-neutral-500">
              {cartCount} item ({selectedCount} dipilih)
            </span>
          </div>

          <div className="grid lg:grid-cols-[65%_35%] gap-8">
            {/* Left: Items List */}
            <div className="space-y-4">
              {/* Select All Header */}
              <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
                <label className="flex items-center gap-3 px-4 py-3 border-b border-neutral-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={(e) => toggleSelectAll(e.target.checked)}
                    className="h-5 w-5 rounded border-neutral-300 text-[#E17100] focus:ring-[#E17100]/20 accent-[#E17100]"
                    aria-label="Pilih semua item"
                  />
                  <span className="font-medium text-neutral-900">Pilih Semua</span>
                  {selectedCount > 0 && (
                    <span className="ml-auto text-sm text-neutral-500">
                      {selectedCount} item dipilih
                    </span>
                  )}
                </label>
              </div>

              {groupedItems.map(group => {
                const storeData = stores.find(s => s.id === group.storeId);
                const isStoreExpanded = expandedStores[group.storeId] ?? true;
                const storeSel = storeSelectedTotals[group.storeId] || { count: 0, total: 0 };
                const allStoreSelected = group.items.every(i => i.selected) && group.items.length > 0;
                const someStoreSelected = group.items.some(i => i.selected);

                return (
                  <div key={group.storeId} className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
                    {/* Store Header with Checkbox */}
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-200">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={allStoreSelected}
                          onChange={(e) => toggleStoreSelection(group.storeId, e.target.checked)}
                          className="h-5 w-5 rounded border-neutral-300 text-[#E17100] focus:ring-[#E17100]/20 accent-[#E17100]"
                          aria-label={`Pilih semua dari ${group.store}`}
                        />
                        <div className="w-8 h-8 rounded-lg bg-[#E17100]/10 flex items-center justify-center">
                          <span className="text-[#E17100] font-bold text-sm">{group.store.charAt(0)}</span>
                        </div>
                        <span className="font-semibold text-neutral-900 text-sm">{group.store}</span>
                        {storeData?.verified && (
                          <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-medium">
                            Terverifikasi
                          </span>
                        )}
                        <button
                          onClick={() => toggleStoreExpanded(group.storeId)}
                          className="ml-auto p-1 text-neutral-400 hover:text-neutral-600 transition-colors"
                          aria-label={isStoreExpanded ? 'Tutup' : 'Buka'}
                        >
                          {isStoreExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        </button>
                      </label>
                    </div>

                    {/* Items - collapsible */}
                    <div className={isStoreExpanded ? 'block' : 'hidden'}>
                      <div className="divide-y divide-neutral-200">
                        {group.items.map(cartItem => {
                          const { product, quantity, selected } = cartItem;
                          const isOverStock = quantity > product.stock;
                          const discount = product.originalPrice 
                            ? Math.round(100 - (product.price / product.originalPrice) * 100) 
                            : 0;
                          const subtotal = product.price * quantity;

                          return (
                            <div 
                              key={product.id} 
                              className={`flex gap-4 p-4 hover:bg-neutral-50 transition-colors duration-150 ${selected ? 'bg-[#E17100]/5' : ''}`}
                            >
                              {/* Item Checkbox */}
                              <label className="flex items-start gap-3 pt-1 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={selected}
                                  onChange={(e) => updateSelection(product.id, e.target.checked)}
                                  disabled={isOverStock}
                                  className="h-5 w-5 mt-0.5 rounded border-neutral-300 text-[#E17100] focus:ring-[#E17100]/20 accent-[#E17100] disabled:opacity-50 disabled:cursor-not-allowed"
                                  aria-label={`Pilih ${product.name}`}
                                />
                              </label>

                              {/* Image */}
                              <Link href={`/produk/${product.slug}`} className="shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-neutral-100">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                              </Link>

                              {/* Info */}
                              <div className="flex-1 min-w-0">
                                <Link href={`/produk/${product.slug}`}>
                                  <h3 className="font-medium text-neutral-900 text-sm leading-tight hover:text-[#E17100] transition-colors line-clamp-2">{product.name}</h3>
                                </Link>
                                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${getConditionColor(product.condition)}`}>{product.condition}</span>
                                  <span className="text-[10px] text-neutral-500">{product.size}</span>
                                  {discount > 0 && (
                                    <span className="px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold">-{discount}%</span>
                                  )}
                                </div>
                                <p className="text-[#E17100] font-medium text-sm mt-1">{formatPrice(product.price)}</p>
                                {isOverStock && (
                                  <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" aria-hidden="true" />
                                    Stok habis (tersisa {product.stock})
                                  </p>
                                )}
                              </div>

                              {/* Quantity + Subtotal + Delete */}
                              <div className="flex flex-col items-end justify-between shrink-0 w-28">
                                <button 
                                  type="button" 
                                  onClick={() => setDeleteTarget(product.id)} 
                                  className="text-neutral-400 hover:text-red-500 transition-colors p-1" 
                                  aria-label="Hapus"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>

                                {!isOverStock ? (
                                  <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden">
                                    <button 
                                      type="button" 
                                      onClick={() => handleQuantityChange(product.id, quantity - 1)} 
                                      disabled={quantity <= 1} 
                                      className="flex items-center justify-center w-8 h-8 hover:bg-neutral-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                      aria-label="Kurangi"
                                    >
                                      <Minus className="h-3.5 w-3.5 text-neutral-700" />
                                    </button>
                                    <span className="w-10 text-center text-sm font-medium text-neutral-900">{quantity}</span>
                                    <button 
                                      type="button" 
                                      onClick={() => handleQuantityChange(product.id, quantity + 1)} 
                                      disabled={quantity >= product.stock} 
                                      className="flex items-center justify-center w-8 h-8 hover:bg-neutral-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                      aria-label="Tambah"
                                    >
                                      <Plus className="h-3.5 w-3.5 text-neutral-700" />
                                    </button>
                                  </div>
                                ) : (
                                  <span className="text-[10px] text-red-500">Stok habis</span>
                                )}
                                
                                <p className="font-medium text-neutral-900 text-sm text-right w-full">{formatPrice(subtotal)}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Store Subtotal */}
                      <div className="px-4 py-3 border-t border-neutral-200 bg-neutral-50">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-neutral-600">Subtotal {group.store}</span>
                          <span className="font-semibold text-neutral-900">{formatPrice(storeTotals[group.storeId] || 0)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Summary */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-4">
                {/* Promo Section */}
                <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
                  <div className="px-5 py-4 border-b border-neutral-200">
                    <h2 className="font-display text-lg font-bold text-neutral-900 flex items-center gap-2">
                      <Tag className="h-5 w-5 text-[#E17100]" />
                      Promo & Voucher
                    </h2>
                  </div>
                  <div className="p-5 space-y-3">
                    {appliedPromo ? (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold">{appliedPromo.code}</span>
                            <span className="text-sm text-green-800">
                              {appliedPromo.type === 'percent' 
                                ? `Diskon ${appliedPromo.discount}%` 
                                : `Potongan ${formatPrice(appliedPromo.discount)}`
                              }
                            </span>
                          </div>
                          <button
                            onClick={handlePromoRemove}
                            className="text-green-600 hover:text-green-700 text-sm font-medium"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handlePromoApply()}
                          placeholder="Masukkan kode promo"
                          className="flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-[#E17100] focus:outline-none focus:ring-2 focus:ring-[#E17100]/20"
                        />
                        <button
                          onClick={handlePromoApply}
                          className="px-4 py-2.5 rounded-lg bg-[#E17100] text-white font-medium text-sm hover:bg-orange-600 transition-colors whitespace-nowrap"
                        >
                          Pakai
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
                  <div className="px-5 py-4 border-b border-neutral-200">
                    <h2 className="font-display text-lg font-bold text-neutral-900">Ringkasan Belanja</h2>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-600">Total Item</span>
                      <span className="font-medium text-neutral-900">{selectedCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-600">Total Harga</span>
                      <span className="font-medium text-neutral-900">{formatPrice(selectedTotal)}</span>
                    </div>
                    {promoDiscount > 0 && (
                      <div className="flex items-center justify-between text-sm text-green-600">
                        <span>Diskon Promo ({appliedPromo?.code})</span>
                        <span className="font-medium">-{formatPrice(promoDiscount)}</span>
                      </div>
                    )}
                    <div className="border-t border-neutral-200 pt-3 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-600">Ongkir</span>
                        <span className="text-green-600 font-medium">Gratis</span>
                      </div>
                      <div className="flex items-center justify-between border-t border-neutral-200 pt-3">
                        <span className="text-base font-bold text-neutral-900">Total Bayar</span>
                        <span className="text-xl font-bold text-[#E17100]">{formatPrice(finalTotal)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 border-t border-neutral-200 bg-neutral-50">
                    <button
                      onClick={handleCheckout}
                      disabled={selectedCount === 0}
                      className="w-full rounded-lg bg-[#E17100] py-3.5 text-white font-semibold text-base hover:bg-orange-600 transition-colors active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Checkout ({selectedCount})
                    </button>
                    <p className="text-center text-xs text-neutral-500 mt-2">
                      Total {selectedCount} item · {formatPrice(finalTotal)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 shadow-xl px-4 py-3 z-50">
        <div className="flex items-center justify-between gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={(e) => toggleSelectAll(e.target.checked)}
              className="h-5 w-5 rounded border-neutral-300 text-[#E17100] focus:ring-[#E17100]/20 accent-[#E17100]"
            />
            <span className="text-sm font-medium text-neutral-900">Pilih Semua</span>
          </label>
          <div className="flex-1">
            <p className="text-xs text-neutral-500">{selectedCount} item dipilih</p>
            <p className="font-bold text-[#E17100]">{formatPrice(finalTotal)}</p>
          </div>
          <button
            onClick={handleCheckout}
            disabled={selectedCount === 0}
            className="px-6 py-3 rounded-lg bg-[#E17100] text-white font-semibold text-sm hover:bg-orange-600 transition-colors active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            Checkout
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget !== null && (
        <ConfirmModal
          isOpen={true}
          title="Hapus dari Keranjang"
          message="Apakah kamu yakin ingin menghapus item ini dari keranjang?"
          confirmLabel="Hapus"
          cancelLabel="Batal"
          onConfirm={() => handleRemove(deleteTarget)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
