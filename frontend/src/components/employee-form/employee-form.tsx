'use client';

import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import EmployeeSignInHeader from "./employee-header";
import EmployeeInput from "./employee-input";
import EmployeeCheckbox from "./employee-checkbox";
import EmployeeFooter from "./employee-footer";

export function EmployeeSignInForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      if (!identifier || !password) {
        throw new Error("Employee ID or Email and password are required");
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
          login: identifier,
          password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();

        if (res.status === 403) {
          setError(errorData.message || "Your account is inactive. Please contact admin.");
        } else {
          setError(errorData.message || "Invalid credentials");
        }
        return;
      }

      const data = await res.json();

      if (!data.token) {
        throw new Error("No token received from server");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

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
          id="identifier"
          label="Employee ID or Email"
          type="text"
          placeholder="Enter your Employee ID or Email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
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
