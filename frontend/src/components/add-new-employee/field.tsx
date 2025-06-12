import React from 'react';
import { Input } from '@/components/ui/input';

interface FieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Field: React.FC<FieldProps> = ({ label, placeholder, value, onChange }) => (
  <div className="space-y-1 w-full">
    <label className="text-sm font-medium">{label}</label>
    <Input
      placeholder={placeholder}
      className="w-full"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default Field;
