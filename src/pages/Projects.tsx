import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/layout/PageTransition";
import { ExternalLink, Github, X } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Student Database Management System",
    description: "A comprehensive CRUD application for managing student records with an intuitive interface.",
    longDescription: "Built a full-featured student management system that allows administrators to create, read, update, and delete student records. Features include search functionality, data validation, and a responsive design that works on all devices.",
    tech: ["Django", "HTML", "CSS", "SQLite3"],
    features: [
      "Complete CRUD operations",
      "Search and filter functionality",
      "Form validation",
      "Responsive design",
    ],
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 2,
    title: "Personal Expense Tracker API",
    description: "RESTful API for tracking personal expenses with JWT authentication.",
    longDescription: "Developed a secure REST API for personal finance management. Users can track their income and expenses, categorize transactions, and view spending analytics. Implemented JWT-based authentication for secure access.",
    tech: ["Django REST Framework", "JWT", "SQLite3"],
    features: [
      "JWT Authentication",
      "Expense categorization",
      "Income tracking",
      "API documentation",
    ],
    color: "from-green-500/20 to-emerald-500/20",
  },
];

interface ProjectModalProps {
  project: typeof projects[0];
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="glass-strong">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-display text-2xl font-bold">{project.title}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="shrink-0"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <p className="text-muted-foreground mb-6">{project.longDescription}</p>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                <Github className="w-4 h-4 mr-2" />
                View Code
              </Button>
              <Button className="flex-1">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard = ({ project, index, onSelect }: { 
  project: typeof projects[0]; 
  index: number;
  onSelect: () => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <motion.div
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.98 }}
        onClick={onSelect}
        className="cursor-pointer"
      >
        <Card className="glass h-full overflow-hidden group">
          {/* Gradient Top */}
          <div className={`h-2 bg-gradient-to-r ${project.color}`} />
          
          <CardContent className="p-6">
            <h3 className="font-display text-xl font-bold mb-3 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 rounded-md bg-secondary text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-primary/5 pointer-events-none"
            />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <PageTransition>
      <div className="min-h-screen px-4 py-16 md:py-24">
        <div className="container max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              My <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Here are some of the projects I've worked on
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onSelect={() => setSelectedProject(project)}
              />
            ))}
          </div>

          {/* More Coming Soon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground">
              More projects coming soon...
            </p>
          </motion.div>
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
