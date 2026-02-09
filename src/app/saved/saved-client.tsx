'use client';

import { ChevronLeft, Bookmark, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArticleCard } from '@/components/articles';
import { useApp } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileNav } from '@/components/layout/MobileNav';
import { DesktopSidebar } from '@/components/layout/DesktopSidebar';

export function SavedClient() {
  const router = useRouter();
  const { savedArticles, toggleBookmark } = useApp();

  const sortedArticles = [...savedArticles].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="min-h-screen bg-background">
      <DesktopSidebar />
      
      <div className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="p-1 -ml-1">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="font-bold text-lg">Saved Articles</h1>
          </div>
        </header>

        <div className="px-4 pb-24 lg:pb-8">
          {/* Header */}
          <p className="text-muted-foreground text-sm mb-6">
            {savedArticles.length} article{savedArticles.length !== 1 ? 's' : ''} saved
          </p>

          {/* Empty State */}
          {savedArticles.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-16"
            >
              <div className="w-24 h-24 mb-4 rounded-full bg-secondary flex items-center justify-center">
                <Bookmark className="w-12 h-12 text-muted-foreground/30" />
              </div>
              <h2 className="text-lg font-semibold mb-2">No saved articles yet</h2>
              <p className="text-muted-foreground text-center text-sm max-w-xs mb-4">
                Save articles you want to read later by tapping the bookmark icon.
              </p>
              <Link href="/" className="text-primary text-sm font-medium">
                Browse articles
              </Link>
            </motion.div>
          )}

          {/* Articles Grid */}
          <AnimatePresence mode="popLayout">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sortedArticles.map((article, i) => (
                <motion.div
                  key={article.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative group">
                    <ArticleCard article={article} index={i} />
                    <button
                      onClick={() => toggleBookmark(article)}
                      className="absolute top-3 right-3 p-2 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </div>
  );
}
