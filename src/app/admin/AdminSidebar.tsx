'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Users, Store, Tag, Package, Receipt, FileBarChart, ChevronRight } from 'lucide-react';

interface AdminSidebarProps {
  session: any;
}

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Kelola Pengguna', href: '/admin/users', icon: Users },
  { name: 'Kelola Seller & Verifikasi', href: '/admin/sellers', icon: Store, badgeKey: 'pendingStores' },
  { name: 'Kelola Kategori', href: '/admin/categories', icon: Tag },
  { name: 'Kelola Produk', href: '/admin/products', icon: Package },
  { name: 'Kelola Transaksi', href: '/admin/transactions', icon: Receipt },
  { name: 'Laporan', href: '/admin/reports', icon: FileBarChart },
];

export function AdminSidebar({ session }: { session: any }) {
  const pathname = usePathname();

  return (
    <div className="space-y-1">
      {navigation.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-[#E17100]/10 text-[#E17100]'
                : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span className="flex-1 truncate">{item.name}</span>
            {item.badgeKey && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#E17100] px-1.5 text-[10px] font-bold text-white">
                {/* Badge will be populated by parent */}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}