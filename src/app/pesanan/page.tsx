'use client';

import { useState } from 'react';
import { useOrder } from '@/context/OrderContext';
import { getStatusLabel } from '@/context/OrderContext';
import { ArrowLeft, Package, Clock, CheckCircle2, Truck, XCircle, Edit3, ChevronDown } from 'lucide-react';
import Link from 'next/link';

const statusTabs = [
  { key: 'semua', label: 'Semua', icon: Package },
  { key: 'menunggu_pembayaran', label: 'Menunggu\nPembayaran', icon: Clock },
  { key: 'diproses', label: 'Diproses', icon: Truck },
  { key: 'dikirim', label: 'Dikirim', icon: Truck },
  { key: 'selesai', label: 'Selesai', icon: CheckCircle2 },
  { key: 'dibatalkan', label: 'Dibatalkan', icon: XCircle },
];

const statusColors: Record<string, string> = {
  menunggu_pembayaran: 'bg-amber-100 text-amber-800',
  diproses: 'bg-blue-100 text-blue-800',
  dikirim: 'bg-indigo-100 text-indigo-800',
  selesai: 'bg-green-100 text-green-800',
  dibatalkan: 'bg-red-100 text-red-800',
};

const statusDotColors: Record<string, string> = {
  menunggu_pembayaran: 'bg-amber-500',
  diproses: 'bg-blue-500',
  dikirim: 'bg-indigo-500',
  selesai: 'bg-green-500',
  dibatalkan: 'bg-red-500',
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

export default function PesananPage() {
  const { orders } = useOrder();
  const [activeTab, setActiveTab] = useState('semua');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const filteredOrders = activeTab === 'semua'
    ? orders
    : orders.filter(o => o.status === activeTab);

  const activeTabCount = activeTab === 'semua'
    ? orders.length
    : orders.filter(o => o.status === activeTab).length;

  return (
    <div className="min-h-screen bg-cream">
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <Link href="/" className="p-1.5 rounded-lg hover:bg-[#f7f2ea] transition-colors" aria-label="Kembali">
              <ArrowLeft className="h-5 w-5 text-[#a09080]" />
            </Link>
            <div>
              <h1 className="font-display text-2xl font-bold text-[#3e3028]">Riwayat Pesanan</h1>
              <p className="text-[#a09080] text-sm">{orders.length} pesanan ditemukan</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-6 mb-8 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
            {statusTabs.map(tab => {
              const isActive = activeTab === tab.key;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => { setActiveTab(tab.key); setExpandedOrder(null); }}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#8a5a2b] text-white'
                      : 'bg-white text-[#a09080] border border-[#e8dcc8] hover:border-[#b8895a]'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className={`text-[10px] ${isActive ? 'text-white/70' : 'text-[#a09080]'}`}>
                    {tab.key === 'semua' ? orders.length : orders.filter(o => o.status === tab.key).length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-xl border border-[#e8dcc8] p-12 text-center">
              <Package className="h-12 w-12 text-[#b8895a] mx-auto mb-4" />
              <h3 className="font-display text-lg font-bold text-[#3e3028] mb-2">Tidak Ada Pesanan</h3>
              <p className="text-[#a09080] text-sm mb-6">
                {activeTab === 'semua'
                  ? 'Belum pernah berbelanja. Yuk mulai belanja!'
                  : `Tidak ada pesanan dengan status "${getStatusLabel(activeTab)}".`}
              </p>
              <Link href="/produk" className="inline-flex items-center gap-2 rounded-lg bg-[#8a5a2b] px-6 py-3 text-white font-medium text-sm hover:bg-[#704420] transition-colors">
                Jelajahi Produk <Package className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map(order => {
                const isExpanded = expandedOrder === order.id;
                const storeNames = [...new Set(order.items.map(i => i.storeName))];
                const totalItems = order.items.reduce((sum, i) => sum + i.quantity, 0);
                const allSelesai = order.status === 'selesai';

                return (
                  <div key={order.id} className="bg-white rounded-xl border border-[#e8dcc8] overflow-hidden">
                    {/* Order Header */}
                    <button
                      type="button"
                      onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                      className="w-full flex items-center justify-between p-4 hover:bg-[#faf6f0] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2.5 h-2.5 rounded-full ${statusDotColors[order.status]}`} />
                        <div className="text-left">
                          <p className="font-semibold text-[#3e3028] text-sm">{order.id}</p>
                          <p className="text-[10px] text-[#a09080]">{formatDate(order.createdAt)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                          <p className="font-medium text-[#3e3028] text-sm">{formatPrice(order.total)}</p>
                          <p className="text-[10px] text-[#a09080]">{totalItems} item{totalItems > 1 ? 's' : ''}</p>
                        </div>
                        <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${statusColors[order.status]}`}>
                          {getStatusLabel(order.status)}
                        </span>
                        <ChevronDown className={`h-4 w-4 text-[#a09080] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    </button>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-0 border-t border-[#e8dcc8] space-y-4 animate-fade-in">
                        {/* Store Items */}
                        <div className="space-y-4 pt-3">
                          {storeNames.map(storeName => (
                            <div key={storeName}>
                              <p className="text-xs font-medium text-[#8a5a2b] mb-2">{storeName}</p>
                              <div className="space-y-3">
                                {order.items.filter(i => i.storeName === storeName).map((item, i) => (
                                  <div key={i} className="flex gap-3">
                                    <img src={item.productImage} alt={item.productName} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-[#3e3028] line-clamp-1">{item.productName}</p>
                                      <p className="text-[10px] text-[#a09080]">{item.size} × {item.quantity}</p>
                                    </div>
                                    <p className="text-sm font-medium text-[#3e3028]">{formatPrice(item.price * item.quantity)}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Total */}
                        <div className="flex items-center justify-between pt-3 border-t border-[#e8dcc8]">
                          <span className="text-sm text-[#a09080]">Total Bayar</span>
                          <span className="font-display text-base font-bold text-[#8a5a2b]">{formatPrice(order.total)}</span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex gap-2">
                            {order.paymentMethod === 'transfer' && order.status === 'menunggu_pembayaran' && (
                              <button className="rounded-lg border border-[#e8dcc8] px-4 py-2 text-sm font-medium text-[#705548] hover:bg-[#f7f2ea] transition-colors">
                                Bayar Sekarang
                              </button>
                            )}
                            {allSelesai && (
                              <Link href={`/produk`} className="rounded-lg bg-[#8a5a2b] px-4 py-2 text-sm font-medium text-white hover:bg-[#704420] transition-colors flex items-center gap-1.5">
                                <Edit3 className="h-3.5 w-3.5" /> Beri Ulasan
                              </Link>
                            )}
                          </div>
                          <Link href="/" className="text-sm text-[#8a5a2b] font-medium hover:text-[#704420] transition-colors">
                            Lihat Detail →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <style>{`@keyframes fade-in { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} } .animate-fade-in { animation: fade-in 150ms ease-out both; }`}</style>
    </div>
  );
}

