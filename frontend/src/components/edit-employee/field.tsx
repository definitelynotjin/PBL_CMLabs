// field.tsx
import React from 'react';
import { Input } from '@/components/ui/input';

export interface FieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Field: React.FC<FieldProps> = ({ label, placeholder, value, onChange }) => {
  return (
    <div className="space-y-1 w-full">
      <label className="text-sm font-medium">{label}</label>
      <Input placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
};

export default Field;
