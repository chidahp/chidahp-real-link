import { For, createResource, Suspense, onMount } from "solid-js";
import { ExternalLink, Lock } from "lucide-solid";
import axios from "axios";

// Static profile data
const profileData = {
  logo: "/chidahp.webp",
  realLogo: "/real.png",
  name: "สำนักพิมพ์ชี้ดาบ - chidahp",
  tagline: "สำนักพิมพ์ที่ว่าด้วยการเติบโต",
  socialLinks: [
    {
      id: 1,
      name: "Facebook",
      url: "https://facebook.com/chidahp",
      icon: "facebook",
    },
    {
      id: 2,
      name: "Instagram",
      url: "https://instagram.com/chidahp",
      icon: "instagram",
    },
    {
      id: 3,
      name: "Email",
      url: "mailto:chidahp@gmail.com",
      icon: "email",
    },
    {
      id: 4,
      name: "X (Twitter)",
      url: "https://x.com/chidahp",
      icon: "twitter",
    },
  ],
};

// API endpoints
const NOCO_API_URL =
  "https://noco.topspin.space/api/v2/tables/malc2fpvoe46aix/records";
const GOOGLE_FALLBACK_URL =
  "https://script.google.com/macros/s/AKfycbwFCtCMpwfbOynRMqXI0W_4kTryUIY-SaW7rbajnpLxBa3W67YAfcZk9XjnSxCXpYoRYw/exec";
const API_TOKEN = import.meta.env?.API_TOKEN ?? "";

function normalizeRow(row: Record<string, unknown>) {
  const d = row.disabled ?? row.Disabled;
  const disabled =
    d === true || (typeof d === "string" && String(d).toUpperCase() === "TRUE");
  return {
    title: String(row.title ?? row.Title ?? ""),
    url: String(row.url ?? row.Url ?? ""),
    icon:
      row.icon != null && row.icon !== ""
        ? String(row.icon)
        : row.Icon != null && row.Icon !== ""
          ? String(row.Icon)
          : undefined,
    iconBg:
      row.iconBg != null && String(row.iconBg).trim() !== ""
        ? String(row.iconBg)
        : undefined,
    disabled,
  };
}

// Fetch links: try NocoDB first, fallback to Google Apps Script
async function fetchLinks() {
  try {
    const { data } = await axios.get<{ list?: unknown[] }>(NOCO_API_URL, {
      headers: { "xc-token": API_TOKEN },
    });
    console.log('1')
    const list = data?.list ?? data;
    const rows = Array.isArray(list) ? list : [];
    return rows.map((row) => normalizeRow(row as Record<string, unknown>));
  } catch {
    const { data } = await axios.get<unknown>(GOOGLE_FALLBACK_URL);
    console.log('2')
    const rows = Array.isArray(data) ? data : [];
    return rows.map((row) => normalizeRow(row as Record<string, unknown>));
  }
}

