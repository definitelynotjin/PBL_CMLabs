"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

const GoogleSignIn = () => {
  const router = useRouter();

  const handleLoginSuccess = async (credentialResponse: any) => {
    const credential = credentialResponse.credential; // this is the ID token (JWT)

    try {
      const res = await fetch("https://pblcmlabs.duckdns.org/api/auth/google/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      } else {
        console.error("Google login failed:", data.message);
        alert(data.message || "Google login failed");
      }
    } catch (error) {
      console.error("Server error:", error);
      alert("Google login failed due to server error");
    }
  };

  return (
    <div className="w-full p-6 border border-gray-200">
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => {
          console.error("Google login popup failed");
          alert("Google login popup failed");
        }}
      />
    </div>
  );
};

export default GoogleSignIn;
