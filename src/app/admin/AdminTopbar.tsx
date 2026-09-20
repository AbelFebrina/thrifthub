'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, User, LogOut } from 'lucide-react';

interface AdminTopbarProps {
  session: any;
}

export function AdminTopbar({ session }: { session: any }) {
  const pathname = usePathname();

  const getPageTitle = (path: string) => {
    if (path === '/admin/dashboard') return 'Dashboard';
    if (path.startsWith('/admin/users')) return 'Kelola Pengguna';
    if (path.startsWith('/admin/sellers')) return 'Kelola Seller & Verifikasi';
    if (path.startsWith('/admin/categories')) return 'Kelola Kategori';
    if (path.startsWith('/admin/products')) return 'Kelola Produk';
    if (path.startsWith('/admin/transactions')) return 'Kelola Transaksi';
    if (path.startsWith('/admin/reports')) return 'Laporan';
    return 'Admin';
  }

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <nav className="flex items-center gap-2 text-sm text-neutral-500" aria-label="Breadcrumb">
            <Link href="/admin/dashboard" className="hover:text-[#E17100] transition-colors">Beranda</Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <span className="text-neutral-900 font-medium capitalize">{getPageTitle(pathname)}</span>
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-neutral-900">{session?.user?.name}</p>
              <p className="text-xs text-neutral-500">Administrator</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#E17100]/10 flex items-center justify-center text-[#E17100] font-bold">
              {session?.user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}