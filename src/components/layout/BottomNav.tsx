import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, User, Code2, FolderKanban, Briefcase, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/about", icon: User, label: "About" },
  { path: "/skills", icon: Code2, label: "Skills" },
  { path: "/projects", icon: FolderKanban, label: "Projects" },
  { path: "/experience", icon: Briefcase, label: "Experience" },
  { path: "/contact", icon: Mail, label: "Contact" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
    >
      <div className="mx-2 mb-2 rounded-2xl glass border border-border/50 shadow-lg shadow-black/20">
        <div className="flex items-center justify-around py-2 px-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="relative flex flex-col items-center justify-center py-2 px-3"
              >
                <motion.div
                  whileTap={{ scale: 0.85 }}
                  className="relative"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -inset-2 rounded-xl bg-primary/20"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <item.icon
                    className={cn(
                      "relative z-10 h-5 w-5 transition-colors duration-200",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                </motion.div>
                <span
                  className={cn(
                    "text-[10px] mt-1 font-medium transition-colors duration-200",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
