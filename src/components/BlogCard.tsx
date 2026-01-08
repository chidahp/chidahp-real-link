import { Calendar, User } from "lucide-solid";

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image?: string;
  category?: string;
  readTime?: string;
}

interface BlogCardProps {
  blog: BlogPost;
  onClick?: () => void;
}

export default function BlogCard(props: BlogCardProps) {
  return (
    <article
      class="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer w-full"
      onClick={props.onClick}
    >
      {/* Blog Image */}
      <div class="relative h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
        {props.blog.image ? (
          <img
            src={props.blog.image}
            alt={props.blog.title}
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div class="w-full h-full flex items-center justify-center">
            <span class="text-gray-400 dark:text-gray-600 text-4xl">📚</span>
          </div>
        )}
        {props.blog.category && (
          <div class="absolute top-3 left-3 sm:top-4 sm:left-4">
            <span class="px-2 py-1 sm:px-3 sm:py-1 bg-yellow-500 text-black text-xs sm:text-sm font-semibold rounded-full">
              {props.blog.category}
            </span>
          </div>
        )}
      </div>

      {/* Blog Content */}
      <div class="p-4 sm:p-6">
        <h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-yellow-500 transition-colors duration-300">
          {props.blog.title}
        </h3>
        <p class="text-gray-600 dark:text-gray-300 text-sm mb-3 sm:mb-4 line-clamp-3">
          {props.blog.excerpt}
        </p>

        {/* Blog Meta */}
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 text-xs text-gray-500 dark:text-gray-400">
          <div class="flex flex-wrap items-center gap-3 sm:gap-4">
            <div class="flex items-center gap-1">
              <User class="w-3 h-3 sm:w-4 sm:h-4" />
              <span class="truncate">{props.blog.author}</span>
            </div>
            <div class="flex items-center gap-1">
              <Calendar class="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{props.blog.date}</span>
            </div>
          </div>
          {props.blog.readTime && (
            <span class="text-gray-400 dark:text-gray-500">{props.blog.readTime}</span>
          )}
        </div>
      </div>
    </article>
  );
}

