import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import pythonLogo from "@/assets/logos/python.png";
import postgresLogo from "@/assets/logos/postgres.png";
import golangLogo from "@/assets/logos/golang.png";
import githubLogo from "@/assets/logos/github.png";
import googleCloudLogo from "@/assets/logos/google_cloud.png";

const logos = [
  { src: pythonLogo, alt: "Python" },
  { src: postgresLogo, alt: "PostgreSQL" },
  { src: golangLogo, alt: "Golang" },
  { src: githubLogo, alt: "GitHub" },
  { src: googleCloudLogo, alt: "Google Cloud" },
];

interface FloatingLogo {
  id: number;
  src: string;
  alt: string;
  x: number;
  y: number;
  duration: number;
  delay: number;
  size: number;
}

const FloatingLogos = () => {
  const [items, setItems] = useState<FloatingLogo[]>([]);

  useEffect(() => {
    const generated: FloatingLogo[] = logos.map((logo, i) => ({
      id: i,
      ...logo,
      x: 5 + Math.random() * 85,
      y: 10 + Math.random() * 80,
      duration: 15 + Math.random() * 10,
      delay: i * 2,
      size: 28 + Math.random() * 16,
    }));
    setItems(generated);
  }, []);

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden="true">
      {items.map((item) => (
        <motion.img
          key={item.id}
          src={item.src}
          alt={item.alt}
          className="absolute opacity-[0.04] hover:opacity-[0.08] transition-opacity"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            width: item.size,
            height: item.size,
          }}
          animate={{
            y: [0, -20, 0, 15, 0],
            x: [0, 10, -5, 8, 0],
            rotate: [0, 5, -3, 2, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingLogos;
