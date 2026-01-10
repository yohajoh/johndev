import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation/Navigation";
import { CustomCursor } from "@/components/Cursor/CustomCursor";
import { ScrollToTop } from "@/components/UI/ScrollToTop";
import "./globals.css";
import ParticleBackground from "@/components/Effects/ParticleBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yohannes Belete | Senior Full-Stack Developer & System Architect",
  description:
    "Building exceptional digital experiences with modern technologies. Specializing in full-stack development, cloud architecture, and performance optimization.",
  keywords: [
    "Full-Stack Developer",
    "System Architect",
    "React",
    "Next.js",
    "TypeScript",
    "AWS",
    "DevOps",
    "San Francisco",
  ],
  authors: [{ name: "Yohannes Belete" }],
  creator: "Yohannes Belete",
  publisher: "Yohannes Belete",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yohannesbelete.dev",
    title: "Yohannes Belete | Senior Full-Stack Developer & System Architect",
    description: "Building exceptional digital experiences with modern technologies.",
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
    description: "Building exceptional digital experiences with modern technologies.",
    images: ["/og-image.png"],
    creator: "@yohannesbelete",
  },
  verification: {
    google: "verification_token",
    yandex: "verification_token",
    yahoo: "verification_token",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0c" },
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
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon?<generated>" type="image/<generated>" sizes="<generated>" />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Yohannes Belete",
              url: "https://yohannesbelete.dev",
              jobTitle: "Senior Full-Stack Developer & System Architect",
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
              knowsAbout: [
                "Full-Stack Development",
                "Cloud Architecture",
                "React",
                "TypeScript",
                "Node.js",
                "AWS",
                "DevOps",
                "System Design",
              ],
              location: {
                "@type": "Place",
                name: "San Francisco, CA",
              },
            }),
          }}
        />
      </head>
      <body className="font-sans bg-background text-foreground min-h-screen overflow-x-hidden selection:bg-primary/30">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="relative">
            <ParticleBackground />
            {/* <CustomCursor /> */}
            <Navigation />
            <main id="main-content" className="relative z-10">
              {children}
            </main>
            <ScrollToTop />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
