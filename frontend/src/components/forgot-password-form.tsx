'use client';

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

export function ForgotPassword({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      const res = await fetch("http://20.189.126.184:8000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Something went wrong.")
      } else {
        setSuccess(data.message || "If that email exists, a reset link has been sent.")
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      className={cn("flex flex-col gap-6 max-w-md", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">Forgot Password</h1>
        <p className="text-muted-foreground">
          No worries! Enter your email address below, and we'll
          send you a link to reset your password.
        </p>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            className="p-6 bg-gray-100"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <Button
          type="submit"
          className="w-full p-6 bg-gray-600 hover:bg-gray-700 text-white"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Reset password"}
        </Button>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <ArrowLeft className="h-4 w-4" />
        <a href="/signin" className="text-gray-600 text-sm hover:underline">
          Back to sign in
        </a>
      </div>
    </form>
  )
}
