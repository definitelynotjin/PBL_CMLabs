"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface CheckEmailProps {
  email?: string;
  className?: string;
}

export function CheckEmail({
  email = "uremail@gmail.com",
  className,
}: CheckEmailProps) {
  return (
    <div className={cn("flex flex-col gap-6 max-w-md", className)}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full" />
        <h1 className="text-3xl font-bold">Check your email</h1>
      </div>

      <div className="text-center">
        <p className="text-muted-foreground">
          We sent a password reset link to your email <span className="font-semibold">({email})</span> which
          is valid for 24 hours. Please check your inbox!
        </p>
      </div>

      <Button
        className="w-full p-6 bg-gray-600 hover:bg-gray-700 text-white"
        onClick={() => window.open(`https://mail.google.com`, '_blank')}
      >
        Open Gmail
      </Button>

      <div className="text-center text-sm">
        Don’t receive the email?{" "}
        <a href="#" className="text-gray-600 underline underline-offset-4">
          Click here to resend!
        </a>
      </div>

      <div className="flex items-center justify-center gap-2 mt-4">
        <ArrowLeft className="h-4 w-4" />
        <a href="#" className="text-gray-600 text-sm hover:underline">
          Back to log in
        </a>
      </div>
    </div>
  )
}
