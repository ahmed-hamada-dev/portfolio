import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { CodeIcon, GlobeIcon } from "@radix-ui/react-icons";
import { ServerIcon, CpuIcon } from "lucide-react";

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const skills = [
    {
      icon: <CodeIcon className="w-8 h-8 text-snow-accent" />,
      title: "Frontend Architecture",
      description: "Crafting pixel-perfect, highly interactive interfaces.",
    },
    {
      icon: <ServerIcon className="w-8 h-8 text-snow-accent" />,
      title: "Backend Engineering",
      description: "Building resilient APIs and scalable server-side systems.",
    },
    {
      icon: <CpuIcon className="w-8 h-8 text-snow-accent" />,
      title: "AI Integration",
      description: "Infusing applications with intelligent, agentic features.",
    },
    {
      icon: <GlobeIcon className="w-8 h-8 text-snow-accent" />,
      title: "Cloud & DevOps",
      description:
        "Automated scaling and professional infrastructure management.",
    },
  ];

  useEffect(() => {
    if (!isInView) return;

    const aboutReveals = sectionRef.current?.querySelectorAll(".about-reveal");
    const skillCards = sectionRef.current?.querySelectorAll(".skill-card");

    if (!aboutReveals || !skillCards) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      aboutReveals,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2 },
    ).fromTo(
      skillCards,
      { scale: 0.9, opacity: 0, y: 30 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      "-=0.5",
    );
  }, [isInView]);

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      className="py-12 md:py-24 flex flex-col justify-center bg-background relative overflow-hidden w-full md:w-screen shrink-0 h-auto md:h-screen"
    >
      <div className="container mx-auto px-4 relative z-10 origin-bottom">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Side: Content */}
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="about-reveal section-label">The Architect</h2>
              <h3 className="about-reveal section-title">
                CRAFTING <span className="section-title-muted">DIGITAL</span>{" "}
                PRECISION
              </h3>
            </div>

            <p className="about-reveal text-xl text-muted-foreground leading-relaxed max-w-xl">
              I specialize in bridging the gap between{" "}
              <span className="text-foreground font-bold">
                visionary design
              </span>{" "}
              and{" "}
              <span className="text-foreground font-bold">
                complex engineering
              </span>
              . My approach focuses on creating applications that are not just
              functional, but exceptional.
            </p>
          </div>

          {/* Right Side: Skills Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="skill-card glass p-8 rounded-3xl group hover:border-snow-accent transition-all duration-500"
              >
                <div className="mb-6 p-4 rounded-2xl bg-snow-accent/10 w-fit group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">{skill.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Background Text */}
        <div className="absolute -bottom-10 -right-20 text-[20vw] font-black text-foreground/[0.02] pointer-events-none select-none uppercase tracking-tighter">
          Engineering
        </div>
      </div>
    </motion.section>
  );
};

export default About;
