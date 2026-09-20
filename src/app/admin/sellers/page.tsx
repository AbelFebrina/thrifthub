'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { Store, User, MapPin, Calendar, Check, X, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

interface Store {
  id: string;
  name: string;
  slug: string;
  city: string;
  createdAt: string;
  status: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface PendingStore {
  id: string;
  name: string;
  city: string;
  createdAt: string;
  user: {
    name: string;
  };
}

export default function AdminSellersPage() {
  const [pendingStores, setPendingStores] = useState<PendingStore[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchPendingStores = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/stores/pending');
      if (!res.ok) throw new Error('Gagal memuat data');
      const data = await res.json();
      setPendingStores(data);
    } catch (err) {
      setError('Gagal memuat daftar toko menunggu verifikasi');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (storeId: string, action: 'approve' | 'reject') => {
    setProcessingIds(prev => new Set(prev).add(storeId));
    setError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch(`/api/admin/stores/${storeId}/verify`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Gagal memverifikasi toko');
      }

      setSuccessMessage(`Toko "${data.name}" berhasil ${action === 'approve' ? 'diverifikasi' : 'ditolak'}`);
      setPendingStores(prev => prev.filter(s => s.id !== storeId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setProcessingIds(prev => {
        const next = new Set(prev);
        next.delete(storeId);
        return next;
      });
    }
  };

  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), 'dd MMMM yyyy', { locale: localeId });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-neutral-900">Kelola Seller & Verifikasi</h1>
        <p className="mt-1 text-neutral-600">Kelola verifikasi toko dan kelola seller platform</p>
      </div>

      {/* Stats Row */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Seller"
          value="—"
          icon={<Store className="h-6 w-6" />}
          color="bg-green-100 text-green-600"
        />
        <StatCard
          label="Menunggu Verifikasi"
          value="—"
          subLabel="Belum diverifikasi"
          icon={<AlertCircle className="h-6 w-6" />}
          color="bg-amber-100 text-amber-600"
        />
        <StatCard
          label="Seller Aktif"
          value="—"
          icon={<CheckCircle className="h-6 w-6" />}
          color="bg-green-100 text-green-600"
        />
        <StatCard
          label="Ditolak"
          value="—"
          icon={<X className="h-6 w-6" />}
          color="bg-red-100 text-red-600"
        />
      </div>

      {/* Pending Stores Section */}
      <section className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-bold text-neutral-900">Toko Menunggu Verifikasi</h2>
              <p className="mt-0.5 text-sm text-neutral-500">Maksimal 5 toko terbaru yang menunggu verifikasi</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <p className="text-red-600">{error}</p>
              <button
                onClick={fetchPendingStores}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#E17100] px-4 py-2 text-white text-sm font-medium hover:bg-orange-600 transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          ) : pendingStores.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-neutral-900 mb-1">Tidak ada toko yang menunggu verifikasi</h3>
              <p className="text-neutral-500">Semua toko sudah diverifikasi atau ditolak</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingStores.map((store) => (
                <PendingStoreRow
                  key={store.id}
                  store={store}
                  onVerify={(action) => handleVerify(store.id, action)}
                  isProcessing={processingIds.has(store.id)}
                />
              ))}
            </div>
          )
        }

          {successMessage && (
            <div className="mt-4 p-4 rounded-lg bg-green-50 border border-green-200 flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
              <p className="text-green-700">{successMessage}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value, subLabel, icon, color }: {
  label: string;
  value: string | number;
  subLabel?: string | null;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-neutral-500 font-medium">{label}</p>
          <p className="mt-2 text-3xl font-bold text-neutral-900">{value}</p>
          {subLabel && (
            <p className="mt-1 text-sm text-amber-600 flex items-center gap-1">
              <span className="w-3.5 h-3.5 rounded-full bg-amber-500" />
              {subLabel}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function PendingStoreRow({ store, onVerify, isProcessing }: {
  store: PendingStore;
  onVerify: (action: 'approve' | 'reject') => void;
  isProcessing: boolean;
}) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-neutral-200 hover:bg-neutral-50 transition-colors">
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-neutral-900 truncate">{store.name}</p>
        <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm text-neutral-500">
          <span className="flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            <span>{store.user.name}</span>
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            <span>{store.city}</span>
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{format(new Date(store.createdAt), 'dd MMM yyyy', { locale: localeId })}</span>
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => onVerify('approve')}
          disabled={isProcessing}
          className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-white text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Check className="h-4 w-4" />
          <span>Verifikasi</span>
        </button>
        <button
          onClick={() => onVerify('reject')}
          disabled={isProcessing}
          className="inline-flex items-center gap-1.5 rounded-lg border border-red-300 bg-white px-3 py-2 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <X className="h-4 w-4" />
          <span>Tolak</span>
        </button>
        {isProcessing && (
          <Loader2 className="h-5 w-5 animate-spin text-neutral-400" />
        )}
      </div>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-neutral-200 animate-pulse">
      <div className="w-10 h-10 rounded-lg bg-neutral-200" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-neutral-200 rounded w-3/4" />
        <div className="h-3 bg-neutral-200 rounded w-1/2" />
        <div className="h-3 bg-neutral-200 rounded w-1/3" />
      </div>
      <div className="flex gap-2 shrink-0">
        <div className="w-24 h-10 rounded-lg bg-neutral-200" />
        <div className="w-20 h-10 rounded-lg bg-neutral-200" />
      </div>
    </div>
  );
}