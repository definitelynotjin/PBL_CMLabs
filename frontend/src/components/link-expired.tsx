"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

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

      <div className="text-center">
        <p className="text-muted-foreground">
          The password reset link has expired.
          <br />
          Please request a new link to reset your password.
        </p>
      </div>

      <Button 
        className="w-full p-6 bg-gray-500 hover:bg-gray-600 text-white uppercase"
        type="button"
      >
        Back to login
      </Button>
    </div>
  )
}