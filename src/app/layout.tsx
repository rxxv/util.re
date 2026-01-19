import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { ToastProvider } from "@/components/ui/ToastProvider";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <ToastProvider>
          <Sidebar />
          <main className="min-h-screen px-4 pb-16 pt-24 lg:ml-80 lg:px-10 lg:pt-12">
            <div className="mx-auto w-full max-w-5xl">{children}</div>
          </main>
        </ToastProvider>
      </body>
    </html>
  );
}
