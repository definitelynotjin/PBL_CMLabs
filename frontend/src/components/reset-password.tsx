'use client';

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"

interface ResetPasswordProps {
  className?: string;
}

export function ResetPassword({ className }: ResetPasswordProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")

  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!token) {
      setError("Invalid or missing token.")
      return
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch("http://20.189.126.184:8000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          password: newPassword,
          password_confirmation: confirmPassword,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.errors) {
          const firstError = Object.values(data.errors)[0] as string[]
          throw new Error(firstError[0])
        }

        if (data.message) {
          throw new Error(data.message)
        }

        throw new Error("Failed to reset password.")
      }

      setSuccess("Password reset successfully. Redirecting to login...")
      setTimeout(() => router.push("/signin"), 2000)
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col gap-3 text-center">
        <h1 className="text-3xl font-bold">Set new password</h1>
        <p className="text-muted-foreground">
          Enter your new password below to complete the reset process.<br />
          Ensure it's strong and secure.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="newPassword">New Password</Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="p-6 bg-gray-100"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>
          </div>
          <p className="text-muted-foreground text-sm">Must be at least 8 characters</p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password again"
            className="p-6 bg-gray-100"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <Button
          className="w-full p-6 bg-gray-600 hover:bg-gray-700 text-white font-medium"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Resetting..." : "Reset password"}
        </Button>
      </form>

      <div className="flex items-center justify-center gap-2 mt-4">
        <ArrowLeft className="h-4 w-4" />
        <a href="/signin" className="text-gray-600 text-sm hover:underline">
          Back to sign in
        </a>
      </div>
    </div>
  )
}
