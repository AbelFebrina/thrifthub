'use client';

import { useState } from 'react';
import { AlertTriangle, X, Check } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ isOpen, title, message, confirmLabel = 'Hapus', cancelLabel = 'Batal', onConfirm, onCancel }: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl animate-scale-in">
        <button type="button" onClick={onCancel} className="absolute top-4 right-4 text-[#a09080] hover:text-[#3e3028] transition-colors" aria-label="Tutup">
          <X className="h-5 w-5" />
        </button>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-display text-lg font-bold text-[#3e3028]">{title}</h3>
            <p className="text-sm text-[#a09080] mt-1">{message}</p>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button type="button" onClick={onCancel} className="flex-1 rounded-xl border border-[#e8dcc8] py-3 text-sm font-medium text-[#705548] hover:bg-[#f7f2ea] transition-colors">
            {cancelLabel}
          </button>
          <button type="button" onClick={onConfirm} className="flex-1 rounded-xl bg-[#3e3028] py-3 text-sm font-medium text-white hover:bg-[#292524] transition-colors">
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

