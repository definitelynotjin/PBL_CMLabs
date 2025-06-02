import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PasswordInput({ label, value, onChange }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          className="p-6 bg-gray-100"
          required
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
        </button>
      </div>
      <p className="text-muted-foreground text-sm">Must be at least 8 characters</p>
    </div>
  )
}