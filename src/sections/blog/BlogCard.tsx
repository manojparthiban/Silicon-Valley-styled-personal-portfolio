import React from "react";
import { ArrowUpRight, Clock } from "lucide-react";
import TiltCard from "@/components/common/TiltCard";

export interface Post {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  publishDate: string;
  readTime?: string;
  platform: "medium" | "linkedin";
  url: string;
  draft?: boolean;
}

const platformName = { medium: "Medium", linkedin: "LinkedIn" };

/**
 * Article card sitting on a small stack of pages. On hover the pages fan out
 * behind it in 3D while the card itself tilts toward the cursor.
 */
const BlogCard = React.memo(({ post }: { post: Post }) => {
  const { title, description, imageUrl, publishDate, readTime, platform, url, draft } = post;

  return (
    <div className={`post-wrap ${draft ? "post-wrap--draft" : ""}`}>
      <span className="post__sheet post__sheet--2" aria-hidden="true" />
      <span className="post__sheet post__sheet--1" aria-hidden="true" />

      <TiltCard className="bento-card post" href={url} max={7} aria-label={`${title}, on ${platformName[platform]}`}>
        {draft ? (
          <div className="post__draft" aria-hidden="true">
            <p>
              <span className="text-primary">$</span> vim next-post.md
            </p>
            <p className="post__draft-line"># Untitled</p>
            <p className="post__draft-line post__draft-line--muted">
              drafting<span className="hero-caret hero-caret--code" />
            </p>
          </div>
        ) : (
          <div className="post__cover">
            <img src={imageUrl} alt="" width={800} height={450} loading="lazy" decoding="async" />
          </div>
        )}

        <div className="post__body">
          <p className="post__meta">
            <span className={`post__platform post__platform--${platform}`}>{platformName[platform]}</span>
            <span>{publishDate}</span>
            {readTime && (
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3" aria-hidden="true" />
                {readTime}
              </span>
            )}
          </p>
          <h3 className="post__title">{title}</h3>
          <p className="post__desc">{description}</p>
          <span className="post__cta">
            {draft ? "Follow" : "Read"} on {platformName[platform]}
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </TiltCard>
    </div>
  );
});

BlogCard.displayName = "BlogCard";

export default BlogCard;
