import { Button } from "@/components/ui/button";

export const Cta = () => {
  return (
    <section
      id="cta"
      className="bg-muted/50 py-16 my-24 sm:my-32 flex justify-center"
    >
      <div className="container max-w-3xl text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          Ready to Streamline Your{" "}
          <span className="text-primary">
            HR Operations?
          </span>{" "}
          Start Your Free Trial Today!
        </h2>
        <p className="text-muted-foreground text-lg mt-4">
          Our HRIS application is designed to simplify employee data, attendance, letter, and overtime management, available for both web and mobile platforms.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <Button className="w-full md:w-auto">Start Your 14-Day Free Trial</Button>
          <Button variant="outline" className="w-full md:w-auto">
            Explore All Features
          </Button>
        </div>
      </div>
    </section>
  );
};