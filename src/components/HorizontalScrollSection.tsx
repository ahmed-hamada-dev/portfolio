"use client";
import React, { useRef } from "react";

export const HorizontalScrollSection = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative w-full py-20 bg-background overflow-hidden relative z-10">
      <div 
        ref={containerRef}
        className="flex w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-10"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE and Edge
        }}
      >
        <div className="flex px-4 md:px-12 lg:px-24">
          {children}
        </div>
      </div>
    </section>
  );
};
