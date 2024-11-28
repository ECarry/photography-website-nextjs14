"use client";

// Internal UI Components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

// Hooks
import useNewPhoto from "@/features/photos/store/use-new-photo-sheet";

const UploadButton = () => {
  // Get new photo sheet state and handlers
  const { onOpen } = useNewPhoto();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => onOpen()}
            variant="outline"
            size="icon"
            className="rounded-full size-8"
          >
            <Icons.upload size={16} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>New Photo</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UploadButton;
