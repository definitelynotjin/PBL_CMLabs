"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc"; // Google icon

const GoogleSignIn = () => {
  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch("https://pblcmlabs.duckdns.org/api/auth/google/callback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ credential: tokenResponse.access_token }), // atau tokenResponse.credential jika pakai flow "id_token"
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("token", data.token);
          router.push("/dashboard");
        } else {
          alert(data.message || "Google login failed");
        }
      } catch (error) {
        alert("Google login failed due to server error");
      }
    },
    onError: () => {
      alert("Google login popup failed");
    },
    flow: "implicit", // atau "auth-code" jika backend kamu pakai code flow
  });

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full p-6 uppercase flex items-center justify-center gap-2"
      onClick={() => login()}
    >
      <FcGoogle className="text-xl" />
      Login dengan Google
    </Button>
  );
};

export default GoogleSignIn;
