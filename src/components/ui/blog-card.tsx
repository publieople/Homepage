import { cn } from "@/lib/utils";

interface BlogCardProps {
  title: string;
  excerpt: string;
  publishDate: string;
  imageUrl?: string;
  author?: {
    name: string;
    avatarUrl?: string;
  };
  tags?: string[];
  url: string;
  className?: string;
}

export function BlogCard({
  title,
  excerpt,
  publishDate,
  imageUrl,
  author,
  tags = [],
  url,
  className,
}: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div
      className={cn(
        "bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden flex flex-col",
        className
      )}
    >
      {imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 hover:text-blue-600 dark:hover:text-blue-400">
          <a href={url} className="no-underline text-inherit">
            {title}
          </a>
        </h3>

        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
          {formatDate(publishDate)}
          {author && (
            <>
              {" "}
              ·{" "}
              <span className="inline-flex items-center">
                {author.avatarUrl && (
                  <img
                    src={author.avatarUrl}
                    alt={author.name}
                    className="w-4 h-4 rounded-full mr-1"
                  />
                )}
                {author.name}
              </span>
            </>
          )}
        </p>

        <p className="text-slate-600 dark:text-slate-300 mb-4 flex-grow">
          {excerpt}
        </p>

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
      </div>
    </div>
  );
}
