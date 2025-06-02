"use client"

import { cn } from "@/lib/utils"
import { SuccessMessage } from "./success-message"
import { SupportMessage } from "./support-message"
import { LoginButton } from "./login-button"
import { ArrowLeft } from "lucide-react"

interface SuccessResetProps {
  className?: string;
}

export function SuccessReset({ className }: SuccessResetProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <SuccessMessage />
      <SupportMessage />
      <LoginButton />

      <div className="flex items-center justify-center gap-2 mt-4">
        <ArrowLeft className="h-4 w-4" />
        <a href="signin" className="text-gray-600 text-sm hover:underline">
          Back to log in
        </a>
      </div>
    </div>
  )
}