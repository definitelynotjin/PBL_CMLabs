import Link from "next/link"
import { Button } from "@/components/ui/button"

export function LoginButton() {
  return (
    <Link href="/signin">
      <Button 
        className="w-full p-6 bg-gray-600 hover:bg-gray-700 text-white font-medium"
        type="button"
      >
        Login Now
      </Button>
    </Link>
  )
}