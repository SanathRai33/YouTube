// hooks/useSidebarAnimation.ts
import { useEffect, useRef } from "react";
import gsap from "gsap";

// More robust version of useSidebarAnimation
export function useSidebarAnimation(isOpen: boolean) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!sidebarRef.current || !overlayRef.current) return;

    // Kill any existing animations
    if (animationRef.current) animationRef.current.kill();

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        if (!isOpen) {
          gsap.set([sidebarRef.current, overlayRef.current], {
            opacity: 0,
            pointerEvents: "none",
          });
        }
      },
    });

    animationRef.current = tl;

    if (isOpen) {
      gsap.set(overlayRef.current, { pointerEvents: "auto" });
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      ).fromTo(
        sidebarRef.current,
        { x: -320, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4 },
        "-=0.2"
      );
    } else {
      tl.to(sidebarRef.current, {
        x: -320,
        opacity: 0,
        duration: 0.3,
      }).to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.2,
        },
        "-=0.2"
      );
    }

    return () => {
      tl.kill();
    };
  }, [isOpen]);

  return { sidebarRef, overlayRef };
}
