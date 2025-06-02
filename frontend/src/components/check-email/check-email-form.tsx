'use client';

import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import CheckEmailHeader from "./check-email-header";
import CheckEmailMessage from "./check-email-message";
import CheckEmailButton from "./check-email-button";
import CheckEmailFooter from "./check-email-footer";

interface CheckEmailProps {
  email?: string;
  className?: string;
}

export function CheckEmail({ email: propEmail, className }: CheckEmailProps) {
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
      <CheckEmailHeader />
      <CheckEmailMessage email={emailFromQuery} message={message} error={error} />
      <CheckEmailButton />
      <CheckEmailFooter loading={loading} onResend={handleResend} />
    </div>
  );
}