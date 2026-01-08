import { For } from "solid-js";
import BlogCard, { BlogPost } from "./BlogCard";

interface BlogSectionProps {
  blogs: BlogPost[];
  title?: string;
  subtitle?: string;
  columns?: 1 | 2 | 3 | 4;
  onBlogClick?: (blog: BlogPost) => void;
  background?: string; // CSS background value (e.g., "linear-gradient(...)", "#000000", "url(...)")
  backgroundColor?: string; // Tailwind background color class (e.g., "bg-blue-500", "bg-gray-900")
  isDarkBackground?: boolean; // If true, text will be light. If false, text will be dark. Auto-detected if not provided.
}

// Helper function to detect if background is dark
function isDarkBackgroundColor(background?: string, backgroundColor?: string): boolean {
  if (backgroundColor) {
    // Check common dark Tailwind classes
    const darkClasses = ['black', 'gray-900', 'gray-800', 'gray-700', 'slate-900', 'slate-800', 'zinc-900', 'zinc-800'];
    const lightClasses = ['white', 'gray-50', 'gray-100', 'gray-200', 'slate-50', 'slate-100'];
    
    if (lightClasses.some(light => backgroundColor.includes(light))) return false;
    if (darkClasses.some(dark => backgroundColor.includes(dark))) return true;
  }
  
  if (background) {
    const bgLower = background.toLowerCase().trim();
    
    // Check for light colors first (white, light colors)
    const lightColorPatterns = [
      /^white$/,
      /^#fff$/,
      /^#ffffff$/,
      /^rgb\(255,\s*255,\s*255\)$/,
      /^rgba\(255,\s*255,\s*255/,
      /white/i,
      /#fff/i,
      /#ffffff/i,
      /rgb\(25[0-5],\s*25[0-5],\s*25[0-5]\)/, // High RGB values (light)
      /rgba\(25[0-5],\s*25[0-5],\s*25[0-5]/,
    ];
    
    if (lightColorPatterns.some(pattern => pattern.test(bgLower))) {
      return false;
    }
    
    // Check for dark colors
    const darkColorPatterns = [
      /^black$/,
      /^#000$/,
      /^#000000$/,
      /^rgb\(0,\s*0,\s*0\)$/,
      /^rgba\(0,\s*0,\s*0/,
      /black/i,
      /#000/i,
      /#000000/i,
      /rgb\([0-3][0-9]{0,1},\s*[0-3][0-9]{0,1},\s*[0-3][0-9]{0,1}\)/, // Low RGB values (dark)
      /rgba\([0-3][0-9]{0,1},\s*[0-3][0-9]{0,1},\s*[0-3][0-9]{0,1}/,
      /#1[0-3a-fA-F][0-9a-fA-F]{4}/, // #10xxxx - #13xxxx (dark)
      /#2[0-5a-fA-F][0-9a-fA-F]{4}/, // #20xxxx - #25xxxx (dark)
    ];
    
    if (darkColorPatterns.some(pattern => pattern.test(bgLower))) {
      return true;
    }
    
    // Check gradients
    if (bgLower.includes('gradient')) {
      // If gradient contains dark colors, assume dark
      if (bgLower.includes('#000') || bgLower.includes('black') || bgLower.includes('#1') || bgLower.includes('#2')) {
        return true;
      }
      // If gradient contains light colors, assume light
      if (bgLower.includes('#fff') || bgLower.includes('white')) {
        return false;
      }
    }
  }
  
  return false; // Default to light background
}

export default function BlogSection(props: BlogSectionProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  const columns = props.columns ?? 3;
  const gridClass = gridCols[columns];
  
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

  return (
    <section 
      class={`w-full py-12 sm:py-16 ${props.backgroundColor || "bg-gray-50 dark:bg-gray-900"}`}
      style={props.background ? `background: ${props.background}` : undefined}
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        {(props.title || props.subtitle) && (
          <div class="text-center mb-8 sm:mb-12 px-2 sm:px-0">
            {props.title && (
              <h2 class={`text-2xl sm:text-3xl md:text-4xl font-bold ${titleClass} mb-3 sm:mb-4`}>
                {props.title}
              </h2>
            )}
            {props.subtitle && (
              <p class={`text-base sm:text-lg ${subtitleClass} max-w-2xl mx-auto px-2 sm:px-0`}>
                {props.subtitle}
              </p>
            )}
          </div>
        )}

        {/* Blog Grid */}
        <div class={`grid ${gridClass} gap-4 sm:gap-6 lg:gap-8`}>
          <For each={props.blogs}>
            {(blog) => (
              <BlogCard
                blog={blog}
                onClick={() => props.onBlogClick?.(blog)}
              />
            )}
          </For>
        </div>

        {/* Empty State */}
        {props.blogs.length === 0 && (
          <div class="text-center py-12">
            <p class={`${emptyStateClass} text-lg`}>
              ยังไม่มีบทความในขณะนี้
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

