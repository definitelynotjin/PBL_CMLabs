import Link from "next/link";

const Footer = () => {
  return (
    <div className="pt-2 text-center text-sm border-t border-gray-200">
      Don&apos;t have an account?{" "}
      <Link href="/signup" className="text-blue-600 hover:underline">
        Sign up now and get started
      </Link>
    </div>
  );
};

export default Footer;