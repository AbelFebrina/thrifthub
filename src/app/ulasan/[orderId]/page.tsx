'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useOrder } from '@/context/OrderContext';
import { useReview } from '@/context/ReviewContext';
import { getStatusLabel } from '@/context/OrderContext';
import StarRating from '@/components/StarRating';
import {
  ArrowLeft, Star, Send, Check, Package, Truck,
} from 'lucide-react';
import Link from 'next/link';

function formatPrice(price: number) {
  return 'Rp' + price.toLocaleString('id-ID');
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

export default function UlasanPage() {
  const params = useParams();
  const router = useRouter();
  const { getOrderById } = useOrder();
  const { hasReviewed, getReview, submitReview } = useReview();
  const orderId = params.id as string;

  const order = getOrderById(orderId);
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [comments, setComments] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!order) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="bg-white rounded-xl border border-[#e8dcc8] p-8 max-w-md w-full text-center">
          <Package className="h-12 w-12 text-[#b8895a] mx-auto mb-4" />
          <h1 className="font-display text-xl font-bold text-[#3e3028] mb-2">Pesanan Tidak Ditemukan</h1>
          <p className="text-[#a09080] text-sm mb-6">Data pesanan tidak tersedia.</p>
          <Link href="/pesanan" className="inline-flex items-center gap-2 rounded-lg bg-[#8a5a2b] px-6 py-3 text-white font-medium text-sm hover:bg-[#704420] transition-colors">
            <ArrowLeft className="h-4 w-4" /> Lihat Pesanan
          </Link>
        </div>
      </div>
    );
  }

  const canReview = order.status === 'selesai';

  const handleSubmit = () => {
    const unratedItems = order.items.filter(item => !ratings[item.productId]);
    if (unratedItems.length > 0) {
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      order.items.forEach(item => {
        const existingReview = hasReviewed(orderId, item.productId);
        if (existingReview) {
          submitReview(orderId, item.productId, ratings[item.productId], comments[item.productId]);
        } else {
          submitReview(orderId, item.productId, ratings[item.productId], comments[item.productId]);
        }
      });
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const allRated = order.items.every(item => ratings[item.productId] && ratings[item.productId] > 0);

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="bg-white rounded-xl border border-[#e8dcc8] p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-[#8a5a2b]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-[#8a5a2b]" />
          </div>
          <h1 className="font-display text-2xl font-bold text-[#3e3028] mb-2">Ulasan Terkirim!</h1>
          <p className="text-[#a09080] text-sm mb-6">Terima kasih atas ulasanmu.</p>
          <Link href="/pesanan" className="inline-flex items-center gap-2 rounded-lg bg-[#8a5a2b] px-6 py-3 text-white font-medium text-sm hover:bg-[#704420] transition-colors">
            Lihat Pesanan <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <main className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back */}
          <div className="flex items-center gap-3 mb-6">
            <Link href={`/pesanan/${orderId}`} className="p-1.5 rounded-lg hover:bg-[#f7f2ea] transition-colors" aria-label="Kembali">
              <ArrowLeft className="h-5 w-5 text-[#a09080]" />
            </Link>
            <div>
              <h1 className="font-display text-2xl font-bold text-[#3e3028]">Ulasan Pesanan</h1>
              <p className="text-[#a09080] text-sm">{order.id} · {formatDate(order.createdAt)}</p>
            </div>
          </div>

          {/* Order Info Card */}
          <div className="bg-white rounded-xl border border-[#e8dcc8] p-5 mb-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#3e3028] text-sm">{order.id}</span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  order.status === 'selesai' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {getStatusLabel(order.status)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#a09080]">
              <Truck className="h-4 w-4" />
              <span>{order.items.length} produk · {formatPrice(order.total)}</span>
            </div>
            {!canReview && (
              <div className="bg-amber-50 rounded-lg p-3 text-sm text-amber-700 flex items-center gap-2">
                <Star className="h-4 w-4 shrink-0" />
                Ulasan hanya bisa diberikan setelah pesanan selesai.
              </div>
            )}
          </div>

          {/* Products List */}
          <div className="space-y-4 mb-6">
            <h2 className="font-display text-lg font-bold text-[#3e3028]">Beri Nilai untuk Setiap Produk</h2>

            {order.items.map(item => {
              const reviewed = hasReviewed(orderId, item.productId);
              const existingRating = getReview(orderId, item.productId);
              const currentRating = reviewed ? existingRating?.rating : (ratings[item.productId] || 0);
              const currentComment = comments[item.productId] || '';

              return (
                <div key={item.productId} className="bg-white rounded-xl border border-[#e8dcc8] p-5">
                  <div className="flex gap-4">
                    <img src={item.productImage} alt={item.productName} className="w-20 h-20 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[#3e3028] text-sm leading-tight line-clamp-1">{item.productName}</p>
                          <p className="text-[10px] text-[#a09080] mt-1">{item.storeName} · {item.size} · {formatPrice(item.price)}</p>
                        </div>
                        {reviewed && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700 shrink-0">
                            <Check className="h-3 w-3 inline-block align-middle mr-0.5" /> Sudah diulas
                          </span>
                        )}
                      </div>

                      {!reviewed && (
                        <div className="mt-3 space-y-3">
                          <div>
                            <p className="text-xs text-[#a09080] mb-1">Beri rating:</p>
                            <StarRating
                              initialRating={ratings[item.productId]}
                              onRate={(rating) => setRatings(prev => ({ ...prev, [item.productId]: rating }))}
                            />
                          </div>
                          <div>
                            <textarea
                              value={comments[item.productId]}
                              onChange={e => setComments(prev => ({ ...prev, [item.productId]: e.target.value }))}
                              placeholder="Tulis komentarmu..."
                              rows={2}
                              className="w-full rounded-lg border border-[#e8dcc8] px-3 py-2 text-[#3e3028] text-sm placeholder-[#b8895a] focus:outline-none focus:ring-2 focus:ring-[#8a5a2b]/20 focus:border-[#8a5a2b] resize-none"
                            />
                          </div>
                        </div>
                      )}

                      {reviewed && existingRating && (
                        <div className="mt-2">
                          <div className="flex items-center gap-2">
                            <StarRating readonly initialRating={existingRating.rating} />
                            <span className="text-xs text-[#8a5a2b] font-medium">{existingRating.rating}/5</span>
                          </div>
                          <p className="text-sm text-[#705548] mt-1">{existingRating.comment}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!allRated || submitting}
            className="w-full rounded-lg bg-[#8a5a2b] py-3.5 text-white font-medium text-sm hover:bg-[#704420] transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                Mengirim Ulasan...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" /> Kirim Semua Ulasan
              </>
            )}
          </button>

          {/* Info */}
          <p className="text-center text-[10px] text-[#a09080] mt-3">
            Setiap produk hanya bisa diulas sekali.
          </p>
        </div>
      </main>
    </div>
  );
}
