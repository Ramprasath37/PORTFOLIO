import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PageTransition } from "@/components/layout/PageTransition";
import { cn } from "@/lib/utils";

const skillCategories = [
  {
    title: "Backend",
    icon: "⚙️",
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "Python", level: 85 },
      { name: "Django", level: 80 },
      { name: "Django REST Framework", level: 75 },
    ],
  },
  {
    title: "Frontend",
    icon: "🎨",
    color: "from-pink-500 to-rose-500",
    skills: [
      { name: "HTML", level: 90 },
      { name: "CSS", level: 85 },
      { name: "Bootstrap", level: 75 },
    ],
  },
  {
    title: "Database",
    icon: "🗄️",
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "MySQL", level: 80 },
      { name: "SQLite3", level: 85 },
    ],
  },
  {
    title: "Tools",
    icon: "🛠️",
    color: "from-purple-500 to-violet-500",
    skills: [
      { name: "Git", level: 80 },
      { name: "Postman", level: 85 },
      { name: "Photoshop", level: 60 },
    ],
  },
];

const ProgressBar = ({ level, isInView }: { level: number; isInView: boolean }) => {
  return (
    <div className="h-2 bg-secondary rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: isInView ? `${level}%` : 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
      />
    </div>
  );
};

const SkillCard = ({ category, index }: { category: typeof skillCategories[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card 
        className={cn(
          "glass h-full transition-all duration-300",
          isHovered && "shadow-lg shadow-primary/10"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 mb-6"
          >
            <motion.span 
              className="text-3xl"
              animate={isHovered ? { rotate: [0, -10, 10, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              {category.icon}
            </motion.span>
            <h3 className="font-display font-bold text-xl">{category.title}</h3>
          </motion.div>

          <div className="space-y-5">
            {category.skills.map((skill, skillIndex) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-sm text-muted-foreground">{skill.level}%</span>
                </div>
                <ProgressBar level={skill.level} isInView={isInView} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

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
              My <span className="text-gradient">Skills</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Technologies and tools I work with to bring ideas to life
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {skillCategories.map((category, index) => (
              <SkillCard key={category.title} category={category} index={index} />
            ))}
          </div>

          {/* Mobile Horizontal Scroll Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="md:hidden text-center mt-8 text-muted-foreground text-sm"
          >
            Tap on skills for more details
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
