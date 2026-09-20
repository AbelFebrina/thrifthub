'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useOrder } from '@/context/OrderContext';
import { useAddress } from '@/context/AddressContext';
import { useToast } from '@/context/ToastContext';
import { products } from '@/data/products';
import { stores } from '@/data/stores';
import { Product } from '@/types';
import { Check, ChevronRight, MapPin, Truck, CreditCard, Phone, X, Plus, Edit2, Trash2, Star, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import ConfirmModal from '@/components/ConfirmModal';
import AddressModal from './components/AddressModal';
import ShippingMethodSelector from './components/ShippingMethodSelector';
import PaymentMethodSelector from './components/PaymentMethodSelector';

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
  product: Product;
}

interface StoreGroup {
  storeId: number;
  store: string;
  items: CartItemData[];
}

const SHIPPING_METHODS = [
  { id: 'reguler', name: 'Reguler', eta: '2-4 hari', price: 0, description: 'Pengiriman standar' },
  { id: 'instan', name: 'Instan', eta: 'Hari ini', price: 15000, description: 'Pengiriman kilat' },
  { id: 'same-day', name: 'Same Day', eta: 'Hari ini (kota sama)', price: 25000, description: 'Kurir khusus' },
  { id: 'cod', name: 'COD', eta: '2-4 hari', price: 5000, description: 'Bayar di tempat', cod: true },
];

type PaymentMethodType = 'bank' | 'ewallet' | 'rekber' | 'cod';

const PAYMENT_METHODS: { id: string; name: string; icon: React.ElementType; desc: string; type: PaymentMethodType }[] = [
  { id: 'transfer', name: 'Transfer Bank', icon: CreditCard, desc: 'BCA, BRI, Mandiri, BNI', type: 'bank' },
  { id: 'ewallet', name: 'E-Wallet', icon: CreditCard, desc: 'GoPay, ShopeePay, Dana, OVO', type: 'ewallet' },
  { id: 'rekber', name: 'Rekber ThriftHub', icon: Star, desc: 'Dana aman via sistem rekber', type: 'rekber' },
  { id: 'cod', name: 'COD (Bayar di Tempat)', icon: Truck, desc: 'Bayar saat barang sampai', type: 'cod' },
];

