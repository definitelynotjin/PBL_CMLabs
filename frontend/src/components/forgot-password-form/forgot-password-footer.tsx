import { ArrowLeft } from "lucide-react";

const ForgotPasswordFooter = () => {
  return (
    <div className="flex items-center gap-2 mt-4">
      <ArrowLeft className="h-4 w-4" />
      <a href="/signin" className="text-gray-600 text-sm hover:underline">
        Back to sign in
      </a>
    </div>
  );
};

export default ForgotPasswordFooter;