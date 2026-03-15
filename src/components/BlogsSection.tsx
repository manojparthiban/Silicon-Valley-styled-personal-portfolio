import React from "react";
import { motion } from "framer-motion";
import BlogCard from "./BlogCard";
import { BookOpen } from "lucide-react";

interface Blog {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  publishDate: string;
  readTime?: string;
  platform: "medium" | "linkedin";
  url: string;
}

interface BlogsSectionProps {
  blogs?: Blog[];
}

const defaultBlogs: Blog[] = [
  {
    id: 1,
    title: "SAP BTP Strategy: ABAP Developer Transition",
    description: "A comprehensive guide for ABAP developers looking to transition into SAP BTP, covering key concepts, tools, and learning paths.",
    imageUrl: "/image.png",
    publishDate: "Mar 20, 2025",
    readTime: "3 min read",
    platform: "medium",
    url: "https://medium.com/@manojparthiban/sap-btp-strategy-abap-developer-transition-0b84c2e7f489",
  },
  {
    id: 2,
    title: "ABAP Interview Preparation Guide",
    description: "A comprehensive guide covering essential ABAP concepts, common interview questions, and tips for success in ABAP developer interviews.",
    imageUrl: "/ABAP.jpg",
    publishDate: "Mar 23, 2025",
    readTime: "5 min read",
    platform: "linkedin",
    url: "https://www.linkedin.com/posts/manoj-parthi31_abap-interview-prep-activity-7309472601280585728-cuPx",
  },
  {
    id: 3,
    title: "Next Story",
    description: "Stay tuned for more exciting blog posts!",
    publishDate: "Coming Soon",
    platform: "medium",
    url: "#",
  },
];

/* ── animation variants ───────────────── */
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const BlogsSection = React.memo(({ blogs = defaultBlogs }: BlogsSectionProps) => {
  return (
    <section className="blogs-section relative py-12 sm:py-16 md:py-20 px-4 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
      >
        {/* ── Section Header ─────────────── */}
        <motion.div variants={itemVariants} className="text-center mb-14">
          <span className="about-section-badge">
            <BookOpen className="w-3.5 h-3.5" />
            Insights
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mt-5 mb-4">
            My <span className="hero-name-gradient">Blog Posts</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Thoughts and insights on technology, development, and professional growth
          </p>
        </motion.div>

        {/* ── Blog Cards Grid ─────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 justify-items-center">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              variants={itemVariants}
              className="w-full"
            >
              <BlogCard
                title={blog.title}
                description={blog.description}
                imageUrl={blog.imageUrl}
                publishDate={blog.publishDate}
                readTime={blog.readTime}
                platform={blog.platform}
                url={blog.url}
                isFirstCard={index === 0}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
});

BlogsSection.displayName = "BlogsSection";

export default BlogsSection;