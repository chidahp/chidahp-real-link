import { createSignal, For, Show } from "solid-js";
import { ChevronLeft, ChevronRight } from "lucide-solid";
import BookCard, { Book } from "./BookCard";

interface BookSectionProps {
  books: Book[];
  title?: string;
  subtitle?: string;
  onBookClick?: (book: Book) => void;
  background?: string; // CSS background value (e.g., "linear-gradient(...)", "#000000", "url(...)")
  backgroundColor?: string; // Tailwind background color class (e.g., "bg-blue-500", "bg-gray-900")
  isDarkBackground?: boolean; // If true, text will be light. If false, text will be dark. Auto-detected if not provided.
}

// Helper function to detect if background is dark (reused from BlogSection)
function isDarkBackgroundColor(background?: string, backgroundColor?: string): boolean {
  if (backgroundColor) {
    const darkClasses = ['black', 'gray-900', 'gray-800', 'gray-700', 'slate-900', 'slate-800', 'zinc-900', 'zinc-800'];
    const lightClasses = ['white', 'gray-50', 'gray-100', 'gray-200', 'slate-50', 'slate-100'];
    
    if (lightClasses.some(light => backgroundColor.includes(light))) return false;
    if (darkClasses.some(dark => backgroundColor.includes(dark))) return true;
  }
  
  if (background) {
    const bgLower = background.toLowerCase().trim();
    
    const lightColorPatterns = [
      /^white$/,
      /^#fff$/,
      /^#ffffff$/,
      /^rgb\(255,\s*255,\s*255\)$/,
      /^rgba\(255,\s*255,\s*255/,
      /white/i,
      /#fff/i,
      /#ffffff/i,
      /rgb\(25[0-5],\s*25[0-5],\s*25[0-5]\)/,
      /rgba\(25[0-5],\s*25[0-5],\s*25[0-5]/,
    ];
    
    if (lightColorPatterns.some(pattern => pattern.test(bgLower))) {
      return false;
    }
    
    const darkColorPatterns = [
      /^black$/,
      /^#000$/,
      /^#000000$/,
      /^rgb\(0,\s*0,\s*0\)$/,
      /^rgba\(0,\s*0,\s*0/,
      /black/i,
      /#000/i,
      /#000000/i,
      /rgb\([0-3][0-9]{0,1},\s*[0-3][0-9]{0,1},\s*[0-3][0-9]{0,1}\)/,
      /rgba\([0-3][0-9]{0,1},\s*[0-3][0-9]{0,1},\s*[0-3][0-9]{0,1}/,
      /#1[0-3a-fA-F][0-9a-fA-F]{4}/,
      /#2[0-5a-fA-F][0-9a-fA-F]{4}/,
    ];
    
    if (darkColorPatterns.some(pattern => pattern.test(bgLower))) {
      return true;
    }
    
    if (bgLower.includes('gradient')) {
      if (bgLower.includes('#000') || bgLower.includes('black') || bgLower.includes('#1') || bgLower.includes('#2')) {
        return true;
      }
      if (bgLower.includes('#fff') || bgLower.includes('white')) {
        return false;
      }
    }
  }
  
  return false;
}

export default function BookSection(props: BookSectionProps) {
  const [currentIndex, setCurrentIndex] = createSignal(1); // Start at 1 because 0 is duplicate of last
  const [isTransitioning, setIsTransitioning] = createSignal(true);
  let carouselRef: HTMLDivElement | undefined;
  
  // Items per view - responsive: 2 on mobile, 3 on sm, 4 on md, 5 on lg+
  // We'll use 5 as base for calculation, but CSS will handle responsive display
  const itemsPerView = 5;
  
  // Calculate total pages
  const totalPages = Math.ceil(props.books.length / itemsPerView);
  
  // Create pages array with duplicates for infinite loop
  // Structure: [lastPage, ...allPages, firstPage]
  const createPages = () => {
    const pages: Book[][] = [];
    
    // Add all original pages
    for (let i = 0; i < totalPages; i++) {
      const startIndex = i * itemsPerView;
      const endIndex = Math.min(startIndex + itemsPerView, props.books.length);
      pages.push(props.books.slice(startIndex, endIndex));
    }
    
    // Add duplicate of last page at the beginning
    if (totalPages > 0) {
      const lastPage = pages[pages.length - 1];
      pages.unshift([...lastPage]);
    }
    
    // Add duplicate of first page at the end
    if (totalPages > 0) {
      const firstPage = pages[1]; // Index 1 because we added duplicate at 0
      pages.push([...firstPage]);
    }
    
    return pages;
  };
  
  const pages = createPages();
  const maxIndex = pages.length - 1;
  
  const jumpToIndex = (index: number, withoutTransition = false) => {
    if (withoutTransition) {
      setIsTransitioning(false);
      setCurrentIndex(index);
      // Force reflow
      if (carouselRef) {
        carouselRef.offsetHeight;
      }
      // Re-enable transition after a brief moment
      setTimeout(() => setIsTransitioning(true), 50);
    } else {
      setCurrentIndex(index);
    }
  };
  
  const nextSlide = () => {
    const current = currentIndex();
    const next = current + 1;
    
    if (next >= maxIndex) {
      // We're at the duplicate of first page (last item), jump to real first page (index 1) without transition
      jumpToIndex(1, true);
    } else {
      setCurrentIndex(next);
    }
  };
  
  const prevSlide = () => {
    const current = currentIndex();
    const prev = current - 1;
    
    if (prev <= 0) {
      // We're at the duplicate of last page (first item), jump to real last page without transition
      jumpToIndex(totalPages, true);
    } else {
      setCurrentIndex(prev);
    }
  };
  
  // Determine if background is dark
  const isDark = props.isDarkBackground ?? isDarkBackgroundColor(props.background, props.backgroundColor);
  
  // Text color classes based on background
  const titleClass = isDark 
    ? "text-white" 
    : "text-gray-900 dark:text-white";
  const subtitleClass = isDark 
    ? "text-gray-200" 
    : "text-gray-600 dark:text-gray-400";
  const emptyStateClass = isDark 
    ? "text-gray-300" 
    : "text-gray-500 dark:text-gray-400";
  
  const buttonClass = isDark
    ? "bg-white/20 hover:bg-white/30 text-white"
    : "bg-gray-200 hover:bg-gray-300 text-gray-700";

  return (
    <section 
      class={`w-full py-12 sm:py-16 ${props.backgroundColor || "bg-gray-50 dark:bg-gray-900"}`}
      style={props.background ? `background: ${props.background}` : undefined}
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header with Navigation */}
        {(props.title || props.subtitle) && (
          <div class="flex items-center justify-between mb-8 sm:mb-12 px-2 sm:px-0">
            <div class="flex-1 text-center sm:text-left">
              {props.title && (
                <h2 class={`text-2xl sm:text-3xl md:text-4xl font-bold ${titleClass} mb-3 sm:mb-4`}>
                  {props.title}
                </h2>
              )}
              {props.subtitle && (
                <p class={`text-base sm:text-lg ${subtitleClass} max-w-2xl ${props.title ? '' : 'mx-auto'}`}>
                  {props.subtitle}
                </p>
              )}
            </div>
            
            {/* Navigation Buttons */}
            <Show when={props.books.length > itemsPerView && totalPages > 1}>
              <div class="flex items-center gap-2 ml-4">
                <button
                  onClick={prevSlide}
                  class={`${buttonClass} p-2 sm:p-2.5 rounded-full transition-all duration-300 shrink-0`}
                  aria-label="Previous books"
                >
                  <ChevronLeft class="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  class={`${buttonClass} p-2 sm:p-2.5 rounded-full transition-all duration-300 shrink-0`}
                  aria-label="Next books"
                >
                  <ChevronRight class="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </Show>
          </div>
        )}

        {/* Book Carousel */}
        <div class="relative overflow-hidden">
          <div 
            ref={carouselRef}
            class={`flex ${isTransitioning() ? 'transition-transform duration-500 ease-in-out' : ''}`}
            style={`transform: translateX(-${currentIndex() * 100}%)`}
          >
            {/* Create pages/slides with duplicates for infinite loop */}
            <For each={pages}>
              {(pageBooks) => (
                <div 
                  class="min-w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8 px-1"
                >
                  <For each={pageBooks}>
                    {(book) => (
                      <BookCard
                        book={book}
                        onClick={() => props.onBookClick?.(book)}
                      />
                    )}
                  </For>
                </div>
              )}
            </For>
          </div>
        </div>

        {/* Empty State */}
        {props.books.length === 0 && (
          <div class="text-center py-12">
            <p class={`${emptyStateClass} text-lg`}>
              ยังไม่มีหนังสือในขณะนี้
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

