import React from "react";
import { ExternalLink, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface BlogCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  publishDate: string;
  readTime?: string;
  platform: "medium" | "linkedin";
  url: string;
  isFirstCard?: boolean;
}

const BlogCard = React.memo(({
  title,
  description,
  imageUrl,
  publishDate,
  readTime,
  platform,
  url,
  isFirstCard = false
}: BlogCardProps) => {
  return (
    <motion.div
      className="project-card group hover:-translate-y-1 h-[450px] flex flex-col transition-transform duration-200"
    >
      {/* Header Image */}
      {imageUrl ? (
        <div className="project-card__img-wrap h-48">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center h-48 bg-primary/5">
          <span className="text-xl font-semibold text-muted-foreground">Coming Soon</span>
        </div>
      )}

      {/* Content */}
      <div className="project-card__body flex-grow flex flex-col">
        {/* Meta Info */}
        <div className="flex items-center justify-between mb-3 text-xs font-semibold text-primary/70 uppercase tracking-wider">
          <span>{publishDate}</span>
          {readTime && (
            <div className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1" />
              {readTime}
            </div>
          )}
        </div>

        {/* Title & Desc */}
        <h3 className="text-xl font-bold text-foreground leading-snug line-clamp-2 mb-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Action Link at Bottom */}
        <div className="mt-auto pt-4 flex items-center gap-3">
          <button
            onClick={() => window.open(url, "_blank")}
            className="project-card__action text-sm"
          >
            Read on {platform === "medium" ? "Medium" : "LinkedIn"}
            <ExternalLink className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
});

BlogCard.displayName = "BlogCard";

export default BlogCard;