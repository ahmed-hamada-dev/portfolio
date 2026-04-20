"use client";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import TechSlider from "@/components/TechSlider";
import ScrollAstronaut from "@/components/ScrollAstronaut";
import { HorizontalScrollSection } from "@/components/HorizontalScrollSection";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
// ScrollStack removed — its Lenis instance conflicts with GSAP ScrollTrigger in Hero

/** Cinematic re-entry corridor between Projects (space) and About (ground) */
const SpaceTransition = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Speed lines stretch as you scroll through
  const linesOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const linesScaleY = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 2]);
  // Glow intensifies at the center
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 0.8, 0.8, 0]);

  return (
    <div ref={ref} className="relative h-[60vh] w-full overflow-hidden z-20">
      {/* Top gradient: blends from space black */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black to-transparent z-10" />
      {/* Bottom gradient: blends into site background */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent z-10" />

      {/* Atmospheric re-entry speed lines */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-0"
        style={{ opacity: linesOpacity, scaleY: linesScaleY }}
      >
        {Array.from({ length: 30 }).map((_, i) => {
          // Deterministic pseudo-random values based on index
          // Round to 2 decimal places to prevent server/client hydration mismatch
          const r = (v: number) => Math.round(v * 100) / 100;
          const random1 = Math.abs(Math.sin(i * 12.9898)) * 1000 % 1;
          const random2 = Math.abs(Math.sin(i * 78.233)) * 1000 % 1;
          const random3 = Math.abs(Math.sin(i * 45.123)) * 1000 % 1;
          const random4 = Math.abs(Math.sin(i * 93.456)) * 1000 % 1;
          const random5 = Math.abs(Math.sin(i * 23.345)) * 1000 % 1;
          const random6 = Math.abs(Math.sin(i * 67.89)) * 1000 % 1;

          const left = `${r(5 + random1 * 90)}%`;
          const height = `${r(20 + random2 * 60)}%`;
          const width = `${r(1 + random3 * 2)}px`;
          const opacity = r(0.1 + random4 * 0.3);
          const delay = r(random5 * 2);
          const duration = r(1.5 + random6);

          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left,
                height,
                width,
                background: `linear-gradient(to bottom, transparent, rgba(200,220,255,${opacity}), transparent)`,
                top: "10%",
              }}
              animate={{ y: ["-20%", "120%"] }}
              transition={{ duration, repeat: Infinity, delay, ease: "linear" }}
            />
          );
        })}
      </motion.div>

      {/* Central atmospheric glow */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-5"
        style={{ opacity: glowOpacity }}
      >
        <div className="w-[600px] h-[200px] bg-sky-400/10 rounded-full blur-[100px]" />
      </motion.div>
    </div>
  );
};

const Page = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        className="min-h-screen bg-background text-foreground relative overflow-hidden mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >

        <ScrollAstronaut />
        <Navbar />
        <main>
          <Hero />
          <TechSlider />
          <Projects />
          <SpaceTransition />
          <About />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Page;
