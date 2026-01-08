import { A, useLocation } from "@solidjs/router";
import { Menu, X } from "lucide-solid";
import { createSignal, For, Show } from "solid-js";

interface NavItem {
  href: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/about-us", label: "เกี่ยวกับเรา" },
  { href: "/news", label: "ข่าวสาร" },
  { href: "/contact-us", label: "ติดต่อเรา" },
];

export default function Nav() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);
  
  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen());
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav class="bg-black border-b border-yellow-500/20">
      <div class="container mx-auto px-6 lg:px-8">
        {/* Main Nav Bar */}
        <div class="flex items-center justify-between h-20">
          {/* Logo */}
          <A href="/home" class="flex items-center" onClick={closeMenu}>
            <img
              src="/stranger-shop.png"
              alt="Stranger Shop Logo"
              class="h-10 w-10 object-contain"
            />
          </A>

          {/* Desktop Navigation Menu */}
          <div class="hidden lg:flex items-center space-x-8">
            <For each={NAV_ITEMS}>
              {(item, index) => (
                <>
                  {index() > 0 && (
                    <span class="h-4 w-px bg-yellow-500/30"></span>
                  )}
                  <A
                    href={item.href}
                    class={`text-sm transition-colors ${
                      isActive(item.href)
                        ? "text-yellow-500"
                        : "text-gray-400 hover:text-yellow-500"
                    }`}
                  >
                    {item.label}
                  </A>
                </>
              )}
            </For>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            class="lg:hidden p-2 text-gray-400 hover:text-yellow-500 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen() ? <X class="w-5 h-5" /> : <Menu class="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <Show when={isMenuOpen()}>
        <div 
          class="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={closeMenu}
        >
          <div
            class="bg-black h-full w-80 max-w-[85vw] shadow-2xl animate-slide-in-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div class="flex flex-col p-6 space-y-6">
              <div class="flex items-center justify-between animate-fade-in-delay">
                <span class="text-yellow-500 font-medium">เมนู</span>
                <button
                  onClick={closeMenu}
                  class="p-2 text-gray-400 hover:text-yellow-500 transition-colors"
                  aria-label="Close menu"
                >
                  <X class="w-5 h-5" />
                </button>
              </div>
              
              <For each={NAV_ITEMS}>
                {(item, index) => (
                  <A
                    href={item.href}
                    onClick={closeMenu}
                    class={`text-base transition-all duration-300 transform hover:translate-x-2 ${
                      isActive(item.href)
                        ? "text-yellow-500"
                        : "text-gray-400 hover:text-yellow-500"
                    } animate-fade-in-delay`}
                    style={`animation-delay: ${index() * 0.1}s`}
                  >
                    {item.label}
                  </A>
                )}
              </For>
            </div>
          </div>
        </div>
      </Show>
    </nav>
  );
}
