'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useOrder } from '@/context/OrderContext';
import { getStatusLabel } from '@/context/OrderContext';
import {
  ArrowLeft, CheckCircle2, Clock, Truck, XCircle,
  MapPin, CreditCard, Package, ChevronDown,
} from 'lucide-react';
import Link from 'next/link';

const statusSteps = [
  { key: 'menunggu_pembayaran', label: 'Menunggu\nPembayaran', icon: Clock },
  { key: 'diproses', label: 'Diproses', icon: Truck },
  { key: 'dikirim', label: 'Dikirim', icon: Truck },
  { key: 'selesai', label: 'Selesai', icon: CheckCircle2 },
];

const statusColors: Record<string, string> = {
  menunggu_pembayaran: 'bg-amber-500',
  diproses: 'bg-blue-500',
  dikirim: 'bg-indigo-500',
  selesai: 'bg-green-500',
  dibatalkan: 'bg-red-500',
};

const statusBadgeColors: Record<string, string> = {
  menunggu_pembayaran: 'bg-amber-100 text-amber-800',
  diproses: 'bg-blue-100 text-blue-800',
  dikirim: 'bg-indigo-100 text-indigo-800',
  selesai: 'bg-green-100 text-green-800',
  dibatalkan: 'bg-red-100 text-red-800',
};

