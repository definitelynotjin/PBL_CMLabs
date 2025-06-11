import { GraduationCap, BriefcaseBusiness } from "lucide-react"; // Importing relevant icons
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
  // You can add more if there are other significant partners or divisions involved,
  // such as specific divisions like 'Software Engineering Division' from CMLABS.
];

export const Sponsors = () => { // Keeping the component name as Sponsors as per the original structure
  return (
    <section id="collaborators" className="h-screen flex items-center justify-center">
      <div className="container">
        {/* Adjusted main heading for visual appeal, similar to the benchmark */}
        <h2 className="text-center text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 text-primary">
          Our Valued{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Project Collaborators
          </span>
        </h2>
        {/* Added a descriptive paragraph, similar to the benchmark */}
        <p className="text-center text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          This Human Resource Information System project is a result of a strong partnership, combining industry expertise with academic innovation.
        </p>

        <div className="flex flex-col items-center">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            {collaborators.map(({ icon, name }: CollaboratorProps) => (
              <div
                key={name}
                // Applied similar styling to the benchmark for each collaborator item
                className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm w-56 h-48 justify-center transition-transform duration-300 hover:scale-105 hover:shadow-md bg-background"
              >
                {/* Adjusted icon styling */}
                <span className="mb-4 text-primary">{icon}</span>
                {/* Adjusted name styling */}
                <h3 className="text-lg font-semibold text-foreground">{name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};