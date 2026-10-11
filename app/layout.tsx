import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://xavifar.dev"),
  title: {
    default: "Xavi Far · AI Systems & Autonomous Agents Engineer",
    template: "%s | Xavi Far",
  },
  description:
    "Portfolio of Xavi Far — AI Systems Developer & Engineer specializing in autonomous multi-agent architectures, LangGraph, RAG pipelines, and end-to-end machine learning infrastructure.",
  applicationName: "Xavi Far Portfolio",
  authors: [{ name: "Xavi Far", url: "https://github.com/xaviifar" }],
  creator: "Xavi Far",
  publisher: "Xavi Far",
  keywords: [
    "Xavi Far",
    "AI Engineer",
    "AI Systems Developer",
    "Autonomous Agents",
    "Multi-Agent Systems",
    "LangGraph",
    "LangChain",
    "RAG",
    "Retrieval Augmented Generation",
    "Machine Learning",
    "Python",
    "FastAPI",
    "Vector Databases",
    "ChromaDB",
    "Next.js",
    "Docker",
    "PostgreSQL",
    "Barcelona AI",
  ],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Xavi Far · AI Systems & Autonomous Agents Engineer",
    description:
      "AI Systems Developer specializing in autonomous AI agents, machine learning pipelines, and Big Data infrastructure.",
    url: "https://xavifar.dev",
    siteName: "Xavi Far · AI Systems Engineer",
    images: [
      {
        url: "/portfolio.jpg",
        width: 1200,
        height: 630,
        alt: "Xavi Far — AI Systems Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xavi Far · AI Systems & Autonomous Agents Engineer",
    description:
      "Building autonomous AI agents, deterministic LLM pipelines, and end-to-end machine learning systems.",
    images: ["/portfolio.jpg"],
    creator: "@xavifar",
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
  alternates: {
    canonical: "https://xavifar.dev",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full bg-bg text-ink font-sans">
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