function formatPrice(price: number) {
  return 'Rp' + price.toLocaleString('id-ID');
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function PesananDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { orders, cancelOrder } = useOrder();
  const [canceling, setCanceling] = useState(false);

  const id = params.id as string;
  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="bg-white rounded-xl border border-[#e8dcc8] p-8 max-w-md w-full text-center">
          <XCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h1 className="font-display text-xl font-bold text-[#3e3028] mb-2">Pesanan Tidak Ditemukan</h1>
          <p className="text-[#a09080] text-sm mb-6">ID pesanan tidak valid atau sudah dihapus.</p>
          <Link href="/pesanan" className="inline-flex items-center gap-2 rounded-lg bg-[#8a5a2b] px-6 py-3 text-white font-medium text-sm hover:bg-[#704420] transition-colors">
            <ArrowLeft className="h-4 w-4" /> Lihat Pesanan
          </Link>
        </div>
      </div>
    );
  }

  const isMenunggu = order.status === 'menunggu_pembayaran';
  const isDibatalkan = order.status === 'dibatalkan';

  const currentStepIndex = statusSteps.findIndex(s => s.key === order.status);

  const handleCancel = () => {
    setCanceling(true);
    setTimeout(() => {
      cancelOrder(id);
      setCanceling(false);
      router.push('/pesanan');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-cream">
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back */}
          <div className="flex items-center gap-3 mb-6">
            <Link href="/pesanan" className="p-1.5 rounded-lg hover:bg-[#f7f2ea] transition-colors" aria-label="Kembali">
              <ArrowLeft className="h-5 w-5 text-[#a09080]" />
            </Link>
            <div>
              <h1 className="font-display text-2xl font-bold text-[#3e3028]">Detail Pesanan</h1>
              <p className="text-[#a09080] text-sm">{order.id}</p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center justify-between mb-6">
            <span className={`text-sm font-medium px-3 py-1.5 rounded-full ${statusBadgeColors[order.status]}`}>
              {getStatusLabel(order.status)}
            </span>
            <span className="text-sm text-[#a09080]">{formatDate(order.createdAt)}</span>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl border border-[#e8dcc8] p-6 mb-6">
            <h2 className="font-display text-lg font-bold text-[#3e3028] mb-4">Status Pesanan</h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#e8dcc8]" />
              <div className="flex flex-col gap-6">
                {statusSteps.map((step, i) => {
                  const Icon = step.icon;
                  const isActive = i <= currentStepIndex && !isDibatalkan;
                  const isLast = i === statusSteps.length - 1;
                  return (
                    <div key={step.key} className="relative flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                        isActive ? 'bg-[#8a5a2b] text-white' : 'bg-[#e8dcc8] text-[#a09080]'
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className={`font-medium text-sm ${isActive ? 'text-[#3e3028]' : 'text-[#a09080]'}`}>
                          {step.label.replace('\n', ' ')}
                        </p>
                        {i === currentStepIndex && !isDibatalkan && (
                          <p className="text-[10px] text-[#8a5a2b]">Sedang diproses</p>
                        )}
                      </div>
                    </div>
                  );
                })}
                {isDibatalkan && (
                  <div className="relative flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center z-10">
                      <XCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-red-600">Dibatalkan</p>
                      <p className="text-[10px] text-red-500">Pesanan dibatalkan</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-xl border border-[#e8dcc8] p-6 mb-6">
            <h2 className="font-display text-lg font-bold text-[#3e3028] mb-3">Alamat Pengiriman</h2>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-[#b8895a] mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-[#3e3028] text-sm">{order.shipping.name}</p>
                <p className="text-[#a09080] text-sm">{order.shipping.phone}</p>
                <p className="text-[#a09080] text-sm">{order.shipping.address}</p>
                <p className="text-[#a09080] text-sm">{order.shipping.city} {order.shipping.postalCode}</p>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-xl border border-[#e8dcc8] p-6 mb-6">
            <h2 className="font-display text-lg font-bold text-[#3e3028] mb-3">Metode Pembayaran</h2>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                order.paymentMethod === 'transfer' ? 'bg-[#8a5a2b]/10' : 'bg-blue-50'
              }`}>
                {order.paymentMethod === 'transfer'
                  ? <CreditCard className="h-5 w-5 text-[#8a5a2b]" />
                  : <Truck className="h-5 w-5 text-blue-600" />
                }
              </div>
              <div>
                <p className="font-semibold text-[#3e3028] text-sm">
                  {order.paymentMethod === 'transfer' ? 'Transfer Bank' : 'COD (Bayar di Tempat)'}
                </p>
                <p className="text-[10px] text-[#a09080]">
                  {order.paymentMethod === 'transfer' ? 'Transfer ke rekening ThriftHub' : 'Bayar saat menerima barang'}
                </p>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="bg-white rounded-xl border border-[#e8dcc8] p-6 mb-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-[#3e3028]">Detail Item</h2>
            <div className="space-y-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex gap-3 pb-4 border-b border-[#e8dcc8] last:border-0 last:pb-0">
                  <img src={item.productImage} alt={item.productName} className="w-20 h-20 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#3e3028] text-sm leading-tight">{item.productName}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-[#a09080]">{item.size}</span>
                      <span className="text-[10px] text-[#a09080]">× {item.quantity}</span>
                      <span className="text-[10px] text-[#a09080]">{item.storeName}</span>
                    </div>
                  </div>
                  <p className="font-medium text-[#3e3028] text-sm">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="bg-white rounded-xl border border-[#e8dcc8] p-6 mb-6 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#a09080]">Subtotal</span>
              <span className="text-[#3e3028]">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#a09080]">Ongkir</span>
              <span className="text-green-600 font-medium">Gratis</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-[#e8dcc8]">
              <span className="font-display text-lg font-bold text-[#3e3028]">Total Bayar</span>
              <span className="font-display text-xl font-bold text-[#8a5a2b]">{formatPrice(order.total)}</span>
            </div>
          </div>

          {/* Actions */}
          {isMenunggu && (
            <button
              onClick={handleCancel}
              disabled={canceling}
              className="w-full rounded-lg bg-red-500 py-3.5 text-white font-medium text-sm hover:bg-red-600 transition-colors disabled:opacity-50 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {canceling ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Membatalkan...
                </>
              ) : (
                <><XCircle className="h-5 w-5" /> Batalkan Pesanan</>
              )}
            </button>
          )}

          {isDibatalkan && (
            <div className="bg-red-50 rounded-xl border border-red-200 p-4 text-center">
              <p className="text-sm text-red-600 font-medium">Pesanan telah dibatalkan</p>
              <Link href="/pesanan" className="inline-flex items-center gap-2 rounded-lg bg-[#8a5a2b] px-6 py-3 text-white font-medium text-sm hover:bg-[#704420] transition-colors mt-3">
                <ArrowLeft className="h-4 w-4" /> Lihat Semua Pesanan
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
