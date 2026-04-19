"use client";

import React, { useState, useEffect } from "react";
import {
  useTransform,
  motion,
  useAnimationFrame,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLinkIcon, Cross2Icon } from "@radix-ui/react-icons";
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
  setActiveProject,
  isMobile,
  isActive,
}: any) => {
  const radiusX = isMobile ? 120 : 420;
  const radiusY = isMobile ? 80 : 160;

  const baseAngle = (index / total) * Math.PI * 2;
  const x = useTransform(
    time,
    (v: number) => Math.cos(baseAngle + v * -0.3) * radiusX,
  );
  const y = useTransform(
    time,
    (v: number) => Math.sin(baseAngle + v * -0.3) * radiusY,
  );

  const depth = useTransform(
    y,
    (yVal: number) => (yVal + radiusY) / (2 * radiusY),
  ); // 0 (back) to 1 (front)
  const scaleRaw = useTransform(depth, (d: number) => 0.5 + d * 0.5);
  const zIndexRaw = useTransform(depth, (d: number) => Math.round(d * 100));
  const opacityRaw = useTransform(depth, (d: number) => 0.3 + d * 0.7);
  const filterRaw = useTransform(
    depth,
    (d: number) => `blur(${(1 - d) * 8}px)`,
  );

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
        opacity: isActive ? 0 : opacityRaw,
        filter: filterRaw,
        marginTop: "-48px",
        marginLeft: "-48px",
      }}
      className="origin-center"
    >
      <motion.div
        layoutId={`planet-${project.id}`}
        onClick={() => setActiveProject(project)}
        whileHover={{ scale: 1.1 }}
        className="pointer-events-auto relative w-24 md:w-32 h-24 md:h-32 rounded-full overflow-hidden border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)] cursor-pointer group bg-black"
      >
        <Image
          src={project.imageSrc}
          alt={project.title}
          fill
          className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
        />
        <div className="absolute inset-0 bg-[#000000]/20 group-hover:bg-transparent transition-colors" />
        {/* Internal Sphere Shadow for 3D effect */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_10px_rgba(0,0,0,0.8)] pointer-events-none" />
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeProject, setActiveProject] = useState<any | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const time = useMotionValue(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useAnimationFrame((_, delta) => {
    // Keep planets orbiting consistently even when the dialog is open
    time.set(time.get() + delta * 0.0005);
  });

  const handleOpenProject = (project: any) => {
    setActiveProject(project);
  };

  const handleCloseProject = () => {
    setActiveProject(null);
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

  return (
    <section
      id="projects"
      className="relative w-full bg-background min-h-[1000px] flex items-center justify-center overflow-hidden py-32"
    >
      {/* Background Starfield/Atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Galaxy 
          mouseRepulsion
          mouseInteraction
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.4)_0%,#000000_100%)] pointer-events-none" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto h-[600px] flex items-center justify-center">
        {/* The "Sun" Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="absolute w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-snow-accent/20 rounded-full blur-[80px] md:blur-[120px]" />
          <h2 className="relative text-3xl md:text-5xl lg:text-7xl font-black text-white mix-blend-overlay opacity-80 uppercase tracking-[0.2em]">
            Featured
          </h2>
          <h2 className="relative text-2xl md:text-4xl lg:text-5xl font-light text-white/50 mix-blend-overlay uppercase tracking-[0.5em] mt-2">
            Works
          </h2>
        </div>

        {/* Orbiting Planets */}
        {projects.map((project, i) => (
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
          />
        ))}
      </div>

      {/* Expanded Project Modal using AnimatePresence */}
      {/* 1. Modal Overlay Background */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            key="modal-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[998] bg-black/50 backdrop-blur-sm"
            onClick={handleCloseProject}
          />
        )}
      </AnimatePresence>

      {/* 2. Navigation Controls */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            key="modal-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] pointer-events-none flex items-center justify-between px-2 md:px-8 lg:px-12"
          >
            {/* Previous Orbit Button */}
            <div className="pointer-events-auto hidden sm:flex">
               <button onClick={handlePrev} className="group flex flex-col items-center gap-3">
                  <div className="relative w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-black/40 backdrop-blur-md group-hover:border-snow-accent/30 transition-all group-hover:scale-110 shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                     <div className="absolute inset-1.5 rounded-full border border-dashed border-white/20 group-hover:animate-[spin_4s_linear_infinite]" />
                     <div className="w-3 h-3 rounded-full bg-white/10 shadow-[inset_0_0_5px_rgba(0,0,0,0.5)] group-hover:bg-snow-accent/20 transition-colors" />
                     <div className="absolute top-1/2 -translate-y-1/2 -left-1.5 w-3 h-3 rounded-full bg-snow-accent shadow-[0_0_12px_rgba(255,255,255,0.8)] group-hover:-translate-x-1 transition-transform" />
                  </div>
                  <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-white/50 group-hover:text-white transition-opacity">Prev</span>
               </button>
            </div>

            {/* Next Orbit Button */}
            <div className="pointer-events-auto hidden sm:flex">
               <button onClick={handleNext} className="group flex flex-col items-center gap-3">
                  <div className="relative w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-black/40 backdrop-blur-md group-hover:border-snow-accent/30 transition-all group-hover:scale-110 shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                     <div className="absolute inset-1.5 rounded-full border border-dashed border-white/20 group-hover:animate-[spin_4s_linear_infinite_reverse]" />
                     <div className="w-3 h-3 rounded-full bg-white/10 shadow-[inset_0_0_5px_rgba(0,0,0,0.5)] group-hover:bg-snow-accent/20 transition-colors" />
                     <div className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-3 h-3 rounded-full bg-snow-accent shadow-[0_0_12px_rgba(255,255,255,0.8)] group-hover:translate-x-1 transition-transform" />
                  </div>
                  <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-white/50 group-hover:text-white transition-opacity">Next</span>
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Modal Card Morph */}
      <div className="fixed inset-0 z-[999] pointer-events-none flex items-center justify-center p-4">
        <AnimatePresence>
        {activeProject && (
          <motion.div
            key={activeProject.id}
            layoutId={`planet-${activeProject.id}`}
            transition={{ type: "spring", bounce: 0.15, duration: 0.8 }}
            className="absolute m-auto bg-[#050505] border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.05)] pointer-events-auto w-[calc(100%-2rem)] max-w-3xl h-[80vh] md:h-[700px]"
            onClick={(e) => e.stopPropagation()}
            style={{ 
               // The morph will animate borderRadius properly providing we explicitly set it.
               borderRadius: "2rem" 
            }}
          >
            {/* Inner Content fade animation - ensures text/images don't jump during morph */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.3 } }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="w-full h-full flex flex-col relative"
            >
              {/* Mobile controls */}
              <div className="absolute top-4 left-4 z-[1000] flex gap-3 sm:hidden p-1.5 rounded-full backdrop-blur-md">
                 <button onClick={handlePrev} className="relative w-10 h-10 rounded-full border border-white/10 bg-black/60 flex items-center justify-center group hover:bg-white/10 transition-colors">
                    <div className="absolute top-1/2 -translate-y-1/2 right-4 w-2 h-2 rounded-full z-10 bg-white/20 shadow-[inset_0_0_2px_rgba(0,0,0,0.5)] group-hover:bg-white/40 transition-colors" />
                    <div className="absolute top-1/2 -translate-y-1/2 left-2.5 w-2.5 h-2.5 rounded-full bg-snow-accent shadow-[0_0_8px_rgba(255,255,255,0.8)] group-hover:-translate-x-0.5 transition-transform" />
                 </button>
                 <button onClick={handleNext} className="relative w-10 h-10 rounded-full border border-white/10 bg-black/60 flex items-center justify-center group hover:bg-white/10 transition-colors">
                    <div className="absolute top-1/2 -translate-y-1/2 left-4 w-2 h-2 rounded-full z-10 bg-white/20 shadow-[inset_0_0_2px_rgba(0,0,0,0.5)] group-hover:bg-white/40 transition-colors" />
                    <div className="absolute top-1/2 -translate-y-1/2 right-2.5 w-2.5 h-2.5 rounded-full bg-snow-accent shadow-[0_0_8px_rgba(255,255,255,0.8)] group-hover:translate-x-0.5 transition-transform" />
                 </button>
              </div>
              <button
                onClick={handleCloseProject}
                className="absolute top-4 right-4 z-50 bg-black/50 p-2 border border-white/10 rounded-full text-white/50 hover:text-white hover:bg-black transition-colors"
              >
                <Cross2Icon className="w-5 h-5" />
              </button>

              {/* Header Image */}
              <div className="relative h-[35%] min-h-[200px] w-full shrink-0">
                <Image
                  src={activeProject.imageSrc}
                  alt={activeProject.title}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
                {activeProject.featured && (
                  <span className="absolute top-6 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-6 bg-snow-accent text-background text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-lg">
                    Featured
                  </span>
                )}
                <h3 className="absolute bottom-6 left-6 text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-2">
                  {activeProject.title}
                </h3>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 flex flex-col flex-1 hide-scrollbar overflow-y-auto">
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8">
                  {activeProject.description}
                </p>

                <div className="mb-8 space-y-6">
                  <div>
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-[#eeeeee]/60 mb-2">
                      Challenge
                    </h4>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {activeProject.problem}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-snow-accent/80 mb-2">
                      Solution
                    </h4>
                    <p className="text-sm text-white/80 leading-relaxed">
                      {activeProject.solution}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-6 border-t border-white/5">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {activeProject.techStack.map((tech: string) => (
                      <span
                        key={tech}
                        className="text-[10px] font-bold px-3 py-1.5 rounded-md bg-white/[0.05] text-white/70 uppercase tracking-wide"
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
                        className="flex-1 flex justify-center items-center gap-2 py-4 rounded-xl bg-snow-accent text-background font-bold text-sm tracking-wide hover:opacity-90 transition-opacity"
                      >
                        Preview Project <ExternalLinkIcon className="w-4 h-4" />
                      </Link>
                    )}
                    {activeProject.githubUrl && (
                      <Link
                        href={activeProject.githubUrl}
                        target="_blank"
                        className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center"
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
      </div>
    </section>
  );
};

export default Projects;
