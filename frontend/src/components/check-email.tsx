"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

interface CheckEmailProps {
  email?: string;
  className?: string;
}

export function CheckEmail({ email: propEmail, className }: CheckEmailProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email") || propEmail || "uremail@gmail.com";

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleResend() {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch("https://pblcmlabs.duckdns.org/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailFromQuery }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Password reset email resent successfully.");
      } else {
        setError(data.message || "Failed to resend email.");
      }
    } catch (e) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <div className="flex flex-col items-center gap-6">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
          <div className="w-12 h-12 bg-primary/20 rounded-full" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-center">Check your email</h1>
      </div>

      <div className="text-center space-y-2">
        <p className="text-muted-foreground text-sm md:text-base">We sent a password reset link to</p>
        <p className="font-medium text-sm md:text-base">{emailFromQuery}</p>
        <p className="text-muted-foreground text-sm md:text-base">
          which is valid for 24 hours. Please check your inbox!
        </p>
        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </div>

      <Button
        className="w-full py-6 bg-primary hover:bg-primary/90 text-primary-foreground"
        onClick={() => window.open("https://mail.google.com", "_blank")}
      >
        Open Gmail
      </Button>

      <div className="space-y-6">
        <div className="text-center text-sm">
          Don't receive the email?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={loading}
            className="text-primary hover:text-primary/90 underline-offset-4 hover:underline"
          >
            {loading ? "Resending..." : "Click here to resend"}
          </button>
        </div>

        <div className="flex items-center justify-center gap-2">
          <ArrowLeft className="h-4 w-4 text-muted-foreground" />
          <button
            type="button"
            onClick={() => router.push("/signin")}
            className="text-muted-foreground text-sm hover:text-foreground transition-colors"
          >
            Back to Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