export default function Home() {
  const [links] = createResource(fetchLinks);

  // Initialize Google AdSense
  onMount(() => {
    try {
      if (typeof window !== "undefined") {
        const w = window as any;
        if (w.adsbygoogle) w.adsbygoogle.push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  });

  return (
    <div class="min-h-screen bg-linear-to-b from-amber-50 via-white to-slate-100">
      <div class="mx-auto w-full max-w-md px-4 py-10">
        {/* Profile Header (Linktree-style) */}
        <div class="flex flex-col items-center">
          <div class="w-24 h-24 md:w-28 md:h-28 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg overflow-hidden ring-4 ring-white">
            <img
              src={profileData.logo}
              alt="Chidahp Logo"
              class="w-full h-full object-cover"
            />
          </div>
          <h1 class="mt-5 text-2xl md:text-3xl font-extrabold text-gray-900 text-center">
            {profileData.name}
          </h1>
          <p class="mt-2 text-gray-600 text-sm md:text-base text-center">
            {profileData.tagline}
          </p>
        </div>

        {/* Links Section */}
        <div class="mt-8 space-y-3">
          <Suspense
            fallback={
              <div class="text-center py-8">
                <p class="text-gray-500">กำลังโหลด...</p>
              </div>
            }
          >
            <For each={links()}>
              {(link) => (
                <a
                  href={link.disabled ? "javascript:void(0)" : link.url}
                  target={link.disabled ? undefined : "_blank"}
                  rel={link.disabled ? undefined : "noopener noreferrer"}
                  class="group relative w-full flex items-center rounded-full px-4 py-3 shadow-sm ring-1 transition-all duration-300 overflow-hidden"
                  classList={{
                    "bg-white/90 backdrop-blur ring-black/5 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]": !link.disabled,
                    "bg-gray-50/50 ring-gray-200 cursor-not-allowed grayscale": link.disabled
                  }}
                  onClick={(e) => link.disabled && e.preventDefault()}
                >
                  {/* Icon Image */}
                  <div
                    class="w-11 h-11 rounded-2xl overflow-hidden shrink-0 border shadow-sm transition-all duration-300"
                    classList={{
                      "border-gray-100 bg-white": !link.disabled && !link.iconBg,
                      "border-gray-200 opacity-50 bg-white": link.disabled,
                      "border-gray-100": !link.disabled && !!link.iconBg,
                    }}
                    style={link.iconBg ? { "background-color": link.iconBg } : undefined}
                  >
                    <img
                      src={link.icon ? link.icon : './real.png'}
                      alt={link.title}
                      class="w-full h-full object-cover transition-transform duration-300"
                      classList={{
                        "group-hover:scale-110": !link.disabled
                      }}
                    />
                  </div>

                  {/* Text */}
                  <span 
                    class="flex-1 text-center font-semibold truncate px-3 transition-colors duration-300"
                    classList={{
                      "text-gray-900 group-hover:text-gray-700": !link.disabled,
                      "text-gray-400": link.disabled
                    }}
                  >
                    {link.title}
                  </span>

                  {/* More Icon */}
                  <div class="shrink-0">
                    {link.disabled ? (
                      <Lock class="w-4 h-4 text-gray-300" />
                    ) : (
                      <ExternalLink class="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                    )}
                  </div>
                </a>
              )}
            </For>
          </Suspense>
        </div>

        {/* Social Media Icons */}
        <div class="mt-8 flex justify-center gap-4">
          <For each={profileData.socialLinks}>
            {(social) => (
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                class="w-11 h-11 flex items-center justify-center text-gray-600 bg-white/70 backdrop-blur ring-1 ring-black/5 hover:text-gray-900 hover:bg-white rounded-full transition-all duration-200"
                aria-label={social.name}
              >
                  {social.icon === "facebook" && (
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  )}
                  {social.icon === "instagram" && (
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  )}
                  {social.icon === "email" && (
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                  {social.icon === "twitter" && (
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  )}
                </a>
              )}
            </For>
        </div>

        {/* Text Advertisement */}
        <div class="mt-8 rounded-2xl bg-white/80 backdrop-blur ring-1 ring-black/5 p-4">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <p class="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                Advertisement
              </p>
              <p class="mt-1 text-sm font-semibold text-gray-900">
                สนใจลงโฆษณา/โปรโมตผลงานบนหน้านี้?
              </p>
              <p class="mt-1 text-sm text-gray-700 leading-relaxed">
                ติดต่อ{" "}
                <a
                  href="mailto:chidahp@gmail.com"
                  class="font-medium text-gray-900 underline underline-offset-2 hover:text-gray-700"
                >
                  chidahp@gmail.com
                </a>
              </p>
            </div>
            <a
              href="mailto:chidahp@gmail.com"
              class="shrink-0 rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold text-white hover:bg-gray-800 transition-colors"
            >
              ติดต่อ
            </a>
          </div>
        </div>

        {/* Google AdSense Ad */}
        <div class="mt-6 flex justify-center">
          <ins
            class="adsbygoogle"
            style="display:block"
            data-ad-client="ca-pub-8360416910031647"
            data-ad-slot="7603328582"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
      </div>
    </div>
  );
}
