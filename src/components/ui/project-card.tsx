import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  tags?: string[];
  imageUrl?: string;
  link?: string;
  className?: string;
}

export function ProjectCard({
  title,
  description,
  tags = [],
  imageUrl,
  link,
  className
}: ProjectCardProps) {
  const cardContent = (
    <>
      {imageUrl && (
        <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-300 mb-4">{description}</p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </>
  );

  return (
    <div className={cn(
      "bg-white dark:bg-slate-800 rounded-lg shadow p-6 flex flex-col h-full transition-transform hover:translate-y-[-4px]",
      className
    )}>
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