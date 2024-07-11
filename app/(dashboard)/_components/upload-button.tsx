"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { Upload } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const UploadButton = () => {
  const { onOpen } = useModal();

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
            <Upload size={16} />
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
