import { Radar } from "lucide-react";
import { JSX } from "react";

interface SponsorProps {
  icon: JSX.Element;
  name: string;
}

const sponsors: SponsorProps[] = [
  {
    icon: <Radar size={34} />,
    name: "Sponsor 1",
  },
  {
    icon: <Radar size={34} />,
    name: "Sponsor 2",
  },
  {
    icon: <Radar size={34} />,
    name: "Sponsor 3",
  },
  {
    icon: <Radar size={34} />,
    name: "Sponsor 4",
  },
  {
    icon: <Radar size={34} />,
    name: "Sponsor 5",
  },
  {
    icon: <Radar size={34} />,
    name: "Sponsor 6",
  },
];

export const Sponsors = () => {
  return (
    <section id="sponsors" className="h-screen flex items-center justify-center">
      <div className="container">
        <h2 className="text-center text-md lg:text-xl font-bold mb-8 text-primary">
          Investors and founders
        </h2>

        <div className="flex flex-col items-center">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            {sponsors.map(({ icon, name }: SponsorProps) => (
              <div
                key={name}
                className="flex flex-col items-center text-muted-foreground/60"
              >
                <span>{icon}</span>
                <h3 className="text-xl font-bold">{name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
