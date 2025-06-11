import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "What is the primary focus of this HRIS application?",
    answer: "This application primarily focuses on managing employee data, official letters, attendance, and overtime, available in both website and mobile versions. ",
    value: "item-1",
  },
  {
    question: "Which technologies are used for developing this HRIS?",
    answer: "The frontend framework used is Next.js, and for styling, Tailwind CSS. The backend framework is Laravel, and MySQL is used for the database. ",
    value: "item-2",
  },
  {
    question: "How does the pricing model work for this HRIS?",
    answer: "The application uses a 'Pay-as-you-go' pricing model. Costs are calculated based on the total number of employees using the service during one month, and billing occurs on the 28th of each month. ",
    value: "item-3",
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes, users are given a 14-day free trial period to test the HRIS application's features. ",
    value: "item-4",
  },
  {
    question: "How can employees log into the mobile application?",
    answer: "Employees can log in to the mobile application using their employee ID. The mobile app also supports login and forgot password features based on employee data added from the HRIS admin page. ",
    value: "item-5",
  },
  {
    question: "What features are available for attendance management?",
    answer: "Attendance management includes GPS-based check-clock validation with maximum radius for WFO, and settings for WFA or Hybrid work. It also features customizable work schedules, clock-in/out times, and break durations. ",
    value: "item-6",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-24 sm:py-32 bg-background">
      <div className="container max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Frequently Asked{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Questions
          </span>
        </h2>

        <Accordion
          type="single"
          collapsible
          className="w-full text-left"
        >
          {FAQList.map(({ question, answer, value }: FAQProps) => (
            <AccordionItem key={value} value={value}>
              <AccordionTrigger className="text-left">
                {question}
              </AccordionTrigger>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <h3 className="font-medium mt-6">
          Still have questions?{" "}
          <a
            rel="noreferrer noopener"
            href="#" // Replace with a contact page link if available
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            Contact us
          </a>
        </h3>
      </div>
    </section>
  );
};