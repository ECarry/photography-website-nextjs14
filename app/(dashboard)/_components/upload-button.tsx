"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { Upload } from "lucide-react";

const UploadButton = () => {
  const { onOpen } = useModal();

  return (
    <Button
      onClick={() => onOpen()}
      variant="outline"
      size="icon"
      className="rounded-full size-8"
    >
      <Upload size={16} />
    </Button>
  );
};

export default UploadButton;
