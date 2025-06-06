'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SignInHeader from "./signin-header";
import TextInput from "./text-input";
import RememberMe from "./remember-me";
import GoogleSignIn from "./google-signin";
import Footer from "./footer";

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

      localStorage.setItem("token", data.token);
      
      if (remember) {
        localStorage.setItem("rememberedIdentifier", identifier);
      }

      if (data.user.role === "admin") {
        router.push("/dashboard");
      } else if (data.user.role === "employee") {
        router.push("/dashboard-user");
      } else {
        setError("Unknown role");
      }

    } catch (err: any) {
      setError(err.message || "An error occurred during sign-in");
    }
  };


  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <SignInHeader />
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid gap-6">
        <TextInput id="identifier" label="Email or Phone Number" value={identifier} onChange={setIdentifier} />
        <TextInput id="password" label="Password" type="password" value={password} onChange={setPassword} showPassword={showPassword} setShowPassword={setShowPassword} />
        <RememberMe remember={remember} setRemember={setRemember} />
        <Button type="submit" className="w-full p-6 bg-gray-500 hover:bg-gray-600 text-white uppercase">
          Sign In
        </Button>
        <GoogleSignIn />
        <Button type="button" variant="outline" className="w-full p-6 uppercase"
          onClick={() => { router.push("/employee-signin"); }}
        >
          Sign In with ID Employee
        </Button>
      </div>
      <Footer />
    </form>
  );
}
