import { Button } from "@/components/ui/button";
import { useGoogleLogin } from '@react-oauth/google';

const GoogleSignIn = () => {
  const handleLoginSuccess = async (response: any) => {
    console.log("Google login success:", response);

    try {
      const res = await fetch('https://pblcmlabs.duckdns.org/api/auth/google/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential: response.credential }),  // <-- important!
      });

      const data = await res.json();

      if (res.ok) {
        console.log('Logged in user:', data.user);
        // TODO: Save token (data.token) to localStorage or context, then redirect or update UI
      } else {
        console.error('Backend error:', data.message);
      }
    } catch (error) {
      console.error('Network or server error:', error);
    }
  };

  const handleLoginError = () => {
    console.error("Failed to sign in with Google.");
  };

  const login = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
  });

  return (
    <div className="grid gap-3">
      <div className="mt-4">
        <Button
          variant="outline"
          className="w-full p-6 border-gray-200"
          onClick={() => login()}
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default GoogleSignIn;
