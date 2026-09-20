'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  User, Mail, Phone, Camera, MapPin, Shield,
  ChevronDown, ChevronRight, Check, ArrowLeft,
  Heart, Package,
} from 'lucide-react';

export default function ProfilPage() {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('data-diri');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Data Diri state
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');

  // Alamat state
  const [addresses, setAddresses] = useState([
    { id: 1, label: 'Rumah', address: 'Jl. Merdeka No. 123, Kel. Lowokwaru, Kec. Lowokwaru', city: 'Malang', postal: '65123', isDefault: true },
  ]);
  const [newAddress, setNewAddress] = useState({ label: '', address: '', city: '', postal: '' });

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});

  if (!user) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="bg-white rounded-xl border border-[#e8dcc8] p-8 max-w-md w-full text-center">
          <User className="h-12 w-12 text-[#b8895a] mx-auto mb-4" />
          <h1 className="font-display text-xl font-bold text-[#3e3028] mb-2">Login Dulu!</h1>
          <p className="text-[#a09080] text-sm mb-6">Kamu perlu login untuk melihat profil.</p>
        </div>
      </div>
    );
  }

  const handleSaveDataDiri = () => {
    setSaving(true);
    setTimeout(() => {
      updateUser({ name, phone });
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 600);
  };

  const handleAddAddress = () => {
    if (!newAddress.label || !newAddress.address || !newAddress.city) return;
    setAddresses(prev => [...prev, { ...newAddress, id: Date.now(), isDefault: false }]);
    setNewAddress({ label: '', address: '', city: '', postal: '' });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleRemoveAddress = (id: number) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  const handleChangePassword = () => {
    const errs: Record<string, string> = {};
    if (!currentPassword) errs.currentPassword = 'Password lama wajib diisi';
    if (!newPassword) errs.newPassword = 'Password baru wajib diisi';
    else if (newPassword.length < 6) errs.newPassword = 'Password minimal 6 karakter';
    if (newPassword !== confirmPassword) errs.confirmPassword = 'Password tidak cocok';
    if (Object.keys(errs).length > 0) {
      setPasswordErrors(errs);
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordErrors({});
      setTimeout(() => setSaved(false), 2000);
    }, 600);
  };

  const tabs = [
    { key: 'data-diri', label: 'Data Diri', icon: User },
    { key: 'alamat', label: 'Alamat', icon: MapPin },
    { key: 'password', label: 'Ganti Password', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back */}
          <div className="flex items-center gap-3 mb-8">
            <Link href="/" className="p-1.5 rounded-lg hover:bg-[#f7f2ea] transition-colors" aria-label="Kembali">
              <ArrowLeft className="h-5 w-5 text-[#a09080]" />
            </Link>
            <h1 className="font-display text-2xl font-bold text-[#3e3028]">Profil Saya</h1>
          </div>

          {/* Profile Header Card */}
          <div className="bg-gradient-to-br from-[#8a5a2b] to-[#a06a35] rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-32 h-32 border border-white/10 rounded-full" aria-hidden="true" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 border border-white/10 rounded-full" aria-hidden="true" />

            <div className="relative z-10 flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center shrink-0">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="h-10 w-10 text-white/80" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-xl font-bold">{user.name}</h2>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white/80 font-medium">
                    {user.role === 'seller' ? 'Penjual' : user.role === 'admin' ? 'Admin' : 'Pembeli'}
                  </span>
                </div>
                <p className="text-white/70 text-sm mt-0.5">{user.email}</p>
                <p className="text-white/50 text-xs mt-0.5">{user.phone}</p>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: 'Pesanan', value: '12', icon: Package },
              { label: 'Wishlist', value: '5', icon: Heart },
              { label: 'Alamat', value: addresses.length.toString(), icon: MapPin },
            ].map((stat, i) => (
              <div key={stat.label} className="bg-white rounded-xl border border-[#e8dcc8] p-4 text-center hover:shadow-sm transition-shadow">
                <stat.icon className="h-5 w-5 text-[#8a5a2b] mx-auto mb-1" />
                <p className="font-display text-xl font-bold text-[#3e3028]">{stat.value}</p>
                <p className="text-[10px] text-[#a09080]">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-6 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
            {tabs.map(tab => {
              const isActive = activeTab === tab.key;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    isActive ? 'bg-[#8a5a2b] text-white' : 'bg-white text-[#a09080] border border-[#e8dcc8] hover:border-[#b8895a]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          {/* Data Diri */}
          {activeTab === 'data-diri' && (
            <div className="bg-white rounded-xl border border-[#e8dcc8] p-6 space-y-4 animate-fade-in">
              <h2 className="font-display text-lg font-bold text-[#3e3028] mb-4">Data Diri</h2>

              <div>
                <label className="block text-sm font-medium text-[#3e3028] mb-1.5">Nama Lengkap</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#b8895a]" />
                  <input type="text" value={name} onChange={e => setName(e.target.value)}
                    className="w-full rounded-lg border border-[#e8dcc8] pl-11 pr-4 py-3 text-[#3e3028] text-sm focus:outline-none focus:ring-2 focus:ring-[#8a5a2b]/20 focus:border-[#8a5a2b] transition-colors"
                    placeholder="Nama lengkapmu" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3e3028] mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#b8895a]" />
                  <input type="email" value={email} disabled
                    className="w-full rounded-lg border border-[#e8dcc8] pl-11 pr-4 py-3 text-[#a09080] bg-[#f7f2ea] text-sm cursor-not-allowed"
                    placeholder="Email" />
                </div>
                <p className="text-[10px] text-[#a09080] mt-1">Email tidak dapat diubah</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3e3028] mb-1.5">No. HP</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#b8895a]" />
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                    className="w-full rounded-lg border border-[#e8dcc8] pl-11 pr-4 py-3 text-[#3e3028] text-sm focus:outline-none focus:ring-2 focus:ring-[#8a5a2b]/20 focus:border-[#8a5a2b] transition-colors"
                    placeholder="081234567890" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3e3028] mb-1.5">Foto Profil</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#f7f2ea] border-2 border-[#e8dcc8] flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="h-8 w-8 text-[#b8895a]" />
                    )}
                  </div>
                  <button type="button" className="flex items-center gap-2 rounded-lg border border-[#8a5a2b]/20 px-4 py-2.5 text-[#8a5a2b] text-sm font-medium hover:bg-[#f7f2ea] transition-colors">
                    <Camera className="h-4 w-4" /> Ganti Foto
                  </button>
                </div>
              </div>

              {saved && (
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <Check className="h-4 w-4" /> Data berhasil disimpan!
                </div>
              )}

              <button onClick={handleSaveDataDiri} disabled={saving}
                className="w-full rounded-lg bg-[#8a5a2b] py-3.5 text-white font-medium text-sm hover:bg-[#704420] transition-colors disabled:opacity-50 active:scale-[0.98]">
                {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          )}

          {/* Alamat */}
          {activeTab === 'alamat' && (
            <div className="bg-white rounded-xl border border-[#e8dcc8] p-6 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-[#3e3028]">Alamat Pengiriman</h2>
                <button onClick={() => {
                  setNewAddress({ label: 'Rumah', address: '', city: '', postal: '' });
                  const modal = document.getElementById('add-address-modal');
                  modal?.classList.remove('hidden');
                }} className="text-sm font-medium text-[#8a5a2b] hover:text-[#704420] transition-colors">
                  <ChevronDown className="h-4 w-4 inline-block align-middle" /> Tambah Alamat
                </button>
              </div>

              {/* Add Address Form */}
              <div id="add-address-modal" className="hidden bg-[#f7f2ea] rounded-xl p-4 space-y-3 border border-[#e8dcc8]">
                <input type="text" value={newAddress.label} onChange={e => setNewAddress(prev => ({ ...prev, label: e.target.value }))}
                  className="w-full rounded-lg border border-[#e8dcc8] px-4 py-2.5 text-sm text-[#3e3028] focus:outline-none focus:ring-2 focus:ring-[#8a5a2b]/20" placeholder="Label (Rumah, Kantor, dll)" />
                <textarea value={newAddress.address} onChange={e => setNewAddress(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full rounded-lg border border-[#e8dcc8] px-4 py-2.5 text-sm text-[#3e3028] focus:outline-none focus:ring-2 focus:ring-[#8a5a2b]/20 resize-none" placeholder="Alamat lengkap..." rows={2} />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" value={newAddress.city} onChange={e => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
                    className="rounded-lg border border-[#e8dcc8] px-4 py-2.5 text-sm text-[#3e3028] focus:outline-none focus:ring-2 focus:ring-[#8a5a2b]/20" placeholder="Kota" />
                  <input type="text" value={newAddress.postal} onChange={e => setNewAddress(prev => ({ ...prev, postal: e.target.value }))}
                    className="rounded-lg border border-[#e8dcc8] px-4 py-2.5 text-sm text-[#3e3028] focus:outline-none focus:ring-2 focus:ring-[#8a5a2b]/20" placeholder="Kode Pos" />
                </div>
                <div className="flex gap-2">
                  <button onClick={handleAddAddress} className="flex-1 rounded-lg bg-[#8a5a2b] py-2.5 text-white text-sm font-medium hover:bg-[#704420] transition-colors">Simpan</button>
                  <button onClick={() => document.getElementById('add-address-modal')?.classList.add('hidden')} className="flex-1 rounded-lg border border-[#e8dcc8] py-2.5 text-[#705548] text-sm font-medium hover:bg-[#f7f2ea] transition-colors">Batal</button>
                </div>
              </div>

              {/* Address List */}
              <div className="space-y-3">
                {addresses.map(addr => (
                  <div key={addr.id} className="flex items-start gap-3 p-4 border border-[#e8dcc8] rounded-xl hover:border-[#b8895a] transition-colors">
                    <div className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${addr.isDefault ? 'bg-[#8a5a2b]' : 'bg-[#d4c4a8]'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-[#3e3028] text-sm">{addr.label}</p>
                        {addr.isDefault && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8a5a2b]/10 text-[#8a5a2b] font-medium">Default</span>}
                      </div>
                      <p className="text-[#a09080] text-xs mt-0.5 leading-relaxed">{addr.address}</p>
                      <p className="text-[#a09080] text-xs">{addr.city} {addr.postal}</p>
                    </div>
                    {!addr.isDefault && (
                      <button onClick={() => handleRemoveAddress(addr.id)} className="text-[#a09080] hover:text-red-500 transition-colors shrink-0 p-1" aria-label="Hapus">
                        <ChevronRight className="h-5 w-5 rotate-90" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ganti Password */}
          {activeTab === 'password' && (
            <div className="bg-white rounded-xl border border-[#e8dcc8] p-6 space-y-4 animate-fade-in">
              <h2 className="font-display text-lg font-bold text-[#3e3028] mb-4">Ganti Password</h2>

              <div>
                <label className="block text-sm font-medium text-[#3e3028] mb-1.5">Password Lama</label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#b8895a]" />
                  <input type="password" value={currentPassword} onChange={e => { setCurrentPassword(e.target.value); if (passwordErrors.currentPassword) setPasswordErrors(prev => { const n = { ...prev }; delete n.currentPassword; return n; }); }}
                    className="w-full rounded-lg border border-[#e8dcc8] pl-11 pr-4 py-3 text-[#3e3028] text-sm focus:outline-none focus:ring-2 focus:ring-[#8a5a2b]/20 focus:border-[#8a5a2b] transition-colors"
                    placeholder="Password saat ini" />
                </div>
                {passwordErrors.currentPassword && <p className="text-[10px] text-red-500 mt-1">{passwordErrors.currentPassword}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3e3028] mb-1.5">Password Baru</label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#b8895a]" />
                  <input type="password" value={newPassword} onChange={e => { setNewPassword(e.target.value); if (passwordErrors.newPassword) setPasswordErrors(prev => { const n = { ...prev }; delete n.newPassword; return n; }); }}
                    className="w-full rounded-lg border border-[#e8dcc8] pl-11 pr-4 py-3 text-[#3e3028] text-sm focus:outline-none focus:ring-2 focus:ring-[#8a5a2b]/20 focus:border-[#8a5a2b] transition-colors"
                    placeholder="Minimal 6 karakter" />
                </div>
                {passwordErrors.newPassword && <p className="text-[10px] text-red-500 mt-1">{passwordErrors.newPassword}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3e3028] mb-1.5">Konfirmasi Password Baru</label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#b8895a]" />
                  <input type="password" value={confirmPassword} onChange={e => { setConfirmPassword(e.target.value); if (passwordErrors.confirmPassword) setPasswordErrors(prev => { const n = { ...prev }; delete n.confirmPassword; return n; }); }}
                    className="w-full rounded-lg border border-[#e8dcc8] pl-11 pr-4 py-3 text-[#3e3028] text-sm focus:outline-none focus:ring-2 focus:ring-[#8a5a2b]/20 focus:border-[#8a5a2b] transition-colors"
                    placeholder="Ulangi password baru" />
                </div>
                {passwordErrors.confirmPassword && <p className="text-[10px] text-red-500 mt-1">{passwordErrors.confirmPassword}</p>}
              </div>

              {saved && (
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <Check className="h-4 w-4" /> Password berhasil diubah!
                </div>
              )}

              <button onClick={handleChangePassword} disabled={saving}
                className="w-full rounded-lg bg-[#8a5a2b] py-3.5 text-white font-medium text-sm hover:bg-[#704420] transition-colors disabled:opacity-50 active:scale-[0.98]">
                {saving ? 'Menyimpan...' : 'Simpan Password'}
              </button>
            </div>
          )}
        </div>
      </main>

      <style>{`@keyframes fade-in { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} } .animate-fade-in { animation: fade-in 200ms ease-out both; }`}</style>
    </div>
  );
}

