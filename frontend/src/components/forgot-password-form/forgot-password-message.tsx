interface ForgotPasswordMessageProps {
  error: string;
  success: string;
}

const ForgotPasswordMessage = ({ error, success }: ForgotPasswordMessageProps) => {
  return (
    <div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}
    </div>
  );
};

export default ForgotPasswordMessage;