const SignInBackground = () => {
  return (
    <div className="relative hidden lg:block h-full animated-gradient">
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="/HRIS.png"
          alt="Acme Inc. Logo"
          className="w-auto h-auto max-w-[16rem] max-h-[16rem] md:max-w-[20rem] md:max-h-[20rem] object-contain"
        />
      </div>
    </div>
  );
};

export default SignInBackground;