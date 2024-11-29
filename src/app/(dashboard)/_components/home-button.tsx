import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icons } from "@/components/icons";

const HomeButton = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full size-8"
            asChild
          >
            <Link href="/">
              <Icons.arrowUpRight size={16} />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent align="end">
          <p>Home</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default HomeButton;
