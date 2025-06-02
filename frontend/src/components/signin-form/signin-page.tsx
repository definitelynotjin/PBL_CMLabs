import { GalleryVerticalEnd } from "lucide-react";
import { SignInForm } from "./signin-form";
import SignInHeader from "./signin-header";
import SignInBackground from "./signin-background";

const SignInPage = () => {
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
            animation: gradientAnimation 15s ease infinite;
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
            filter: brightness(0.75);
          }
        `}
      </style>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <SignInHeader />
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <SignInForm />
            </div>
          </div>
        </div>
        <SignInBackground />
      </div>
    </>
  );
};

export default SignInPage;