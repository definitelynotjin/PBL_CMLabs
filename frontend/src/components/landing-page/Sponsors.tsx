import { GraduationCap, BriefcaseBusiness } from "lucide-react";
import { JSX } from "react";

interface CollaboratorProps {
  icon?: JSX.Element;
  image?: string;
  name: string;
}

const collaborators: CollaboratorProps[] = [
  {
    image: "/images/logo-cmlabs.png",
    name: "PT CMLABS INDONESIA DIGITAL",
  },
  {
    image: "/images/logo-polinema-nobg.png",
    name: "Jurusan Teknologi Informasi Politeknik Negeri Malang",
  },
];

export const Sponsors = () => {
  return (
    <section id="collaborators" className="h-screen flex items-center justify-center">
      <div className="container">
        <h2 className="text-center text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 text-primary">
          Our Valued{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Project Collaborators
          </span>
        </h2>
        <p className="text-center text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          This Human Resource Information System project is a result of a strong partnership, combining industry expertise with academic innovation.
        </p>

        <div className="flex flex-col items-center">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            {collaborators.map(({ icon, image, name }: CollaboratorProps) => (
              <div
                key={name}
                className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm w-56 h-48 justify-center transition-transform duration-300 hover:scale-105 hover:shadow-md bg-background"
              >
                {image ? (
                  <img src={image} alt={name} className="mb-4 w-16 h-16 object-contain" />
                ) : (
                  <span className="mb-4 text-primary">{icon}</span>
                )}
                <h3 className="text-lg font-semibold text-foreground">{name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
