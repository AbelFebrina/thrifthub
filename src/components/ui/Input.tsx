import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[#3e3028] mb-1.5">{label}</label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b8895a]">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full rounded-xl border text-[#3e3028] placeholder-[#b8895a] focus:outline-none focus:ring-2 transition-all text-sm ${
              icon ? 'pl-11' : 'pl-4'
            } pr-4 py-3 ${
              error
                ? 'border-red-400 focus:ring-red-300 focus:border-red-400'
                : 'border-[#e8dcc8] bg-[#f7f2ea] focus:ring-[#E17100]/30 focus:border-[#E17100] focus:bg-white'
            } ${className}`}
          />
        </div>
        {error && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" aria-hidden="true" />{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