export default function CheckoutPage() {
  const { isLoggedIn } = useAuth();
  const { 
    items, 
    selectedItems, 
    selectedCount, 
    selectedTotal, 
    cartCount, 
    clearSelected 
  } = useCart();
  const { placeOrder } = useOrder();
  const { getDefaultAddress } = useAddress();
  const { showToast } = useToast();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState<{
    name: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  }>(() => {
    const defaultAddr = getDefaultAddress();
    if (defaultAddr) {
      return {
        name: defaultAddr.name,
        phone: defaultAddr.phone,
        address: defaultAddr.address,
        city: defaultAddr.city,
        postalCode: defaultAddr.postalCode,
      };
    }
    return { name: '', phone: '', address: '', city: '', postalCode: '' };
  });
  const [shippingMethods, setShippingMethods] = useState<Record<number, string>>({});
  const [paymentMethod, setPaymentMethod] = useState<'transfer' | 'ewallet' | 'rekber' | 'cod'>('transfer');
  const [sellerNotes, setSellerNotes] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  // Group selected items by store
  const groupedItems: StoreGroup[] = useMemo(() => {
    const groups: Record<number, { store: string; storeId: number; items: CartItemData[] }> = {};
    selectedItems.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (!product) return;
      const storeId = product.storeId;
      if (!groups[storeId]) groups[storeId] = { store: product.store, storeId, items: [] };
      groups[storeId].items.push({ ...item, product });
    });
    return Object.values(groups);
  }, [selectedItems]);

  const storeTotals = useMemo(() => {
    const totals: Record<number, number> = {};
    groupedItems.forEach(group => {
      totals[group.storeId] = group.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    });
    return totals;
  }, [groupedItems]);

  // Calculate shipping fees per store
  const shippingFees = useMemo(() => {
    const fees: Record<number, number> = {};
    groupedItems.forEach(group => {
      const methodId = shippingMethods[group.storeId] || 'reguler';
      const method = SHIPPING_METHODS.find(m => m.id === methodId);
      fees[group.storeId] = method?.price || 0;
    });
    return fees;
  }, [groupedItems, shippingMethods]);

  const totalShipping = Object.values(shippingFees).reduce((sum, fee) => sum + fee, 0);
  const finalTotal = selectedTotal + totalShipping;

  // Validation
  const validateStep = useCallback((stepNum: number) => {
    const errs: Record<string, string> = {};
    
    if (stepNum >= 1) {
      if (!shippingAddress.name.trim()) errs.name = 'Nama penerima wajib diisi';
      if (!shippingAddress.phone.trim()) errs.phone = 'No. HP wajib diisi';
      else if (!/^(\+62|08)\d{6,14}$/.test(shippingAddress.phone.replace(/\s/g, ''))) errs.phone = 'Format HP tidak valid';
      if (!shippingAddress.address.trim()) errs.address = 'Alamat wajib diisi';
      if (!shippingAddress.city.trim()) errs.city = 'Kota wajib diisi';
      if (!shippingAddress.postalCode.trim()) errs.postalCode = 'Kode pos wajib diisi';
      else if (!/^\d{5}$/.test(shippingAddress.postalCode)) errs.postalCode = 'Kode pos harus 5 angka';
    }

    if (stepNum >= 2) {
      groupedItems.forEach(group => {
        if (!shippingMethods[group.storeId]) {
          errs[`shipping_${group.storeId}`] = `Pilih kurir untuk ${group.store}`;
        }
      });
      if (!paymentMethod) errs.payment = 'Pilih metode pembayaran';
    }

    return errs;
  }, [shippingAddress, shippingMethods, paymentMethod, groupedItems]);

  const handleNext = () => {
    const errs = validateStep(step);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      showToast('Lengkapi semua field yang diperlukan', 'error');
      return;
    }
    setErrors({});
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handlePlaceOrder = async () => {
    const errs = validateStep(3);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      showToast('Periksa kembali data pesanan', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderItems = selectedItems.map(item => {
        const product = products.find(p => p.id === item.productId)!;
        return {
          productId: product.id,
          productName: product.name,
          productImage: product.image,
          quantity: item.quantity,
          price: product.price,
          size: product.size,
          storeName: product.store,
        };
      });

      await placeOrder({
        items: orderItems,
        shipping: shippingAddress,
        paymentMethod,
        subtotal: selectedTotal,
        shippingFee: totalShipping,
        total: finalTotal,
        sellerNotes,
      });

      clearSelected();
      setIsSubmitting(false);
      router.push('/checkout/sukses');
      showToast('Pesanan berhasil dibuat!', 'success');
    } catch (error) {
      setIsSubmitting(false);
      showToast('Gagal membuat pesanan', 'error');
    }
  };

  // Guard clauses
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-neutral-200 p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck className="h-10 w-10 text-neutral-400" />
          </div>
          <h1 className="font-display text-2xl font-bold text-neutral-900 mb-2">Login Dulu!</h1>
          <p className="text-neutral-500 text-sm mb-6">Kamu perlu login untuk checkout.</p>
          <Link href="/login" className="inline-flex items-center gap-2 rounded-lg bg-[#E17100] px-6 py-3 text-white font-medium text-sm hover:bg-orange-600 transition-colors">
            Masuk <Truck className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  if (selectedCount === 0) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-neutral-200 p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck className="h-10 w-10 text-neutral-400" />
          </div>
          <h1 className="font-display text-2xl font-bold text-neutral-900 mb-2">Belum Ada Item Dipilih</h1>
          <p className="text-neutral-500 text-sm mb-6">Pilih produk dari keranjang untuk melanjutkan checkout.</p>
          <Link href="/keranjang" className="inline-flex items-center gap-2 rounded-lg bg-[#E17100] px-6 py-3 text-white font-medium text-sm hover:bg-orange-600 transition-colors">
            Ke Keranjang <Truck className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <main className="pt-16 pb-20 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-neutral-500">
            <Link href="/" className="hover:text-[#E17100] transition-colors">Beranda</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/keranjang" className="hover:text-[#E17100] transition-colors">Keranjang</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-neutral-900 font-medium">Checkout</span>
          </nav>

          {/* Progress Steps */}
          <div className="mb-8 flex items-center gap-2">
            {[
              { num: 1, label: 'Alamat' },
              { num: 2, label: 'Kurir & Bayar' },
              { num: 3, label: 'Konfirmasi' },
            ].map((s) => (
              <div key={s.num} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  s.num <= step ? 'bg-[#E17100] text-white' : 'bg-neutral-200 text-neutral-400'
                }`}>
                  {s.num < step ? <Check className="h-4 w-4" /> : s.num}
                </div>
                {s.num < 3 && <div className={`w-12 h-0.5 ${s.num < step ? 'bg-[#E17100]' : 'bg-neutral-200'}`} />}
              </div>
            ))}
            <span className="text-sm text-neutral-500 ml-2">
              {step === 1 ? 'Alamat Pengiriman' : step === 2 ? 'Kurir & Pembayaran' : 'Konfirmasi Pesanan'}
            </span>
          </div>

          <div className="grid lg:grid-cols-[65%_35%] gap-8">
            {/* LEFT: Form & Choices */}
            <div className="space-y-6">
              {/* Step 1: Shipping Address */}
              {step >= 1 && (
                <section className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
                    <h2 className="font-display text-lg font-bold text-neutral-900">Alamat Pengiriman</h2>
                    {step > 1 && (
                      <button
                        onClick={() => setStep(1)}
                        className="text-sm text-[#E17100] hover:underline"
                      >
                        Ubah
                      </button>
                    )}
                  </div>
                  
                  <div className="p-6 space-y-4">
                    {step === 1 && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <AddressInput
                            label="Nama Penerima"
                            value={shippingAddress.name}
                            onChange={e => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                            error={errors.name}
                            placeholder="Nama lengkap"
                            required
                          />
                          <AddressInput
                            label="No. HP"
                            value={shippingAddress.phone}
                            onChange={e => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                            error={errors.phone}
                            placeholder="081234567890"
                            type="tel"
                            required
                          />
                        </div>
                        <AddressInput
                          label="Alamat Lengkap"
                          value={shippingAddress.address}
                          onChange={e => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                          error={errors.address}
                          placeholder="Jl. Contoh No. 123, RT/RW, Kelurahan..."
                          multiline
                          rows={3}
                          required
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <AddressInput
                            label="Kota"
                            value={shippingAddress.city}
                            onChange={e => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                            error={errors.city}
                            placeholder="Malang"
                            required
                          />
                          <AddressInput
                            label="Kode Pos"
                            value={shippingAddress.postalCode}
                            onChange={e => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                            error={errors.postalCode}
                            placeholder="65123"
                            required
                          />
                        </div>
                        <button
                          onClick={() => {
                            const errs = validateStep(1);
                            if (Object.keys(errs).length > 0) {
                              setErrors(errs);
                              showToast('Lengkapi alamat pengiriman', 'error');
                              return;
                            }
                            setStep(2);
                          }}
                          className="w-full rounded-lg bg-[#E17100] py-3.5 text-white font-medium hover:bg-orange-600 transition-colors"
                        >
                          Lanjut ke Pemilihan Kurir & Pembayaran
                          <ChevronRight className="h-4 w-4 inline-block align-middle ml-1" />
                        </button>
                      </>
                    )}

                    {step > 1 && (
                      <div className="bg-neutral-50 rounded-lg p-4">
                        <p className="font-medium text-neutral-900">{shippingAddress.name}</p>
                        <p className="text-sm text-neutral-600">{shippingAddress.phone}</p>
                        <p className="text-sm text-neutral-600">{shippingAddress.address}, {shippingAddress.city} {shippingAddress.postalCode}</p>
                        <button
                          onClick={() => setStep(1)}
                          className="mt-3 text-sm text-[#E17100] hover:underline"
                        >
                          Ganti Alamat
                        </button>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Step 2: Products + Shipping Methods per Store */}
              {step >= 2 && (
                <section className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
                    <h2 className="font-display text-lg font-bold text-neutral-900">Produk & Kurir</h2>
                    {step > 2 && (
                      <button
                        onClick={() => setStep(2)}
                        className="text-sm text-[#E17100] hover:underline"
                      >
                        Ubah
                      </button>
                    )}
                  </div>

                  <div className="p-6 space-y-6">
                    {groupedItems.map(group => {
                      const storeData = stores.find(s => s.id === group.storeId);
                      const currentMethod = shippingMethods[group.storeId] || 'reguler';
                      const method = SHIPPING_METHODS.find(m => m.id === currentMethod);
                      const subtotal = storeTotals[group.storeId] || 0;

                      return (
                        <div key={group.storeId} className="border border-neutral-200 rounded-xl overflow-hidden">
                          {/* Store Header */}
                          <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-[#E17100]/10 flex items-center justify-center">
                                <span className="text-[#E17100] font-bold text-xs">{group.store.charAt(0)}</span>
                              </div>
                              <div>
                                <p className="font-semibold text-neutral-900 text-sm">{group.store}</p>
                                {storeData?.verified && (
                                  <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-medium">Terverifikasi</span>
                                )}
                              </div>
                            </div>
                            <span className="font-medium text-neutral-900">{formatPrice(subtotal)}</span>
                          </div>

                          {/* Items (read-only) */}
                          <div className="divide-y divide-neutral-200">
                            {group.items.map(cartItem => (
                              <div key={cartItem.product.id} className="flex gap-3 p-3">
                                <img src={cartItem.product.image} alt={cartItem.product.name} className="w-12 h-12 rounded-lg object-cover" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-neutral-900 truncate">{cartItem.product.name}</p>
                                  <p className="text-[10px] text-neutral-500">{cartItem.product.size} × {cartItem.quantity}</p>
                                </div>
                                <p className="text-sm font-medium text-neutral-900">{formatPrice(cartItem.product.price * cartItem.quantity)}</p>
                              </div>
                            ))}
                          </div>

                          {/* Shipping Method Selector */}
                          {step === 2 && (
                            <ShippingMethodSelector
                              storeId={group.storeId}
                              storeName={group.store}
                              subtotal={subtotal}
                              methods={SHIPPING_METHODS}
                              selectedMethod={currentMethod}
                              onSelect={(methodId) => setShippingMethods(prev => ({ ...prev, [group.storeId]: methodId }))}
                              error={errors[`shipping_${group.storeId}`]}
                            />
                          )}

                          {step > 2 && (
                            <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-200">
                              <p className="text-sm font-medium text-neutral-900">Kurir: {method?.name}</p>
                              <p className="text-xs text-neutral-500">Estimasi: {method?.eta} • {method?.price === 0 ? 'Gratis' : formatPrice(method?.price || 0)}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {step === 2 && (
                      <div className="pt-4">
                        <button
                          onClick={handleNext}
                          className="w-full rounded-lg bg-[#E17100] py-3.5 text-white font-medium hover:bg-orange-600 transition-colors"
                        >
                          Lanjut ke Pembayaran
                          <ChevronRight className="h-4 w-4 inline-block align-middle ml-1" />
                        </button>
                      </div>
                    )}

                    {step > 2 && (
                      <div className="pt-4">
                        <button
                          onClick={() => setStep(2)}
                          className="w-full rounded-lg border border-neutral-300 py-3.5 text-neutral-700 font-medium hover:bg-neutral-50 transition-colors"
                        >
                          Kembali ke Kurir & Pembayaran
                        </button>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Step 3: Payment Method + Seller Notes */}
              {step >= 3 && (
                <section className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
                    <h2 className="font-display text-lg font-bold text-neutral-900">Metode Pembayaran</h2>
                    {step > 3 && (
                      <button
                        onClick={() => setStep(3)}
                        className="text-sm text-[#E17100] hover:underline"
                      >
                        Ubah
                      </button>
                    )}
                  </div>

                  <div className="p-6 space-y-6">
                    {step === 3 && (
                      <>
                        {/* Payment Methods */}
                        <PaymentMethodSelector
                          methods={PAYMENT_METHODS}
                          selectedMethod={paymentMethod}
                          onSelect={(id: string) => setPaymentMethod(id as 'transfer' | 'ewallet' | 'rekber' | 'cod')}
                        />

                        {/* Seller Notes */}
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">Catatan untuk Penjual (Opsional)</label>
                          {groupedItems.map(group => (
                            <div key={group.storeId} className="mb-3">
                              <p className="text-xs text-neutral-500 mb-1">{group.store}</p>
                              <textarea
                                value={sellerNotes[group.storeId] || ''}
                                onChange={e => setSellerNotes(prev => ({ ...prev, [group.storeId]: e.target.value }))}
                                rows={2}
                                placeholder={`Catatan untuk ${group.store}...`}
                                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:border-[#E17100] focus:outline-none focus:ring-2 focus:ring-[#E17100]/20 resize-none"
                              />
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={handleNext}
                          className="w-full rounded-lg bg-[#E17100] py-3.5 text-white font-medium hover:bg-orange-600 transition-colors"
                        >
                          Lanjut ke Konfirmasi
                          <ChevronRight className="h-4 w-4 inline-block align-middle ml-1" />
                        </button>
                      </>
                    )}

                    {step > 3 && (
                      <div className="space-y-4">
                        {(() => {
                          const currentMethod = PAYMENT_METHODS.find(m => m.id === paymentMethod);
                          if (!currentMethod) return null;
                          const Icon = currentMethod.icon;
                          return (
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50">
                              <div className="w-10 h-10 rounded-lg bg-[#E17100]/10 flex items-center justify-center">
                                <Icon className="h-5 w-5 text-[#E17100]" />
                              </div>
                              <div>
                                <p className="font-medium text-neutral-900">{currentMethod.name}</p>
                                <p className="text-xs text-neutral-500">{currentMethod.desc}</p>
                              </div>
                            </div>
                          );
                        })()}
                        <button
                          onClick={() => setStep(3)}
                          className="w-full rounded-lg border border-neutral-300 py-3.5 text-neutral-700 font-medium hover:bg-neutral-50 transition-colors"
                        >
                          Kembali ke Pembayaran
                        </button>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Order Review (Step 4) */}
              {step >= 4 && (
                <section className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
                    <h2 className="font-display text-lg font-bold text-neutral-900">Konfirmasi Pesanan</h2>
                    <button
                      onClick={() => setStep(3)}
                      className="text-sm text-[#E17100] hover:underline"
                    >
                      Ubah
                    </button>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Shipping Address Review */}
                    <div className="bg-neutral-50 rounded-lg p-4">
                      <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2">Alamat Pengiriman</p>
                      <p className="font-medium text-neutral-900">{shippingAddress.name}</p>
                      <p className="text-sm text-neutral-600">{shippingAddress.phone}</p>
                      <p className="text-sm text-neutral-600">{shippingAddress.address}, {shippingAddress.city} {shippingAddress.postalCode}</p>
                    </div>

                    {/* Payment Method Review */}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50">
                      {(() => {
                        const currentMethod = PAYMENT_METHODS.find(m => m.id === paymentMethod);
                        if (!currentMethod) return null;
                        const Icon = currentMethod.icon;
                        return (
                          <div className="w-10 h-10 rounded-lg bg-[#E17100]/10 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-[#E17100]" />
                          </div>
                        );
                      })()}
                      <div>
                        <p className="font-medium text-neutral-900">{PAYMENT_METHODS.find(m => m.id === paymentMethod)?.name}</p>
                        <p className="text-xs text-neutral-500">{PAYMENT_METHODS.find(m => m.id === paymentMethod)?.desc}</p>
                      </div>
                    </div>

                    {/* Order Items Review */}
                    <div className="space-y-4">
                      {groupedItems.map(group => (
                        <div key={group.storeId} className="border border-neutral-200 rounded-xl overflow-hidden">
                          <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
                            <p className="text-xs font-medium text-[#E17100]">{group.store}</p>
                            <p className="font-medium text-neutral-900">{formatPrice(storeTotals[group.storeId] || 0)}</p>
                          </div>
                          <div className="divide-y divide-neutral-200">
                            {group.items.map(cartItem => (
                              <div key={cartItem.product.id} className="flex gap-3 p-3">
                                <img src={cartItem.product.image} alt={cartItem.product.name} className="w-10 h-10 rounded-lg object-cover" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-neutral-900 truncate">{cartItem.product.name}</p>
                                  <p className="text-[10px] text-neutral-500">{cartItem.product.size} × {cartItem.quantity}</p>
                                </div>
                                <p className="text-sm font-medium text-neutral-900">{formatPrice(cartItem.product.price * cartItem.quantity)}</p>
                              </div>
                            ))}
                          </div>
                          <div className="px-4 py-2 bg-neutral-50 border-t border-neutral-200">
                            <p className="text-xs text-neutral-500">Kurir: {SHIPPING_METHODS.find(m => m.id === shippingMethods[group.storeId])?.name}</p>
                            <p className="text-xs text-neutral-500">Ongkir: {shippingFees[group.storeId] === 0 ? 'Gratis' : formatPrice(shippingFees[group.storeId])}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handlePlaceOrder}
                      disabled={isSubmitting}
                      className="w-full rounded-lg bg-[#E17100] py-3.5 text-white font-semibold text-base hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                          Membuat Pesanan...
                        </>
                      ) : (
                        <>
                          <Check className="h-5 w-5" /> Buat Pesanan
                        </>
                      )}
                    </button>
                  </div>
                </section>
              )}
            </div>

            {/* RIGHT: Sticky Order Summary */}
            <div className="hidden lg:block">
              <OrderSummary
                groupedItems={groupedItems}
                storeTotals={storeTotals}
                shippingFees={shippingFees}
                selectedTotal={selectedTotal}
                totalShipping={totalShipping}
                finalTotal={finalTotal}
                selectedCount={selectedCount}
                paymentMethod={paymentMethod}
                shippingMethods={shippingMethods}
                onPlaceOrder={handlePlaceOrder}
                isSubmitting={isSubmitting}
                disabled={step < 4}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 shadow-xl px-4 py-3 z-50">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-neutral-500">{selectedCount} item</p>
            <p className="font-bold text-[#E17100]">{formatPrice(finalTotal)}</p>
          </div>
          {step < 4 ? (
            <button
              onClick={handleNext}
              className="flex-1 rounded-lg bg-[#E17100] py-3 text-white font-semibold hover:bg-orange-600 transition-colors"
            >
              Lanjut
            </button>
          ) : (
            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className="flex-1 rounded-lg bg-[#E17100] py-3 text-white font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50"
            >
              Buat Pesanan
            </button>
          )}
        </div>
      </div>

      {/* Address Modal */}
      <AddressModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        editingAddress={editingAddressId ? getDefaultAddress() : null}
        onSave={(address) => {
          if (editingAddressId) {
            // update
          } else {
            // add new - use as shipping address
            setShippingAddress({
              name: address.name,
              phone: address.phone,
              address: address.address,
              city: address.city,
              postalCode: address.postalCode,
            });
          }
          setShowAddressModal(false);
          setEditingAddressId(null);
        }}
      />
    </div>
  );
}

interface AddressInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  required?: boolean;
}

function AddressInput({ label, value, onChange, error, placeholder, type = 'text', multiline, rows = 3, required }: AddressInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-1.5 flex items-center gap-1">
        {label}
        {required && <span className="text-[#E17100]">*</span>}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={onChange}
          rows={rows}
          placeholder={placeholder}
          className={`w-full rounded-lg border px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-[#E17100] focus:outline-none focus:ring-2 focus:ring-[#E17100]/20 transition-colors resize-none ${error ? 'border-red-500' : 'border-neutral-300'}`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-lg border px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-[#E17100] focus:outline-none focus:ring-2 focus:ring-[#E17100]/20 transition-colors ${error ? 'border-red-500' : 'border-neutral-300'}`}
        />
      )}
      {error && <p className="text-[10px] text-red-500 mt-1">{error}</p>}
    </div>
  );
}

