"use client";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import TechSlider from "@/components/TechSlider";
import { HorizontalScrollSection } from "@/components/HorizontalScrollSection";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
// ScrollStack removed — its Lenis instance conflicts with GSAP ScrollTrigger in Hero

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

        <Navbar />
        <main>
          <Hero />
          <TechSlider />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Page;
