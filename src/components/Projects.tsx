"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  useTransform,
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  AnimatePresence,
  useScroll,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLinkIcon, Cross2Icon, ChevronRightIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import { GithubIcon } from "lucide-react";
import Galaxy from "./Galaxy";

const projects = [
  {
    id: 6,
    title: "School Platform",
    description:
      "Comprehensive school management system with real-time bus tracking, gamified Mental Math engine, course marketplace, and 6-role RBAC.",
    imageSrc: "/school-platform.png",
    techStack: ["Hono.js", "TanStack Start", "PostgreSQL", "WebSockets", "Google Maps", "Redis"],
    featured: true,
    problem:
      "Schools needed a unified platform for administration, bus tracking, courses, and parent monitoring.",
    solution:
      "Built the entire backend (40+ models) and admin/manager/teacher dashboards with real-time GPS tracking, Mental Math engine with 5 modes, and inter-school competitions.",
  },
  {
    id: 5,
    title: "Brave Online",
    description:
      "A large-scale education ERP with role-based dashboards, real-time chat, QR enrollment, and device-based security.",
    imageSrc: "/brave-online.png",
    techStack: ["Hono.js", "TanStack Start", "PostgreSQL", "Redis", "BullMQ", "Firebase"],
    liveUrl: "https://braveonline.online",
    featured: true,
    problem:
      "Education platforms in the region lack integrated enrollment, payment verification, and real-time communication.",
    solution:
      "Built the entire backend and admin/teacher dashboards with 3 enrollment methods, real-time chat, and RBAC for a 2-person team.",
  },
  {
    id: 4,
    title: "Spider Platform",
    description:
      "A scalable learning platform with gamified assessments and advanced analytics.",
    imageSrc: "/spider-platform.png",
    techStack: ["Next.js 15", "Prisma", "Better Auth", "recharts"],
    liveUrl: "https://fy.sa",
    featured: true,
    problem:
      "Traditional LMS platforms lack performance and interactive gamification.",
    solution:
      "Built a high-performance system with next.js, realtime leaderboards and apple pay.",
  },
  {
    id: 1,
    title: "Pet Community",
    description: "Full-stack e-commerce and community platform for pet lovers.",
    imageSrc: "/pet.png",
    techStack: ["Next.js", "PostgreSQL", "Stripe", "WebSockets"],
    liveUrl: "https://pet-store-snow66926692.vercel.app/",
    githubUrl: "https://github.com/ahmed-hamada-dev/pet-store",
    featured: true,
    problem:
      "Pet owners needed a unified platform for shopping and engagement.",
    solution:
      "Built an all-in-one platform with real-time chat and secure payments.",
  },
  {
    id: 2,
    title: "Discovery SaaS",
    description:
      "SaaS platform helping creators showcase products via community upvotes.",
    imageSrc: "/hunt-clone.png",
    techStack: ["Next.js", "PostgreSQL", "Stripe API", "Rate Limiting"],
    liveUrl: "https://hunt-clone-snow66926692.vercel.app/",
    githubUrl: "https://github.com/ahmed-hamada-dev/v1-hunt-clone",
    featured: false,
    problem: "Independent creators struggled to get visibility for products.",
    solution: "Created a platform focused on discovery through rankings.",
  },
  {
    id: 3,
    title: "AI Workout",
    description:
      "Intelligent fitness generator using AI to personalize plans via natural language.",
    imageSrc: "/workout.png",
    techStack: ["Next.js", "Vapi", "Gemini API", "Convex"],
    liveUrl: "https://ai-workout-generator-snow66926692.vercel.app/",
    githubUrl: "https://github.com/ahmed-hamada-dev/ai-workout-generator",
    featured: false,
    problem: "Generic workout plans fail to adapt to individual progress.",
    solution:
      "Developed an AI system that creates dynamic personalized programs.",
  },
];

