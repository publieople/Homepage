import { cn } from "@/lib/utils";
import { Project } from "@/components/sections/projects";

interface ProjectCardProps {
  project: Project;
  className?: string;
  isMobile?: boolean;
}

export function ProjectCard({
  project,
  className,
  isMobile = false,
}: ProjectCardProps) {
  const { title, description, tags = [], imageUrl, link } = project;

  const cardContent = (
    <>
      {imageUrl && (
        <div
          className={`relative ${
            isMobile ? "h-36" : "h-40 sm:h-48"
          } mb-3 sm:mb-4 overflow-hidden rounded-lg`}
        >
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <h3
        className={`${
          isMobile ? "text-lg" : "text-lg sm:text-xl"
        } font-bold mb-1 sm:mb-2`}
      >
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-foreground/70 dark:text-foreground/80 mb-3 sm:mb-4">
        {description}
      </p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 sm:gap-2 mt-auto">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-muted dark:bg-accent text-muted-foreground dark:text-accent-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </>
  );

  return (
    <div
      className={cn(
        "bg-card text-card-foreground rounded-lg shadow p-3 sm:p-6 flex flex-col h-full transition-transform hover:translate-y-[-4px]",
        className
      )}
    >
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col h-full no-underline text-inherit"
        >
          {cardContent}
        </a>
      ) : (
        cardContent
      )}
    </div>
  );
}
