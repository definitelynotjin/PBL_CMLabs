export function LinkExpiredMessage() {
  return (
    <div className="text-center">
      <p className="text-muted-foreground">
        The password reset link has expired.
        <br />
        Please request a new link to reset your password.
      </p>
    </div>
  )
}