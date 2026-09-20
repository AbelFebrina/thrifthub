import { ReactNode } from 'react';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ShoppingBag, LogOut, LayoutDashboard, Users, Store, Tag, Package, Receipt, FileBarChart, ChevronRight } from 'lucide-react';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Kelola Pengguna', href: '/admin/users', icon: Users },
  { name: 'Kelola Seller & Verifikasi', href: '/admin/sellers', icon: Store, badgeKey: 'pendingStores' },
  { name: 'Kelola Kategori', href: '/admin/categories', icon: Tag },
  { name: 'Kelola Produk', href: '/admin/products', icon: Package },
  { name: 'Kelola Transaksi', href: '/admin/transactions', icon: Receipt },
  { name: 'Laporan', href: '/admin/reports', icon: FileBarChart },
];

function AdminLogout() {
  return (
    <form action="/api/auth/signout" method="POST">
      <button
        type="submit"
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
      >
        <LogOut className="h-5 w-5 shrink-0" aria-hidden="true" />
        <span className="flex-1 truncate">Keluar</span>
      </button>
    </form>
  );
}

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-cream font-sans antialiased">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-neutral-200 transform transition-transform duration-300 lg:translate-x-0">
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex h-16 items-center justify-center px-4 border-b border-neutral-200">
              <Link href="/admin/dashboard" className="flex items-center gap-2">
                <ShoppingBag className="h-7 w-7 text-[#E17100]" aria-hidden="true" />
                <span className="font-display text-xl font-bold tracking-tight text-[#221e1a]">ThriftHub</span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1" aria-label="Admin navigation">
              <AdminSidebar session={session} />
            </nav>

            {/* Footer - Logout */}
            <div className="p-3 border-t border-neutral-200">
              <AdminLogout />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 lg:pl-64 min-h-screen">
          {/* Topbar */}
          <AdminTopbar session={session} />

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}