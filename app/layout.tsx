import type { Metadata, Viewport } from "next";
import { Inter, Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation/Navbar";
import { CustomCursor } from "@/components/Cursor/CustomCursor";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";
import { Footer } from "@/components/Footer/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Font Optimizations
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// SEO Metadata
export const metadata: Metadata = {
  title: "Yohannes Belete | Senior Full-Stack Developer & System Architect",
  description:
    "Senior Full-Stack Developer & System Architect specializing in building scalable, high-performance applications with modern technologies.",
  keywords: [
    "Full-Stack Developer",
    "System Architect",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "AWS",
    "DevOps",
    "Yohannes Belete",
    "Software Engineer",
  ],
  authors: [{ name: "Yohannes Belete" }],
  creator: "Yohannes Belete",
  publisher: "Yohannes Belete",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://yohannesbelete.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yohannesbelete.dev",
    title: "Yohannes Belete | Senior Full-Stack Developer",
    description:
      "Building exceptional digital experiences with modern technologies.",
    siteName: "Yohannes Belete Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yohannes Belete Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yohannes Belete | Senior Full-Stack Developer",
    description:
      "Building exceptional digital experiences with modern technologies.",
    images: ["/og-image.png"],
    creator: "@yohannesbelete",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)", color: "#3b82f6" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light dark",
};

// Structured Data for Rich Results
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yohannes Belete",
  url: "https://yohannesbelete.dev",
  image: "https://yohannesbelete.dev/profile.jpg",
  sameAs: [
    "https://github.com/yohannesbelete",
    "https://linkedin.com/in/yohannesbelete",
    "https://twitter.com/yohannesbelete",
  ],
  jobTitle: "Senior Full-Stack Developer & System Architect",
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "AWS",
    "System Architecture",
    "DevOps",
    "Cloud Computing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preload Critical Resources */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/poppins-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Preconnect to CDNs */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Favicon Configuration */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />

        {/* PWA Configuration */}
        <meta name="application-name" content="Yohannes Belete Portfolio" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Yohannes Belete" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="antialiased bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Custom Animated Cursor - Only on Desktop */}
          <CustomCursor />

          {/* Navigation */}
          <Navigation />

          {/* Main Content */}
          <main className="relative">{children}</main>

          {/* Footer */}
          <Footer />

          {/* Vercel Analytics & Speed Insights */}
          <Analytics />
          <SpeedInsights />

          {/* Page Progress Indicator */}
          <div className="fixed top-0 left-0 right-0 h-1 bg-muted/20 z-[9999]">
            <div
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-300"
              id="progress-bar"
            />
          </div>

          {/* Skip to Main Content for Accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
          >
            Skip to main content
          </a>
        </ThemeProvider>

        {/* Progress Bar Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', () => {
                const progressBar = document.getElementById('progress-bar');
                if (!progressBar) return;
                
                const updateProgress = () => {
                  const scrollTop = window.scrollY;
                  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
                  progressBar.style.width = scrollPercent + '%';
                };
                
                window.addEventListener('scroll', updateProgress, { passive: true });
                updateProgress();
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
