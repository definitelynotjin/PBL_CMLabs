import React from 'react';
import { Input } from '@/components/ui/input';

export interface FieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;  // you already have this
}

const Field: React.FC<FieldProps> = ({ label, placeholder, value, onChange, disabled, className }) => {
  return (
    <div className="space-y-1 w-full">
      <label className="text-sm font-medium">{label}</label>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={className}  // pass className here
      />
    </div>
  );
};

export default Field;
