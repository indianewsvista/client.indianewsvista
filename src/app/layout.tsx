import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/index.css';
import { Providers } from './providers';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Intel Drift - AI-Powered News Platform',
  description: 'Stay informed with AI-curated news, trending topics, and personalized content.',
  keywords: ['news', 'AI', 'technology', 'trending', 'articles'],
  authors: [{ name: 'Intel Drift' }],
  openGraph: {
    title: 'Intel Drift - AI-Powered News Platform',
    description: 'Stay informed with AI-curated news, trending topics, and personalized content.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Intel Drift - AI-Powered News Platform',
    description: 'Stay informed with AI-curated news, trending topics, and personalized content.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
          <Sonner />
        </Providers>
      </body>
    </html>
  );
}
