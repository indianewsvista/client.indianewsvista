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
  readonly initialArticles: Article[];
  readonly initialTrendingArticles: Article[];
  readonly initialStories: Story[];
}

export function HomeClient({ initialArticles, initialTrendingArticles, initialStories }: HomeClientProps) {
  const [activeCategory, setActiveCategory] = useState('Trending');
  
  // Use trending articles if available, otherwise fall back to regular articles
  const articlesToDisplay = useMemo(() => 
    initialTrendingArticles.length > 0 ? initialTrendingArticles : initialArticles,
    [initialTrendingArticles, initialArticles]
  );
  
  const heroArticle = useMemo(() => articlesToDisplay[0], [articlesToDisplay]);
  const otherArticles = useMemo(() => articlesToDisplay.slice(1), [articlesToDisplay]);

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
          <TrendingCollection articles={otherArticles.slice(1, 3)} />

          {/* Latest News - Mobile & Desktop */}
          <section className="mt-8">
            <h3 className="text-lg font-bold mb-4">Latest News</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {articlesToDisplay.slice(3, 9).map((article, i) => (
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
