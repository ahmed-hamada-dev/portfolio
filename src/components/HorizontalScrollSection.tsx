"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export const HorizontalScrollSection = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // On mobile: no horizontal scroll, just a normal vertical layout
      // Nothing to do — CSS handles it (flex-col, h-auto)
      return;
    }

    // Desktop: horizontal scroll
    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          end: () => `+=${track.scrollWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [children]);

  return (
    <section
      ref={containerRef}
      className="relative w-full md:h-screen md:overflow-hidden bg-background"
    >
      <div
        ref={trackRef}
        className="flex flex-col md:flex-row md:w-max md:h-screen w-full"
      >
        {children}
      </div>
    </section>
  );
};
