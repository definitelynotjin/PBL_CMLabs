const SignUpFooter = () => {
  return (
    <div className="pt-2 text-center text-sm border-t border-gray-200">
      Already have an account?{" "}
      <a href="/signin" className="text-blue-600 hover:underline">
        Sign in here
      </a>
    </div>
  );
};

export default SignUpFooter;