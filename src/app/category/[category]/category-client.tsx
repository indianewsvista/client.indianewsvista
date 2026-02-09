'use client';

import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ArticleCard } from '@/components/articles';
import { MobileNav } from '@/components/layout/MobileNav';
import { DesktopSidebar } from '@/components/layout/DesktopSidebar';
import { Article } from '@/types/news';

const categoryColors: Record<string, { bg: string; accent: string }> = {
  business: { bg: 'bg-amber-50 dark:bg-amber-950/20', accent: 'from-amber-400 to-orange-500' },
  technology: { bg: 'bg-cyan-50 dark:bg-cyan-950/20', accent: 'from-cyan-400 to-blue-500' },
  politics: { bg: 'bg-red-50 dark:bg-red-950/20', accent: 'from-red-400 to-rose-500' },
  sports: { bg: 'bg-green-50 dark:bg-green-950/20', accent: 'from-green-400 to-emerald-500' },
  entertainment: { bg: 'bg-purple-50 dark:bg-purple-950/20', accent: 'from-purple-400 to-violet-500' },
  health: { bg: 'bg-pink-50 dark:bg-pink-950/20', accent: 'from-pink-400 to-rose-500' },
  science: { bg: 'bg-blue-50 dark:bg-blue-950/20', accent: 'from-blue-400 to-indigo-500' },
  world: { bg: 'bg-orange-50 dark:bg-orange-950/20', accent: 'from-orange-400 to-amber-500' },
};

interface CategoryClientProps {
  category: string;
  categoryInfo: { id: string; label: string; icon?: string };
  initialArticles: Article[];
}

export function CategoryClient({ category, categoryInfo, initialArticles }: CategoryClientProps) {
  const router = useRouter();
  const colorScheme = categoryColors[category] || categoryColors.technology;

  return (
    <div className="min-h-screen bg-background">
      <DesktopSidebar />
      
      <div className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
          <div className="flex items-center gap-3 px-4 py-3">
            <button 
              onClick={() => router.back()} 
              className="p-1 -ml-1 hover:bg-secondary rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold">{categoryInfo.label}</h1>
          </div>
        </header>

        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mx-4 mb-6 rounded-2xl overflow-hidden ${colorScheme.bg}`}
        >
          <div className="relative p-6 lg:p-8">
            <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${colorScheme.accent} opacity-20 rounded-full blur-3xl`} />
            <div className="relative">
              <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${colorScheme.accent} text-white text-xs font-medium mb-3`}>
                {initialArticles.length} Articles
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">{categoryInfo.label}</h2>
              <p className="text-muted-foreground text-sm lg:text-base">
                Stay updated with the latest {categoryInfo.label.toLowerCase()} news and insights.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Articles Grid */}
        <div className="px-4 pb-24 lg:pb-8">
          {initialArticles.length > 0 ? (
            <>
              {/* Featured Article */}
              {initialArticles[0] && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <ArticleCard 
                    article={initialArticles[0]} 
                    index={0} 
                    variant="hero"
                  />
                </motion.div>
              )}

              {/* Other Articles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {initialArticles.slice(1).map((article, i) => (
                  <ArticleCard key={article.id} article={article} index={i + 1} />
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${colorScheme.accent} opacity-20`} />
              <h3 className="text-lg font-semibold mb-2">No articles yet</h3>
              <p className="text-muted-foreground text-sm">
                Check back later for {categoryInfo.label.toLowerCase()} news.
              </p>
            </motion.div>
          )}
        </div>

        <MobileNav />
      </div>
    </div>
  );
}
