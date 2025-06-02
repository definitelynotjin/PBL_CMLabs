import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SignUpInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const SignUpInput = ({ id, label, type = "text", value, onChange, required }: SignUpInputProps) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={`Enter your ${label.toLowerCase()}`}
        className="p-6"
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SignUpInput;