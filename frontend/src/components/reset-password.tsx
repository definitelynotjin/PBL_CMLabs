"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

interface ResetPasswordProps {
  className?: string;
}

export function ResetPassword({ className }: ResetPasswordProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold">Set new password</h1>
        <p className="text-muted-foreground text-center">
          Enter your new password below to complete the reset process.
          <br />
          Ensure it's strong and secure
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="newPassword">New Password</Label>
          <div className="relative">
            <Input 
              id="newPassword" 
              type="password" 
              placeholder="Enter your password" 
              className="p-6 bg-gray-100"
              required 
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor" />
              </svg>
            </div>
          </div>
          <p className="text-muted-foreground text-sm">Must be at least 8 character</p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input 
            id="confirmPassword" 
            type="password" 
            placeholder="Enter your password" 
            className="p-6 bg-gray-100"
            required 
          />
        </div>
        
        <Button 
          className="w-full p-6 bg-gray-600 hover:bg-gray-700 text-white font-medium"
          type="button"
        >
          Reset password
        </Button>
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