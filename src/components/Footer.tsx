import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <LinkedinIcon className="w-5 h-5" />, href: "https://www.linkedin.com/in/ahmed-hamada-dev/", label: "LinkedIn" },
    { icon: <GithubIcon className="w-5 h-5" />, href: "https://github.com/ahmed-hamada-dev", label: "GitHub" },
    { icon: <MailIcon className="w-5 h-5" />, href: "mailto:contact@ahmed-hamada.dev", label: "Email" },
  ];

  return (
    <footer className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-8xl md:text-[12rem] font-black text-foreground/[0.02] absolute left-1/2 -top-10 -translate-x-1/2 select-none tracking-tighter">
            HAMADA
          </h2>
          <div className="relative z-10">
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
              AHMED <span className="text-snow-accent">HAMADA</span>
            </h3>
            <p className="text-muted-foreground text-lg italic max-w-sm mx-auto">
              Engineering the future of the web with precision and passion.
            </p>
          </div>
        </motion.div>

        <div className="flex justify-center gap-8 mb-16">
          {socialLinks.map((social, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link
                href={social.href}
                target="_blank"
                className="w-14 h-14 rounded-2xl glass flex items-center justify-center hover:bg-snow-accent hover:text-background transition-all duration-500"
              >
                {social.icon}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm font-bold tracking-widest text-muted-foreground uppercase opacity-50">
            © {currentYear} Ahmed Hamada
          </p>
          <div className="flex gap-8">
            <Link href="#home" className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-snow-accent transition-colors">Home</Link>
            <Link href="#projects" className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-snow-accent transition-colors">Works</Link>
            <Link href="#about" className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-snow-accent transition-colors">About</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
