'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function ErrorPage({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f2ea] via-[#faf6f0] to-[#f0e8dc] flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#E17100] to-[#c95c00] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="font-display text-2xl font-bold text-[#3e3028] mb-2">Terjadi Kesalahan!</h1>
          <p className="text-[#a09080] text-sm mb-6">Maaf, sesuatu salah. Coba lagi atau kembali ke beranda.</p>
          <div className="flex gap-3 justify-center">
            <Link href="/" className="inline-flex items-center gap-2 rounded-xl bg-[#E17100] px-6 py-3 text-white font-semibold text-sm hover:bg-[#6b4a30] transition-colors">
              Beranda
            </Link>
            <button onClick={() => window.location.reload()} className="inline-flex items-center gap-2 rounded-xl border border-[#E17100]/20 px-6 py-3 text-[#E17100] font-semibold text-sm hover:bg-[#f7f2ea] transition-colors">
              Coba Lagi
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

