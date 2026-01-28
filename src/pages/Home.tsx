import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/layout/PageTransition";
import { Link } from "react-router-dom";

const floatingIcons = [
  { icon: "🐍", label: "Python", delay: 0 },
  { icon: "🌐", label: "Django", delay: 0.2 },
  { icon: "⚡", label: "API", delay: 0.4 },
  { icon: "🗄️", label: "MySQL", delay: 0.6 },
  { icon: "🎨", label: "CSS", delay: 0.8 },
  { icon: "📦", label: "Git", delay: 1 },
];

const TypeWriter = ({ text, className }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [text]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <span className={className}>
      {displayText}
      <span className={`${showCursor ? "opacity-100" : "opacity-0"} text-primary`}>|</span>
    </span>
  );
};

const FloatingIcon = ({ icon, label, delay }: { icon: string; label: string; delay: number }) => {
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, -20, 0],
        x: [0, 10, 0],
      }}
      transition={{
        delay,
        duration: 4,
        y: { repeat: Infinity, duration: 3 + Math.random() * 2 },
        x: { repeat: Infinity, duration: 4 + Math.random() * 2 },
      }}
      whileHover={{ scale: 1.3, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
      className="absolute glass rounded-xl p-3 cursor-pointer"
      style={{ 
        left: `${10 + randomX * 0.8}%`, 
        top: `${10 + randomY * 0.8}%`,
      }}
      title={label}
    >
      <span className="text-2xl md:text-3xl">{icon}</span>
    </motion.div>
  );
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <PageTransition>
      <div ref={containerRef} className="relative min-h-screen overflow-hidden">
        {/* Floating Icons Background */}
        <div className="absolute inset-0 pointer-events-none">
          {floatingIcons.map((item, index) => (
            <FloatingIcon key={index} {...item} />
          ))}
        </div>

        {/* Hero Content */}
        <motion.div 
          style={{ opacity, scale }}
          className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full gradient-border overflow-hidden glow-primary">
              <div className="w-full h-full flex items-center justify-center bg-card text-4xl md:text-5xl font-display font-bold text-gradient">
                RS
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
          >
            <span className="text-foreground">Hi, I'm </span>
            <span className="text-gradient">Ramprasath S</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 h-10"
          >
            <TypeWriter text="Junior Python Developer" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-10"
          >
            Building robust backend solutions with Python, Django & REST APIs
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/projects">
              <Button 
                size="lg" 
                className="relative overflow-hidden group bg-primary text-primary-foreground px-8 py-6 text-lg"
              >
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%", opacity: 0 }}
                  whileHover={{ x: "100%", opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10">View Projects</span>
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary/50 hover:bg-primary/10 px-8 py-6 text-lg"
              >
                Get in Touch
              </Button>
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex gap-4 mt-10"
          >
            {[
              { icon: Github, href: "https://github.com/Ramprasath37", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/ramprasath37", label: "LinkedIn" },
              { icon: Mail, href: "mailto:sramprasath37@gmail.com", label: "Email" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full glass hover:bg-primary/20 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-sm">Scroll Down</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
