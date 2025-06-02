interface CheckEmailMessageProps {
  email: string;
  message: string | null;
  error: string | null;
}

const CheckEmailMessage = ({ email, message, error }: CheckEmailMessageProps) => {
  return (
    <div className="text-center space-y-2">
      <p className="text-muted-foreground text-sm md:text-base">We sent a password reset link to</p>
      <p className="font-medium text-sm md:text-base">{email}</p>
      <p className="text-muted-foreground text-sm md:text-base">
        which is valid for 24 hours. Please check your inbox!
      </p>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default CheckEmailMessage;