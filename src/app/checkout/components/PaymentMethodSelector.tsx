'use client';

import { CreditCard, Wallet, Star, Truck, Check } from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ElementType;
  desc: string;
  type: 'bank' | 'ewallet' | 'rekber' | 'cod';
}

interface PaymentMethodSelectorProps {
  methods: PaymentMethod[];
  selectedMethod: string;
  onSelect: (methodId: string) => void;
}

export default function PaymentMethodSelector({
  methods,
  selectedMethod,
  onSelect,
}: PaymentMethodSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-3">Metode Pembayaran</label>
      <div className="grid grid-cols-2 gap-3">
        {methods.map(method => {
          const isSelected = selectedMethod === method.id;
          const Icon = method.icon;
          
          return (
            <label
              key={method.id}
              className={`group relative cursor-pointer rounded-xl border-2 p-4 transition-all ${
                isSelected
                  ? 'border-[#E17100] bg-[#E17100]/5 shadow-sm shadow-[#E17100]/10'
                  : 'border-neutral-200 hover:border-[#E17100]/50 hover:bg-neutral-50'
              }`}
            >
              <input
                type="radio"
                name="payment_method"
                value={method.id}
                checked={isSelected}
                onChange={() => onSelect(method.id)}
                className="absolute inset-0 opacity-0 peer"
              />
              
              {/* Selected checkmark */}
              <div className="absolute top-2 right-2 w-5 h-5 rounded-full border-2 transition-colors peer-checked:border-[#E17100] peer-checked:bg-[#E17100] peer-checked:after:content-[''] peer-checked:after:absolute peer-checked:after:top-1/2 peer-checked:after:left-1/2 peer-checked:after:-translate-x-1/2 peer-checked:after:-translate-y-1/2 peer-checked:after:w-1.5 peer-checked:after:h-2.5 peer-checked:after:border-r-2 peer-checked:after:border-b-2 peer-checked:after:border-white peer-checked:after:rotate-45 border-neutral-300">
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-[#E17100]/20' : 'bg-neutral-100 group-hover:bg-neutral-200'
                  }`}>
                    <Icon className={`h-6 w-6 ${isSelected ? 'text-[#E17100]' : 'text-neutral-500'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm ${isSelected ? 'text-[#E17100]' : 'text-neutral-900'}`}>
                      {method.name}
                    </p>
                    <p className="text-[10px] text-neutral-500 mt-0.5 truncate">{method.desc}</p>
                  </div>
                </div>

                {/* Badges for specific types */}
                {method.type === 'rekber' && (
                  <div className="mt-2 pt-2 border-t border-neutral-200">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-medium">
                      <Star className="h-3 w-3" />
                      Rekber Aman
                    </span>
                  </div>
                )}
                {method.type === 'cod' && (
                  <div className="mt-2 pt-2 border-t border-neutral-200">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-medium">
                      Bayar di Tempat
                    </span>
                  </div>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
