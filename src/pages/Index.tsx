import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "@/components/Hero";
import TabBar from "@/components/TabBar";
import TechGrid from "@/components/TechGrid";
import SocialCards from "@/components/SocialCards";
import ContactForm from "@/components/ContactForm";
import ParticleCanvas from "@/components/ParticleCanvas";
import FloatingLogos from "@/components/FloatingLogos";

const tabContent: Record<string, React.ReactNode> = {
  tech: <TechGrid />,
  social: <SocialCards />,
  contact: <ContactForm />,
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("tech");

  return (
    <div className="min-h-screen bg-background">
      <ParticleCanvas />
      <FloatingLogos />
      <div className="relative z-10">
        <Hero />
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="container mx-auto px-6 py-8 max-w-[900px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {tabContent[activeTab]}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Index;
