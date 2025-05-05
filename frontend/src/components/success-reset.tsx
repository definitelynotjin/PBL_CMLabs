"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface SuccessResetProps {
  className?: string;
}

export function SuccessReset({ className }: SuccessResetProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full" />
        <h1 className="text-3xl font-bold text-center">
          Your password has been successfully reset
        </h1>
      </div>

      <div className="text-center">
        <p className="text-muted-foreground">
          You can log in with your new password. If you encounter any issues,
          <br />
          please contact support !
        </p>
      </div>

      <Button 
        className="w-full p-6 bg-gray-600 hover:bg-gray-700 text-white font-medium"
        type="button"
      >
        Login Now
      </Button>

      <div className="flex items-center justify-center gap-2 mt-4">
        <ArrowLeft className="h-4 w-4" />
        <a href="#" className="text-gray-600 text-sm hover:underline">
          Back to log in
        </a>
      </div>
    </div>
  )
}