import { ArrowLeft } from "lucide-react";

interface CheckEmailFooterProps {
  loading: boolean;
  onResend: () => void;
}

const CheckEmailFooter = ({ loading, onResend }: CheckEmailFooterProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center text-sm">
        Don't receive the email?{" "}
        <button
          type="button"
          onClick={onResend}
          disabled={loading}
          className="text-primary hover:text-primary/90 underline-offset-4 hover:underline"
        >
          {loading ? "Resending..." : "Click here to resend"}
        </button>
      </div>

      <div className="flex items-center justify-center gap-2">
        <ArrowLeft className="h-4 w-4 text-muted-foreground" />
        <a
          href="/signin"
          className="text-muted-foreground text-sm hover:text-foreground transition-colors"
        >
          Back to Sign in
        </a>
      </div>
    </div>
  );
};

export default CheckEmailFooter;