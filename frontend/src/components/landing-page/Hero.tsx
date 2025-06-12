import Link from "next/link";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { HeroCards } from "./HeroCards";

export const Hero = () => {
  return (
    <section className="w-full bg-background">
      <div className="container max-w-7xl mx-auto grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
        <div className="text-center lg:text-left space-y-6">
          <main className="text-5xl md:text-6xl font-bold leading-tight">
            <h1 className="inline">
              <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
                HR Tool
              </span>{" "}
              for Empowering
            </h1>{" "}
            Empowering{" "}
            <h2 className="inline">
              <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
                HR
              </span>{" "}
              Teams
            </h2>
          </main>

          <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
            A modern HRIS platform designed to streamline employee data, attendance, and legal document management—now with integrated overtime and pay-as-you-go subscriptions.
          </p>

          <div className="flex flex-col md:flex-row gap-4 items-center md:items-start justify-center lg:justify-start">
            <Link href="/signin" passHref>
              <Button as="a" className="w-full md:w-auto">
                Sign In
              </Button>
            </Link>

            {/* Consider changing or removing this button if a GitHub repo isn't relevant for students */}
            <a
              rel="noreferrer noopener"
              href="/signup" // Example: link to an 'About Us' or 'Program Details' page
              target="_blank"
              className={`${buttonVariants({ variant: "outline" })} w-full md:w-auto flex items-center justify-center`}
            >
              Sign Up
              {/* Replace GitHubLogoIcon if not relevant. Maybe an arrow icon? */}
              {/* <GitHubLogoIcon className="ml-2 w-5 h-5" /> */}
            </a>
          </div>
        </div>

        <div className="z-10">
          <HeroCards />
        </div>
      </div>

      {/* Shadow effect */}
      <div className="shadow" />
    </section>
  );
};
