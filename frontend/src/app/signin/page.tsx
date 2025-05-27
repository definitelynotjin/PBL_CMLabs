'use client';

import { GalleryVerticalEnd } from "lucide-react";
import { SignInForm } from "@/components/signin-form";


export default function SignInPage() {
  const handleLoginSuccess = async (credentialResponse: any) => {
    console.log('Google credential response:', credentialResponse);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google/callback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      if (!res.ok) throw new Error("Google login failed");

      const data = await res.json();
      // Save token, redirect, etc.
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      // Optionally show error to user
    }
  };

  const handleLoginError = () => {
    console.log('Google login failed');
  };

  return (
    <>
      <style>
        {`
  .animated-gradient {
    background: linear-gradient(
      45deg,
      #1E3A5F,
      #7CA5BF,
      #7CA5BF,
      #FFFFFF
    );
    background-size: 400%;
    animation: gradientAnimation 10s ease infinite;
  }

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .dark .animated-gradient {
    filter: brightness(0.85);
  }
      `}
      </style>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <a href="#" className="flex items-center gap-2 font-medium">
              <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-4" />
              </div>
              Acme Inc.
            </a>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <SignInForm />
            </div>
          </div>
        </div>
        <div className="relative hidden lg:block h-full animated-gradient">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/HRIS.png"
              alt="Acme Inc. Logo"
              className="w-auto h-auto max-w-[16rem] max-h-[16rem] md:max-w-[20rem] md:max-h-[20rem] object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
}
