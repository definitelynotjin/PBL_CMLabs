import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-3xl font-semibold">Sign Up</h1>
        <p className="text-muted-foreground text-sm">
          Create your account and streamline your employee management.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input 
              id="firstName" 
              type="text" 
              placeholder="Enter your first name" 
              className="p-6"
              required 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input 
              id="lastName" 
              type="text" 
              placeholder="Enter your first name" 
              className="p-6"
              required 
            />
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="Enter your email" 
            className="p-6"
            required 
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input 
              id="password" 
              type="password" 
              placeholder="Enter your password" 
              className="p-6"
              required 
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input 
              id="confirmPassword" 
              type="password" 
              placeholder="Enter your confirm password" 
              className="p-6"
              required 
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree with the terms of use of HRIS
          </label>
        </div>
        
        <Button type="submit" className="w-full p-6 bg-gray-500 hover:bg-gray-600 text-white uppercase">
          Sign Up
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full p-6 border-gray-200"
          type="button"
        >
          Sign up with Google
        </Button>
      </div>
      
      <div className="pt-2 text-center text-sm border-t border-gray-200">
        Already have an account?{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Sign in here
        </a>
      </div>
    </form>
  )
}