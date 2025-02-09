import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";

interface AboutSectionProps {
  bio?: string;
  experience?: string;
  education?: string;
  interests?: string;
}

const AboutSection = ({
  bio = "I'm a passionate Full Stack Developer with over 5 years of experience in building web applications. I specialize in creating efficient, scalable, and user-friendly solutions using modern technologies.",
  experience = "Led development teams in creating innovative web applications, focusing on clean code and optimal user experience. Collaborated with cross-functional teams to deliver high-impact projects.",
  education = "Bachelor's in Computer Science | Master's in Software Engineering",
  interests = "When not coding, I enjoy exploring new technologies, contributing to open-source projects, and sharing knowledge through tech blogs and community meetups.",
}: AboutSectionProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="min-h-screen bg-muted/50 py-20 px-4 relative overflow-hidden">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get to know more about my background and what drives me
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="group h-full bg-background/20 backdrop-blur-lg border border-primary/10 hover:bg-background/30 transition-all duration-300">
              <CardContent className="p-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-primary transition-colors">
                    Who I Am
                  </h3>
                  <p className="text-muted-foreground mb-6 group-hover:text-foreground transition-colors">
                    {bio}
                  </p>
                  <h4 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    Interests
                  </h4>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {interests}
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="group h-full bg-background/20 backdrop-blur-lg border border-primary/10 hover:bg-background/30 transition-all duration-300">
              <CardContent className="p-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-primary transition-colors">
                    Experience & Education
                  </h3>
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      Professional Experience
                    </h4>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {experience}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      Education
                    </h4>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {education}
                    </p>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
