'use client';

import { useAuth } from '@/context/AuthContext';
import { ShoppingBag, Package, User } from 'lucide-react';

export default function SellerDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-cream font-sans antialiased">
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#8a5a2b] to-[#b8895a] rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="h-10 w-10 text-white" />
            </div>
            <h1 className="font-display text-3xl font-bold text-[#3e3028] mb-2">Seller Dashboard</h1>
            <p className="text-[#a09080] mb-2">Selamat datang, <span className="font-semibold text-[#8a5a2b]">{user?.name}</span>!</p>
            <p className="text-[#705548] text-sm">Kelola toko, produk, dan pesananmu di sini.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

