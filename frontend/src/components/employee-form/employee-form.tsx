'use client';

import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";  // use next/navigation for app router
import { Button } from "@/components/ui/button";
import EmployeeSignInHeader from "./employee-header";
import EmployeeInput from "./employee-input";
import EmployeeCheckbox from "./employee-checkbox";
import EmployeeFooter from "./employee-footer";

export function EmployeeSignInForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();  // Correct place for useRouter hook

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      if (!employeeId || !password) {
        throw new Error("Employee ID and password are required");
      }
      await fetch("https://pblcmlabs.duckdns.org/sanctum/csrf-cookie", {
        credentials: "include",
      });

      const res = await fetch("https://pblcmlabs.duckdns.org/api/auth/login-employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          employee_id: employeeId,
          password: password,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Login failed");
      }

      const data = await res.json();

      // Optionally store token if returned
      localStorage.setItem("token", data.access_token);

      // Redirect to dashboard
      router.push("/dashboard-user");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <EmployeeSignInHeader />
      <div className="grid gap-6">
        <EmployeeInput
          id="employeeId"
          label="Employee ID"
          type="text"
          placeholder="Enter your Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
        />
        <EmployeeInput
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <EmployeeCheckbox />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button
          type="submit"
          className="w-full p-6 bg-gray-500 hover:bg-gray-600 text-white uppercase"
        >
          Sign In
        </Button>
        <Button
          variant="outline"
          className="w-full p-6 border-gray-200"
          type="button"
          onClick={() => router.push("/signin")}
        >
          Use a different sign-in method
        </Button>
      </div>
      <EmployeeFooter />
    </form>
  );
}
