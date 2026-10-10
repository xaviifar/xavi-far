import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xavi Far · AI Engineer & AI Systems Developer",
  description:
    "AI Systems Developer specializing in autonomous AI agents, machine learning pipelines, and Big Data infrastructure.",
  keywords: [
    "Xavi Far",
    "AI Engineer",
    "AI Agents",
    "Machine Learning",
    "LangGraph",
    "LangChain",
    "Python",
    "Big Data",
  ],
  authors: [{ name: "Xavi Far" }],
  openGraph: {
    title: "Xavi Far · AI Engineer & AI Systems Developer",
    description:
      "AI Systems Developer specializing in autonomous AI agents, machine learning pipelines, and Big Data infrastructure.",
    type: "website",
  },
};

import { LanguageProvider } from "./context/LanguageContext";

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
