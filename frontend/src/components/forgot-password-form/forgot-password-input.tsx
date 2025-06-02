import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ForgotPasswordInputProps {
  email: string;
  setEmail: (email: string) => void;
}

const ForgotPasswordInput = ({ email, setEmail }: ForgotPasswordInputProps) => {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email address"
          className="p-6 bg-gray-100"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ForgotPasswordInput;