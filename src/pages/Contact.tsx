import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/layout/PageTransition";
import { Mail, Phone, MapPin, Linkedin, Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import emailjs from "@emailjs/browser";


const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "sramprasath37@gmail.com",
    href: "mailto:sramprasath37@gmail.com"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 73975 58428",
    href: "tel:+917397558428",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Erode, Tamil Nadu",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Connect with me",
    href: "https://linkedin.com/in/ramprasath37",
  },
];

interface FloatingInputProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
}

const FloatingInput = ({ label, type = "text", name, value, onChange, textarea }: FloatingInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;

  const InputComponent = textarea ? "textarea" : "input";

  return (
    <div className="relative">
      <InputComponent
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "w-full px-4 py-4 bg-secondary/50 rounded-xl border-2 border-transparent outline-none transition-all duration-300",
          "focus:border-primary focus:bg-secondary/80",
          isFocused && "shadow-lg shadow-primary/10",
          textarea && "min-h-[120px] resize-none"
        )}
        required
      />
      <label
        className={cn(
          "absolute left-4 transition-all duration-300 pointer-events-none text-muted-foreground",
          (isFocused || hasValue) 
            ? "top-1 text-xs text-primary" 
            : "top-4 text-base"
        )}
      >
        {label}
      </label>
    </div>
  );
};

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sendEmail = async (formData: { name: string; email: string; message: string }) => {
  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
  } catch (error) {
    console.error("Email sending error:", error);
    throw error; // handle in handleSubmit
  }
};


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    await sendEmail(formData);  // ✅ call secure function
    setIsSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 3000);
  } catch (error) {
    alert("Message failed to send ❌");
  } finally {
    setIsSubmitting(false);
  }
};



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
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              I'd love to hear from you. Feel free to reach out!
            </p>
          </motion.div>

          <div ref={ref} className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Card className="glass">
                <CardContent className="p-6 space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="flex items-center gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors group"
                        >
                          <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <item.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{item.label}</p>
                            <p className="font-medium group-hover:text-primary transition-colors">
                              {item.value}
                            </p>
                          </div>
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 p-4">
                          <div className="p-3 rounded-xl bg-primary/10">
                            <item.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{item.label}</p>
                            <p className="font-medium">{item.value}</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <FloatingInput
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={(value) => setFormData({ ...formData, name: value })}
                    />
                    <FloatingInput
                      label="Your Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(value) => setFormData({ ...formData, email: value })}
                    />
                    <FloatingInput
                      label="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={(value) => setFormData({ ...formData, message: value })}
                      textarea
                    />

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full relative overflow-hidden"
                        disabled={isSubmitting || isSubmitted}
                      >
                        {isSubmitted ? (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle2 className="w-5 h-5" />
                            Message Sent!
                          </motion.span>
                        ) : isSubmitting ? (
                          <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                          >
                            Sending...
                          </motion.span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Send className="w-5 h-5" />
                            Send Message
                          </span>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
