import React from "react";
import { ArrowUpRight, Github } from "lucide-react";
import TiltCard from "@/components/common/TiltCard";

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  category: string;
  liveUrl?: string;
  liveLabel?: string;
  githubUrl?: string;
}

const hostOf = (url?: string) => {
  try {
    return url ? new URL(url).host.replace(/^www\./, "") : "localhost";
  } catch {
    return "localhost";
  }
};

const hasLink = (url?: string) => !!url && url !== "#";

/**
 * Compact project card. The screenshot sits in a browser frame that lifts toward
 * the viewer on hover (translateZ inside the tilt) and drifts against the cursor;
 * the links slide up over the screenshot instead of taking a row of their own.
 */
const ProjectCard = React.memo(({ project }: { project: Project }) => {
  const { id, title, description, imageUrl, technologies, category, liveUrl, liveLabel, githubUrl } = project;
  const showSource = hasLink(githubUrl) && githubUrl !== liveUrl;

  return (
    <TiltCard className="bento-card proj" max={7}>
      <span className="proj__index" aria-hidden="true">
        {String(id).padStart(2, "0")}
      </span>

      <div className="proj__frame">
        <div className="proj__chrome" aria-hidden="true">
          <span className="proj__dots">
            <i />
            <i />
            <i />
          </span>
          <span className="proj__url">{hostOf(hasLink(liveUrl) ? liveUrl : githubUrl)}</span>
        </div>
        <div className="proj__shot">
          <img src={imageUrl} alt={`${title} preview`} width={800} height={450} loading="lazy" decoding="async" />
          <div className="proj__actions">
            {hasLink(liveUrl) && (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="proj__link proj__link--primary">
                {liveLabel ?? "Live site"}
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
            {showSource && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="proj__link">
                <Github className="w-4 h-4" />
                Source
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="proj__body">
        <p className="proj__meta">
          <span className="proj__cat">{category}</span>
        </p>
        <h3 className="proj__title">{title}</h3>
        <p className="proj__desc">{description}</p>
        <ul className="proj__tags" aria-label="Technologies">
          {technologies.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </TiltCard>
  );
});

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
