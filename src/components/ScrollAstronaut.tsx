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

  if (isMobile) return null;

  // ── Position transforms ──
  const x = useTransform(
    smoothProgress,
    [0, 0.15, 0.3, 0.35, 0.45, 0.6, 0.65, 0.75, 0.85, 0.95, 1],
    [
      "calc(85vw - 60px)", // Hero: bottom-right
      "calc(5vw)", // TechSlider: left side
      "calc(5vw)", // TechSlider end
      "calc(45vw)", // Transition: center
      "calc(80vw - 100px)", // Projects: right side
      "calc(80vw - 100px)", // Projects end
      "calc(45vw)", // Re-entry: center
      "calc(8vw)", // About: left side
      "calc(75vw)", // Contact: right side
      "calc(50vw - 60px)", // Footer: centered above name
      "calc(50vw - 100px)", // Footer end
    ],
  );

  const y = useTransform(
    smoothProgress,
    [0, 0.15, 0.3, 0.35, 0.45, 0.6, 0.65, 0.75, 0.85, 0.95, 1],
    [
      "calc(75vh)", // Hero: near bottom
      "calc(30vh)", // TechSlider: mid-left
      "calc(30vh)", // TechSlider end
      "calc(40vh)", // Transition: diving center
      "calc(25vh)", // Projects: floating high
      "calc(25vh)", // Projects end
      "calc(50vh)", // Re-entry: descending
      "calc(65vh)", // About: grounded
      "calc(40vh)", // Contact: mid-right
      "calc(20vh)", // Footer: above the name
      "calc(35vh)", // Footer end
    ],
  );

  const rotate = useTransform(
    smoothProgress,
    [0, 0.15, 0.3, 0.35, 0.45, 0.6, 0.65, 0.75, 0.85, 1],
    [0, -10, -5, 15, -8, -5, 20, 0, -10, 0],
  );

  const scale = useTransform(
    smoothProgress,
    [0, 0.1, 0.15, 0.3, 0.35, 0.45, 0.6, 0.65, 0.75, 0.85, 1],
    [0.6, 0.8, 1, 1, 0.7, 1, 1, 0.8, 1, 1.1, 1],
  );

  const opacity = useTransform(
    smoothProgress,
    [0, 0.03, 0.33, 0.37, 0.63, 0.67, 1],
    [0, 1, 1, 0.6, 0.6, 1, 1],
  );

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
        width: 120,
        height: 120,
      }}
    >
      {/* Inner wrapper: floating bob + mouse parallax + wobble */}
      <motion.div
        style={{
          y: floatY,
          rotate: floatRotate,
          x: smoothMouseX,
          // translateY combines with floatY via the mouse parallax
        }}
      >
        {/* Depth shadow below (projects onto "ground") */}
        <motion.div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/20 blur-[8px]"
          style={{
            width: 60,
            height: 10,
            // Shadow shrinks when astronaut is "higher" (less scroll = space = no ground)
            opacity: useTransform(
              smoothProgress,
              [0, 0.65, 0.75, 1],
              [0, 0, 0.5, 0.4],
            ),
            scaleX: useTransform(smoothProgress, [0.65, 0.75], [0.3, 1]),
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
          style={{
            opacity: useTransform(
              smoothProgress,
              [0.3, 0.35, 0.4, 0.6, 0.65, 0.7],
              [0, 1, 0, 0, 1, 0],
            ),
          }}
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
            width: 120,
            height: 120,
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ScrollAstronaut;
