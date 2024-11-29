"use client";

// Internal UI Components
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import NewPhotoForm from "./new-photo-form";

// Hooks
import { useNewPhoto } from "../store/use-new-photo-sheet";

/**
 * NewPhotoSheet Component
 * A slide-out sheet component for creating new photo.
 * Provides a form interface with accessibility features.
 * @component
 * @returns {JSX.Element} The new photo sheet component
 */
const NewPhotoSheet = () => {
  // Get new photo sheet state and handlers
  const { isOpen, onClose } = useNewPhoto();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="min-w-[100%] lg:min-w-[50%]">
        <SheetHeader>
          <SheetTitle>New Photo</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        {/* Form Container  */}
        <div className="h-[calc(100vh-6rem)] overflow-y-auto p-2">
          <NewPhotoForm />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NewPhotoSheet;
