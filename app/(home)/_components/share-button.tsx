import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icons } from "@/components/icons";

interface Props {
  onClick: () => void;
}

const ShareButton = ({ onClick }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full size-8 z-50 absolute top-3 right-3"
            onClick={onClick}
          >
            <Icons.share size={16} />
          </Button>
        </TooltipTrigger>
        <TooltipContent align="end">
          <p>Share</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ShareButton;
