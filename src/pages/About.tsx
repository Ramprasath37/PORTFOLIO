import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Calendar, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageTransition } from "@/components/layout/PageTransition";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  },
};

const interests = [
  "Backend Development",
  "API Design",
  "Database Architecture",
  "Clean Code",
  "Problem Solving",
  "Tech Exploration",
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
              About <span className="text-gradient">Me</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Get to know me better
            </p>
          </motion.div>

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {/* Profile Card */}
            <motion.div variants={itemVariants}>
              <Card className="glass overflow-hidden card-hover">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                    {/* Avatar with 3D tilt effect */}
                    <motion.div
                      whileHover={{ rotateY: 10, rotateX: -10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-40 h-40 rounded-2xl gradient-border overflow-hidden glow-badge flex-shrink-0"
                      style={{ perspective: "1000px" }}
                    >
                      <div className="w-full h-full flex items-center justify-center bg-card text-5xl font-display font-bold text-gradient">
                        <img
                          src="/PROFILE.jpeg"
                          alt="Ramprasath S"
                          className="w-full h-full object-cover"
                         />
                      </div>
                    </motion.div>

                    <div className="text-center md:text-left">
                      <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
                        Ramprasath S
                      </h2>
                      <p className="text-primary font-medium mb-4">
                        Junior Python Developer
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        I'm a passionate backend developer with expertise in Python and Django. 
                        I love building efficient, scalable APIs and working with databases. 
                        Currently focused on expanding my skills in full-stack development 
                        and contributing to meaningful projects.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <Card className="glass h-full card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-display font-semibold text-lg">Location</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Based in Erode, Tamil Nadu, India
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="glass h-full card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-display font-semibold text-lg">Experience</h3>
                    </div>
                    <p className="text-muted-foreground">
                      3 months internship at Uniq Technologies
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Interests */}
            <motion.div variants={itemVariants}>
              <Card className="glass card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Heart className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-lg">What I Love</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {interests.map((interest, index) => (
                      <motion.span
                        key={interest}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium cursor-default"
                      >
                        {interest}
                      </motion.span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
