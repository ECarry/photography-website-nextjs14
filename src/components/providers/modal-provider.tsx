"use client";

import React from "react";
import NewPhotoSheet from "@/features/photos/components/new-photo-sheet";
import NewPostSheet from "@/features/posts/components/new-post-sheet";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <NewPostSheet />
      <NewPhotoSheet />
    </>
  );
};

export default ModalProvider;
