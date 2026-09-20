'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import {
  ChevronLeft, ShoppingBag, Store as StoreIcon, Lock, Mail, User, Phone,
  MapPin, ImageIcon, Check, Eye, EyeOff, ArrowRight, Trash2,
} from 'lucide-react';

interface FormData {
  role: 'buyer' | 'seller' | '';
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  buyerPassword: string;
  buyerConfirmPassword: string;
  storeName: string;
  storeDescription: string;
  storeAddress: string;
  storeCity: string;
  storeLogo: string;
  termsAccepted: boolean;
}

interface Errors {
  [key: string]: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^(\+62|08)\d{6,14}$/;
const existingEmails = ['test@example.com', 'seller@example.com'];

const initialFormData: FormData = {
  role: '',
  buyerName: '',
  buyerEmail: '',
  buyerPhone: '',
  buyerPassword: '',
  buyerConfirmPassword: '',
  storeName: '',
  storeDescription: '',
  storeAddress: '',
  storeCity: '',
  storeLogo: '',
  termsAccepted: false,
};

interface Shape {
  left: number;
  top: number;
  size: number;
  delay: number;
}

export default function RegisterPage() {
  const pathname = usePathname();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isVisible, setIsVisible] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<'buyer' | 'seller' | ''>('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [sellerStep, setSellerStep] = useState(1);
  const [dragOver, setDragOver] = useState(false);

  // Client-only random shapes for decorative elements
  const [successShapes, setSuccessShapes] = useState<Shape[]>([]);
  const [leftColumnShapes, setLeftColumnShapes] = useState<Shape[]>([]);

  useEffect(() => { setIsVisible(true); }, []);

  useEffect(() => {
    const generated = Array.from({ length: 15 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 4 + Math.random() * 10,
      delay: Math.random() * 5,
    }));
    setSuccessShapes(generated);
  }, []);

