import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";

const TechSlider = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const techCategories = [
    {
      title: "Frontend",
      items: [
        {
          name: "Next.js",
          logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nextdotjs.svg",
        },
        {
          name: "React",
          logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg",
        },
        {
          name: "TypeScript",
          logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/typescript.svg",
        },
        {
          name: "Tailwind CSS",
          logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tailwindcss.svg",
        },
        {
          name: "Zustand",
          logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/zustand.svg",
        },
      ],
    },
    {
      title: "Backend",
      items: [
        {
          name: "Node.js",
          logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nodedotjs.svg",
        },
        {
          name: "Hono",
          logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/hono.svg",
        },
        {
          name: "PostgreSQL",
          logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/postgresql.svg",
        },
        {
          name: "Prisma",
          logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/prisma.svg",
        },
        {
          name: "Redis",
          logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/redis.svg",
        },
        {
          name: "Bun",
          logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/bun.svg",
        },
      ],
    },
    {
      title: "Tools & AI",
      items: [
        {
          name: "OpenAI",
          logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/openai.svg",
        },
        {
          name: "Docker",
          logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/docker.svg",
        },
        {
          name: "Git",
          logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/git.svg",
        },
        {
          name: "Cloudflare",
          logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/cloudflare.svg",
        },
        {
          name: "Vercel",
          logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/vercel.svg",
        },
      ],
    },
  ];

  useEffect(() => {
    if (!isInView) return;

    const cards = sectionRef.current?.querySelectorAll(".tech-card");
    if (!cards) return;

    gsap.fromTo(
      cards,
      { y: 100, opacity: 0, rotateX: -30 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
      },
    );
  }, [isInView]);

  return (
    <motion.section
      ref={sectionRef}
      id="tech"
      className="py-12 md:py-24 flex flex-col justify-center bg-background relative overflow-hidden w-full md:w-screen shrink-0 h-auto md:h-screen"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-snow-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h2 className="section-label mb-4">
              Capabilities
            </h2>
            <h3 className="section-title">
              MY TECH <span className="section-title-muted">STACK</span>
            </h3>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-muted-foreground text-lg max-w-sm text-right leading-relaxed"
          >
            Using the latest technologies to build high-performance, scalable,
            and beautiful applications.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {techCategories.map((category) => (
            <div key={category.title} className="space-y-8">
              <h4 className="text-xl font-bold border-l-4 border-snow-accent pl-4">
                {category.title}
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {category.items.map((tech) => (
                  <motion.div
                    key={tech.name}
                    className="tech-card glass p-6 rounded-2xl group relative hover:border-snow-accent/50 transition-all duration-500 cursor-default"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 flex-shrink-0">
                        <Image
                          width={40}
                          height={40}
                          src={tech.logo}
                          alt={tech.name}
                          className="w-full h-full object-contain dark:invert opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>
                      <span className="font-bold text-sm tracking-tight">
                        {tech.name}
                      </span>
                    </div>

                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-snow-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Infinite Logo Marquee */}
        <div className="mt-12 md:mt-20 relative pb-10">
          <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-background to-transparent z-10" />

          <div className="flex animate-scroll whitespace-nowrap gap-20 items-center opacity-20 hover:opacity-100 transition-opacity duration-1000">
            {[
              ...techCategories.flatMap((c) => c.items),
              ...techCategories.flatMap((c) => c.items),
            ].map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-4 grayscale hover:grayscale-0 transition-all duration-500"
              >
                <Image
                  src={tech.logo}
                  width={40}
                  height={40}
                  alt=""
                  className="dark:invert w-8 h-8 object-contain"
                />
                <span className="text-2xl font-black tracking-tighter uppercase">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default TechSlider;
