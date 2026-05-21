import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "AuditAI - Stop Overpaying for AI Tools",
    template: "%s | AuditAI"
  },
  description: "Analyze AI subscriptions, API usage, and team plans to uncover hidden savings in seconds.",
  keywords: ["AI spend calculator", "AI cost optimization", "reduce ChatGPT API costs", "AI tools audit"],
  openGraph: {
    title: "AuditAI - Stop Overpaying for AI Tools",
    description: "Run a free AI spend audit and find hidden savings in your startup's AI stack.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "AuditAI - Stop Overpaying for AI Tools",
    description: "Find hidden savings in your startup's AI stack."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

