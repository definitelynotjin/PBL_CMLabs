import { Checkbox } from "@/components/ui/checkbox";

const EmployeeCheckbox = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Checkbox id="remember" />
        <label
          htmlFor="remember"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Remember Me
        </label>
      </div>
      <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
        Forgot Password?
      </a>
    </div>
  );
};

export default EmployeeCheckbox;
