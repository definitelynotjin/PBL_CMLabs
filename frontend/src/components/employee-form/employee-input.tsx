import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmployeeInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  required?: boolean;
}

const EmployeeInput = ({ id, label, type = "text", placeholder, required }: EmployeeInputProps) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className="p-6"
        required={required}
      />
    </div>
  );
};

export default EmployeeInput;