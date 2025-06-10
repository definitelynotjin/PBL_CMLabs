import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Newsletter = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Subscribed!");
  };

  return (
    <section id="newsletter" className="w-full">
      <hr className="w-11/12 mx-auto border-muted" />

      <div className="max-w-4xl mx-auto px-4 py-24 sm:py-32 text-center">
        <h3 className="text-4xl md:text-5xl font-bold">
          Join Our Daily{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Newsletter
          </span>
        </h3>

        <p className="text-xl text-muted-foreground mt-4 mb-10">
          Stay updated with the latest news and exclusive offers.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 md:gap-2 justify-center items-center w-full max-w-md mx-auto"
        >
          <Input
            type="email"
            placeholder="your@email.com"
            className="bg-muted/50 dark:bg-muted/80"
            aria-label="email"
            required
          />
          <Button type="submit" className="w-full md:w-auto">
            Subscribe
          </Button>
        </form>
      </div>

      <hr className="w-11/12 mx-auto border-muted" />
    </section>
  );
};
