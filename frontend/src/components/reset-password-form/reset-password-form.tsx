import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { PasswordInput } from "./password-input"
import { SuccessMessage } from "./success-message"
import { ErrorMessage } from "./error-message"

interface ResetPasswordFormProps {
  token: string | null | undefined
  router: any
}

export function ResetPasswordForm({ token, router }: ResetPasswordFormProps) {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")


  useEffect(() => {
  if (router?.query?.email) {
    setEmail(router.query.email as string)
  } else {
    setEmail("")
  }
}, [router?.query?.email])



  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
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
        const res = await fetch("https://pblcmlabs.duckdns.org/api/auth/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token,
            email,
            password: newPassword,
            password_confirmation: confirmPassword,
          }),
          redirect: "manual", // <-- prevent automatic redirect
        })

        const contentType = res.headers.get("content-type")

        // Check if response is HTML (probably redirected)
        if (contentType && contentType.includes("text/html")) {
          throw new Error("Received HTML instead of JSON. You may have been redirected.")
        }

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
        console.error(err)
        setError(err.message || "Something went wrong. Please try again.")
      } finally {
        setIsLoading(false)
      }
    },
    [token, newPassword, confirmPassword, router]
  )

  return (
    <form
      onSubmit={handleSubmit}
      style={{ pointerEvents: "auto" }} // force pointer events on form
      className="flex flex-col gap-6"
    >
      <PasswordInput
        label="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <PasswordInput
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {confirmPassword && confirmPassword !== newPassword && (
        <p className="text-red-500 text-sm">Passwords do not match</p>
      )}
      <ErrorMessage error={error} />
      <SuccessMessage success={success} />
      <Button
        className="w-full p-6 bg-gray-600 hover:bg-gray-700 text-white font-medium"
        type="submit"
        onClick={() => console.log("Button clicked!")}
        style={{ pointerEvents: "auto" }} // force pointer events on button
      >
        {isLoading ? "Resetting..." : "Reset password"}
      </Button>
    </form>
  )
}
