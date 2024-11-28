"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icons } from "@/components/icons";

const UploadButton = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => {}}
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
