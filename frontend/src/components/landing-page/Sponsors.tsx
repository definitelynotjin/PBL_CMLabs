import { GraduationCap, BriefcaseBusiness } from "lucide-react"; // Importing new icons
import { JSX } from "react";

interface CollaboratorProps {
  icon: JSX.Element;
  name: string;
}

const collaborators: CollaboratorProps[] = [
  {
    icon: <BriefcaseBusiness size={34} />, // Icon for a company/industry partner
    name: "PT CMLABS INDONESIA DIGITAL",
  },
  {
    icon: <GraduationCap size={34} />, // Icon for an academic institution
    name: "Jurusan Teknologi Informasi Politeknik Negeri Malang",
  },
  // You can add more if there are other significant partners or divisions involved
  // {
  //   icon: <BriefcaseBusiness size={34} />,
  //   name: "Software Engineering Division", // Specific division from cmlabs
  // },
  // {
  //   icon: <BriefcaseBusiness size={34} />,
  //   name: "Technical Consultancies and SEO Supports Sector", // Specific sector from cmlabs
  // },
];

export const Sponsors = () => {
  return (
    <section id="collaborators" className="h-screen flex items-center justify-center">
      <div className="container">
        <h2 className="text-center text-md lg:text-xl font-bold mb-8 text-primary">
          Project Collaborators
        </h2>

        <div className="flex flex-col items-center">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            {collaborators.map(({ icon, name }: CollaboratorProps) => (
              <div
                key={name}
                className="flex flex-col items-center text-muted-foreground/60"
              >
                <span>{icon}</span>
                <h3 className="text-xl font-bold text-center">{name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};