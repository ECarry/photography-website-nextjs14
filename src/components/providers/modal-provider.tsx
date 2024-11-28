"use client";

import React from "react";
import NewPhotoSheet from "@/features/photos/components/new-photo-sheet";

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
      <NewPhotoSheet />
    </>
  );
};

export default ModalProvider;
