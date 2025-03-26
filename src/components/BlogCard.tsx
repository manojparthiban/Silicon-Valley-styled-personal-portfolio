import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink, Clock } from "lucide-react";

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
    <Card className="w-full h-[500px] flex flex-col bg-gradient-to-br from-card/50 to-card/30 dark:from-card/30 dark:to-card/10 backdrop-blur-lg border border-primary/20 dark:border-primary/10 shadow-md hover:shadow-lg shadow-black/5 hover:shadow-black/10 dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300">
      {isFirstCard && platform === "medium" ? (
        <div className="relative h-[400px] overflow-hidden rounded-t-lg border-b border-primary/10">
          <iframe
            src={url}
            title={title}
            className="w-full h-full"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      ) : imageUrl ? (
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center h-48 bg-primary/5 rounded-t-lg">
          <span className="text-xl font-semibold text-muted-foreground">Coming Soon</span>
        </div>
      )}
      <CardHeader className="space-y-4 pb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{publishDate}</span>
          {readTime && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" />
              {readTime}
            </div>
          )}
        </div>
        <h3 className="text-xl font-semibold leading-normal tracking-tight text-foreground">{title}</h3>
      </CardHeader>
      <CardContent className="flex-grow pt-4">
        <p className="text-muted-foreground line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter>
        <Button
          variant="ghost"
          className="w-full justify-center gap-2 hover:bg-primary/10 text-primary hover:text-primary/80 transition-colors"
          onClick={() => window.open(url, "_blank")}
        >
          Read on {platform === "medium" ? "Medium" : "LinkedIn"}
          <ExternalLink className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
});

BlogCard.displayName = "BlogCard";

export default BlogCard;