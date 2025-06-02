'use client';

import { useSearchParams, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { ResetPasswordForm } from "./reset-password-form"

interface ResetPasswordProps {
  className?: string;
}

export function ResetPassword({ className }: ResetPasswordProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col gap-3 text-center">
        <h1 className="text-3xl font-bold">Set new password</h1>
        <p className="text-muted-foreground">
          Enter your new password below to complete the reset process.<br />
          Ensure it's strong and secure.
        </p>
      </div>

      <ResetPasswordForm token={token} router={router} />

      <div className="flex items-center justify-center gap-2 mt-4">
        <a href="/signin" className="text-gray-600 text-sm hover:underline">
          Back to sign in
        </a>
      </div>
    </div>
  )
}