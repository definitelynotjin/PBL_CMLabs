"use client";

import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

const GoogleSignIn = () => {
  const router = useRouter();

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        try {
          const res = await fetch("https://pblcmlabs.duckdns.org/api/auth/google/callback", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              credential: credentialResponse.credential,
            }),
          });

          const data = await res.json();

          if (res.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Role-based redirection
            if (data.user.role === "admin") {
              router.push("/dashboard");
            } else if (data.user.role === "employee") {
              router.push("/dashboard-user");
            } else {
              alert("Unknown user role");
            }
          } else {
            alert(data.message || "Google login failed");
          }
        } catch (error) {
          alert("Google login failed due to server error");
        }
      }}
      onError={() => {
        alert("Google login failed");
      }}
    />
  );
};

export default GoogleSignIn;
