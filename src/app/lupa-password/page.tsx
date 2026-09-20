'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, Check, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function LupaPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => { setIsVisible(true); }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) { setError('Email wajib diisi'); return; }
    if (!email.includes('@') || !email.includes('.')) { setError('Format email tidak valid'); return; }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f7f2ea] via-[#faf6f0] to-[#f0e8dc] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-md w-full">
          <div className="h-2 bg-gradient-to-r from-[#E17100] to-[#c95c00]" />
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#E17100] to-[#c95c00] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse-ring">
              <Check className="h-10 w-10 text-white" />
            </div>
            <h1 className="font-display text-2xl font-bold text-[#3e3028] mb-2">Email Terkirim!</h1>
            <p className="text-[#a09080] text-sm mb-2">
              Kami mengirimkan link reset password ke{' '}
              <span className="font-semibold text-[#E17100]">{email}</span>
            </p>
            <p className="text-[#6b4a30] text-sm mb-6">
              Cek inbox atau folder spam kamu untuk melanjutkan.
            </p>
            <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-[#E17100] px-8 py-3 text-white font-semibold hover:bg-[#6b4a30] transition-colors">
              Kembali ke Login <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f2ea] via-[#faf6f0] to-[#f0e8dc] flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className={`relative max-w-md w-full transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="bg-white rounded-3xl shadow-xl shadow-[#8a5a2b]/5 border border-[#e8dcc8]/50 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-[#E17100] to-[#c95c00]" />
            <div className="p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#E17100] to-[#c95c00] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse-ring">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h1 className="font-display text-2xl font-bold text-[#3e3028] text-center mb-2">Lupa Password?</h1>
              <p className="text-[#a09080] text-sm text-center mb-6">Masukkan email kamu dan kami akan mengirimkan link reset</p>

              {error && (
                <div className="mb-4 bg-red-50/80 border border-red-200 rounded-xl p-3 text-sm text-red-700 flex items-center gap-2 animate-shake" role="alert">
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#3e3028] mb-1.5">Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#b8895a] group-focus-within:text-[#E17100] transition-colors" aria-hidden="true" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder=" "
                      className="w-full rounded-xl border border-[#e8dcc8] bg-transparent pl-11 pr-4 py-3 text-[#221e1a] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#E17100]/20 focus:border-[#E17100] transition-all text-sm peer"
                      aria-label="Email"
                    />
                    <span className="absolute left-11 top-3 text-sm text-[#b8895a] peer-focus:text-[#E17100] peer-focus:text-xs peer-focus:-translate-y-2 peer-focus:bg-white px-1 transition-all pointer-events-none">
                      alamat@email.com
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E17100] to-[#b85500] py-3.5 text-white font-semibold text-sm hover:shadow-lg hover:shadow-[#E17100]/30 hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98] shadow-md shadow-[#E17100]/15"
                >
                  <ArrowRight className="h-5 w-5" /> Kirim Link Reset
                </button>
              </form>

              <p className="text-center text-sm text-[#a09080] mt-6">
                Ingat passwordmu?{' '}
                <Link href="/login" className="font-semibold text-[#E17100] hover:text-[#6b4a30] transition-colors">Masuk di sini</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

