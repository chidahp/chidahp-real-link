import { BookOpen, User } from "lucide-solid";

export interface Book {
  id: number;
  title: string;
  author: string;
  coverImage?: string;
  price?: number;
  originalPrice?: number;
  category?: string;
  description?: string;
  rating?: number;
}

interface BookCardProps {
  book: Book;
  onClick?: () => void;
}

export default function BookCard(props: BookCardProps) {
  const formatPrice = (price?: number) => {
    if (!price) return null;
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <article
      class="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer w-full"
      onClick={props.onClick}
    >
      {/* Book Cover */}
      <div class="relative aspect-[2/3] overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
        {props.book.coverImage ? (
          <img
            src={props.book.coverImage}
            alt={props.book.title}
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div class="w-full h-full flex items-center justify-center">
            <BookOpen class="w-16 h-16 sm:w-20 sm:h-20 text-gray-400 dark:text-gray-600" />
          </div>
        )}
        {props.book.category && (
          <div class="absolute top-2 left-2 sm:top-3 sm:left-3">
            <span class="px-2 py-1 sm:px-3 sm:py-1 bg-yellow-500 text-black text-xs sm:text-sm font-semibold rounded-full">
              {props.book.category}
            </span>
          </div>
        )}
        {props.book.originalPrice && props.book.price && props.book.price < props.book.originalPrice && (
          <div class="absolute top-2 right-2 sm:top-3 sm:right-3">
            <span class="px-2 py-1 bg-red-500 text-white text-xs sm:text-sm font-bold rounded">
              ลด {Math.round(((props.book.originalPrice - props.book.price) / props.book.originalPrice) * 100)}%
            </span>
          </div>
        )}
      </div>

      {/* Book Content */}
      <div class="p-4 sm:p-5">
        <h3 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-yellow-500 transition-colors duration-300 min-h-[3rem]">
          {props.book.title}
        </h3>
        
        <div class="flex items-center gap-1.5 mb-2 text-sm text-gray-600 dark:text-gray-400">
          <User class="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <span class="truncate">{props.book.author}</span>
        </div>

        {props.book.description && (
          <p class="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-3 line-clamp-2">
            {props.book.description}
          </p>
        )}

        {/* Rating */}
        {props.book.rating && (
          <div class="flex items-center gap-1 mb-3">
            <span class="text-yellow-500 text-sm">★</span>
            <span class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {props.book.rating.toFixed(1)}
            </span>
          </div>
        )}

        {/* Price */}
        <div class="flex items-center gap-2">
          {props.book.price && (
            <span class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              {formatPrice(props.book.price)}
            </span>
          )}
          {props.book.originalPrice && props.book.price && props.book.originalPrice > props.book.price && (
            <span class="text-sm text-gray-400 dark:text-gray-500 line-through">
              {formatPrice(props.book.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

