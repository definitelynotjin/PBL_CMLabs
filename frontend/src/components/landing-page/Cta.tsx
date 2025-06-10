import { Button } from "@/components/ui/button";

export const Cta = () => {
  return (
    <section
      id="cta"
      className="bg-muted/50 py-16 my-24 sm:my-32 flex justify-center"
    >
      <div className="container max-w-3xl text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          All Your{" "}
          <span className="text-primary">
            Ideas & Concepts
          </span>{" "}
          In One Interface
        </h2>
        <p className="text-muted-foreground text-lg mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, beatae. Ipsa tempore ipsum iste quibusdam illum ducimus eos. Quasi, sed!
        </p>

        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <Button className="w-full md:w-auto">Request a Demo</Button>
          <Button variant="outline" className="w-full md:w-auto">
            View all features
          </Button>
        </div>
      </div>
    </section>
  );
};
