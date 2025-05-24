'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      // Simulate an API call
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();

      // Successful sign-in
      if (remember) {
        localStorage.setItem("rememberedEmail", email); // Store email if "Remember Me" is checked
      }

      console.log("Login successful:", data);
      router.push("/dashboard"); // Redirect to dashboard
    } catch (err: any) {
      setError(err.message || "An error occurred during sign-in");
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-3xl font-semibold">Sign in</h1>
        <p className="text-muted-foreground text-sm">
          Welcome back to HRIS cmlabs! Manage everything with ease.
        </p>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email or Phone Number</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email or phone number"
            className="p-6"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="p-6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

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
          <a
            href="/dashboard"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </a>
        </div>

        <Button type="submit" className="w-full p-6 bg-gray-500 hover:bg-gray-600 text-white uppercase">
          Sign In
        </Button>

        <div className="grid gap-3">
          <Button
            variant="outline"
            className="w-full p-6 border-gray-200"
            type="button"
          >
            Sign in with Google
          </Button>

          <Button
            variant="outline"
            className="w-full p-6 border-gray-200"
            type="button"
          >
            Sign in with ID Employee
          </Button>
        </div>
      </div>

      <div className="pt-2 text-center text-sm border-t border-gray-200">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="text-blue-600 hover:underline">
          Sign up now and get started
        </a>
      </div>
    </form>
  );
}