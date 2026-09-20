'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f2ea] via-[#faf6f0] to-[#f0e8dc] flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="font-display text-9xl font-bold text-[#E17100]/20 mb-2">404</div>
          <h1 className="font-display text-3xl font-bold text-[#3e3028] mb-4">Halaman Tidak Ditemukan</h1>
          <p className="text-[#a09080] mb-8 max-w-md mx-auto">Maaf, halaman yang kamu cari tidak ada atau sudah dipindahkan.</p>
          <Link href="/" className="inline-flex items-center gap-2 rounded-xl bg-[#E17100] px-8 py-3 text-white font-semibold hover:bg-[#6b4a30] transition-colors">
            Kembali ke Beranda
          </Link>
        </div>
      </main>
    </div>
  );
}