  useEffect(() => {
    const generated = Array.from({ length: 8 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 3 + Math.random() * 6,
      delay: Math.random() * 3,
    }));
    setLeftColumnShapes(generated);
  }, []);

  const step1Fields: (keyof FormData)[] = ['buyerName', 'buyerEmail', 'buyerPhone', 'buyerPassword', 'buyerConfirmPassword'];
  const step2Fields: (keyof FormData)[] = ['storeName', 'storeDescription', 'storeAddress', 'storeCity', 'storeLogo'];

  const validate = useCallback((): Errors => {
    const errs: Errors = {};
    const role = formData.role;
    if (!formData.buyerName.trim()) errs.buyerName = 'Nama wajib diisi';
    else if (formData.buyerName.trim().length < 2) errs.buyerName = 'Nama minimal 2 karakter';
    if (!formData.buyerEmail.trim()) errs.buyerEmail = 'Email wajib diisi';
    else if (!EMAIL_REGEX.test(formData.buyerEmail)) errs.buyerEmail = 'Format email tidak valid';
    else if (existingEmails.includes(formData.buyerEmail.toLowerCase())) errs.buyerEmail = 'Email sudah terdaftar';
    if (!formData.buyerPhone.trim()) errs.buyerPhone = 'No. HP wajib diisi';
    else if (!PHONE_REGEX.test(formData.buyerPhone.replace(/\s/g, ''))) errs.buyerPhone = 'Format tidak valid (contoh: 08123456789)';
    if (!formData.buyerPassword) errs.buyerPassword = 'Password wajib diisi';
    else if (formData.buyerPassword.length < 8) errs.buyerPassword = 'Password minimal 8 karakter';
    if (!formData.buyerConfirmPassword) errs.buyerConfirmPassword = 'Konfirmasi password wajib diisi';
    else if (formData.buyerPassword !== formData.buyerConfirmPassword) errs.buyerConfirmPassword = 'Password tidak cocok';
    if (role === 'seller') {
      if (!formData.storeName.trim()) errs.storeName = 'Nama toko wajib diisi';
      if (!formData.storeDescription.trim()) errs.storeDescription = 'Deskripsi toko wajib diisi';
      if (!formData.storeAddress.trim()) errs.storeAddress = 'Alamat toko wajib diisi';
      if (!formData.storeCity.trim()) errs.storeCity = 'Kota wajib diisi';
    }
    if (!formData.termsAccepted) errs.termsAccepted = 'Anda harus menyetujui syarat & ketentuan';
    return errs;
  }, [formData]);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const errs = validate();
      setErrors(prev => ({ ...prev, [field]: errs[field] || '' }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const errs = validate();
    setErrors(prev => ({ ...prev, [field]: errs[field] || '' }));
  };

  const handleNextSeller = () => {
    const errs = validate();
    const fields = sellerStep === 1 ? step1Fields : step2Fields;
    const hasErrors = fields.some(f => errs[f]);
    if (hasErrors) {
      const allTouched: Record<string, boolean> = {};
      fields.forEach(f => { allTouched[f] = true; });
      setTouched(allTouched);
      setErrors(errs);
      return;
    }
    setSellerStep(prev => Math.min(prev + 1, 2));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    const allFields = (formData.role as string) === "seller" ? [...step1Fields, ...step2Fields] : step1Fields;
    const allTouched: Record<string, boolean> = {};
    allFields.forEach(f => { allTouched[f] = true; });
    allTouched.termsAccepted = true;
    setTouched(allTouched);
    if (Object.keys(errs).length > 0) return;
    setIsSubmitting(true);
    
    try {
      // Prepare payload based on role
      const payload: Record<string, any> = {
        email: formData.buyerEmail,
        password: formData.buyerPassword,
        name: formData.buyerName,
        phone: formData.buyerPhone,
      };
      
      if (formData.role === 'seller') {
        payload.storeName = formData.storeName;
        payload.storeDescription = formData.storeDescription;
        payload.storeAddress = formData.storeAddress;
        payload.storeCity = formData.storeCity;
      }
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // Handle API error response
        if (data.error) {
          // Set error for relevant field
          if (data.error.includes('Email')) {
            setErrors(prev => ({ ...prev, buyerEmail: data.error }));
          } else {
            setErrors(prev => ({ ...prev, termsAccepted: data.error }));
          }
        }
        setIsSubmitting(false);
        return;
      }
      
      // Success
      setSubmitted(formData.role);
    } catch (error) {
      console.error('Register error:', error);
      setErrors(prev => ({ ...prev, termsAccepted: 'Terjadi kesalahan jaringan. Coba lagi.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: '', color: '' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    const levels = [
      { label: 'Lemah', color: 'bg-red-400' },
      { label: 'Lemah', color: 'bg-red-400' },
      { label: 'Sedang', color: 'bg-amber-400' },
      { label: 'Kuat', color: 'bg-yellow-400' },
      { label: 'Sangat Kuat', color: 'bg-emerald-500' },
    ];
    return { score, label: levels[Math.min(score, 4)].label, color: levels[Math.min(score, 4)].color };
  };

  const pwStrength = passwordStrength(formData.buyerPassword);

if (submitted === 'buyer' || submitted === 'seller') {
    const isBuyer = submitted === 'buyer';
    if (successShapes.length === 0) return null;
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f7f2ea] via-[#faf6f0] to-[#f0e8dc] flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {successShapes.map((shape, i) => (
            <div key={i} className="absolute rounded-full opacity-[0.08]" style={{
              left: `${shape.left}%`, top: `${shape.top}%`,
              width: `${shape.size}px`, height: `${shape.size}px`,
              background: `hsl(${30 + Math.random() * 30}, 60%, 50%)`,
              animation: `float 6s ease-in-out ${shape.delay}s infinite`,
            }} />
          ))}
        </div>
        <div className="relative max-w-md w-full">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-[#E17100] to-[#c95c00]" />
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#E17100] to-[#c95c00] rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg">
                <Check className="h-10 w-10 text-white" />
              </div>
              <h1 className="font-display text-2xl font-bold text-[#3e3028] mb-2">Pendaftaran Berhasil!</h1>
              <p className="text-[#6b4a30] text-sm mb-2">Selamat datang di ThriftHub!</p>
              <p className="text-[#a09080] text-sm mb-6">
                Akun {isBuyer ? 'pembeli' : 'penjual'} Anda sudah dibuat. Silakan login untuk memulai.
              </p>
              {isBuyer && (
                <Link href="/" className="inline-flex items-center gap-2 rounded-xl bg-[#E17100] px-8 py-3 text-white font-semibold hover:bg-[#6b4a30] transition-colors">
                  Ke Beranda <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              {!isBuyer && (
                <Link href="/seller/dashboard" className="inline-flex items-center gap-2 rounded-xl bg-[#E17100] px-8 py-3 text-white font-semibold hover:bg-[#6b4a30] transition-colors">
                  Ke Dashboard Seller <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

return (
    <div className="min-h-screen relative overflow-hidden bg-[#f7f2ea]">
      <Navbar />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
        background: 'radial-gradient(ellipse at 20% 50%, rgba(225,113,0,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(225,113,0,0.05) 0%, transparent 50%)',
      }} />
      <div className="absolute top-20 right-16 w-64 h-64 bg-[#E17100]/[0.03] rounded-full animate-float" aria-hidden="true" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-[#c95c00]/[0.04] rounded-full animate-float-delay-1" aria-hidden="true" />
      <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-[#E17100]/[0.03] rounded-full animate-float-delay-2" aria-hidden="true" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-5xl">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="flex items-center gap-2 text-[#6b4a30] hover:text-[#E17100] transition-colors group">
              <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Kembali</span>
            </Link>
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-[#E17100]" />
              <span className="font-display text-xl font-bold text-[#3e3028]">ThriftHub</span>
            </div>
            <div className="w-16" />
          </div>

          <div className={`bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="grid lg:grid-cols-2">
              {/* Left Column - Visual */}
              <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-[#E17100] via-[#b85500] to-[#8a3a00] items-center justify-center min-h-[400px]">
                <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                  <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white/[0.04] border border-white/[0.08] animate-float" />
                  <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-white/[0.03] border border-white/[0.06] animate-float-delay-1" />
                  <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-white/[0.05] border border-white/[0.07] animate-float-delay-2" />
                  {leftColumnShapes.length === 0 ? null : (
                    leftColumnShapes.map((shape, i) => (
                      <div key={i} className="absolute rounded-full bg-white/[0.06]" style={{
                        left: `${shape.left}%`, top: `${shape.top}%`,
                        width: `${shape.size}px`, height: `${shape.size}px`,
                        animation: `float ${4 + shape.delay}s ease-in-out ${shape.delay}s infinite`,
                      }} />
                    ))
                  )}
                </div>
                <div className="relative flex items-center justify-center gap-3">
                  <div className="w-36 h-44 rounded-2xl bg-white/[0.12] backdrop-blur-sm border border-white/[0.15] overflow-hidden rotate-[-3deg] animate-float-credit-card-3 shadow-lg" aria-hidden="true">
                    <div className="w-full h-3/5 bg-gradient-to-br from-white/20 to-white/5" />
                    <div className="p-3 space-y-2">
                      <div className="h-2 bg-white/20 rounded-full w-3/4" />
                      <div className="h-2 bg-white/15 rounded-full w-1/2" />
                      <div className="h-3 bg-white/20 rounded-full w-2/5 mt-2" />
                    </div>
                  </div>
                  <div className="w-40 h-48 rounded-2xl bg-white/[0.18] backdrop-blur-md border border-white/[0.2] overflow-hidden shadow-xl animate-float-credit-card animate-slide-in-right" aria-hidden="true">
                    <div className="w-full h-3/5 bg-gradient-to-br from-white/25 to-white/5 relative">
                      <div className="absolute top-2 right-2 bg-[#E17100]/80 rounded-full px-2 py-0.5"><span className="text-[10px] font-bold text-white">Best</span></div>
                    </div>
                    <div className="p-3 space-y-2">
                      <div className="h-3 bg-white/30 rounded-full w-3/4" />
                      <div className="h-2 bg-white/20 rounded-full w-1/2" />
                      <div className="h-3 bg-[#E17100]/60 rounded-full w-20 mt-1" />
                    </div>
                  </div>
                  <div className="w-32 h-40 rounded-2xl bg-white/[0.10] backdrop-blur-sm border border-white/[0.12] overflow-hidden rotate-[3deg] animate-float-credit-card-2 shadow-lg" aria-hidden="true">
                    <div className="w-full h-3/5 bg-gradient-to-br from-white/15 to-white/3" />
                    <div className="p-3 space-y-2">
                      <div className="h-2 bg-white/15 rounded-full w-3/5" />
                      <div className="h-2.5 bg-white/20 rounded-full w-16 mt-2" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="p-8 sm:p-10 lg:p-12">
                {!formData.role && (
                  <div className="space-y-6 animate-fade-up">
                    <div className="mb-2">
                      <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#3e3028] leading-tight">Buat Akun<br />Baru</h2>
                      <p className="text-[#a09080] mt-2">Pilih peranmu untuk memulai</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                      <button type="button" onClick={() => handleChange('role', 'buyer')}
                        className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                          (formData.role as string) === "buyer" ? 'border-[#E17100] bg-[#E17100]/5 shadow-md shadow-[#E17100]/10' : 'border-[#E17100]/10 bg-[#f7f2ea] hover:border-[#E17100]/30 hover:bg-white hover:shadow-lg'
                        }`}>
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors duration-300 ${(formData.role as string) === "buyer" ? 'bg-[#E17100]' : 'bg-[#E17100]/10 group-hover:bg-[#E17100]/20'}`}>
                            <ShoppingBag className={`h-7 w-7 transition-colors duration-300 ${(formData.role as string) === "buyer" ? 'text-white' : 'text-[#E17100] group-hover:text-[#E17100]'}`} />
                          </div>
                          <div><h3 className="font-semibold text-[#3e3028] text-lg">Daftar sebagai Pembeli</h3><p className="text-sm text-[#a09080] mt-1">Belanja pakaian thrift dari berbagai toko</p></div>
                        </div>
                      </button>
                      <button type="button" onClick={() => handleChange('role', 'seller')}
                        className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                          (formData.role as string) === "seller" ? 'border-[#E17100] bg-[#E17100]/5 shadow-md shadow-[#E17100]/10' : 'border-[#E17100]/10 bg-[#f7f2ea] hover:border-[#E17100]/30 hover:bg-white hover:shadow-lg'
                        }`}>
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors duration-300 ${(formData.role as string) === "seller" ? 'bg-[#E17100]' : 'bg-[#E17100]/10 group-hover:bg-[#E17100]/20'}`}>
                            <StoreIcon className={`h-7 w-7 transition-colors duration-300 ${(formData.role as string) === "seller" ? 'text-white' : 'text-[#E17100] group-hover:text-[#E17100]'}`} />
                          </div>
                          <div><h3 className="font-semibold text-[#3e3028] text-lg">Daftar sebagai Penjual</h3><p className="text-sm text-[#a09080] mt-1">Buka toko dan mulai jualan thrift kamu</p></div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {(formData.role as string) === "buyer" && (
                  <form onSubmit={handleSubmit} className="space-y-4 animate-fade-up" noValidate>
                    <div className="mb-2"><h2 className="font-display text-2xl sm:text-3xl font-bold text-[#3e3028] leading-tight">Buat Akun<br />Pembeli</h2><p className="text-[#a09080] mt-2">Isi data diri kamu</p></div>
                    <div>
                      <label htmlFor="b-name" className="block text-sm font-medium text-[#3e3028] mb-1.5">Nama Lengkap</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#b8895a] group-focus-within:text-[#E17100] transition-colors" aria-hidden="true" />
                        <input id="b-name" type="text" value={formData.buyerName} onChange={e => handleChange('buyerName', e.target.value)} onBlur={() => handleBlur('buyerName')} placeholder=" " className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#e8dcc8] bg-transparent text-[#3e3028] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#E17100]/20 focus:border-[#E17100] transition-all text-sm peer" />
                        <span className="absolute left-11 top-3 text-sm text-[#b8895a] peer-focus:text-[#E17100] peer-focus:text-xs peer-focus:-translate-y-2 peer-focus:bg-white px-1 transition-all pointer-events-none">Nama lengkapmu</span>
                      </div>
                      {errors.buyerName && touched.buyerName && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" aria-hidden="true" />{errors.buyerName}</p>}
                    </div>
                    <div>
                      <label htmlFor="b-email" className="block text-sm font-medium text-[#3e3028] mb-1.5">Alamat Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#b8895a] group-focus-within:text-[#E17100] transition-colors" aria-hidden="true" />
                        <input id="b-email" type="email" value={formData.buyerEmail} onChange={e => handleChange('buyerEmail', e.target.value)} onBlur={() => handleBlur('buyerEmail')} placeholder=" " className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#e8dcc8] bg-transparent text-[#3e3028] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#E17100]/20 focus:border-[#E17100] transition-all text-sm peer" />
                        <span className="absolute left-11 top-3 text-sm text-[#b8895a] peer-focus:text-[#E17100] peer-focus:text-xs peer-focus:-translate-y-2 peer-focus:bg-white px-1 transition-all pointer-events-none">your@email.com</span>
                      </div>
                      {errors.buyerEmail && touched.buyerEmail && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" aria-hidden="true" />{errors.buyerEmail}</p>}
                    </div>
                    <div>
                      <label htmlFor="b-phone" className="block text-sm font-medium text-[#3e3028] mb-1.5">No. HP</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#b8895a] group-focus-within:text-[#E17100] transition-colors" aria-hidden="true" />
                        <input id="b-phone" type="tel" value={formData.buyerPhone} onChange={e => handleChange('buyerPhone', e.target.value)} onBlur={() => handleBlur('buyerPhone')} placeholder=" " className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#e8dcc8] bg-transparent text-[#3e3028] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#E17100]/20 focus:border-[#E17100] transition-all text-sm peer" />
                        <span className="absolute left-11 top-3 text-sm text-[#b8895a] peer-focus:text-[#E17100] peer-focus:text-xs peer-focus:-translate-y-2 peer-focus:bg-white px-1 transition-all pointer-events-none">08123456789</span>
                      </div>
                      {errors.buyerPhone && touched.buyerPhone && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" aria-hidden="true" />{errors.buyerPhone}</p>}
                    </div>
                    <div>
                      <label htmlFor="b-pass" className="block text-sm font-medium text-[#3e3028] mb-1.5">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#b8895a] group-focus-within:text-[#E17100] transition-colors" aria-hidden="true" />
                        <input id="b-pass" type={showPassword ? 'text' : 'password'} value={formData.buyerPassword} onChange={e => handleChange('buyerPassword', e.target.value)} onBlur={() => handleBlur('buyerPassword')} placeholder=" " className="w-full pl-11 pr-12 py-3 rounded-xl border border-[#e8dcc8] bg-transparent text-[#3e3028] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#E17100]/20 focus:border-[#E17100] transition-all text-sm peer" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#b8895a] hover:text-[#E17100] transition-colors" aria-label={showPassword ? 'Sembunyikan' : 'Tampilkan'}>{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>
                        <span className="absolute left-11 top-3 text-sm text-[#b8895a] peer-focus:text-[#E17100] peer-focus:text-xs peer-focus:-translate-y-2 peer-focus:bg-white px-1 transition-all pointer-events-none">Minimal 8 karakter</span>
                      </div>
                      {formData.buyerPassword && (
                        <div className="mt-1.5 flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-[#f0e8dc] rounded-full overflow-hidden"><div className={`h-full rounded-full transition-all duration-500 ease-out ${pwStrength.color}`} style={{ width: `${(pwStrength.score / 5) * 100}%` }} /></div>
                          <span className="text-[10px] text-[#a09080]">{pwStrength.label}</span>
                        </div>
                      )}
                      {errors.buyerPassword && touched.buyerPassword && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" aria-hidden="true" />{errors.buyerPassword}</p>}
                    </div>
                    <div>
                      <label htmlFor="b-confirm" className="block text-sm font-medium text-[#3e3028] mb-1.5">Konfirmasi Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#b8895a] group-focus-within:text-[#E17100] transition-colors" aria-hidden="true" />
                        <input id="b-confirm" type={showConfirmPassword ? 'text' : 'password'} value={formData.buyerConfirmPassword} onChange={e => handleChange('buyerConfirmPassword', e.target.value)} onBlur={() => handleBlur('buyerConfirmPassword')} placeholder=" " className="w-full pl-11 pr-12 py-3 rounded-xl border border-[#e8dcc8] bg-transparent text-[#3e3028] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#E17100]/20 focus:border-[#E17100] transition-all text-sm peer" />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#b8895a] hover:text-[#E17100] transition-colors" aria-label={showConfirmPassword ? 'Sembunyikan' : 'Tampilkan'}>{showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>
                        <span className="absolute left-11 top-3 text-sm text-[#b8895a] peer-focus:text-[#E17100] peer-focus:text-xs peer-focus:-translate-y-2 peer-focus:bg-white px-1 transition-all pointer-events-none">Ulangi password</span>
                      </div>
                      {errors.buyerConfirmPassword && touched.buyerConfirmPassword && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" aria-hidden="true" />{errors.buyerConfirmPassword}</p>}
                    </div>
                    <label className="flex items-start gap-3 cursor-pointer mt-2">
                      <input type="checkbox" checked={formData.termsAccepted} onChange={e => handleChange('termsAccepted', e.target.checked)} onBlur={() => handleBlur('termsAccepted')} className="mt-1.5 w-4 h-4 rounded border-[#e8dcc8] text-[#E17100] focus:ring-[#E17100] cursor-pointer" />
                      <span className="text-sm text-[#6b4a30] leading-relaxed">Saya setuju dengan <Link href="/syarat-ketentuan" className="text-[#E17100] font-medium hover:underline">Syarat & Ketentuan</Link> dan <Link href="/kebijakan-privasi" className="text-[#E17100] font-medium hover:underline">Kebijakan Privasi</Link></span>
                    </label>
                    {errors.termsAccepted && touched.termsAccepted && <p className="text-xs text-red-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" aria-hidden="true" />{errors.termsAccepted}</p>}
                    <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#E17100] py-3.5 text-white font-semibold text-sm hover:bg-[#6b4a30] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#E17100]/20 active:scale-[0.98] mt-2 hover:-translate-y-0.5 hover:shadow-lg">
                      {isSubmitting ? (
                        <><svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Mengirim...</>
                      ) : (<><Check className="h-5 w-5" />Buat Akun<ArrowRight className="h-4 w-4" /></>)}
                    </button>
                    <p className="text-center text-sm text-[#a09080] mt-4">Sudah punya akun?{' '}<Link href="/login" className="font-semibold text-[#E17100] hover:text-[#6b4a30] transition-colors">Masuk</Link></p>
                  </form>
                )}

                {(formData.role as string) === "seller" && (
                  <form onSubmit={handleSubmit} className="space-y-4 animate-fade-up" noValidate>
                    <div className="mb-2"><h2 className="font-display text-2xl sm:text-3xl font-bold text-[#3e3028] leading-tight">Buat Akun<br />Penjual</h2><p className="text-[#a09080] mt-2">Daftar dan lengkapi data toko kamu</p></div>
                    <div className="flex items-center gap-2 mb-6">
                      {[1, 2].map((step) => (
                        <div key={step} className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${sellerStep >= step ? 'bg-[#E17100] text-white' : 'bg-[#e8e0d5] text-[#a09080]'}`}>
                            {sellerStep > step ? <Check className="h-4 w-4" /> : step}
                          </div>
                          {step < 2 && <div className={`h-0.5 w-12 rounded-full transition-all duration-300 ${sellerStep > step ? 'bg-[#E17100]' : 'bg-[#e8e0d5]'}`} />}
                        </div>
                      ))}
                      <span className="text-xs text-[#a09080] ml-2">{sellerStep === 1 ? 'Data Akun' : 'Data Toko'}</span>
                    </div>
                    {sellerStep === 1 && (
                      <div className="space-y-4">
                        <div><label htmlFor="s-name" className="block text-sm font-medium text-[#3e3028] mb-1.5">Nama Lengkap</label>
                          <div className="relative"><User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#b8895a] group-focus-within:text-[#E17100] transition-colors" aria-hidden="true" /><input id="s-name" type="text" value={formData.buyerName} onChange={e => handleChange('buyerName', e.target.value)} onBlur={() => handleBlur('buyerName')} placeholder=" " className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#e8dcc8] bg-transparent text-[#3e3028] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#E17100]/20 focus:border-[#E17100] transition-all text-sm peer" /><span className="absolute left-11 top-3 text-sm text-[#b8895a] peer-focus:text-[#E17100] peer-focus:text-xs peer-focus:-translate-y-2 peer-focus:bg-white px-1 transition-all pointer-events-none">Nama lengkapmu</span></div>
                          {errors.buyerName && touched.buyerName && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" aria-hidden="true" />{errors.buyerName}</p>}
                        </div>
                        <div><label htmlFor="s-email" className="block text-sm font-medium text-[#3e3028] mb-1.5">Alamat Email</label>
                          <div className="relative"><Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#b8895a] group-focus-within:text-[#E17100] transition-colors" aria-hidden="true" /><input id="s-email" type="email" value={formData.buyerEmail} onChange={e => handleChange('buyerEmail', e.target.value)} onBlur={() => handleBlur('buyerEmail')} placeholder=" " className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#e8dcc8] bg-transparent text-[#3e3028] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#E17100]/20 focus:border-[#E17100] transition-all text-sm peer" /><span className="absolute left-11 top-3 text-sm text-[#b8895a] peer-focus:text-[#E17100] peer-focus:text-xs peer-focus:-translate-y-2 peer-focus:bg-white px-1 transition-all pointer-events-none">your@email.com</span></div>
                          {errors.buyerEmail && touched.buyerEmail && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" aria-hidden="true" />{errors.buyerEmail}</p>}
                        </div>
                        <div><label htmlFor="s-phone" className="block text-sm font-medium text-[#3e3028] mb-1.5">No. HP</label>
                          <div className="relative"><Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#b8895a] group-focus-within:text-[#E17100] transition-colors" aria-hidden="true" /><input id="s-phone" type="tel" value={formData.buyerPhone} onChange={e => handleChange('buyerPhone', e.target.value)} onBlur={() => handleBlur('buyerPhone')} placeholder=" " className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#e8dcc8] bg-transparent text-[#3e3028] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#E17100]/20 focus:border-[#E17100] transition-all text-sm peer" /><span className="absolute left-11 top-3 text-sm text-[#b8895a] peer-focus:text-[#E17100] peer-focus:text-xs peer-focus:-translate-y-2 peer-focus:bg-white px-1 transition-all pointer-events-none">08123456789</span></div>
                          {errors.buyerPhone && touched.buyerPhone && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" aria-hidden="true" />{errors.buyerPhone}</p>}
                        </div>
                        <div><label htmlFor="s-pass" className="block text-sm font-medium text-[#3e3028] mb-1.5">Password</label>
                          <div className="relative"><Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#b8895a] group-focus-within:text-[#E17100] transition-colors" aria-hidden="true" /><input id="s-pass" type={showPassword ? 'text' : 'password'} value={formData.buyerPassword} onChange={e => handleChange('buyerPassword', e.target.value)} onBlur={() => handleBlur('buyerPassword')} placeholder=" " className="w-full pl-11 pr-12 py-3 rounded-xl border border-[#e8dcc8] bg-transparent text-[#3e3028] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#E17100]/20 focus:border-[#E17100] transition-all text-sm peer" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#b8895a] hover:text-[#E17100] transition-colors" aria-label={showPassword ? 'Sembunyikan' : 'Tampilkan'}>{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button><span className="absolute left-11 top-3 text-sm text-[#b8895a] peer-focus:text-[#E17100] peer-focus:text-xs peer-focus:-translate-y-2 peer-focus:bg-white px-1 transition-all pointer-events-none">Minimal 8 karakter</span></div>
                          {formData.buyerPassword && (<div className="mt-1.5 flex items-center gap-2"><div className="flex-1 h-1.5 bg-[#f0e8dc] rounded-full overflow-hidden"><div className={`h-full rounded-full transition-all duration-500 ease-out ${pwStrength.color}`} style={{ width: `${(pwStrength.score / 5) * 100}%` }} /></div><span className="text-[10px] text-[#a09080]">{pwStrength.label}</span></div>)}
                          {errors.buyerPassword && touched.buyerPassword && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" aria-hidden="true" />{errors.buyerPassword}</p>}
                        </div>
                        <div><label htmlFor="s-confirm" className="block text-sm font-medium text-[#3e3028] mb-1.5">Konfirmasi Password</label>
                          <div className="relative"><Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#b8895a] group-focus-within:text-[#E17100] transition-colors" aria-hidden="true" /><input id="s-confirm" type={showConfirmPassword ? 'text' : 'password'} value={formData.buyerConfirmPassword} onChange={e => handleChange('buyerConfirmPassword', e.target.value)} onBlur={() => handleBlur('buyerConfirmPassword')} placeholder=" " className="w-full pl-11 pr-12 py-3 rounded-xl border border-[#e8dcc8] bg-transparent text-[#3e3028] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#E17100]/20 focus:border-[#E17100] transition-all text-sm peer" /><button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#b8895a] hover:text-[#E17100] transition-colors" aria-label={showConfirmPassword ? 'Sembunyikan' : 'Tampilkan'}>{showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button><span className="absolute left-11 top-3 text-sm text-[#b8895a] peer-focus:text-[#E17100] peer-focus:text-xs peer-focus:-translate-y-2 peer-focus:bg-white px-1 transition-all pointer-events-none">Ulangi password</span></div>
                          {errors.buyerConfirmPassword && touched.buyerConfirmPassword && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" aria-hidden="true" />{errors.buyerConfirmPassword}</p>}
                        </div>
                        <button type="button" onClick={handleNextSeller} className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#E17100] py-3.5 text-white font-semibold text-sm hover:bg-[#6b4a30] transition-colors shadow-md shadow-[#E17100]/20 active:scale-[0.98] mt-2 hover:-translate-y-0.5 hover:shadow-lg">
                          Lanjut ke Data Toko <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                    {sellerStep === 2 && (
                      <div className="space-y-4">
                        <div><label htmlFor="st-name" className="block text-sm font-medium text-[#3e3028] mb-1.5">Nama Toko</label>
                          <div className="relative"><StoreIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#b8895a] group-focus-within:text-[#E17100] transition-colors" aria-hidden="true" /><input id="st-name" type="text" value={formData.storeName} onChange={e => handleChange('storeName', e.target.value)} onBlur={() => handleBlur('storeName')} placeholder=" " className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#e8dcc8] bg-transparent text-[#3e3028] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#E17100]/20 focus:border-[#E17100] transition-all text-sm peer" /><span className="absolute left-11 top-3 text-sm text-[#b8895a] peer-focus:text-[#E17100] peer-focus:text-xs peer-focus:-translate-y-2 peer-focus:bg-white px-1 transition-all pointer-events-none">Nama toko thrift kamu</span></div>
                          {errors.storeName && touched.storeName && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" aria-hidden="true" />{errors.storeName}</p>}
                        </div>
                        <div><label htmlFor="st-desc" className="block text-sm font-medium text-[#3e3028] mb-1.5">Deskripsi Toko</label>
                          <textarea id="st-desc" value={formData.storeDescription} onChange={e => handleChange('storeDescription', e.target.value)} onBlur={() => handleBlur('storeDescription')} rows={3} placeholder=" " className="w-full px-4 py-3 rounded-xl border border-[#e8dcc8] bg-transparent text-[#3e3028] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#E17100]/20 focus:border-[#E17100] transition-all text-sm resize-none peer" />
                          {errors.storeDescription && touched.storeDescription && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" aria-hidden="true" />{errors.storeDescription}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div><label htmlFor="st-address" className="block text-sm font-medium text-[#3e3028] mb-1.5">Alamat</label>
                            <div className="relative"><MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#b8895a] group-focus-within:text-[#E17100] transition-colors" aria-hidden="true" /><input id="st-address" type="text" value={formData.storeAddress} onChange={e => handleChange('storeAddress', e.target.value)} onBlur={() => handleBlur('storeAddress')} placeholder=" " className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#e8dcc8] bg-transparent text-[#3e3028] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#E17100]/20 focus:border-[#E17100] transition-all text-sm peer" /><span className="absolute left-11 top-3 text-sm text-[#b8895a] peer-focus:text-[#E17100] peer-focus:text-xs peer-focus:-translate-y-2 peer-focus:bg-white px-1 transition-all pointer-events-none">Jalan, RT/RW</span></div>
                            {errors.storeAddress && touched.storeAddress && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" aria-hidden="true" />{errors.storeAddress}</p>}
                          </div>
                          <div><label htmlFor="st-city" className="block text-sm font-medium text-[#3e3028] mb-1.5">Kota</label>
                            <div className="relative"><svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#b8895a] group-focus-within:text-[#E17100] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg><input id="st-city" type="text" value={formData.storeCity} onChange={e => handleChange('storeCity', e.target.value)} onBlur={() => handleBlur('storeCity')} placeholder=" " className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#e8dcc8] bg-transparent text-[#3e3028] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#E17100]/20 focus:border-[#E17100] transition-all text-sm peer" /><span className="absolute left-11 top-3 text-sm text-[#b8895a] peer-focus:text-[#E17100] peer-focus:text-xs peer-focus:-translate-y-2 peer-focus:bg-white px-1 transition-all pointer-events-none">Kota</span></div>
                            {errors.storeCity && touched.storeCity && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" aria-hidden="true" />{errors.storeCity}</p>}
                          </div>
                        </div>
                        <div><label className="block text-sm font-medium text-[#3e3028] mb-1.5">Logo Toko</label>
                          <div className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 cursor-pointer ${dragOver ? 'border-[#E17100] bg-[#E17100]/5' : 'border-[#e8dcc8] hover:border-[#b8895a] bg-[#f7f2ea]'}`} onClick={() => {}} onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={e => { e.preventDefault(); setDragOver(false); }}>
                            {formData.storeLogo ? (
                              <div className="flex items-center gap-4"><div className="w-16 h-16 rounded-full bg-[#E17100]/10 flex items-center justify-center shrink-0"><ImageIcon className="h-8 w-8 text-[#E17100]" /></div><div className="text-left flex-1"><p className="text-sm font-medium text-[#3e3028]">Logo terunggah</p><p className="text-xs text-[#a09080] truncate">{formData.storeLogo}</p></div><button type="button" onClick={() => handleChange('storeLogo', '')} className="text-[#a09080] hover:text-red-500 transition-colors" aria-label="Hapus logo"><Trash2 className="h-4 w-4" /></button></div>
                            ) : (<div><ImageIcon className="h-8 w-8 text-[#b8895a] mx-auto mb-2" /><p className="text-sm text-[#6b4a30]">Drag & drop atau <span className="text-[#E17100] font-medium underline">klik di sini</span></p><p className="text-xs text-[#a09080] mt-1">PNG, JPG — maks 2MB</p></div>)}
                          </div>
                        </div>
                        <label className="flex items-start gap-3 cursor-pointer mt-2">
                          <input type="checkbox" checked={formData.termsAccepted} onChange={e => handleChange('termsAccepted', e.target.checked)} onBlur={() => handleBlur('termsAccepted')} className="mt-1.5 w-4 h-4 rounded border-[#e8dcc8] text-[#E17100] focus:ring-[#E17100] cursor-pointer" />
                          <span className="text-sm text-[#6b4a30] leading-relaxed">Saya setuju dengan <Link href="/syarat-ketentuan" className="text-[#E17100] font-medium hover:underline">Syarat & Ketentuan</Link> dan <Link href="/kebijakan-privasi" className="text-[#E17100] font-medium hover:underline">Kebijakan Privasi</Link></span>
                        </label>
                        {errors.termsAccepted && touched.termsAccepted && <p className="text-xs text-red-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" aria-hidden="true" />{errors.termsAccepted}</p>}
                        <div className="flex gap-3 mt-2">
                          <button type="button" onClick={() => setSellerStep(1)} className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-[#e8dcc8] py-3.5 text-[#6b4a30] font-semibold text-sm hover:bg-[#E17100]/5 transition-colors active:scale-[0.98]">Kembali</button>
                          <button type="submit" disabled={isSubmitting} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#E17100] py-3.5 text-white font-semibold text-sm hover:bg-[#6b4a30] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#E17100]/20 active:scale-[0.98] hover:-translate-y-0.5 hover:shadow-lg">
                            {isSubmitting ? (<><svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Mengirim...</>) : (<><Check className="h-5 w-5" />Buat Akun</>)}
                          </button>
                        </div>
                      </div>
                    )}
                    <p className="text-center text-sm text-[#a09080] mt-4">Sudah punya akun?{' '}<Link href="/login" className="font-semibold text-[#E17100] hover:text-[#6b4a30] transition-colors">Masuk</Link></p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0);opacity:10%} 50%{transform:translateY(-20px);opacity:20%} }
        .animate-fade-up { animation: fade-up 0.4s ease-out both; }
      `}</style>
    </div>
  );
}

