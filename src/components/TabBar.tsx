import { motion } from "framer-motion";

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "tech", label: "Tecnologias" },
  { id: "social", label: "Redes Sociais" },
  { id: "contact", label: "Entre em Contato" },
];

const TabBar = ({ activeTab, onTabChange }: TabBarProps) => {
  return (
    <div className="sticky top-0 z-50 glass">
      <div className="container mx-auto px-6">
        <nav
          className="flex justify-center gap-1 py-3"
          role="tablist"
          aria-label="Seções do portfólio"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-label={tab.label}
              onClick={() => onTabChange(tab.id)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors min-w-[44px] min-h-[44px] ${
                activeTab === tab.id
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full bg-primary glow-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TabBar;
