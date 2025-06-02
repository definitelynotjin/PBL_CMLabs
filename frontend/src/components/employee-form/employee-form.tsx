"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import EmployeeSignInHeader from "./employee-header";
import EmployeeInput from "./employee-input";
import EmployeeCheckbox from "./employee-checkbox";
import EmployeeFooter from "./employee-footer";

export function EmployeeSignInForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <EmployeeSignInHeader />
      <div className="grid gap-6">
        <EmployeeInput
          id="companyUsername"
          label="Company Username"
          type="text"
          placeholder="Enter your Company Username"
          required
        />
        <EmployeeInput
          id="idEmployee"
          label="ID Employee"
          type="text"
          placeholder="Enter your ID Employee"
          required
        />
        <EmployeeInput
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          required
        />
        <EmployeeCheckbox />
        <Button type="submit" className="w-full p-6 bg-gray-500 hover:bg-gray-600 text-white uppercase">
          Sign In
        </Button>
        <Button
          variant="outline"
          className="w-full p-6 border-gray-200"
          type="button"
        >
          Use a different sign-in method
        </Button>
      </div>
      <EmployeeFooter />
    </form>
  );
}