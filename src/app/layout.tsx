import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c0e12" },
    { media: "(prefers-color-scheme: light)", color: "#f4f5f8" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gauravyawale.com"),
  title: "Gaurav Yawale | Senior Software Engineer & Frontend Architect",
  description:
    "Senior Software Engineer & Frontend Architect with 5+ years of experience specializing in React, Next.js, TypeScript, and high-performance web systems in Bengaluru, India.",
  keywords: [
    "frontend architect",
    "Senior Software Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Bengaluru",
    "Full-Stack Developer",
    "Fastify",
    "PostgreSQL",
    "PostGIS",
    "GeekyAnts",
  ],
  authors: [{ name: "Gaurav Yawale", url: "https://gauravyawale.com" }],
  creator: "Gaurav Yawale",
  openGraph: {
    title: "Gaurav Yawale | Senior Software Engineer & Frontend Architect",
    description:
      "Senior Software Engineer & Frontend Architect with 5+ years of experience specializing in React, Next.js, TypeScript, and high-performance web systems in Bengaluru, India.",
    type: "website",
    locale: "en_US",
    url: "https://gauravyawale.com",
    siteName: "Gaurav Yawale Engineering Portfolio",
    images: [
      {
        url: "[OG_IMAGE_URL]",
        width: 1200,
        height: 630,
        alt: "Gaurav Yawale - Senior Software Engineer & Frontend Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaurav Yawale | Senior Software Engineer & Frontend Architect",
    description:
      "Senior Software Engineer & Frontend Architect with 5+ years of experience specializing in React, Next.js, TypeScript, and high-performance web systems in Bengaluru, India.",
    images: ["[OG_IMAGE_URL]"],
  },
};

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gaurav Yawale",
  jobTitle: "Senior Software Engineer & Frontend Architect",
  url: "https://gauravyawale.com",
  sameAs: [
    "https://linkedin.com/in/gaurav-yawale",
    "https://github.com/gauravyawale",
  ],
  worksFor: {
    "@type": "Organization",
    name: "GeekyAnts",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressCountry: "India",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} dark scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdPerson),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('portfolio-theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (stored === 'light' || (!stored && !supportDarkMode)) {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                    document.documentElement.style.colorScheme = 'light';
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                    document.documentElement.style.colorScheme = 'dark';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#f4f5f8] text-[#4b5262] dark:bg-[#0c0e12] dark:text-[#9ba1b0] antialiased selection:bg-[#f59e0b]/20 selection:text-[#f59e0b] transition-colors duration-200">
        <ThemeProvider>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
