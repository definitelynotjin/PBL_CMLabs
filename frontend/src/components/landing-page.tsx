import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-200 flex items-center justify-center rounded">
            <svg
              className="w-4 h-4 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </div>
          <span className="text-xl font-bold">Relative</span>
        </div>
        <div className="hidden md:flex space-x-6">
          {["Features", "About us", "Pricing", "FAQ", "Contacts"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-gray-600 hover:text-gray-900 relative group"
            >
              {item}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>
        <div className="flex space-x-3">
          <Link href="/signin">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              Sign in
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-black text-white hover:bg-gray-800">
              Sign up
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col-reverse md:flex-row items-center justify-center px-6 py-12 max-w-7xl mx-auto w-full gap-10">
        {/* Left Text */}
        <div className="text-center md:text-left max-w-xl">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
            Say Goodbye to <br className="hidden md:block" /> Task Overload
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Prioritize, automate, and stay ahead—AI simplifies your tasks so you can focus on what matters most.
          </p>
          <Button className="bg-black text-white hover:bg-gray-800 px-6 py-3 text-lg">
            Get started
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>

        {/* Right Image */}
        <div className="w-full max-w-md">
          <Image
            src="/hero-image.svg" // Replace with your image path
            alt="AI Task Automation"
            width={500}
            height={400}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-400 text-sm py-6 border-t border-gray-200">
        © 2025 Relative. All rights reserved.
      </footer>
    </div>
  );
}
