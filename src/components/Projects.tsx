import React from "react";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

const Projects = () => {
  const projects = [
    {
      id: 4,
      title: "Spider Platform",
      description:
        "A modern, scalable online learning platform delivering high-quality courses with advanced analytics, secure payments, and gamified assessments.",
      imageSrc: "/spider-platform.png",
      techStack: ["Next.js 15", "TypeScript", "Prisma", "Better Auth", "Bunny Stream", "recharts"],
      liveUrl: "https://fy.sa",
      featured: true,
      problem: "Traditional LMS platforms often lack the performance and interactive gamification needed to keep modern learners engaged and motivated.",
      solution: "Built a high-performance system with Next.js 15 and Bun, integrating a sub-second quiz engine, real-time leaderboard, and seamless Apple Pay support.",
      features: ["Rating System", "Leaderboard", "Apple Pay (Moyasar)", "Gemini Analytics", "WhatsApp OTP"],
    },
    {
      id: 1,
      title: "Pet Community",
      description:
        "A comprehensive full-stack platform combining e-commerce and community features for pet lovers. Features include product listings, user authentication, and real-time messaging.",
      imageSrc: "/pet.png",
      techStack: ["Next.js", "PostgreSQL", "Prisma", "Stripe", "WebSockets"],
      liveUrl: "https://pet-store-snow66926692.vercel.app/",
      githubUrl: "https://github.com/snow6692/pet-store",
      featured: true,
      problem: "Pet owners needed a unified platform for shopping and community engagement without switching between multiple apps.",
      solution: "Built an all-in-one platform with real-time chat, secure payments, and a thriving community ecosystem.",
    },
    {
      id: 2,
      title: "Discovery SaaS",
      description:
        "A SaaS platform that helps entrepreneurs showcase their products and gain visibility through community upvotes and featured listings.",
      imageSrc: "/hunt-clone.png",
      techStack: ["Next.js", "PostgreSQL", "Stripe API", "Rate Limiting"],
      liveUrl: "https://hunt-clone-snow66926692.vercel.app/",
      githubUrl: "https://github.com/snow6692/v1-hunt-clone",
      featured: false,
      problem: "Independent creators struggled to get visibility for their products without major platform backing.",
      solution: "Created a platform focused on discovery and fair representation through community-driven rankings.",
    },
    {
      id: 3,
      title: "AI Workout",
      description:
        "An intelligent fitness application that generates personalized workout plans using AI. Integrates voice AI for natural language requests.",
      imageSrc: "/workout.png",
      techStack: ["Next.js", "Vapi", "Gemini API", "Convex", "Redis"],
      liveUrl: "https://ai-workout-generator-snow66926692.vercel.app/",
      githubUrl: "https://github.com/snow6692/ai-workout-generator",
      featured: false,
      problem: "Generic workout plans often fail to adapt to individual needs and progression levels.",
      solution: "Developed an AI-powered system that learns user preferences and creates dynamically personalized programs.",
    },
  ];

  return (
    <motion.section
      id="projects"
      className="py-12 md:py-24 flex flex-col justify-center bg-background relative overflow-hidden w-full md:w-max shrink-0 h-auto md:h-screen"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="relative z-10 flex flex-col md:flex-row items-center h-full gap-12 md:gap-20 md:pr-[10vw]">
        {/* Intro Slide */}
        <div className="w-full md:w-[50vw] lg:w-[40vw] shrink-0 flex flex-col justify-center px-8 md:pl-20 relative">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-[12vw] font-black text-foreground/[0.03] absolute -top-20 left-0 uppercase select-none pointer-events-none"
          >
            Portfolio
          </motion.h2>
          
          <div className="relative z-10 space-y-4 max-w-xl">
            <h3 className="section-label">
              Proven Excellence
            </h3>
            <h2 className="section-title">
              FEATURED <span className="section-title-muted">WORKS</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              A collection of full-stack applications showcasing complex problem-solving, intuitive user experiences, and scalable architectures.
            </p>
          </div>
        </div>

        {/* Project Cards horizontally stacked with a tighter gap */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 shrink-0 px-4 md:px-0">
          {projects.map((project) => (
            <div key={project.id} className="w-full md:w-[70vw] lg:w-[45vw] max-w-[900px] shrink-0">
              <ProjectCard
                title={project.title}
                description={project.description}
                imageSrc={project.imageSrc}
                techStack={project.techStack}
                liveUrl={project.liveUrl}
                githubUrl={project.githubUrl}
                featured={project.featured}
                problem={project.problem}
                solution={project.solution}
                features={project.features}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
