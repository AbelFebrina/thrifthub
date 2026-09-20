'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOrder } from '@/context/OrderContext';
import { useAuth } from '@/context/AuthContext';
import { Check, ArrowLeft, ShoppingBag, Truck, CreditCard } from 'lucide-react';
import Link from 'next/link';

function formatPrice(price: number) {
  return 'Rp' + price.toLocaleString('id-ID');
}

export default function CheckoutSuksesPage() {
  const router = useRouter();
  const { orders } = useOrder();
  const { user } = useAuth();
  const [latestOrder, setLatestOrder] = useState(typeof window !== 'undefined' ? orders[0] : null);

  useEffect(() => {
    setLatestOrder(orders[0] || null);
  }, [orders]);

  if (!latestOrder) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="bg-white rounded-xl border border-[#e8dcc8] p-8 max-w-md w-full text-center">
          <h1 className="font-display text-2xl font-bold text-[#3e3028] mb-2">Pesanan Tidak Ditemukan</h1>
          <p className="text-[#a09080] text-sm mb-6">Data pesanan tidak tersedia.</p>
          <Link href="/" className="inline-flex items-center gap-2 rounded-lg bg-[#8a5a2b] px-6 py-3 text-white font-medium text-sm hover:bg-[#704420] transition-colors">
            Kembali ke Beranda <ShoppingBag className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const paymentInfo = latestOrder.paymentMethod === 'transfer'
    ? {
        label: 'Transfer Bank',
        instructions: 'Silakan transfer ke rekening ThriftHub berikut dalam 24 jam:',
        bankName: 'BCA',
        accountNumber: '1234567890',
        accountHolder: 'ThriftHub Official',
      }
    : {
        label: 'COD (Bayar di Tempat)',
        instructions: 'Siapkan pembayaran sesuai total yang tertera.',
        bankName: '-',
        accountNumber: '-',
        accountHolder: '-',
      };

  return (
    <div className="min-h-screen bg-cream">
      <main className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#a09080] mb-6">
            <Link href="/" className="hover:text-[#8a5a2b] transition-colors">Beranda</Link>
            <ArrowLeft className="h-3 w-3" />
            <Link href="/checkout" className="hover:text-[#8a5a2b] transition-colors">Checkout</Link>
            <ArrowLeft className="h-3 w-3" />
            <span className="text-[#3e3028] font-medium">Sukses</span>
          </nav>

          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-[#8a5a2b]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-12 w-12 text-[#8a5a2b]" />
            </div>
            <h1 className="font-display text-3xl font-bold text-[#3e3028] mb-2">Pesanan Berhasil!</h1>
            <p className="text-[#a09080] text-sm">Terima kasih atas pembelianmu, {user?.name || ''}.</p>
          </div>

          {/* Order Number Card */}
          <div className="bg-white rounded-xl border border-[#e8dcc8] p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#a09080]">Nomor Pesanan</p>
                <p className="font-display text-xl font-bold text-[#8a5a2b]">{latestOrder.id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#a09080]">Tanggal</p>
                <p className="text-sm font-medium text-[#3e3028]">
                  {new Date(latestOrder.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric',
                    hour: '2-digit', minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Summary Card */}
          <div className="bg-white rounded-xl border border-[#e8dcc8] p-6 mb-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-[#3e3028]">Ringkasan Pesanan</h2>

            {/* Items */}
            <div className="space-y-3">
              {latestOrder.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 pb-3 border-b border-[#e8dcc8] last:border-0 last:pb-0">
                  <img src={item.productImage} alt={item.productName} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#3e3028] text-sm truncate">{item.productName}</p>
                    <p className="text-[10px] text-[#a09080]">{item.size} × {item.quantity}</p>
                    <p className="text-xs text-[#a09080]">{item.storeName}</p>
                  </div>
                  <p className="font-medium text-[#3e3028] text-sm">{item.quantity}x</p>
                  <p className="font-medium text-[#3e3028] text-sm">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#a09080]">Subtotal</span>
                <span className="text-[#3e3028]">{formatPrice(latestOrder.subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#a09080]">Ongkir</span>
                <span className="text-green-600 font-medium">Gratis</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#e8dcc8]">
                <span className="font-display text-base font-bold text-[#3e3028]">Total Bayar</span>
                <span className="font-display text-xl font-bold text-[#8a5a2b]">{formatPrice(latestOrder.total)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-xl border border-[#e8dcc8] p-6 mb-6">
            <h2 className="font-display text-lg font-bold text-[#3e3028] mb-4">Metode Pembayaran</h2>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#8a5a2b]/10 flex items-center justify-center">
                {latestOrder.paymentMethod === 'transfer' ? <CreditCard className="h-5 w-5 text-[#8a5a2b]" /> : <Truck className="h-5 w-5 text-blue-600" />}
              </div>
              <p className="font-semibold text-[#3e3028]">{paymentInfo.label}</p>
            </div>
            {latestOrder.paymentMethod === 'transfer' && (
              <div className="bg-[#f7f2ea] rounded-lg p-4 space-y-3">
                <p className="text-sm text-[#a09080]">{paymentInfo.instructions}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#a09080]">Bank</span>
                    <span className="text-sm font-medium text-[#3e3028]">{paymentInfo.bankName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#a09080]">No. Rekening</span>
                    <span className="text-sm font-mono font-medium text-[#3e3028]">{paymentInfo.accountNumber}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#a09080]">Atas Nama</span>
                    <span className="text-sm font-medium text-[#3e3028]">{paymentInfo.accountHolder}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Shipping Info */}
          <div className="bg-white rounded-xl border border-[#e8dcc8] p-6 mb-8 space-y-2">
            <h2 className="font-display text-lg font-bold text-[#3e3028] mb-3">Alamat Pengiriman</h2>
            <div className="flex items-start gap-2">
              <Truck className="h-4 w-4 text-[#b8895a] mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-[#3e3028] text-sm">{latestOrder.shipping.name}</p>
                <p className="text-[#a09080] text-xs">{latestOrder.shipping.phone}</p>
                <p className="text-[#a09080] text-xs">{latestOrder.shipping.address}, {latestOrder.shipping.city} {latestOrder.shipping.postalCode}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link href="/" className="block w-full text-center rounded-lg bg-[#8a5a2b] py-3.5 text-white font-medium text-sm hover:bg-[#704420] transition-colors active:scale-[0.98]">
              <ShoppingBag className="h-5 w-5 inline-block align-middle mr-2" /> Belanja Lagi
            </Link>
            <Link href={`/pesanan/${latestOrder.id}`} className="block w-full text-center rounded-lg border border-[#e8dcc8] py-3.5 text-[#705548] font-medium text-sm hover:bg-[#f7f2ea] transition-colors active:scale-[0.98]">
              <Truck className="h-5 w-5 inline-block align-middle mr-2" /> Lihat Pesanan Saya
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

