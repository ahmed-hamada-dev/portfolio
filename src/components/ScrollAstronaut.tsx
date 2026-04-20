"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import Lottie from "lottie-react";
import astronautData from "../../public/astronaut.json";

const ScrollAstronaut = () => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Mouse tracking for parallax depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 30, damping: 20 });

  // Floating bob animation (zero-gravity feel)
  const floatY = useMotionValue(0);
  const floatRotate = useMotionValue(0);
  const time = useMotionValue(0);

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 25,
    mass: 0.8,
  });

  // ── All useTransform hooks MUST be called before any early return ──
  // Position transforms: pure vw/vh for smooth interpolation
  const x = useTransform(
    smoothProgress,
    [0, 0.12, 0.25, 0.32, 0.42, 0.55, 0.6,  0.65, 0.7,  0.78, 0.82,  0.88,  0.93,  1],
    [
      "80vw",   // Hero: bottom-right
      "8vw",    // TechSlider: left side
      "8vw",    // TechSlider hold
      "40vw",   // Transition: gliding center
      "70vw",   // Projects: right side
      "70vw",   // Projects hold
      "55vw",   // Re-entry: drifting center
      "35vw",   // Re-entry: moving left
      "10vw",   // About: settling left
      "10vw",   // About: hold
      "35vw",   // Gliding toward contact
      "70vw",   // Contact: right side
      "45vw",   // Footer: centering
      "45vw",   // Footer: above name
    ],
  );

  const y = useTransform(
    smoothProgress,
    [0, 0.12, 0.25, 0.32, 0.42, 0.55, 0.6,  0.65, 0.7,  0.78, 0.82,  0.88,  0.93,  1],
    [
      "75vh",   // Hero: near bottom
      "30vh",   // TechSlider: mid
      "30vh",   // TechSlider hold
      "40vh",   // Transition: diving
      "25vh",   // Projects: floating high
      "25vh",   // Projects hold
      "35vh",   // Re-entry: descending
      "50vh",   // Re-entry: lower
      "60vh",   // About: grounded
      "60vh",   // About: hold
      "50vh",   // Gliding up
      "40vh",   // Contact: mid
      "25vh",   // Footer: rising
      "35vh",   // Footer: above name
    ],
  );

  const rotate = useTransform(
    smoothProgress,
    [0, 0.12, 0.25, 0.32, 0.42, 0.55, 0.6, 0.65, 0.7, 0.78, 0.82, 0.88, 0.93, 1],
    [0, -8, -5, 12, -6, -4, 10, 15, 0, 0, -5, -8, 0, 0],
  );

  const scale = useTransform(
    smoothProgress,
    [0, 0.12, 0.25, 0.32, 0.42, 0.55, 0.6, 0.65, 0.7, 0.78, 0.82, 0.88, 0.93, 1],
    [0.6, 0.9, 0.9, 0.7, 1, 1, 0.8, 0.8, 1, 1, 0.9, 1, 1.1, 1],
  );

  const opacity = useTransform(
    smoothProgress,
    [0, 0.03, 0.33, 0.37, 0.63, 0.67, 1],
    [0, 1, 1, 0.6, 0.6, 1, 1],
  );

  // Shadow & thruster transforms (were previously inline in JSX)
  const shadowOpacity = useTransform(
    smoothProgress,
    [0, 0.65, 0.75, 1],
    [0, 0, 0.5, 0.4],
  );
  const shadowScaleX = useTransform(smoothProgress, [0.65, 0.75], [0.3, 1]);
  const thrusterOpacity = useTransform(
    smoothProgress,
    [0.3, 0.35, 0.4, 0.6, 0.65, 0.7],
    [0, 1, 0, 0, 1, 0],
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Track mouse for parallax depth effect
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      // Normalize mouse position to -1...1
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(nx * 15); // subtle lean toward cursor
      mouseY.set(ny * 10);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  // Continuous floating animation (like zero-gravity bob)
  useAnimationFrame((_, delta) => {
    time.set(time.get() + delta * 0.001);
    const t = time.get();
    // Gentle sinusoidal float
    floatY.set(Math.sin(t * 1.2) * 12 + Math.sin(t * 0.7) * 6);
    // Subtle rotation wobble
    floatRotate.set(Math.sin(t * 0.8) * 3 + Math.cos(t * 0.5) * 2);
  });

  // ── Early return removed — show astronaut on all screens ──
  const astroSize = isMobile ? 80 : 120;

  return (
    <motion.div
      ref={containerRef}
      className="fixed z-[60] pointer-events-none select-none"
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
        width: astroSize,
        height: astroSize,
      }}
    >
      {/* Inner wrapper: floating bob + mouse parallax + wobble */}
      <motion.div
        style={{
          y: floatY,
          rotate: floatRotate,
          x: smoothMouseX,
        }}
      >
        {/* Depth shadow below (projects onto "ground") */}
        <motion.div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/20 blur-[8px]"
          style={{
            width: 60,
            height: 10,
            opacity: shadowOpacity,
            scaleX: shadowScaleX,
          }}
        />

        {/* Atmospheric glow — reacts to scroll section */}
        <motion.div
          className="absolute inset-0 rounded-full blur-[25px] -z-10"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
            scale: 2,
          }}
        />

        {/* Thruster particles — visible during transitions */}
        <motion.div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1"
          style={{ opacity: thrusterOpacity }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-4 rounded-full bg-orange-400/70"
              animate={{
                scaleY: [1, 1.8, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.3 + i * 0.1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* The Lottie astronaut */}
        <Lottie
          animationData={astronautData}
          loop
          autoplay
          style={{
            width: astroSize,
            height: astroSize,
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ScrollAstronaut;
