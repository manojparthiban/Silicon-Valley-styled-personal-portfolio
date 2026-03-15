import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  Send,
  MessageSquare,
  User,
  ExternalLink,
} from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

interface ContactSectionProps {
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

/* ── animation variants ── */
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const ContactSection = ({
  socialLinks = {
    github: "https://github.com/manojparthiban",
    linkedin: "https://www.linkedin.com/in/manoj-parthi31",
    twitter: "https://twitter.com/ImMj31",
    email: "mailto:manojparthiban2002@gmail.com",
  },
}: ContactSectionProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/movqownb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Message sent successfully! ✅");
        form.reset();
      } else {
        alert("Failed to send message. Please try again. ❌");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <section className="contact-section relative py-12 sm:py-16 md:py-20 px-4 overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* ── Section Header ─────────────── */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="about-section-badge">
            <Mail className="w-3.5 h-3.5" />
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mt-5 mb-4">
            Get In <span className="hero-name-gradient">Touch</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out
            using the form below or through social media.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
          {/* ── Left form ────────────────── */}
          <motion.div variants={itemVariants} className="md:col-span-3">
            <div className="contact-glass-card">
              <div className="mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">Send a Message</h3>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                      <User className="w-4 h-4 text-primary/70" /> Name
                    </label>
                    <input
                      {...register("name")}
                      placeholder="John Doe"
                      className="contact-input"
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary/70" /> Email
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="john@example.com"
                      className="contact-input"
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary/70" /> Message
                  </label>
                  <textarea
                    {...register("message")}
                    placeholder="Hello there..."
                    className="contact-textarea"
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="contact-submit-btn w-full flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
                </button>
              </form>
            </div>
          </motion.div>

          {/* ── Right Socials ──────────────── */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <div className="contact-glass-card h-full flex flex-col">
              <div className="mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <span className="text-xl">🌐</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">Connect</h3>
              </div>

              <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>

              <div className="space-y-4 mt-auto">
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-btn group"
                >
                  <div className="contact-social-icon">
                    <Github className="w-5 h-5 text-foreground transition-transform group-hover:scale-110" />
                  </div>
                  <span className="font-medium text-foreground/90">GitHub Profile</span>
                  <ExternalLink className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </a>

                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-btn group"
                >
                  <div className="contact-social-icon">
                    <Linkedin className="w-5 h-5 text-blue-500 transition-transform group-hover:scale-110" />
                  </div>
                  <span className="font-medium text-foreground/90">LinkedIn Network</span>
                  <ExternalLink className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </a>

                <a
                  href={socialLinks.email}
                  className="contact-social-btn group"
                >
                  <div className="contact-social-icon">
                    <Mail className="w-5 h-5 text-red-500 transition-transform group-hover:scale-110" />
                  </div>
                  <span className="font-medium text-foreground/90">Direct Email</span>
                  <Send className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

ContactSection.displayName = "ContactSection";

export default ContactSection;
