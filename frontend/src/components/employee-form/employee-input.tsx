import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

interface EmployeeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

const EmployeeInput = React.forwardRef<HTMLInputElement, EmployeeInputProps>(
  ({ id, label, className, ...props }, ref) => {
    return (
      <div className="grid gap-2">
        <Label htmlFor={id}>{label}</Label>
        <Input
          id={id}
          ref={ref}
          className={`p-6 ${className ?? ""}`}
          {...props}
        />
      </div>
    );
  }
);

EmployeeInput.displayName = "EmployeeInput";

export default EmployeeInput;
