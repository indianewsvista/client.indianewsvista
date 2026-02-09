'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, Award, Medal, Flame } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArticleCard } from '@/components/articles';
import { motion } from 'framer-motion';
import { MobileNav } from '@/components/layout/MobileNav';
import { DesktopSidebar } from '@/components/layout/DesktopSidebar';
import { Article } from '@/types/news';

const timeTabs = ['Today', 'This Week', 'This Month'] as const;

interface TrendingClientProps {
  initialTrendingArticles: Article[];
}

export function TrendingClient({ initialTrendingArticles }: TrendingClientProps) {
  const router = useRouter();
  const [activeTimeTab, setActiveTimeTab] = useState<typeof timeTabs[number]>('Today');

  const filteredArticles = useMemo(() => {
    return [...initialTrendingArticles].sort((a, b) => b.upvotes - a.upvotes);
  }, [initialTrendingArticles]);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Award className="w-5 h-5 text-accent" />;
      case 1:
        return <Medal className="w-5 h-5 text-muted-foreground" />;
      case 2:
        return <Medal className="w-5 h-5 text-accent/70" />;
      default:
        return <span className="text-sm font-bold text-muted-foreground">{index + 1}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DesktopSidebar />
      
      <div className="lg:ml-64">
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="p-1 -ml-1">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="font-bold text-lg">Trending</h1>
          </div>
        </header>

        <div className="px-4 pb-24 lg:pb-8">
          <div className="flex justify-center mb-6 py-2">
            <div className="inline-flex bg-secondary/50 rounded-full p-1">
              {timeTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTimeTab(tab)}
                  className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTimeTab === tab
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {activeTimeTab === tab && (
                    <motion.div
                      layoutId="trending-time-tab"
                      className="absolute inset-0 bg-card rounded-full shadow-sm"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </div>
          </div>

          {filteredArticles.length >= 3 && (
            <div className="hidden lg:grid grid-cols-3 gap-4 mb-8">
              {filteredArticles.slice(0, 3).map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -top-3 -left-3 z-10 p-2 bg-card rounded-xl shadow-md">
                    {getRankIcon(i)}
                  </div>
                  <ArticleCard article={article} index={i} />
                </motion.div>
              ))}
            </div>
          )}

          <div className="space-y-3">
            {filteredArticles.map((article, i) => (
              <Link 
                key={article.id} 
                href={`/article/${article.id}`}
                className="flex items-center gap-3 p-3 bg-card rounded-2xl hover:bg-secondary/50 transition-colors"
              >
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                  {getRankIcon(i)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm line-clamp-2">{article.title}</h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <span>{article.source.name}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-3 h-3 text-accent" />
                      {article.upvotes}
                    </span>
                  </div>
                </div>
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-14 h-12 rounded-xl object-cover flex-shrink-0"
                />
              </Link>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-sm">No trending articles found.</p>
            </div>
          )}
        </div>

        <MobileNav />
      </div>
    </div>
  );
}
