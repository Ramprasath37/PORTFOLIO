import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PageTransition } from "@/components/layout/PageTransition";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    id: 1,
    role: "Junior Python Developer",
    company: "Uniq Technologies",
    location: "Internship",
    period: "3 Months",
    description: "Worked on backend development using Python and Django, building RESTful APIs and database management systems.",
    highlights: [
      "Developed RESTful APIs using Django REST Framework",
      "Implemented database schemas with MySQL and SQLite3",
      "Collaborated with team members on project requirements",
      "Learned industry best practices for clean code",
    ],
  },
];

const TimelineNode = ({ experience, index }: { experience: typeof experiences[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative"
    >
      {/* Timeline Line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent -translate-x-1/2" />

      {/* Timeline Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
        className="absolute left-0 md:left-1/2 top-8 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 glow-primary z-10"
      />

      {/* Content Card */}
      <div className="ml-8 md:ml-0 md:w-[calc(50%-2rem)] md:mr-auto">
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="glass card-hover">
            <CardContent className="p-6">
              {/* Role & Company */}
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg">{experience.role}</h3>
                  <p className="text-primary font-medium">{experience.company}</p>
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {experience.period}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {experience.location}
                </span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-4">
                {experience.description}
              </p>

              {/* Highlights */}
              <ul className="space-y-2">
                {experience.highlights.map((highlight, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-start gap-2 text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="text-muted-foreground">{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <PageTransition>
      <div className="min-h-screen px-4 py-16 md:py-24">
        <div className="container max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              My <span className="text-gradient">Experience</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              My professional journey so far
            </p>
          </motion.div>

          {/* Timeline */}
          <div ref={containerRef} className="relative py-8">
            {/* Progress indicator */}
            <motion.div
              className="absolute left-0 md:left-1/2 top-0 w-0.5 bg-primary/30 -translate-x-1/2 z-0"
              style={{ height: progressHeight }}
            />

            <div className="space-y-12">
              {experiences.map((experience, index) => (
                <TimelineNode key={experience.id} experience={experience} index={index} />
              ))}
            </div>

            {/* Timeline End */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12 text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-muted-foreground text-sm">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Open to opportunities
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
