import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TextInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  showPassword?: boolean;
  setShowPassword?: (show: boolean) => void;
}

const TextInput = ({ id, label, type = "text", value, onChange, showPassword, setShowPassword }: TextInputProps) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={type === "password" && !showPassword ? "password" : "text"}
          placeholder={`Enter your ${label.toLowerCase()}`}
          className="p-6"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500"
            onClick={() => setShowPassword && setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  );
};

export default TextInput;