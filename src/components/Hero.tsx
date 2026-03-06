import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import profilePhoto from "@/assets/lenon_sem_fundo.png";
import bg1 from "@/assets/backgrounds/bg1.png";
import bg2 from "@/assets/backgrounds/bg2.png";
import bg3 from "@/assets/backgrounds/bg3.png";

const backgrounds = [bg1, bg2, bg3];

const Hero = () => {
  const [bgIndex, setBgIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const preloadedRef = useRef<Set<number>>(new Set([0]));

  // Preload all images on mount
  useEffect(() => {
    backgrounds.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        preloadedRef.current.add(i);
        if (i === 0) setIsReady(true);
      };
    });
  }, []);

  useEffect(() => {
    if (!isReady) return;
    const interval = setInterval(() => {
      setBgIndex((prev) => {
        const next = (prev + 1) % backgrounds.length;
        return next;
      });
    }, 15000);
    return () => clearInterval(interval);
  }, [isReady]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <section className="relative overflow-hidden min-h-[70vh] flex items-center">
      {/* Dynamic Background */}
      <AnimatePresence mode="sync">
        <motion.div
          key={bgIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.65 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={backgrounds[bgIndex]}
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay gradient */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/40 via-background/25 to-background/80" />
      <div className="absolute inset-0 z-[1] grid-bg" />

      {/* Content */}
      <div className="container mx-auto px-6 py-16 md:py-24 relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col md:flex-row items-center gap-8 md:gap-12 max-w-3xl mx-auto"
        >
          {/* Profile Photo with glow effect */}
          <motion.div
            variants={item}
            className="shrink-0"
          >
            <motion.div
              className="relative"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
            >
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-3xl scale-110" />
              <div className="absolute inset-0 rounded-full bg-secondary/20 blur-2xl scale-105 animate-pulse" />
              
              <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-full border-2 border-primary/50 overflow-hidden pulse-ring">
                <motion.img
                  src={profilePhoto}
                  alt="Foto de Lenon Souza"
                  className="w-full h-full object-cover object-top scale-110"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <div className="text-center md:text-left">
            <motion.h1
              variants={item}
              className="text-3xl md:text-5xl font-bold text-foreground tracking-tight"
            >
              Lenon Souza
            </motion.h1>

            <motion.div variants={item} className="mt-3">
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/15 text-primary border border-primary/20">
                Engenheiro de Dados Full Stack
              </span>
            </motion.div>

            <motion.p
              variants={item}
              className="mt-4 text-muted-foreground leading-relaxed max-w-md"
            >
              Apaixonado por transformar dados em decisões. Especialista em pipelines de dados, visualizações e soluções em nuvem.
            </motion.p>

            {/* YouTube Button */}
            <motion.div variants={item} className="mt-6">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full glass border border-border hover:border-primary/40 text-foreground font-medium text-sm transition-all hover:scale-105 hover:shadow-[0_0_20px_hsl(var(--glow-primary))]"
              >
                <Play className="w-4 h-4 fill-current text-primary" />
                Assista meu vídeo
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
