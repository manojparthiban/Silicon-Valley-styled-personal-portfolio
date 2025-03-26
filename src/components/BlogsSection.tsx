import React from "react";
import { motion } from "framer-motion";
import BlogCard from "./BlogCard";

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

const BlogsSection = React.memo(({ blogs = defaultBlogs }: BlogsSectionProps) => {
  return (
    <section className="min-h-screen bg-muted/50 py-12 sm:py-16 md:py-20 lg:py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground dark:text-white">
            My Blog Posts
          </h2>
          <p className="text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto px-2 sm:px-4">
            Explore my thoughts and insights on technology, development, and professional growth
            through my articles on Medium and LinkedIn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="w-full transition-opacity duration-150 hover:opacity-90"
            >
              <BlogCard
                title={blog.title}
                description={blog.description}
                imageUrl={blog.imageUrl}
                publishDate={blog.publishDate}
                readTime={blog.readTime}
                platform={blog.platform}
                url={blog.url}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

BlogsSection.displayName = "BlogsSection";

export default BlogsSection;