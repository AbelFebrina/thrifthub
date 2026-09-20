import React from 'react';

interface CheckboxProps extends React.LabelHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, error, className = '', ...props }) => {
  return (
    <label className={`flex items-start gap-3 cursor-pointer ${className}`}>
      <input
        type="checkbox"
        className="mt-1.5 w-4 h-4 rounded border-[#e8dcc8] text-[#E17100] focus:ring-[#E17100] cursor-pointer focus:ring-2"
        {...props}
      />
      <span className="text-sm text-[#705548] leading-relaxed">{label}</span>
    </label>
  );
};

