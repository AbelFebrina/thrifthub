'use client';

import { useMemo } from 'react';
import { Truck, Clock, Check, AlertCircle } from 'lucide-react';

interface ShippingMethod {
  id: string;
  name: string;
  eta: string;
  price: number;
  description: string;
  cod?: boolean;
}

interface ShippingMethodSelectorProps {
  storeId: number;
  storeName: string;
  subtotal: number;
  methods: ShippingMethod[];
  selectedMethod: string;
  onSelect: (methodId: string) => void;
  error?: string;
}

function formatPrice(price: number) {
  return 'Rp ' + price.toLocaleString('id-ID');
}

export default function ShippingMethodSelector({
  storeId,
  storeName,
  subtotal,
  methods,
  selectedMethod,
  onSelect,
  error,
}: ShippingMethodSelectorProps) {
  // Check if COD is available (based on store location or subtotal)
  const availableMethods = useMemo(() => {
    return methods.map(m => ({
      ...m,
      available: true, // Add logic here if needed (e.g., COD only for certain cities)
    }));
  }, [methods]);

  return (
    <div className="px-4 py-4 bg-[#E17100]/5 border-t border-neutral-200">
      <label className="block text-xs font-medium text-neutral-700 mb-2">Pilih Kurir</label>
      <div className="grid grid-cols-2 gap-2">
        {availableMethods.map(method => {
          const isSelected = selectedMethod === method.id;
          const isCOD = method.cod === true;
          
          return (
            <label
              key={method.id}
              className={`group relative cursor-pointer rounded-xl border-2 p-3 transition-all ${
                isSelected
                  ? 'border-[#E17100] bg-[#E17100]/5 shadow-sm shadow-[#E17100]/10'
                  : 'border-neutral-200 hover:border-[#E17100]/50 hover:bg-neutral-50'
              }`}
            >
              <input
                type="radio"
                name={`shipping_${storeId}`}
                value={method.id}
                checked={isSelected}
                onChange={() => onSelect(method.id)}
                className="absolute inset-0 opacity-0 peer"
              />
              
              {/* Selected indicator */}
              <div className="absolute top-2 right-2 w-5 h-5 rounded-full border-2 transition-colors peer-checked:border-[#E17100] peer-checked:bg-[#E17100] peer-checked:after:content-[''] peer-checked:after:absolute peer-checked:after:top-1/2 peer-checked:after:left-1/2 peer-checked:after:-translate-x-1/2 peer-checked:after:-translate-y-1/2 peer-checked:after:w-1.5 peer-checked:after:h-2.5 peer-checked:after:border-r-2 peer-checked:after:border-b-2 peer-checked:after:border-white peer-checked:after:rotate-45 peer-checked:after:peer-checked:after:border-white border-neutral-300">
              </div>

              <div className="flex items-start gap-3 relative z-10">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-[#E17100]/20' : 'bg-neutral-100 group-hover:bg-neutral-200'
                }`}>
                  {isCOD ? (
                    <Truck className={`h-5 w-5 ${isSelected ? 'text-[#E17100]' : 'text-neutral-500'}`} />
                  ) : (
                    <Truck className={`h-5 w-5 ${isSelected ? 'text-[#E17100]' : 'text-neutral-500'}`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`font-medium text-sm ${isSelected ? 'text-[#E17100]' : 'text-neutral-900'}`}>
                      {method.name}
                      {isCOD && (
                        <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-medium">COD</span>
                      )}
                    </p>
                    {method.price === 0 && !isCOD && (
                      <span className="px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-medium">Gratis</span>
                    )}
                  </div>
                  <p className="text-[10px] text-neutral-500 mt-0.5 truncate">{method.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 text-[10px] text-neutral-500">
                      <Clock className="h-3 w-3" />
                      <span>{method.eta}</span>
                    </div>
                    <p className={`font-semibold text-sm ${isSelected ? 'text-[#E17100]' : 'text-neutral-900'}`}>
                      {method.price === 0 && !isCOD ? 'Gratis' : formatPrice(method.price)}
                    </p>
                  </div>
                </div>
              </div>
            </label>
          );
        })}
      </div>
      {error && (
        <p className="mt-2 text-[10px] text-red-500 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );
}
