import { Button } from "@/components/ui/button";
import { useGoogleLogin } from '@react-oauth/google';

const GoogleSignIn = () => {
  const handleLoginSuccess = (response: any) => {
    console.log("Google login success:", response);
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