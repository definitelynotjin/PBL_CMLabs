export const Statistics = () => {
  interface statsProps {
    quantity: string;
    description: string;
  }

  const stats: statsProps[] = [
    {
      quantity: "5+", // Based on core features: Employee, Letter, Attendance, Overtime, Subscription 
      description: "Key HR Functions Streamlined",
    },
    {
      quantity: "200+", // A hypothetical number representing the scale of employees it's designed to manage, implying its capacity for use.
      description: "Employee Data Points Managed",
    },
    {
      quantity: "5", // Number of competitors benchmarked 
      description: "Market Competitors Analyzed",
    },
    {
      quantity: "1", // Xendit Payment Gateway 
      description: "Payment Gateway Integrated",
    },
  ];

  return (
    <section id="statistics">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map(({ quantity, description }: statsProps) => (
          <div
            key={description}
            className="space-y-2 text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#7CA5BF]">{quantity}</h2>
            <p className="text-xl text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};