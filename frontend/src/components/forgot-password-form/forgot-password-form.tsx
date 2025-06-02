'use client';

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ForgotPasswordHeader from "./forgot-password-header";
import ForgotPasswordInput from "./forgot-password-input";
import ForgotPasswordMessage from "./forgot-password-message";
import ForgotPasswordFooter from "./forgot-password-footer";

export function ForgotPassword({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const res = await fetch("http://20.189.126.184:8000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        setSuccess(data.message || "If that email exists, a reset link has been sent.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6 max-w-md", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <ForgotPasswordHeader />
      <ForgotPasswordInput email={email} setEmail={setEmail} />
      <ForgotPasswordMessage error={error} success={success} />
      <Button
        type="submit"
        className="w-full p-6 bg-gray-600 hover:bg-gray-700 text-white"
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Reset password"}
      </Button>
      <ForgotPasswordFooter />
    </form>
  );
}