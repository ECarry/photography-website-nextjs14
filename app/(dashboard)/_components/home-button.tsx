import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const HomeButton = () => {
  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full size-8"
      asChild
    >
      <Link href="/">
        <ArrowUpRight size={16} />
      </Link>
    </Button>
  );
};

export default HomeButton;
