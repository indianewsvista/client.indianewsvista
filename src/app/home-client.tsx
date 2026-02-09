'use client';

import { useState, useMemo } from 'react';
import { MobileHeader } from '@/components/layout/MobileHeader';
import { MobileNav } from '@/components/layout/MobileNav';
import { StoriesSection, HeroNewsCard, TrendingCollection, CategoryTabs } from '@/components/home';
import { ArticleCard } from '@/components/articles';
import { DesktopSidebar } from '@/components/layout/DesktopSidebar';
import { Article } from '@/types/news';
import { Story } from '@/types/story';

const homeCategories = ['Trending', 'My topic', 'Local news', 'Fact check', 'Good news'];

interface HomeClientProps {
  initialArticles: Article[];
  initialTrendingArticles: Article[];
  initialStories: Story[];
}

export function HomeClient({ initialArticles, initialTrendingArticles, initialStories }: HomeClientProps) {
  const [activeCategory, setActiveCategory] = useState('Trending');
  
  const heroArticle = useMemo(() => initialTrendingArticles[0], [initialTrendingArticles]);
  const otherArticles = useMemo(() => initialTrendingArticles.slice(1), [initialTrendingArticles]);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar - hidden on mobile */}
      <DesktopSidebar />
      
      <div className="lg:ml-64">
        {/* Mobile Header */}
        <MobileHeader showLogo />

        {/* Stories Section */}
        <StoriesSection stories={initialStories} />

        {/* Category Tabs */}
        <CategoryTabs
          categories={homeCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Main Content */}
        <div className="px-4 pb-24 lg:pb-8">
          {/* Hero Card - Horizontal scroll on mobile */}
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-4" style={{ minWidth: 'min-content' }}>
              {heroArticle && (
                <>
                  <div className="w-[85vw] max-w-sm lg:w-80 flex-shrink-0">
                    <HeroNewsCard article={heroArticle} />
                  </div>
                  {otherArticles[0] && (
                    <div className="w-[85vw] max-w-sm lg:w-80 flex-shrink-0">
                      <HeroNewsCard article={otherArticles[0]} />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Trending Collection */}
          <TrendingCollection articles={otherArticles.slice(1)} />

          {/* More Articles - Desktop */}
          <section className="hidden lg:block mt-8">
            <h3 className="text-lg font-bold mb-4">Latest News</h3>
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
              {initialArticles.slice(0, 6).map((article, i) => (
                <ArticleCard key={article.id} article={article} index={i} />
              ))}
            </div>
          </section>
        </div>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </div>
  );
}
