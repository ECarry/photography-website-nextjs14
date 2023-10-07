'use client'

import { Heart } from "lucide-react";
import { useCallback, useRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

export default function ConfettiCannon() {
  const refAnimationInstance = useRef<((opts: any) => void) | null>(null);

const getInstance = useCallback((instance: any) => {
  refAnimationInstance.current = instance;
}, []);

const makeShot = useCallback((particleRatio: any, opts: any) => {
  refAnimationInstance.current &&
    refAnimationInstance.current({
      ...opts,
      origin: { y: 0.7 },
      particleCount: Math.floor(200 * particleRatio)
    });
}, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55
    });

    makeShot(0.2, {
      spread: 60
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45
    });
  }, [makeShot]);

  return (
    <>
      <Heart onClick={fire} className="text-rose-500 cursor-pointer" />
      <ReactCanvasConfetti 
        refConfetti={getInstance}
        style={canvasStyles}
      />
    </>
  );
}
