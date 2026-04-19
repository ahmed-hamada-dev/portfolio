import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";

type ContactForm = HTMLFormElement;

const Contact: React.FC = () => {
  const form = useRef<ContactForm>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const sendEmail = (e: React.FormEvent<ContactForm>) => {
    e.preventDefault();
    if (!form.current) return;

    emailjs
      .sendForm(
        process.env.EMAIL_SERVICE_ID || "service_q60u8fg",
        process.env.TEMPLATE_ID || "template_6i25x6t",
        form.current,
        process.env.EMAIL_PUBLIC_KEY || "wXXN5py-Z4IKnQK7j",
      )
      .then(
        () => {
          toast.success("Success! Message delivered.");
          form.current?.reset();
        },
        (error: { text: string }) => {
          toast.error("Error! Delivery failed.");
          console.error("EmailJS error:", error.text);
        },
      );
  };

  return (
    <motion.section
      ref={sectionRef}
      id="contact"
      className="py-32 bg-background relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24 space-y-6">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-[12vw] font-black text-foreground/[0.03] absolute top-20 left-1/2 -translate-x-1/2 uppercase select-none pointer-events-none"
          >
            Connect
          </motion.h2>

          <div className="relative z-10 space-y-4">
            <h3 className="section-label">
              Start a Conversation
            </h3>
            <h2 className="section-title">
              GET IN <span className="section-title-muted">TOUCH</span>
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 max-w-7xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-12">
            <p className="text-2xl text-muted-foreground leading-relaxed max-w-md">
              Available for{" "}
              <span className="text-foreground font-bold italic">
                global opportunities
              </span>{" "}
              and high-impact engineering projects.
            </p>

            <div className="space-y-8">
              {[
                {
                  icon: <MailIcon className="w-6 h-6" />,
                  label: "Email",
                  value: "contact@ahmed-hamada.dev",
                  href: "mailto:contact@ahmed-hamada.dev",
                },
                {
                  icon: <LinkedinIcon className="w-6 h-6" />,
                  label: "LinkedIn",
                  value: "Ahmed Hamada",
                  href: "https://www.linkedin.com/in/ahmed-hamada-dev/",
                },
                {
                  icon: <GithubIcon className="w-6 h-6" />,
                  label: "GitHub",
                  value: "Ahmed Hamada",
                  href: "https://github.com/ahmed-hamada-dev",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-6 group"
                >
                  <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center group-hover:bg-snow-accent group-hover:text-background transition-all duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                      {item.label}
                    </h4>
                    <a
                      target="_blank"
                      href={item.href}
                      className="text-xl font-bold hover:text-snow-accent transition-colors"
                    >
                      {item.value}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="glass p-10 md:p-12 rounded-[2rem] relative border-white/5"
          >
            <form ref={form} onSubmit={sendEmail} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                    Name
                  </label>
                  <Input
                    name="from_name"
                    placeholder="Jane Doe"
                    className="bg-transparent border-white/10 focus:border-snow-accent h-14 text-lg rounded-xl transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                    Email
                  </label>
                  <Input
                    name="from_email"
                    type="email"
                    placeholder="jane@example.com"
                    className="bg-transparent border-white/10 focus:border-snow-accent h-14 text-lg rounded-xl transition-all"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                  Subject
                </label>
                <Input
                  name="subject"
                  placeholder="Inquiry"
                  className="bg-transparent border-white/10 focus:border-snow-accent h-14 text-lg rounded-xl transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                  Message
                </label>
                <Textarea
                  name="message"
                  placeholder="Describe your vision..."
                  rows={5}
                  className="bg-transparent border-white/10 focus:border-snow-accent text-lg rounded-xl transition-all resize-none"
                  required
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full h-16 rounded-xl bg-snow-accent text-background font-black uppercase tracking-widest hover:scale-[1.02] transition-transform"
              >
                Send Delivery
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
