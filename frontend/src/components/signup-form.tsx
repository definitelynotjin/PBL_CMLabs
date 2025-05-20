"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handler for text inputs
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  // Handler for checkbox
  function handleCheckboxChange(checked: boolean) {
    setFormData((prev) => ({
      ...prev,
      terms: checked,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.terms) {
      setError("You must agree to the terms of use");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("User registered:", data);
        alert("Registration successful! Please log in.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          terms: false,
        });
        router.push("/signin");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError("Network error. Please try again later.");
    }

    setLoading(false);
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
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
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              className="p-6"
              required
              value={formData.lastName}
              onChange={handleInputChange}
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
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="p-6"
            required
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            className="p-6"
            required
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={formData.terms}
            onCheckedChange={handleCheckboxChange}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree with the terms of use of HRIS
          </label>
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <Button
          type="submit"
          className="w-full p-6 bg-gray-500 hover:bg-gray-600 text-white uppercase"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
      </div>

      <div className="pt-2 text-center text-sm border-t border-gray-200">
        Already have an account?{" "}
        <a href="/signin" className="text-blue-600 hover:underline">
          Sign in here
        </a>
      </div>
    </form>
  );
}
