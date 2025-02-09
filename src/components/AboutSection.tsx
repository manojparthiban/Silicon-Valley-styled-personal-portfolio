import React from "react";
import { motion } from "framer-motion";

interface AboutSectionProps {
  bio?: string;
  experience?: string;
  education?: string;
  interests?: string;
}

const AboutSection = ({
  bio = "Computer Science engineer passionate about software development, IoT, AI, and Machine Learning. Recent graduate from Amrita School of Engineering, certified in SAP ABAP Back-End Development. Skilled in Python, SQL, and hands-on projects, including an IoT-based hydroponic system and computer vision algorithms for autonomous vehicles. Committed to advancing technology while ensuring safety and efficiency, I’m excited to explore new horizons in the tech world!",
  experience = "Interned at Bosch Global Software Technologies from February to July 2024 in Bangalore, India, I developed a Python-based application to efficiently transmit radio diagnostic data from EFR32 radio hardware to the Cloud. I also analyzed the Wirepas Radio Application Stack to model and implement a mesh networking protocol focused on Sub-GHz RF transceivers, gaining valuable hands-on coding experience, system integration skills, and exposure to agile methodologies.",
  education = "Bachelor's in Computer and Communication Engineering",
  university = "@ Amrita Vishwa Vidyapeetham, Coimbatore.",
  interests = "Definetly not a Coder xD, just love to drive around the town.",
}: AboutSectionProps) => {
  return (
    <section className="min-h-screen bg-muted/50 py-16 sm:py-20 px-4 relative overflow-hidden">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            About Me
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto px-4">
            Get to know more about my background and what drives me
          </p>
        </motion.div>

        <div className="space-y-10 sm:space-y-14 px-2 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-1xl mx-auto text-primary"
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-primary">
              Who I Am
            </h3>
            <p className="text-base sm:text-base leading-relaxed text-muted-foreground">
              {bio}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 sm:gap-12 items-start max-w-4xl mx-auto"
          >
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-primary">
                Experience
              </h3>
              <p className="text-base sm:text-base text-muted-foreground leading-relaxed">
                {experience}
              </p>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-primary">
                Education
              </h3>
              <p className="text-base sm:text-base text-muted-foreground leading-relaxed">
                {education}
              </p>
              <p className="text-base sm:text-base text-muted-foreground leading-relaxed">
                {university}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-primary"
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-primary">
              Interests & Hobbies
            </h3>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              {interests}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
