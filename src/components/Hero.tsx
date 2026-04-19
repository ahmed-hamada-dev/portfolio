"use client";
import React, { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Constants ─────────────────────────────────────────────────────
const FRAME_COUNT = 240;
const FRAME_PATH = (index: number) =>
  `/frames/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;

// ─── Main Hero Component ───────────────────────────────────────────
const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafIdRef = useRef(0);
  const pendingFrameRef = useRef(-1);

  // Text overlay refs
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitle1Ref = useRef<HTMLDivElement>(null);
  const subtitle2Ref = useRef<HTMLDivElement>(null);
  const subtitle3Ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);

  // ── Render a frame to the canvas (via rAF for smooth updates) ──
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete) return;

    // Use CSS pixel dimensions (canvas is scaled by DPR)
    const cssW = parseInt(canvas.style.width) || canvas.width;
    const cssH = parseInt(canvas.style.height) || canvas.height;
    const canvasRatio = cssW / cssH;
    const imgRatio = img.naturalWidth / img.naturalHeight;

    let drawWidth: number, drawHeight: number, offsetX: number, offsetY: number;

    // Use "contain" logic so the whole frame is always fully visible
    if (imgRatio > canvasRatio) {
      // Image is wider than the container -> scale to fit width
      drawWidth = cssW;
      drawHeight = drawWidth / imgRatio;
      offsetX = 0;
      offsetY = (cssH - drawHeight) / 2;
    } else {
      // Image is taller than the container -> scale to fit height
      drawHeight = cssH;
      drawWidth = drawHeight * imgRatio;
      offsetX = (cssW - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, cssW, cssH);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Batched rendering via requestAnimationFrame to avoid jank
  const requestFrame = useCallback(
    (frameIndex: number) => {
      pendingFrameRef.current = frameIndex;
      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(() => {
          rafIdRef.current = 0;
          if (pendingFrameRef.current >= 0) {
            drawFrame(pendingFrameRef.current);
          }
        });
      }
    },
    [drawFrame],
  );

  // ── Resize canvas to match viewport (DPR-aware) ──
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Use CSS pixels for layout, scale for DPR internally
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctxRef.current = ctx;
    }
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // ── Preload all frames ──
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loadedCount++;
        // Render first frame as soon as it loads
        if (i === 1) {
          handleResize();
          drawFrame(0);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    // ── Set canvas size ──
    handleResize();
    window.addEventListener("resize", handleResize);

    // ── GSAP ScrollTrigger — scrub through frames ──
    const frameObj = { frame: 0 };

    const ctx = gsap.context(() => {
      // Master timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3500", // 3500px of scroll = 240 frames (snappier)
          pin: true,
          scrub: 0.3, // Tight tracking
          anticipatePin: 1,
        },
      });

      // Frame scrubbing
      tl.to(
        frameObj,
        {
          frame: FRAME_COUNT - 1,
          ease: "none",
          duration: 1,
          onUpdate: () => {
            const idx = Math.round(frameObj.frame);
            if (idx !== currentFrameRef.current) {
              currentFrameRef.current = idx;
              requestFrame(idx);
            }
          },
        },
        0,
      );

      // ── Text Overlays — fade in/out at perfect moments ──

      // Title: "Building Every Layer of the Web" visible from 0% to ~25%
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.06, ease: "power2.out" },
        0,
      ).to(titleRef.current, { opacity: 0, y: -20, duration: 0.06 }, 0.18);

      // Scroll prompt: visible at the start, fades quickly
      tl.fromTo(
        scrollPromptRef.current,
        { opacity: 1 },
        { opacity: 0, duration: 0.05 },
        0.05,
      );

      // Subtitle 1: "Backend Architecture" ~20%-40%
      tl.fromTo(
        subtitle1Ref.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.05 },
        0.22,
      ).to(subtitle1Ref.current, { opacity: 0, y: -15, duration: 0.05 }, 0.38);

      // Subtitle 2: "Data Flow & Logic" ~42%-60%
      tl.fromTo(
        subtitle2Ref.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.05 },
        0.42,
      ).to(subtitle2Ref.current, { opacity: 0, y: -15, duration: 0.05 }, 0.58);

      // Subtitle 3: "Frontend Experience" ~62%-80%
      tl.fromTo(
        subtitle3Ref.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.05 },
        0.62,
      ).to(subtitle3Ref.current, { opacity: 0, y: -15, duration: 0.05 }, 0.78);

      // CTA: appears at the end ~85%-100%
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.08, ease: "power2.out" },
        0.85,
      );
    }, sectionRef);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      ctx.revert();
    };
  }, [handleResize, drawFrame, requestFrame]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      {/* The Canvas — renders frame sequence */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* ── Text Overlays ── */}
      {/* All text sits on top of the canvas */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Main Title */}
        <div
          ref={titleRef}
          className="absolute inset-0 flex flex-col items-center justify-center opacity-0"
        >
          <p className="section-label mb-4 flex items-center gap-2">
            <span className="text-muted-foreground/60">[</span>
            FULL-STACK DEVELOPER
            <span className="text-muted-foreground/60">]</span>
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-[0.85] text-white text-center">
            Building Every Layer
            <br />
            <span className="text-white/20">of the Web</span>
            <span className="text-snow-accent">.</span>
          </h1>
        </div>

        {/* Phase 1: Backend */}
        <div
          ref={subtitle1Ref}
          className="absolute bottom-16 md:bottom-20 left-6 md:left-16 opacity-0"
        >
          <span className="section-label block mb-2">[ 01 ]</span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight text-white/90">
            Backend
            <br />
            Architecture
          </h2>
          <p className="text-white/40 text-sm md:text-base mt-2 max-w-xs">
            APIs, databases, and server logic — the invisible foundation.
          </p>
        </div>

        {/* Phase 2: Data Flow */}
        <div
          ref={subtitle2Ref}
          className="absolute bottom-16 md:bottom-20 right-6 md:right-16 text-right opacity-0"
        >
          <span className="section-label block mb-2">[ 02 ]</span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight text-white/90">
            Data Flow
            <br />
            &amp; Logic
          </h2>
          <p className="text-white/40 text-sm md:text-base mt-2 max-w-xs ml-auto">
            Connecting every piece with seamless data pipelines.
          </p>
        </div>

        {/* Phase 3: Frontend */}
        <div
          ref={subtitle3Ref}
          className="absolute bottom-16 md:bottom-20 left-6 md:left-16 opacity-0"
        >
          <span className="section-label block mb-2">[ 03 ]</span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight text-white/90">
            Frontend
            <br />
            Experience
          </h2>
          <p className="text-white/40 text-sm md:text-base mt-2 max-w-xs">
            Pixel-perfect interfaces that users love.
          </p>
        </div>

        {/* CTA — end of scroll */}
        <div
          ref={ctaRef}
          className="absolute inset-0 flex flex-col items-center justify-end pb-20 md:pb-24 opacity-0 pointer-events-auto"
        >
          <p className="section-label mb-3">[ THE FULL PICTURE ]</p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white/90 text-center mb-6">
            Every Layer of the Web
          </h2>
          <Link href="#contact" className="group block">
            <div className="flex items-center gap-4 bg-white rounded-full pl-6 pr-2 py-2 hover:bg-gray-100 transition-all font-sans shadow-xl">
              <span className="text-black font-semibold text-sm md:text-base tracking-tight whitespace-nowrap">
                Let&apos;s Build Together
              </span>
              <div className="bg-snow-accent rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center group-hover:opacity-80 transition-opacity">
                <ArrowUpRight className="text-white w-5 h-5 md:w-6 md:h-6" />
              </div>
            </div>
          </Link>
        </div>

        {/* Scroll prompt */}
        <div
          ref={scrollPromptRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-xs tracking-widest uppercase">
            Scroll to explore
          </span>
          <span className="text-snow-accent text-lg animate-bounce">↓</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
