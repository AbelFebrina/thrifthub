'use client';

import { ShoppingBag, Package, ChartBar, Truck, Shield, Wallet, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const benefits = [
  { icon: Package, title: 'Kelola Produk Mudah', desc: 'Upload & atur produk dengan dashboard yang intuitif' },
  { icon: ChartBar, title: 'Dashboard Penjualan', desc: 'Pantau penjualan, order, & analitik real-time' },
  { icon: Truck, title: 'Pengiriman Fleksibel', desc: 'Pilih ekspedisi favorit dengan ongkir kompetitif' },
  { icon: Shield, title: 'Rekber Aman', desc: 'Transaksi aman melalui escrow terpercaya' },
  { icon: Shield, title: 'Retur & Garansi', desc: 'Perlindungan pembeli & garansi produk' },
  { icon: Wallet, title: 'Payout Otomatis', desc: 'Dana masuk otomatis ke rekening kamu' },
];

export default function SellerCTA() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Image */}
          <div className="relative">
            <img
              src="https://picsum.photos/seed/seller-cta/600/400"
              alt="Toko thrift"
              className="w-full rounded-2xl aspect-[3/2] object-cover"
            />
            {/* Overlay badge */}
            <div className="absolute top-4 left-4 bg-[#E17100] text-white text-xs font-bold rounded-full px-3 py-1">
              COMMUNITY MALANG
            </div>
            {/* Caption overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl p-4">
              <p className="text-white text-sm font-medium">Bergabung dengan komunitas seller thrift terbesar di Malang</p>
            </div>
          </div>

          {/* Right: CTA Content */}
          <div>
            <p className="text-xs font-semibold tracking-widest text-[#E17100] uppercase mb-2">JUAL DI THRIFTHUB</p>
            <h2 className="text-3xl font-bold text-neutral-900 mb-2">Buka Toko Thrift Online</h2>
            <h3 className="text-3xl font-bold text-[#E17100] mb-4">Gratis & Mudah</h3>
            <p className="text-sm text-neutral-500 mb-6">
              Daftar gratis tanpa biaya bulanan! Jualan produk thrift & preloved dengan platform yang mudah dan terpercaya. Nikmati berbagai benefit eksklusif untuk seller.
            </p>

            {/* Buttons */}
            <div className="flex gap-3 mb-8">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-[#E17100] text-white rounded-lg px-6 py-3 font-semibold text-sm hover:bg-orange-600 transition-colors active:scale-[0.98]"
              >
                Daftar jadi Seller <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/tentang"
                className="inline-flex items-center justify-center gap-2 border border-neutral-300 text-neutral-700 rounded-lg px-6 py-3 font-medium text-sm hover:bg-neutral-50 transition-colors"
              >
                Lihat Panduan
              </Link>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                    <benefit.icon className="h-4 w-4 text-[#E17100]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-neutral-900">{benefit.title}</p>
                    <p className="text-xs text-neutral-500">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

