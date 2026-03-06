import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Workflow, LayoutDashboard, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Logo imports
import pythonLogo from "@/assets/logos/python.png";
import postgresLogo from "@/assets/logos/postgres.png";
import golangLogo from "@/assets/logos/golang.png";
import githubLogo from "@/assets/logos/github.png";
import googleCloudLogo from "@/assets/logos/google_cloud.png";
import sqlLogo from "@/assets/logos/sql.png";
import dockerLogo from "@/assets/logos/docker.png";
import powerBiLogo from "@/assets/logos/power_bi.png";
import scikitLearnLogo from "@/assets/logos/scikit-learn.png";
import excelLogo from "@/assets/logos/excel.png";
import metabaseLogo from "@/assets/logos/metabase.png";
import gitLogo from "@/assets/logos/git.png";

interface Tech {
  name: string;
  icon?: LucideIcon;
  logo?: string;
  color: string;
  applications: string[];
}

const technologies: Tech[] = [
  {
    name: "Python",
    logo: pythonLogo,
    color: "#3776AB",
    applications: ["Data pipelines (ETL/ELT)", "Automation scripts", "Machine learning models", "Data analysis with Pandas/NumPy", "API development with FastAPI"],
  },
  {
    name: "SQL",
    logo: sqlLogo,
    color: "#E38C00",
    applications: ["Complex queries", "Query optimization", "Data transformation", "Analytical reporting", "Stored procedures"],
  },
  {
    name: "PostgreSQL",
    logo: postgresLogo,
    color: "#336791",
    applications: ["Relational database modeling", "Indexing strategies", "Performance tuning", "Integration with cloud services"],
  },
  {
    name: "Google Cloud",
    logo: googleCloudLogo,
    color: "#4285F4",
    applications: ["BigQuery for data warehousing", "Cloud Storage", "Dataflow", "Cloud Composer (Airflow)", "GCP IAM"],
  },
  {
    name: "Golang",
    logo: golangLogo,
    color: "#00ADD8",
    applications: ["High-performance microservices", "CLI tools", "Concurrent data processing pipelines"],
  },
  {
    name: "Docker",
    logo: dockerLogo,
    color: "#2496ED",
    applications: ["Containerized applications", "Docker Compose for multi-service setups", "CI/CD pipeline containers", "Development environment consistency"],
  },
  {
    name: "Power BI",
    logo: powerBiLogo,
    color: "#F2C811",
    applications: ["Executive dashboards", "KPI tracking", "DAX measures", "Integration with SQL and Excel data sources"],
  },
  {
    name: "Looker Studio",
    icon: LayoutDashboard,
    color: "#4285F4",
    applications: ["Self-service BI reports", "Real-time dashboards", "Google Analytics and BigQuery connectors"],
  },
  {
    name: "Scikit-learn",
    logo: scikitLearnLogo,
    color: "#F89939",
    applications: ["Supervised and unsupervised ML models", "Feature engineering", "Model evaluation and deployment"],
  },
  {
    name: "Excel",
    logo: excelLogo,
    color: "#217346",
    applications: ["Advanced formulas", "PivotTables", "Power Query", "Financial modeling", "Data validation"],
  },
  {
    name: "Metabase",
    logo: metabaseLogo,
    color: "#509EE3",
    applications: ["Internal analytics dashboards", "SQL-based questions", "Team data democratization"],
  },
  {
    name: "Git",
    logo: gitLogo,
    color: "#F05032",
    applications: ["Version control", "Branching strategies", "Merge/rebase workflows", "Code history management"],
  },
  {
    name: "GitHub",
    logo: githubLogo,
    color: "#ffffff",
    applications: ["Remote repositories", "Pull requests", "Code review", "GitHub Actions for CI/CD"],
  },
  {
    name: "CI/CD",
    icon: Workflow,
    color: "#6c63ff",
    applications: ["Automated testing pipelines", "Deployment automation with GitHub Actions", "Docker-based workflows"],
  },
  {
    name: "Lovable",
    icon: Heart,
    color: "#E91E8C",
    applications: ["Rapid prototyping", "AI-powered web development", "Full-stack app generation"],
  },
];

const TechGrid = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
    >
      {technologies.map((tech, i) => {
        const isExpanded = expanded === tech.name;
        const Icon = tech.icon;

        return (
          <motion.div
            key={tech.name}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03, duration: 0.3 }}
            className="col-span-1"
          >
            <motion.button
              layout="position"
              onClick={() => setExpanded(isExpanded ? null : tech.name)}
              className={`w-full text-left rounded-2xl glass p-4 transition-shadow cursor-pointer ${
                isExpanded ? "glow-primary" : "hover:shadow-[0_0_20px_var(--glow-primary)]"
              }`}
              aria-label={`${tech.name} — clique para ver aplicações`}
              style={{
                borderColor: isExpanded ? tech.color + "40" : undefined,
                borderWidth: isExpanded ? 1 : undefined,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: tech.color + "20" }}
                >
                  {tech.logo ? (
                    <img src={tech.logo} alt={tech.name} className="w-5 h-5 object-contain" />
                  ) : Icon ? (
                    <Icon size={18} style={{ color: tech.color }} />
                  ) : null}
                </div>
                <span className="text-sm font-medium text-foreground truncate">
                  {tech.name}
                </span>
              </div>
            </motion.button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-2 pb-1 px-1 space-y-1.5">
                    {tech.applications.map((app) => (
                      <div
                        key={app}
                        className="text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2"
                      >
                        <span
                          className="inline-block w-1.5 h-1.5 rounded-full mr-2 shrink-0"
                          style={{ backgroundColor: tech.color }}
                        />
                        {app}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default TechGrid;
