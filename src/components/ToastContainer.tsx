'use client';

import { useEffect } from 'react';
import { useToast } from '@/context/ToastContext';
import { X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-[100] space-y-2" aria-live="polite">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="flex items-center gap-3 px-4 py-3 bg-[#3e3028] text-white rounded-xl shadow-lg text-sm animate-slide-up max-w-sm"
          style={{ animationDuration: '200ms' }}
        >
          <span className="flex-1">{toast.message}</span>
          <button type="button" onClick={() => removeToast(toast.id)} className="text-neutral-400 hover:text-white transition-colors" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

