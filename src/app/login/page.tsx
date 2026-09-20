'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff, ShoppingBag, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeRole, setActiveRole] = useState<'buyer' | 'seller'>('buyer');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) { setError('Email wajib diisi'); return; }
    if (!email.includes('@') || !email.includes('.')) { setError('Format email tidak valid'); return; }
    if (!password) { setError('Password wajib diisi'); return; }
    if (password.length < 6) { setError('Password minimal 6 karakter'); return; }
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    const result = login(email.trim(), password);
    setIsSubmitting(false);
    if (!result.success) {
      setError(result.error || 'Login gagal');
      return;
    }
    if (result.role === 'seller') { router.push('/seller/dashboard'); }
    else if (result.role === 'admin') { router.push('/admin/dashboard'); }
    else { router.push('/'); }
  };

  const handleRoleSelect = (r: 'buyer' | 'seller') => {
    setActiveRole(r);
    setRole(r);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* ===== PANEL KIRI (Visual Branding) ===== */}
      <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-[#E17100] via-[#b85500] to-[#8a3a00] items-center justify-center p-10 lg:p-16">
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-white/[0.04] border border-white/[0.08] animate-float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-white/[0.03] border border-white/[0.06] animate-float-delay-1" />
          <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-white/[0.05] border border-white/[0.07] animate-float-delay-2" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-white/[0.02] border border-white/[0.04] animate-float-delay-3" />
          {/* Small dots */}
          {[...Array(12)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white/[0.06]" style={{
              left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
              width: `${3 + Math.random() * 6}px`, height: `${3 + Math.random() * 6}px`,
              animation: `float ${4 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`,
            }} />
          ))}
        </div>

        <div className="relative z-10 flex flex-col justify-between h-full w-full">
          {/* Bagian Atas */}
          <div className="space-y-6">
            {/* Badge glassmorphism */}
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-md px-5 py-2">
              <span className="text-xs text-white/90 font-medium tracking-wide">Kurasi Thrift Terbaik Kota Malang</span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Semua Toko Thrift<br />Malang <span className="text-white/70">dalam Satu</span>
              </h1>
              <p className="text-white/70 text-base mt-4 max-w-md leading-relaxed">
                Masuk ke ThriftHub dan jelajahi ribuan pakaian preloved unik dari ratusan seller lokal terverifikasi.
              </p>
            </div>
          </div>

          {/* Product Card Mockup */}
          <div className="flex items-end justify-center gap-3 py-6 relative">
            {/* Back card */}
            <div className="w-40 h-48 rounded-2xl bg-white/[0.12] backdrop-blur-sm border border-white/[0.15] overflow-hidden rotate-[-3deg] animate-float-credit-card-3 shadow-lg" aria-hidden="true">
              <div className="w-full h-3/5 bg-gradient-to-br from-white/20 to-white/5" />
              <div className="p-3 space-y-2">
                <div className="h-2 bg-white/20 rounded-full w-3/4" />
                <div className="h-2 bg-white/15 rounded-full w-1/2" />
                <div className="h-3 bg-white/20 rounded-full w-2/5 mt-2" />
              </div>
            </div>

            {/* Front card (main) */}
            <div className="w-44 h-52 rounded-2xl bg-white/[0.15] backdrop-blur-md border border-white/[0.2] overflow-hidden shadow-xl animate-float-credit-card animate-slide-in-right" aria-hidden="true">
              <div className="w-full h-3/5 bg-gradient-to-br from-white/25 to-white/5 relative overflow-hidden">
                <div className="absolute inset-0 shimmer" />
                <div className="absolute top-2 right-2 bg-[#E17100]/80 rounded-full px-2 py-0.5">
                  <span className="text-[10px] font-bold text-white">New</span>
                </div>
              </div>
              <div className="p-3 space-y-2">
                <div className="h-3 bg-white/30 rounded-full w-3/4" />
                <div className="h-2 bg-white/20 rounded-full w-1/2" />
                <div className="flex items-center justify-between mt-2">
                  <div className="h-3 bg-white/25 rounded-full w-16" />
                  <div className="h-4 w-4 rounded-full bg-white/20" />
                </div>
                <div className="h-3 bg-[#E17100]/60 rounded-full w-20 mt-1" />
              </div>
            </div>

            {/* Side card */}
            <div className="w-36 h-44 rounded-2xl bg-white/[0.10] backdrop-blur-sm border border-white/[0.12] overflow-hidden rotate-[3deg] animate-float-credit-card-2 shadow-lg" aria-hidden="true">
              <div className="w-full h-3/5 bg-gradient-to-br from-white/15 to-white/3" />
              <div className="p-3 space-y-2">
                <div className="h-2 bg-white/15 rounded-full w-3/5" />
                <div className="h-2 bg-white/10 rounded-full w-2/5" />
                <div className="h-2.5 bg-white/20 rounded-full w-16 mt-2" />
              </div>
            </div>
          </div>

          {/* Social Proof Card */}
          <div className="absolute bottom-10 left-10 right-10 lg:right-auto lg:left-10">
            <div className="inline-flex items-center gap-3 bg-white/[0.08] backdrop-blur-md border border-white/[0.15] rounded-2xl px-5 py-3">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E17100] to-[#b85500] border-2 border-[#b85500] flex items-center justify-center text-white text-[10px] font-bold">A</div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8a3a00] to-[#E17100] border-2 border-[#b85500] flex items-center justify-center text-white text-[10px] font-bold">S</div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c95c00] to-[#E17100] border-2 border-[#b85500] flex items-center justify-center text-white text-[10px] font-bold">M</div>
                <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-[#b85500] flex items-center justify-center text-white text-[10px] font-bold">+99</div>
              </div>
              <div>
                <p className="text-white text-xs font-semibold">500+ Transaksi Hari Ini</p>
                <p className="text-white/50 text-[10px]">Dari 100+ Seller Terverifikasi</p>
              </div>
            </div>
          </div>

          {/* Caption Bawah */}
          <div className="pb-4">
            <p className="text-white/40 text-xs">Official Partner of 100+ Thrift Stores in Malang Raya</p>
          </div>
        </div>
      </div>

      {/* ===== PANEL KANAN (Form Login) ===== */}
      <div className="flex items-center justify-center bg-gradient-to-br from-[#f7f2ea] via-[#faf6f0] to-[#f0e8dc] p-8 sm:p-10 lg:p-12 relative">
        {/* Logo pojok kanan atas */}
        <div className="absolute top-6 right-6 flex items-center gap-2">
          <ShoppingBag className="h-6 w-6 text-[#E17100]" aria-hidden="true" />
          <span className="text-sm font-bold text-[#221e1a]">ThriftHub</span>
        </div>

        <div className={`max-w-md w-full mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {/* Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-[#8a5a2b]/5 border border-[#e8dcc8]/50 p-8 sm:p-10 relative overflow-hidden">
            {/* Shimmer top accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E17100] via-[#b85500] to-[#E17100] opacity-80" />

            {/* Judul & Subjudul */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#221e1a]">Masuk ke Akunmu</h2>
              <p className="text-sm text-[#a09080] mt-1">Selamat datang kembali! Masukkan kredensial akun ThriftHub kamu.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error Message */}
              {error && (
                <div className={`mb-2 bg-red-50/80 border border-red-200 rounded-xl p-3 text-sm text-red-700 flex items-center gap-2 ${error ? 'animate-shake' : ''}`} role="alert">
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {error}
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[#3e3028] mb-1.5">Email atau Username</label>
                <div className="relative group">
                  <MailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#b8895a] group-focus-within:text-[#E17100] transition-colors" aria-hidden="true" />
                  <input
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder=" "
                    className="w-full rounded-xl border border-[#e8dcc8] bg-transparent pl-11 pr-4 py-3 text-[#221e1a] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#E17100]/20 focus:border-[#E17100] transition-all text-sm peer"
                    aria-label="Email atau Username"
                  />
                  <span className="absolute left-11 top-3 text-sm text-[#b8895a] peer-focus:text-[#E17100] peer-focus:text-xs peer-focus:-translate-y-2 peer-focus:bg-white px-1 transition-all pointer-events-none">
                    Email atau Username
                  </span>
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-sm font-medium text-[#3e3028]">Password</label>
                  <Link href="/lupa-password" className="text-sm text-[#E17100] hover:underline font-medium transition-colors">
                    Lupa password?
                  </Link>
                </div>
                <div className="relative group">
                  <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#b8895a] group-focus-within:text-[#E17100] transition-colors" aria-hidden="true" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder=" "
                    className="w-full rounded-xl border border-[#e8dcc8] bg-transparent pl-11 pr-11 py-3 text-[#221e1a] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#E17100]/20 focus:border-[#E17100] transition-all text-sm peer"
                    aria-label="Password"
                  />
                  <span className="absolute left-11 top-3 text-sm text-[#b8895a] peer-focus:text-[#E17100] peer-focus:text-xs peer-focus:-translate-y-2 peer-focus:bg-white px-1 transition-all pointer-events-none">
                    Password
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#b8895a] hover:text-[#E17100] transition-colors"
                    aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Sliding Pill Toggle */}
              <div>
                <label className="block text-sm font-medium text-[#3e3028] mb-2">Masuk Sebagai</label>
                <div className="slide-pill-container relative">
                  <div className="slide-pill-indicator" style={{
                    left: role === 'buyer' ? '3px' : 'calc(50% + 3px)',
                    width: role === 'buyer' ? 'calc(50% - 3px)' : 'calc(50% - 3px)',
                  }} />
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('buyer')}
                    className={`slide-pill-btn ${role === 'buyer' ? 'active' : ''}`}
                  >
                    Pembeli
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('seller')}
                    className={`slide-pill-btn ${role === 'seller' ? 'active' : ''}`}
                  >
                    Penjual
                  </button>
                </div>
              </div>

              {/* Button Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E17100] to-[#b85500] py-3.5 text-white font-semibold text-sm hover:shadow-lg hover:shadow-[#E17100]/30 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] shadow-md shadow-[#E17100]/15"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Memproses...
                  </>
                ) : (
                  <>
                    MASUK <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>

              {/* T&C Text */}
              <p className="text-xs text-[#a09080] text-center leading-relaxed">
                Dengan masuk, kamu menyetujui{' '}
                <Link href="/syarat-ketentuan" className="underline hover:text-[#E17100] transition-colors font-medium">Syarat & Ketentuan</Link>{' '}
                serta{' '}
                <Link href="/kebijakan-privasi" className="underline hover:text-[#E17100] transition-colors font-medium">Kebijakan Privasi</Link>{' '}
                ThriftHub.
              </p>

              {/* Register Link */}
              <p className="text-center text-sm text-[#a09080]">
                Belum punya akun ThriftHub?{' '}
                <Link href="/register" className="font-semibold text-[#E17100] hover:underline transition-colors">Daftar sekarang</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple inline icon components to avoid lucide import issues for floating labels
function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function LockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );
}

