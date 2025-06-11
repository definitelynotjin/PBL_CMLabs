// field.tsx
import React from 'react';
import { Input } from '@/components/ui/input';

export interface FieldProps {
  label: string;
  placeholder: string;
  defaultValue?: string;
}

const Field: React.FC<FieldProps> = ({ label, placeholder, defaultValue }) => {
  return (
    <div className="space-y-1 w-full">
      <label className="text-sm font-medium">{label}</label>
      <Input placeholder={placeholder} defaultValue={defaultValue} />
    </div>
  );
};

export default Field;
