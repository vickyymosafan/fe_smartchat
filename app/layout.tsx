import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import PWAInstallPrompt from "@/components/pwa-install-prompt";
import ServiceWorkerRegister from "@/components/service-worker-register";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Smartchat - AI Chat Interface",
  description: "Professional chat interface powered by vickymosafan untuk Universitas Muhammadiyah Jember",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Smartchat Assistant",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Smartchat AI Assistant",
    title: "Smartchat AI Assistant",
    description: "Professional AI Smartchat interface untuk bantuan, saran, dan pertanyaan tentang Universitas Muhammadiyah Jember",
  },
  twitter: {
    card: "summary",
    title: "Smartchat - AI Assistant",
    description: "Professional AI Smartchat interface untuk bantuan, saran, dan pertanyaan",
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
        <link rel="icon" type="image/png" sizes="32x32" href="/UMJ.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/UMJ.png?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/UMJ.png?v=2" />
        <link rel="icon" type="image/png" sizes="192x192" href="/UMJ.png?v=2" />
        <link rel="icon" type="image/png" sizes="512x512" href="/UMJ.png?v=2" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SmartChat" />
      </head>
      <body className={`${montserrat.variable} antialiased`}>
        <ServiceWorkerRegister />
        {children}
        <PWAInstallPrompt />
      </body>
    </html>
  );
}
