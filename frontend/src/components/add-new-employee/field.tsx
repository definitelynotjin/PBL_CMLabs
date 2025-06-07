import React from 'react';
import { Input } from '@/components/ui/input';

interface FieldProps {
  label: string;
  placeholder: string;
}

const Field: React.FC<FieldProps> = ({ label, placeholder }) => (
  <div className="space-y-1 w-full">
    <label className="text-sm font-medium">{label}</label>
    <Input placeholder={placeholder} className="w-full" />
  </div>
);

export default Field;