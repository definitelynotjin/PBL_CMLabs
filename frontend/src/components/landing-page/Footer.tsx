import Link from "next/link"; // Import Link from next/link
import { LogoIcon } from "./Icons";

export const Footer = () => {
  return (
    <footer id="footer" className="bg-background">
      <hr className="w-11/12 mx-auto" />

      <section className="container max-w-7xl mx-auto py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8 justify-center">
        <div className="col-span-full xl:col-span-2 flex items-center justify-center xl:justify-start">
          {/* Changed <a> to <Link> for internal navigation */}
          <Link
            href="/"
            className="font-bold text-xl flex items-center gap-2"
          >
            <LogoIcon />
            HRIS {/* Updated text to HRIS as per your project */}
          </Link>
        </div>

        <div className="flex flex-col gap-2 items-center xl:items-start">
          <h3 className="font-bold text-lg">Follow Us</h3>
          {/* External links or generic placeholders, <a> is fine here */}
          <a href="#" className="opacity-60 hover:opacity-100">Github</a>
          <a href="#" className="opacity-60 hover:opacity-100">Twitter</a>
          <a href="#" className="opacity-60 hover:opacity-100">Dribbble</a>
        </div>

        <div className="flex flex-col gap-2 items-center xl:items-start">
          <h3 className="font-bold text-lg">Platforms</h3>
          {/* These are conceptual platforms for your HRIS, <a> is fine here if not linking to specific internal pages */}
          <a href="#" className="opacity-60 hover:opacity-100">Web</a>
          <a href="#" className="opacity-60 hover:opacity-100">Mobile</a>
          <a href="#" className="opacity-60 hover:opacity-100">Desktop</a>
        </div>

        <div className="flex flex-col gap-2 items-center xl:items-start">
          <h3 className="font-bold text-lg">About</h3>
          {/* These should ideally use <Link> if they point to internal sections (e.g., #features, #pricing, #faq) */}
          <Link href="#features" className="opacity-60 hover:opacity-100">Features</Link>
          <Link href="#pricing" className="opacity-60 hover:opacity-100">Pricing</Link>
          <Link href="#faq" className="opacity-60 hover:opacity-100">FAQ</Link>
        </div>

        <div className="flex flex-col gap-2 items-center xl:items-start">
          <h3 className="font-bold text-lg">Community</h3>
          {/* External links or generic placeholders, <a> is fine here */}
          <a href="#" className="opacity-60 hover:opacity-100">Youtube</a>
          <a href="#" className="opacity-60 hover:opacity-100">Discord</a>
          <a href="#" className="opacity-60 hover:opacity-100">Twitch</a>
        </div>
      </section>

      <section className="container max-w-7xl mx-auto pb-14 text-center">
        <h3>
          &copy; 2024 HRIS Project by{" "} {/* Updated copyright text */}
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://www.linkedin.com/in/leopoldo-miranda/" // External link, <a> is appropriate
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            PBL Team JTI-Polinema
          </a>
        </h3>
      </section>
    </footer>
  );
};