import { Checkbox } from "@/components/ui/checkbox"; // Ensure this import is correct
import Link from "next/link";

interface RememberMeProps {
  remember: boolean;
  setRemember: (remember: boolean) => void;
}

const RememberMe = ({ remember, setRemember }: RememberMeProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="remember"
          checked={remember}
          onChange={() => setRemember(!remember)}
        />
        <label
          htmlFor="remember"
          className="text-sm font-medium leading-none"
        >
          Remember Me
        </label>
      </div>
      <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
        Forgot Password?
      </Link>
    </div>
  );
};

export default RememberMe;
