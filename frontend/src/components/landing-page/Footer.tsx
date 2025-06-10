import { LogoIcon } from "./Icons";

export const Footer = () => {
  return (
    <footer id="footer" className="bg-background">
      <hr className="w-11/12 mx-auto" />

      <section className="container max-w-7xl mx-auto py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8 justify-center">
        <div className="col-span-full xl:col-span-2 flex items-center justify-center xl:justify-start">
          <a
            rel="noreferrer noopener"
            href="/"
            className="font-bold text-xl flex items-center gap-2"
          >
            <LogoIcon />
            ShadcnUI/React
          </a>
        </div>

        <div className="flex flex-col gap-2 items-center xl:items-start">
          <h3 className="font-bold text-lg">Follow Us</h3>
          <a href="#" className="opacity-60 hover:opacity-100">Github</a>
          <a href="#" className="opacity-60 hover:opacity-100">Twitter</a>
          <a href="#" className="opacity-60 hover:opacity-100">Dribbble</a>
        </div>

        <div className="flex flex-col gap-2 items-center xl:items-start">
          <h3 className="font-bold text-lg">Platforms</h3>
          <a href="#" className="opacity-60 hover:opacity-100">Web</a>
          <a href="#" className="opacity-60 hover:opacity-100">Mobile</a>
          <a href="#" className="opacity-60 hover:opacity-100">Desktop</a>
        </div>

        <div className="flex flex-col gap-2 items-center xl:items-start">
          <h3 className="font-bold text-lg">About</h3>
          <a href="#" className="opacity-60 hover:opacity-100">Features</a>
          <a href="#" className="opacity-60 hover:opacity-100">Pricing</a>
          <a href="#" className="opacity-60 hover:opacity-100">FAQ</a>
        </div>

        <div className="flex flex-col gap-2 items-center xl:items-start">
          <h3 className="font-bold text-lg">Community</h3>
          <a href="#" className="opacity-60 hover:opacity-100">Youtube</a>
          <a href="#" className="opacity-60 hover:opacity-100">Discord</a>
          <a href="#" className="opacity-60 hover:opacity-100">Twitch</a>
        </div>
      </section>

      <section className="container max-w-7xl mx-auto pb-14 text-center">
        <h3>
          &copy; 2024 Landing page made by{" "}
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://www.linkedin.com/in/leopoldo-miranda/"
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            Leo Miranda
          </a>
        </h3>
      </section>
    </footer>
  );
};
