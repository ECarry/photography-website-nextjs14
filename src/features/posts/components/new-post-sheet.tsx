"use client";

// Internal UI Components
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import NewPostForm from "./new-post-form";

// Hooks
import useNewPostSheet from "../store/use-new-post-sheet";

/**
 * NewPostSheet Component
 * A slide-out sheet component for creating new post.
 * Provides a form interface with accessibility features.
 * @component
 * @returns {JSX.Element} The new photo sheet component
 */
const NewPostSheet = () => {
  // Get new post sheet state and handlers
  const { isOpen, onClose } = useNewPostSheet();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="min-w-[100%] lg:min-w-[50%]">
        <SheetHeader>
          <SheetTitle>New Post</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        {/* Form Container  */}
        <div className="h-[calc(100vh-6rem)] overflow-y-auto p-2">
          <NewPostForm />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NewPostSheet;
