import { Button } from "@/components/ui/button"

export function BackToSignInButton() {
  return (
    <Button
      className="w-full p-6 bg-gray-500 hover:bg-gray-600 text-white uppercase"
      type="button"
      onClick={() => window.location.href = "/signin"}
    >
      Back to Sign In
    </Button>
  )
}