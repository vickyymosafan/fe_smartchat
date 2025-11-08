import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import PWAInstallPrompt from "@/components/pwa-install-prompt";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ChatSmart - AI Chat Interface",
  description: "Professional chat interface powered by AI",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ChatSmart",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "ChatSmart",
    title: "ChatSmart - AI Assistant",
    description: "Professional AI chat interface untuk bantuan, saran, dan pertanyaan",
  },
  twitter: {
    card: "summary",
    title: "ChatSmart - AI Assistant",
    description: "Professional AI chat interface untuk bantuan, saran, dan pertanyaan",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.svg" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ChatSmart" />
      </head>
      <body className={`${montserrat.variable} antialiased`}>
        {children}
        <PWAInstallPrompt />
      </body>
    </html>
  );
}
