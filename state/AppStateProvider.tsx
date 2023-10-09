'use client';

import { useState, useEffect, ReactNode } from 'react';
import { AppStateContext } from '.';
import { AnimationConfig } from '@/components/AnimateItems';

export default function StateProvider({
  children,
}: {
  children: ReactNode
}) {

  const [hasLoaded, setHasLoaded] = useState(false);
  
  const [nextPhotoAnimation, setNextPhotoAnimation] =
    useState<AnimationConfig>();

  useEffect(() => {
    setHasLoaded?.(true);
  }, [setHasLoaded]);

  return (
    <AppStateContext.Provider
      value={{
        hasLoaded,
        setHasLoaded,
        nextPhotoAnimation,
        setNextPhotoAnimation,
        clearNextPhotoAnimation: () => setNextPhotoAnimation?.(undefined),
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
