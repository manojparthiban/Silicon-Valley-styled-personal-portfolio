import React from "react";
import { m } from "framer-motion";
import BlogCard, { Post } from "@/sections/blog/BlogCard";
import { SectionHeader, reveal } from "@/components/common/SectionBits";

const posts: Post[] = [
  {
    id: 1,
    title: "SAP BTP Strategy: ABAP Developer Transition",
    description:
      "A comprehensive guide for ABAP developers looking to transition into SAP BTP, covering key concepts, tools, and learning paths.",
    imageUrl: "/images/blog/sap-btp-strategy.webp",
    publishDate: "Mar 20, 2025",
    readTime: "3 min read",
    platform: "medium",
    url: "https://medium.com/@manojparthiban/sap-btp-strategy-abap-developer-transition-0b84c2e7f489",
  },
  {
    id: 2,
    title: "ABAP Interview Preparation Guide",
    description:
      "A comprehensive guide covering essential ABAP concepts, common interview questions, and tips for success in ABAP developer interviews.",
    imageUrl: "/images/blog/abap-interview-guide.webp",
    publishDate: "Mar 23, 2025",
    readTime: "5 min read",
    platform: "linkedin",
    url: "https://www.linkedin.com/posts/manoj-parthi31_abap-interview-prep-activity-7309472601280585728-cuPx",
  },
  {
    id: 3,
    title: "Next story",
    description: "Something new is in the drafts. Follow along on Medium to catch it first.",
    publishDate: "In progress",
    platform: "medium",
    url: "https://medium.com/@manojparthiban",
    draft: true,
  },
];

const BlogSection = React.memo(() => (
  <section className="blogs relative isolate overflow-hidden px-5 sm:px-8 lg:px-12 pt-14 md:pt-20 pb-2 md:pb-4">
    <div className="sec-backdrop" aria-hidden="true" />

    <div className="relative z-10 max-w-7xl mx-auto">
      <SectionHeader
        index="05"
        name="blog"
        title={
          <>
            Writing<span className="text-primary">.</span>
          </>
        }
        sub="Notes on SAP, ABAP and growing as a developer, published on Medium and LinkedIn."
      />

      <ul className="post-grid">
        {posts.map((post) => (
          <m.li key={post.id} {...reveal}>
            <BlogCard post={post} />
          </m.li>
        ))}
      </ul>
    </div>
  </section>
));

BlogSection.displayName = "BlogSection";

export default BlogSection;