interface StoreGroup {
  storeId: number;
  store: string;
  items: CartItemData[];
}

interface OrderSummaryProps {
  groupedItems: StoreGroup[];
  storeTotals: Record<number, number>;
  shippingFees: Record<number, number>;
  selectedTotal: number;
  totalShipping: number;
  finalTotal: number;
  selectedCount: number;
  paymentMethod: string;
  shippingMethods: Record<number, string>;
  onPlaceOrder: () => void;
  isSubmitting: boolean;
  disabled: boolean;
}

function OrderSummary({
  groupedItems,
  storeTotals,
  shippingFees,
  selectedTotal,
  totalShipping,
  finalTotal,
  selectedCount,
  paymentMethod,
  shippingMethods,
  onPlaceOrder,
  isSubmitting,
  disabled,
}: OrderSummaryProps) {
  return (
    <div className="sticky top-24 space-y-4">
      {/* Order Items */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-neutral-200">
          <h2 className="font-display text-lg font-bold text-neutral-900">Ringkasan Pesanan</h2>
        </div>
        <div className="p-5 space-y-4 max-h-[400px] overflow-y-auto">
          {groupedItems.map(group => (
            <div key={group.storeId} className="space-y-2">
              <p className="text-xs font-medium text-[#E17100]">{group.store}</p>
              {group.items.map(cartItem => (
                <div key={cartItem.product.id} className="flex items-center gap-3">
                  <img src={cartItem.product.image} alt={cartItem.product.name} className="w-10 h-10 rounded-md object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-neutral-900 truncate">{cartItem.product.name}</p>
                    <p className="text-[10px] text-neutral-500">{cartItem.product.size} × {cartItem.quantity}</p>
                  </div>
                  <p className="text-xs font-medium text-neutral-900">{formatPrice(cartItem.product.price * cartItem.quantity)}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Summary per Store */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        <div className="p-5 space-y-3">
          <h3 className="font-medium text-neutral-900">Detail Ongkir</h3>
          {groupedItems.map(group => (
            <div key={group.storeId} className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-600">{group.store}</span>
                <span className="font-medium text-neutral-900">{formatPrice(shippingFees[group.storeId] || 0)}</span>
              </div>
              <p className="text-[10px] text-neutral-500 ml-4">
                {SHIPPING_METHODS.find(m => m.id === shippingMethods[group.storeId])?.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        <div className="p-5 space-y-3 border-b border-neutral-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-600">Subtotal Produk</span>
            <span className="font-medium text-neutral-900">{formatPrice(selectedTotal)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-600">Total Ongkir</span>
            <span className="font-medium text-neutral-900">{totalShipping === 0 ? 'Gratis' : formatPrice(totalShipping)}</span>
          </div>
        </div>
        <div className="p-5 space-y-3 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center justify-between">
            <span className="font-display text-base font-bold text-neutral-900">Total Pembayaran</span>
            <span className="font-display text-xl font-bold text-[#E17100]">{formatPrice(selectedTotal + totalShipping)}</span>
          </div>
          <p className="text-center text-xs text-neutral-500">
            {selectedCount} item • {groupedItems.length} toko
          </p>
        </div>
        <div className="p-5 bg-neutral-50">
          <button
            onClick={onPlaceOrder}
            disabled={disabled || isSubmitting}
            className="w-full rounded-lg bg-[#E17100] py-3.5 text-white font-semibold text-base hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                Memproses...
              </>
            ) : (
              <>
                <Check className="h-5 w-5" /> Buat Pesanan
              </>
            )}
          </button>
          <p className="text-center text-xs text-neutral-500 mt-2">
            Dengan membuat pesanan, Anda menyetujui <a href="/syarat-ketentuan" className="text-[#E17100] underline">Syarat & Ketentuan</a>
          </p>
        </div>
      </div>
    </div>
  );
}
