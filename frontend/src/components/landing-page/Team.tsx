import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Facebook, Instagram, Linkedin } from "lucide-react";

interface TeamProps {
  imageUrl: string;
  name: string;
  studentId: string; // Changed from 'position' to 'studentId'
  socialNetworks: SociaNetworkslProps[];
}

interface SociaNetworkslProps {
  name: string;
  url: string;
}

const teamList: TeamProps[] = [
  {
    imageUrl: "https://i.pravatar.cc/150?img=68", // Placeholder image
    name: "Gastiadirijal N.K.",
    studentId: "2241720001",
    socialNetworks: [
      { name: "Linkedin", url: "https://www.linkedin.com/in/gastiadirijal-n-k/" }, // Placeholder URL
      // Add other social networks if available
    ],
  },
  {
    imageUrl: "https://i.pravatar.cc/150?img=69", // Placeholder image
    name: "Lenka Melinda Florienka",
    studentId: "2241720074",
    socialNetworks: [
      { name: "Linkedin", url: "https://www.linkedin.com/in/lenka-melinda/" }, // Placeholder URL
      // Add other social networks if available
    ],
  },
  {
    imageUrl: "https://i.pravatar.cc/150?img=70", // Placeholder image
    name: "Malik Abdul Azis",
    studentId: "2241720024", // Corrected student ID based on input
    socialNetworks: [
      { name: "Linkedin", url: "https://www.linkedin.com/in/malik-abdul-azis/" }, // Placeholder URL
      // Add other social networks if available
    ],
  },
  // You can add more team members here if needed
];

export const Team = () => {
  const socialIcon = (iconName: string) => {
    switch (iconName) {
      case "Linkedin":
        return <Linkedin size={20} />;
      case "Facebook":
        return <Facebook size={20} />;
      case "Instagram":
        return <Instagram size={20} />;
      default:
        return null; // Return null or a default icon if iconName doesn't match
    }
  };

  return (
    <section id="team" className="max-w-6xl mx-auto px-4 py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Our Dedicated{" "}
        </span>
        Team
      </h2>

      <p className="mt-4 mb-10 text-xl text-muted-foreground text-center max-w-2xl mx-auto">
        Meet the talented individuals behind the development of our Human Resource Information System for the Project Based Learning (PBL) Agenda.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {teamList.map(({ imageUrl, name, studentId, socialNetworks }: TeamProps) => (
          <Card
            key={studentId} // Using studentId as key for uniqueness
            className="bg-muted/50 relative pt-16 flex flex-col items-center text-center w-full max-w-xs"
          >
            <img
              src={imageUrl}
              alt={`${name}'s profile picture`}
              className="absolute -top-12 rounded-full w-24 h-24 object-cover border-4 border-white shadow-md"
            />
            <CardHeader className="pb-2">
              <CardTitle>{name}</CardTitle>
              <CardDescription className="text-primary">{studentId}</CardDescription> {/* Displaying student ID */}
            </CardHeader>

            <CardContent className="pb-2">
              <p>Politeknik Negeri Malang</p>
            </CardContent>

            <CardFooter className="gap-2">
              {socialNetworks.map(({ name: socialName, url }: SociaNetworkslProps) => ( // Renamed 'name' to 'socialName' to avoid conflict
                <a
                  key={socialName}
                  rel="noreferrer noopener"
                  href={url}
                  target="_blank"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  <span className="sr-only">{socialName} icon</span>
                  {socialIcon(socialName)}
                </a>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};