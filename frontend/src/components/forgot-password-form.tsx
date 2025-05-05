import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

export function ForgotPassword({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6 max-w-md", className)} {...props}>
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
          />
        </div>
        
        <Button type="submit" className="w-full p-6 bg-gray-600 hover:bg-gray-700 text-white">
          Reset password
        </Button>
      </div>
      
      <div className="flex items-center gap-2 mt-4">
        <ArrowLeft className="h-4 w-4" />
        <a href="#" className="text-gray-600 text-sm hover:underline">
          Back to log in
        </a>
      </div>
    </form>
  )
}