const Planet = ({
  project,
  index,
  total,
  time,
  activeProject,
  setActiveProject,
  isMobile,
  isActive,
  mouseX,
  mouseY,
  isHovered
}: any) => {
  const radiusX = isMobile ? 140 : 420;
  const radiusY = isMobile ? 90 : 160;

  const baseAngle = (index / total) * Math.PI * 2;
  
  // Gravitational effect: Planets are pulled towards the mouse cursor
  const x = useTransform([time, mouseX, isHovered], ([t, mx, hover]: any) => {
     const ox = Math.cos(baseAngle + t * -0.3) * radiusX;
     return ox + (mx - ox) * 0.15 * hover; // 15% gravitational pull towards mouse
  });

  const y = useTransform([time, mouseY, isHovered], ([t, my, hover]: any) => {
     const oy = Math.sin(baseAngle + t * -0.3) * radiusY;
     return oy + (my - oy) * 0.15 * hover;
  });

  const depth = useTransform(time, (t: number) => {
     const oy = Math.sin(baseAngle + t * -0.3) * radiusY;
     return (oy + radiusY) / (2 * radiusY);
  });
  
  const scaleRaw = useTransform(depth, (d: number) => 0.4 + d * 0.6);
  const zIndexRaw = useTransform(depth, (d: number) => Math.round(d * 100));
  
  const filterRaw = useTransform(depth, (d: number) => `blur(${(1 - d) * 6}px) saturate(${0.5 + d * 0.5})`);
  const opacityRaw = useTransform(depth, (d: number) => 0.4 + d * 0.6);

  const angleDegrees = useTransform(time, (v: number) => ((baseAngle + v * -0.3) * 180) / Math.PI);

  // Subtle, realistic space colors (starlights, pale blues, silvers)
  const planetColors = ["#ffffff", "#e0f2fe", "#f8fafc", "#f1f5f9", "#bae6fd", "#cbd5e1"];
  const themeColor = planetColors[index % planetColors.length];

  return (
    <motion.div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        x,
        y,
        zIndex: zIndexRaw,
        scale: scaleRaw,
        filter: filterRaw,
        opacity: opacityRaw,
        perspective: "1000px" // Enable 3D perspective context for physical intersections
      }}
      className="origin-center -mt-[48px] -ml-[48px] md:-mt-[64px] md:-ml-[64px]"
    >
      <motion.div
        animate={{
          scale: activeProject ? (isActive ? 1 : 0.8) : 1,
          opacity: activeProject && !isActive ? 0 : 1,
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32"
        style={{ willChange: "transform" }}
      >
        {/* Soft, realistic spherical halo instead of the buggy offset ellipse */}
        <motion.div
            style={{ zIndex: -1 }} 
            className="absolute inset-[-25%] rounded-[9999px] z-0 pointer-events-none opacity-50"
        >
            <div className="absolute inset-0 rounded-[9999px]" style={{ background: `radial-gradient(circle at 50% 50%, ${themeColor}50 0%, ${themeColor}00 65%)` }} />
        </motion.div>

        {/* Cinematic 3D Angled Orbital Ring with Glowing Moon */}
        <motion.div
           className="absolute inset-[-80%] md:inset-[-100%] pointer-events-none z-10 flex items-center justify-center transform-gpu"
           style={{ transform: "rotateX(75deg) rotateY(-15deg)", willChange: "transform" }}
        >
           <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12 + index * 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center transform-gpu"
           >
              {/* Rotating SVG Glow Trail */}
              <svg className="w-full h-full absolute inset-0 overflow-visible" viewBox="0 0 100 100">
                  <defs>
                      <linearGradient id={`orbit-grad-${project.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                         <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                         <stop offset="25%" stopColor={themeColor} stopOpacity="0.9" />
                         <stop offset="100%" stopColor={themeColor} stopOpacity="0" />
                      </linearGradient>
                  </defs>
                  
                  {/* Faint complete orbit gridline */}
                  <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                  
                  {/* Glowing energy tail (streak) */}
                  <circle 
                     cx="50" cy="50" r="48" 
                     fill="none" 
                     stroke={`url(#orbit-grad-${project.id})`} 
                     strokeWidth="1.5"
                     strokeLinecap="round"
                     strokeDasharray="120 300"
                     style={{ transformOrigin: "50px 50px", transform: "rotate(-90deg)" }} 
                  />
              </svg>

              {/* The Moon Orb (Riding the tip of the trail) */}
              <div 
                 className="absolute top-[2%] left-1/2 -translate-x-1/2 rounded-full bg-white flex items-center justify-center" 
                 style={{ 
                    width: isMobile ? "10px" : "14px",
                    height: isMobile ? "10px" : "14px",
                    transform: "rotateX(-75deg) rotateY(15deg)", // Counter-rotate to remain a sphere visually!
                    boxShadow: `0 0 15px ${themeColor}, 0 0 30px ${themeColor}, inset -2px -2px 4px rgba(0,0,0,0.8)` 
                 }} 
              >
                  {/* Small internal core detail */}
                  <div className="w-[30%] h-[30%] bg-white rounded-full shadow-[0_0_5px_#fff]" />
              </div>
           </motion.div>
        </motion.div>

        {/* Main Planet Sphere Object (Using layoutId) */}
        <motion.div
           layoutId={activeProject?.id === project.id ? undefined : `planet-${project.id}`}
           onClick={() => setActiveProject(project)}
           whileHover={{ scale: 1.1 }}
           className="pointer-events-auto relative w-full h-full overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.9)] cursor-pointer group bg-black z-20"
           style={{ zIndex: 1, borderRadius: "50%", willChange: "transform" }} // Explicit 50% border radius fixes closing animation glitch
        >
          {/* Animated Surface (Scrolling Texture to Simulate Rotation) */}
          <motion.div 
             animate={{ x: ["0%", "-50%"] }} 
             transition={{ duration: 40 + index * 5, repeat: Infinity, ease: "linear" }}
             className="absolute top-0 left-0 w-[200%] h-full pointer-events-none flex"
             style={{ willChange: "transform" }}
          >
             <div className="relative w-1/2 h-full">
                <Image src={project.imageSrc} alt={project.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
             </div>
             <div className="relative w-1/2 h-full">
                <Image src={project.imageSrc} alt="" fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
             </div>
          </motion.div>
          
          {/* Deep 3D Shading & Specular Map Layer */}
          <div className="absolute inset-0 rounded-[9999px] shadow-[inset_-12px_-12px_24px_rgba(0,0,0,0.95),inset_4px_4px_12px_rgba(255,255,255,0.4)] pointer-events-none" />
          <div className="absolute inset-0 rounded-[9999px] shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] pointer-events-none" />

          {/* Terminator Line (Day/Night Mapping) */}
           <motion.div
             style={{ rotate: angleDegrees }}
             className="absolute inset-[0] rounded-[9999px] pointer-events-none"
          >
             <div className="absolute inset-0 rounded-[9999px] bg-[radial-gradient(ellipse_at_100%_50%,rgba(0,0,0,1)_15%,rgba(0,0,0,0.8)_40%,rgba(0,0,0,0)_75%)]" />
          </motion.div>

          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeProject, setActiveProject] = useState<any | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const time = useMotionValue(0);
  
  // Parallax scroll effects to simulate Rocket Takeoff and Landing!
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const planetsY = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], ["-100vh", "0vh", "0vh", "-100vh"]);
  const planetsScale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.3, 1, 1, 0.3]);
  const planetsOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const galaxyY = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], ["-40vh", "0vh", "0vh", "-40vh"]);
  const galaxyOpacityScroll = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Black hole cursor mechanics
  const mouseX = useSpring(0, { stiffness: 40, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 40, damping: 20 });
  const isHovered = useSpring(0, { stiffness: 60, damping: 15 });

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useAnimationFrame((_, delta) => {
    time.set(time.get() + delta * 0.0005);
  });

  const handleOpenProject = (project: any) => {
    setActiveProject(project);
    document.body.style.overflow = "hidden";
  };

  const handleCloseProject = () => {
    setActiveProject(null);
    document.body.style.overflow = "auto";
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = projects.findIndex((p) => p.id === activeProject?.id);
    const nextIndex = (currentIndex + 1) % projects.length;
    setActiveProject(projects[nextIndex]);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = projects.findIndex((p) => p.id === activeProject?.id);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setActiveProject(projects[prevIndex]);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (activeProject) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !activeProject && isHovered.set(1)}
      onMouseLeave={() => {
         isHovered.set(0);
         mouseX.set(0);
         mouseY.set(0);
      }}
      className="relative w-full bg-black min-h-[1300px] flex items-center justify-center overflow-hidden py-32"
    >
      {/* Atmospheric Entry & Exit Gradients (Clouds/Sky blending smoothly into outer space) */}
      <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-background via-background/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none" />

      {/* Dynamic Galaxy Background zooming during active state */}
      <motion.div style={{ y: galaxyY, opacity: galaxyOpacityScroll }} className={`absolute inset-0 z-0 ${isMobile ? 'pointer-events-none' : 'pointer-events-auto'}`}>
        <motion.div 
          className="absolute inset-0 origin-center"
          animate={{ 
            scale: activeProject ? 3 : 1, 
            opacity: activeProject ? 0 : 1 
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
        <Galaxy 
          mouseRepulsion={!isMobile}
          mouseInteraction={!isMobile}
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={!isMobile ? 5 : 0}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.4)_0%,#000000_100%)] pointer-events-none" />
      </motion.div>
      </motion.div>

      <motion.div 
         className="relative w-full max-w-7xl mx-auto h-[600px] flex items-center justify-center z-20 pointer-events-none"
         style={{ y: planetsY, scale: planetsScale, opacity: planetsOpacity }}
      >
        {/* The Solar Center */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-0 flex flex-col items-center justify-center pointer-events-none origin-center"
          animate={{
            scale: activeProject ? 0 : 1,
            opacity: activeProject ? 0 : 1,
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-snow-accent/20 rounded-full blur-[80px] md:blur-[120px]" />
          <h2 className="relative text-3xl md:text-5xl lg:text-7xl font-black text-white mix-blend-overlay opacity-80 uppercase tracking-[0.2em]">
            Featured
          </h2>
          <h2 className="relative text-2xl md:text-4xl lg:text-5xl font-light text-white/50 mix-blend-overlay uppercase tracking-[0.5em] mt-2">
            Works
          </h2>
        </motion.div>

        {/* Render Orbiting Planets */}
        {mounted && projects.map((project, i) => (
          <Planet
            key={project.id}
            project={project}
            index={i}
            total={projects.length}
            time={time}
            activeProject={activeProject}
            isActive={activeProject?.id === project.id}
            setActiveProject={handleOpenProject}
            isMobile={isMobile}
            mouseX={mouseX}
            mouseY={mouseY}
            isHovered={isHovered}
          />
        ))}
      </motion.div>

      {/* Expanded Project Zoom-In Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden"
          >
            {/* The Massive Planet Surface Zoom Morph */}
            <motion.div
              layoutId={`planet-${activeProject.id}`}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bg-black w-[150vw] h-[150vw] md:w-[120vw] md:h-[120vw] overflow-hidden flex-shrink-0"
              style={{ originX: 0.5, originY: 0.5, opacity: 1, borderRadius: "50%" }}
            >
              <Image 
                  src={activeProject.imageSrc} 
                  alt="" 
                  fill 
                  className="object-cover opacity-20 scale-125 blur-[60px] md:blur-[100px] pointer-events-none" 
              />
              <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,1)] bg-black/40 pointer-events-none" style={{ borderRadius: "50%" }} />
            </motion.div>

            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.5, ease: "linear" }}
               className="absolute inset-0 bg-black/50 backdrop-blur-3xl"
               onClick={handleCloseProject}
            />

            {/* Navigation Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none flex items-center justify-between px-2 md:px-8 lg:px-12"
            >
              <div className="pointer-events-auto hidden sm:flex z-[1000]">
                 <button onClick={handlePrev} className="group flex flex-col items-center gap-3">
                    <div className="relative w-14 h-14 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-md group-hover:border-snow-accent/50 transition-all group-hover:scale-110 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                       <ChevronLeftIcon className="w-6 h-6 text-white" />
                    </div>
                 </button>
              </div>

              <div className="pointer-events-auto hidden sm:flex z-[1000]">
                 <button onClick={handleNext} className="group flex flex-col items-center gap-3">
                    <div className="relative w-14 h-14 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-md group-hover:border-snow-accent/50 transition-all group-hover:scale-110 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                       <ChevronRightIcon className="w-6 h-6 text-white" />
                    </div>
                 </button>
              </div>
            </motion.div>

            {/* Modal Card Content Overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }}
              transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative m-auto bg-[#0a0a0a]/80 border border-white/10 rounded-[32px] overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.05)] w-[calc(100%-2rem)] max-w-4xl h-[85vh] md:h-[750px] flex flex-col pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-4 left-4 z-[1000] flex gap-3 sm:hidden p-1.5 rounded-full backdrop-blur-md">
                 <button onClick={handlePrev} className="relative w-10 h-10 rounded-full border border-white/10 bg-black/60 flex items-center justify-center group hover:bg-white/10 transition-colors">
                    <ChevronLeftIcon className="w-5 h-5 text-white" />
                 </button>
                 <button onClick={handleNext} className="relative w-10 h-10 rounded-full border border-white/10 bg-black/60 flex items-center justify-center group hover:bg-white/10 transition-colors">
                    <ChevronRightIcon className="w-5 h-5 text-white" />
                 </button>
              </div>

              <button
                onClick={handleCloseProject}
                className="absolute top-4 right-4 z-[1000] bg-black/50 p-2.5 border border-white/10 rounded-full text-white/50 hover:text-white hover:bg-white/10 hover:rotate-90 hover:scale-110 transition-all"
              >
                <Cross2Icon className="w-5 h-5" />
              </button>

              <div className="relative h-[35%] md:h-[45%] w-full shrink-0 group overflow-hidden">
                <Image
                  src={activeProject.imageSrc}
                  alt={activeProject.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
                {activeProject.featured && (
                  <span className="absolute top-6 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-6 bg-snow-accent text-background text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg">
                    Featured
                  </span>
                )}
                <h3 className="absolute bottom-6 left-6 md:left-10 text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-2 drop-shadow-lg">
                  {activeProject.title}
                </h3>
              </div>

              <div className="p-6 md:p-10 flex flex-col flex-1 hide-scrollbar overflow-y-auto bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
                <p className="text-white/70 text-sm md:text-lg leading-relaxed mb-8 font-light">
                  {activeProject.description}
                </p>

                <div className="mb-10 space-y-8">
                  <div className="bg-white/[0.02] border border-white/[0.05] p-5 rounded-2xl">
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-[#eeeeee]/60 mb-3 flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-[#eeeeee]/60" />
                       Challenge
                    </h4>
                    <p className="text-sm md:text-base text-white/60 leading-relaxed">
                      {activeProject.problem}
                    </p>
                  </div>
                  <div className="bg-snow-accent/[0.03] border border-snow-accent/[0.1] p-5 rounded-2xl">
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-snow-accent mb-3 flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-snow-accent" />
                       Solution
                    </h4>
                    <p className="text-sm md:text-base text-white/80 leading-relaxed">
                      {activeProject.solution}
                    </p>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-white/5">
                  <div className="flex flex-wrap gap-2 mb-8">
                    {activeProject.techStack.map((tech: string) => (
                      <span
                        key={tech}
                        className="text-[10px] font-black px-3 py-1.5 rounded-md bg-white/[0.05] border border-white/[0.05] text-white/70 uppercase tracking-widest hover:bg-white/10 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {activeProject.liveUrl && (
                      <Link
                        href={activeProject.liveUrl}
                        target="_blank"
                        className="flex-1 flex justify-center items-center gap-3 py-4 rounded-2xl bg-snow-accent text-background font-black uppercase tracking-widest text-xs md:text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.8)] hover:scale-[1.02] transition-all"
                      >
                        Launch Mission <ExternalLinkIcon className="w-4 h-4" />
                      </Link>
                    )}
                    {activeProject.githubUrl && (
                      <Link
                        href={activeProject.githubUrl}
                        target="_blank"
                        className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-[1.02] transition-all flex items-center justify-center"
                      >
                        <GithubIcon className="w-5 h-5 text-white" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
