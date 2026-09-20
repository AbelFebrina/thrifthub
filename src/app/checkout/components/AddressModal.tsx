'use client';

import { useState, useEffect } from 'react';
import { X, MapPin, User, Phone, Check, Trash2 } from 'lucide-react';
import { useAddress } from '@/context/AddressContext';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingAddress?: {
    id: string;
    name: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    isDefault: boolean;
  } | null;
  onSave: (address: Omit<import('@/context/AddressContext').Address, 'id'>) => void;
}

export default function AddressModal({ isOpen, onClose, editingAddress, onSave }: AddressModalProps) {
  const { addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useAddress();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    isDefault: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      if (editingAddress) {
        setFormData({
          name: editingAddress.name,
          phone: editingAddress.phone,
          address: editingAddress.address,
          city: editingAddress.city,
          postalCode: editingAddress.postalCode,
          isDefault: editingAddress.isDefault,
        });
      } else {
        setFormData({ name: '', phone: '', address: '', city: '', postalCode: '', isDefault: false });
      }
      setErrors({});
    }
  }, [isOpen, editingAddress]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Nama wajib diisi';
    if (!formData.phone.trim()) errs.phone = 'No. HP wajib diisi';
    else if (!/^(\+62|08)\d{6,14}$/.test(formData.phone.replace(/\s/g, ''))) errs.phone = 'Format HP tidak valid';
    if (!formData.address.trim()) errs.address = 'Alamat wajib diisi';
    if (!formData.city.trim()) errs.city = 'Kota wajib diisi';
    if (!formData.postalCode.trim()) errs.postalCode = 'Kode pos wajib diisi';
    else if (!/^\d{5}$/.test(formData.postalCode)) errs.postalCode = 'Kode pos 5 angka';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({ ...formData });
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus alamat ini?')) {
      deleteAddress(id);
    }
  };

  const handleSetDefault = (id: string) => {
    setDefaultAddress(id);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 sticky top-0 bg-white z-10">
          <h2 className="font-display text-lg font-bold text-neutral-900">
            {editingAddress ? 'Edit Alamat' : 'Tambah Alamat Baru'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
            aria-label="Tutup"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Saved Addresses List */}
        {addresses.length > 0 && !editingAddress && (
          <div className="px-6 py-4 border-b border-neutral-200">
            <h3 className="text-sm font-medium text-neutral-700 mb-3">Alamat Tersimpan</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {addresses.map(addr => (
                <button
                  key={addr.id}
                  type="button"
                  onClick={() => {
                    setFormData({
                      name: addr.name,
                      phone: addr.phone,
                      address: addr.address,
                      city: addr.city,
                      postalCode: addr.postalCode,
                      isDefault: addr.isDefault,
                    });
                  }}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    formData.name === addr.name && formData.address === addr.address
                      ? 'border-[#E17100] bg-[#E17100]/5'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-neutral-900 truncate">{addr.name}</span>
                        {addr.isDefault && (
                          <span className="px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-medium">Utama</span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5 truncate">{addr.phone}</p>
                      <p className="text-xs text-neutral-500 truncate">{addr.address}, {addr.city} {addr.postalCode}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {!addr.isDefault && (
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleSetDefault(addr.id); }}
                          className="p-1 text-neutral-400 hover:text-green-600 transition-colors"
                          title="Jadikan utama"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleDelete(addr.id); }}
                        className="p-1 text-neutral-400 hover:text-red-500 transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5 flex items-center gap-1">
              Nama Penerima <span className="text-[#E17100]">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nama lengkap"
                className={`w-full rounded-lg border px-4 py-3 pl-11 text-sm text-neutral-900 placeholder-neutral-400 focus:border-[#E17100] focus:outline-none focus:ring-2 focus:ring-[#E17100]/20 transition-colors ${errors.name ? 'border-red-500' : 'border-neutral-300'}`}
              />
            </div>
            {errors.name && <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5 flex items-center gap-1">
              No. HP <span className="text-[#E17100]">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                placeholder="081234567890"
                className={`w-full rounded-lg border px-4 py-3 pl-11 text-sm text-neutral-900 placeholder-neutral-400 focus:border-[#E17100] focus:outline-none focus:ring-2 focus:ring-[#E17100]/20 transition-colors ${errors.phone ? 'border-red-500' : 'border-neutral-300'}`}
              />
            </div>
            {errors.phone && <p className="text-[10px] text-red-500 mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5 flex items-center gap-1">
              Alamat Lengkap <span className="text-[#E17100]">*</span>
            </label>
            <textarea
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              rows={3}
              placeholder="Jl. Contoh No. 123, RT/RW, Kelurahan..."
              className={`w-full rounded-lg border px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-[#E17100] focus:outline-none focus:ring-2 focus:ring-[#E17100]/20 transition-colors resize-none ${errors.address ? 'border-red-500' : 'border-neutral-300'}`}
            />
            {errors.address && <p className="text-[10px] text-red-500 mt-1">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5 flex items-center gap-1">
                Kota <span className="text-[#E17100]">*</span>
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
                placeholder="Malang"
                className={`w-full rounded-lg border px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-[#E17100] focus:outline-none focus:ring-2 focus:ring-[#E17100]/20 transition-colors ${errors.city ? 'border-red-500' : 'border-neutral-300'}`}
              />
              {errors.city && <p className="text-[10px] text-red-500 mt-1">{errors.city}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5 flex items-center gap-1">
                Kode Pos <span className="text-[#E17100]">*</span>
              </label>
              <input
                type="text"
                value={formData.postalCode}
                onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                placeholder="65123"
                className={`w-full rounded-lg border px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:border-[#E17100] focus:outline-none focus:ring-2 focus:ring-[#E17100]/20 transition-colors ${errors.postalCode ? 'border-red-500' : 'border-neutral-300'}`}
              />
              {errors.postalCode && <p className="text-[10px] text-red-500 mt-1">{errors.postalCode}</p>}
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isDefault}
              onChange={e => setFormData({ ...formData, isDefault: e.target.checked })}
              className="h-4 w-4 rounded border-neutral-300 text-[#E17100] focus:ring-[#E17100]/20 accent-[#E17100]"
            />
            <span className="text-sm text-neutral-700">Jadikan alamat utama</span>
          </label>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-neutral-300 py-3 text-neutral-700 font-medium hover:bg-neutral-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-[#E17100] py-3 text-white font-medium hover:bg-orange-600 transition-colors"
            >
              {editingAddress ? 'Simpan Perubahan' : 'Simpan Alamat'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
