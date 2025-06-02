import { Button } from "@/components/ui/button";

const CheckEmailButton = () => {
  return (
    <Button
      className="w-full py-6 bg-primary hover:bg-primary/90 text-primary-foreground"
      onClick={() => window.open("https://mail.google.com", "_blank")}
    >
      Open Gmail
    </Button>
  );
};

export default CheckEmailButton;