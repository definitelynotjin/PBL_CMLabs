'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useGoogleLogin } from '@react-oauth/google';

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`https://pblcmlabs.duckdns.org/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login: identifier, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();

      if (remember) {
        localStorage.setItem("rememberedIdentifier", identifier);
      }

      console.log("Login successful:", data);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "An error occurred during sign-in");
    }
  };

  const handleLoginSuccess = (response: any) => {
    console.log("Google login success:", response);
    // Add further handling here, e.g. send token to your API
  };

  const handleLoginError = () => {
    setError("Failed to sign in with Google.");
  };

  // Use the hook to create a custom Google login flow
  const login = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
  });

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
          <Label htmlFor="identifier">Email or Phone Number</Label>
          <Input
            id="identifier"
            type="text"
            placeholder="Enter your email or phone number"
            className="p-6"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
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
          <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" className="w-full p-6 bg-gray-500 hover:bg-gray-600 text-white uppercase">
          Sign In
        </Button>

        <div className="grid gap-3">
          <div className="mt-4">
            <Button
              variant="outline"
              className="w-full p-6 border-gray-200"
              onClick={() => login()}
            >
              Sign in with Google
            </Button>
          </div>

          <Link href="/employee-signin" passHref>
            <Button
              variant="outline"
              className="w-full p-6 border-gray-200"
              asChild
            >
              <a>Sign in with ID Employee</a>
            </Button>
          </Link>
        </div>
      </div>

      <div className="pt-2 text-center text-sm border-t border-gray-200">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-blue-600 hover:underline">
          Sign up now and get started
        </Link>
      </div>
    </form>
  );
}
