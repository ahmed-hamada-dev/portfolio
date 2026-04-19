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
import React, { useEffect, useRef } from "react";
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
          const left = `${5 + Math.random() * 90}%`;
          const height = `${20 + Math.random() * 60}%`;
          const width = `${1 + Math.random() * 2}px`;
          const opacity = 0.1 + Math.random() * 0.3;
          const delay = Math.random() * 2;
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
              transition={{ duration: 1.5 + Math.random(), repeat: Infinity, delay, ease: "linear" }}
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size based on container width and full document height
    const resizeCanvas = () => {
      const containerRect = container.getBoundingClientRect();
      canvas.width = containerRect.width;
      // Set height to the full scrollable document height
      canvas.height = document.documentElement.scrollHeight;
      canvas.style.left = `${containerRect.left}px`;
    };
    resizeCanvas();

    // Initialize snowflakes within container width and full document height
    const snowflakes = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * document.documentElement.scrollHeight,
      radius: Math.random() * 3 + 1,
      vy: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.3,
    }));

    // Animation loop
    const animate = () => {
      if (!canvasRef.current || !canvasRef.current.getContext("2d")) {
        canvasRef.current!.width = container.getBoundingClientRect().width;
        canvasRef.current!.height = document.documentElement.scrollHeight;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Adjust snowflake positions based on scroll offset
      const scrollOffset = window.scrollY;

      snowflakes.forEach((flake) => {
        flake.y += flake.vy;
        flake.x += flake.vx;

        // Reset snowflake to top when it falls below the full document height
        if (flake.y > document.documentElement.scrollHeight) {
          flake.y = 0;
          flake.x = Math.random() * canvas.width;
          flake.vx = (Math.random() - 0.5) * 0.5;
        }

        // Keep snowflakes within container bounds horizontally
        if (flake.x < 0 || flake.x > canvas.width) {
          flake.x = Math.random() * canvas.width;
          flake.y = 0;
        }

        // Draw snowflake with scroll offset
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        ctx.arc(flake.x, flake.y - scrollOffset, flake.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Handle window resize and scroll
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", () => {
      // Update canvas position on scroll to keep it aligned
      const containerRect = container.getBoundingClientRect();
      canvas.style.left = `${containerRect.left}px`;
    });

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", () => {});
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

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
        <canvas
          ref={canvasRef}
          className="absolute top-0 z-10 opacity-70 dark:opacity-50 pointer-events-none"
          style={{ height: "100%", left: 0, right: 0 }}
        />

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
