"use client";

import React from "react";
import CreatePhotoModal from "../modals/create-photo-modal";

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
      <CreatePhotoModal />
    </>
  );
};

export default ModalProvider;
