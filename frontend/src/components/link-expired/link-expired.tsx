"use client"

import { cn } from "@/lib/utils"
import { LinkExpiredMessage } from "./link-expired-message"
import { BackToSignInButton } from "./back-button"

interface LinkExpiredProps {
  className?: string;
}

export function LinkExpired({ className }: LinkExpiredProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full" />
        <h1 className="text-3xl font-bold">Link Expired</h1>
      </div>

      <LinkExpiredMessage />

      <BackToSignInButton />
    </div>
  )
}