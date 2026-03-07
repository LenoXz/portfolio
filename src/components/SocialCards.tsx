import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const socials = [
  {
    name: "LinkedIn",
    subtitle: "Conecte-se comigo profissionalmente",
    icon: FaLinkedin,
    color: "#0A66C2",
    // TODO: Replace with your actual LinkedIn URL
    url: "https://www.linkedin.com/in/lenon-aquino-de-souza-5a94b1258/",
  },
  {
    name: "GitHub",
    subtitle: "Veja meus repositórios e projetos",
    icon: FaGithub,
    color: "#ffffff",
    // TODO: Replace with your actual GitHub URL
    url: "https://github.com/LenoXz",
  },
  {
    name: "Instagram",
    subtitle: "Acompanhe minha rotina e projetos",
    icon: FaInstagram,
    color: null, // uses gradient
    // TODO: Replace with your actual Instagram URL
    url: "https://instagram.com/lenon.csv",
  },
];

const SocialCards = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center gap-4 max-w-md mx-auto"
    >
      {socials.map((social, i) => {
        const Icon = social.icon;
        const isInstagram = social.name === "Instagram";

        return (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Abrir ${social.name}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.35 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="w-full glass rounded-2xl p-5 flex items-center gap-4 cursor-pointer transition-shadow hover:shadow-[0_0_30px_var(--glow-primary)]"
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                isInstagram ? "instagram-gradient" : ""
              }`}
              style={
                !isInstagram
                  ? { backgroundColor: social.color + "20" }
                  : undefined
              }
            >
              <Icon
                size={24}
                style={{ color: isInstagram ? "#fff" : social.color! }}
              />
            </div>
            <div>
              <p className="font-semibold text-foreground">{social.name}</p>
              <p className="text-sm text-muted-foreground">{social.subtitle}</p>
            </div>
          </motion.a>
        );
      })}
    </motion.div>
  );
};

export default SocialCards;
