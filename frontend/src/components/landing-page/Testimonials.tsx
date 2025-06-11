import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TestimonialProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
}

const testimonials: TestimonialProps[] = [
  {
    image: "https://i.pravatar.cc/150?img=1", // Example avatar
    name: "Aisha Rahman",
    userName: "@aisha.hr",
    comment: "This HRIS system has revolutionized our employee data management. Everything is so organized and accessible now!",
  },
  {
    image: "https://i.pravatar.cc/150?img=2", // Example avatar
    name: "Budi Santoso",
    userName: "@budi.dev",
    comment:
      "The attendance tracking feature, especially with geolocation, is a game-changer for our remote and hybrid teams. So efficient!",
  },
  {
    image: "https://i.pravatar.cc/150?img=3", // Example avatar
    name: "Citra Dewi",
    userName: "@citra.adm",
    comment:
      "Managing official letters and documents used to be a nightmare. Now, with this HRIS, it's incredibly straightforward and secure. A must-have!",
  },
  {
    image: "https://i.pravatar.cc/150?img=4", // Example avatar
    name: "Darma Putra",
    userName: "@darma.acc",
    comment:
      "The overtime management module has simplified calculations and improved transparency. It's accurate and easy to use.",
  },
  {
    image: "https://i.pravatar.cc/150?img=5", // Example avatar
    name: "Eva Lestari",
    userName: "@eva.pm",
    comment:
      "The mobile application for employees is fantastic! Checking attendance and accessing personal info is so convenient on the go.",
  },
  {
    image: "https://i.pravatar.cc/150?img=6", // Example avatar
    name: "Faisal Hakim",
    userName: "@faisal.ceo",
    comment:
      "Our HR team's efficiency has significantly improved since implementing this system. The free trial convinced us, and the subscription model is fair.",
  },
];

export const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="max-w-6xl mx-auto px-4 py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Hear From{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Our Valued Users
        </span>
      </h2>

      <p className="text-xl text-muted-foreground pt-4 pb-8 text-center max-w-2xl mx-auto">
        Discover how our Human Resource Information System has made a positive impact on businesses and employees.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {testimonials.map(({ image, name, userName, comment }) => (
          <Card
            key={userName}
            className="w-full max-w-md"
          >
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar>
                <AvatarImage alt="" src={image} />
                <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback> {/* Dynamic fallback */}
              </Avatar>
              <div className="flex flex-col">
                <CardTitle className="text-lg">{name}</CardTitle>
                <CardDescription>{userName}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>{comment}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};