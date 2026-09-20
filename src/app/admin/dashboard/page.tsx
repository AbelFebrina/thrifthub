import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Users, Store, Package, Receipt, CheckCircle, Clock, ArrowRight, User, MapPin } from 'lucide-react';

async function getDashboardStats() {
  const [
    totalUsers,
    activeStores,
    pendingStores,
    totalProducts,
    totalOrders,
    completedOrdersTotal,
    pendingStoresList,
  ] = await Promise.all([
    prisma.user.count({ where: { role: 'USER' } }),
    prisma.store.count({ where: { status: 'ACTIVE' } }),
    prisma.store.count({ where: { status: 'PENDING' } }),
    prisma.product.count({ where: { isActive: true } }),
    prisma.order.count(),
    prisma.order.aggregate({
      where: { status: 'COMPLETED' },
      _sum: { total: true },
    }),
    prisma.store.findMany({
      where: { status: 'PENDING' },
      orderBy: { createdAt: 'desc' },
      take: 3,
      select: {
        id: true,
        name: true,
        city: true,
        createdAt: true,
        user: { select: { name: true } },
      },
    }),
  ]);

  return {
    totalUsers,
    activeStores,
    pendingStores,
    totalProducts,
    totalOrders,
    completedRevenue: completedOrdersTotal._sum.total || 0,
    pendingStoresList,
  };
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const statsCards = [
    {
      label: 'Total Pengguna',
      value: stats.totalUsers.toLocaleString('id-ID'),
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Total Seller',
      value: stats.activeStores.toLocaleString('id-ID'),
      subLabel: stats.pendingStores > 0 ? `${stats.pendingStores} menunggu verifikasi` : null,
      icon: Store,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Total Produk',
      value: stats.totalProducts.toLocaleString('id-ID'),
      icon: Package,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      label: 'Total Transaksi',
      value: stats.totalOrders.toLocaleString('id-ID'),
      subLabel: `Rp ${stats.completedRevenue.toLocaleString('id-ID')} completed`,
      icon: Receipt,
      color: 'bg-amber-100 text-amber-600',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-neutral-900">Dashboard Admin</h1>
        <p className="mt-1 text-neutral-600">Ringkasan platform ThriftHub</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card, index) => (
          <div
            key={card.label}
            className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-neutral-500 font-medium">{card.label}</p>
                <p className="mt-2 text-3xl font-bold text-neutral-900">{card.value}</p>
                {card.subLabel && (
                  <p className="mt-1 text-sm text-amber-600 flex items-center gap-1">
                    <CheckCircle className="h-3.5 w-3.5" />
                    {card.subLabel}
                  </p>
                )}
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}>
                <card.icon className="h-6 w-6" aria-hidden="true" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toko Menunggu Verifikasi Preview */}
      {stats.pendingStores > 0 && (
        <section className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-neutral-900">Toko Menunggu Verifikasi</h2>
            <Link
              href="/admin/sellers"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#E17100] hover:text-orange-600 transition-colors"
            >
              Lihat Semua
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {stats.pendingStoresList.map((store) => (
                <div
                  key={store.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-neutral-200 hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#E17100]/10 flex items-center justify-center">
                      <Store className="h-5 w-5 text-[#E17100]" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-neutral-900 truncate">{store.name}</p>
                      <div className="flex items-center gap-2 text-sm text-neutral-500">
                        <span className="flex items-center gap-1">
                          <User className="h-3.5 w-3.5" />
                          <span>{store.user.name}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{store.city}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{new Date(store.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-700 px-2 py-0.5 text-[10px] font-medium">
                      <Clock className="h-2.5 w-2.5" />
                      Menunggu
                    </span>
                    <Link
                      href={`/admin/sellers`}
                      className="inline-flex items-center gap-1 rounded-lg bg-[#E17100] px-3 py-1.5 text-white text-xs font-medium hover:bg-orange-600 transition-colors"
                    >
                      Verifikasi
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}