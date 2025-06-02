const ForgotPasswordHeader = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl font-bold">Forgot Password</h1>
      <p className="text-muted-foreground">
        No worries! Enter your email address below, and we'll
        send you a link to reset your password.
      </p>
    </div>
  );
};

export default ForgotPasswordHeader;