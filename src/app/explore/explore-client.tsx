'use client';

import { useState } from 'react';
import { ChevronLeft, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { categories } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { MobileNav } from '@/components/layout/MobileNav';
import { DesktopSidebar } from '@/components/layout/DesktopSidebar';
import { TopicBentoGrid, ExploreTabs, CategoryCards } from '@/components/explore';
import { Topic } from '@/types/news';

const exploreTabs = ['People', 'Company', 'Days'] as const;

interface ExploreClientProps {
  initialTopics: Topic[];
}

export function ExploreClient({ initialTopics }: ExploreClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'People' | 'Company' | 'Days'>('People');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTopics = initialTopics.filter(topic =>
    topic.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <DesktopSidebar />
      
      <div className="lg:ml-64">
        {/* Header with Search */}
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="p-1 -ml-1">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Topic, Media or journalist"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 h-10 bg-secondary/50 border-0 rounded-full text-sm"
              />
            </div>
          </div>
        </header>

        {/* Tabs */}
        <ExploreTabs
          tabs={exploreTabs}
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab as 'People' | 'Company' | 'Days')}
        />

        <div className="pb-24 lg:pb-8">
          {/* Trending Topic Section */}
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-4 px-4">Trending topic</h2>
            <TopicBentoGrid topics={filteredTopics} />
            {filteredTopics.length === 0 && (
              <div className="text-center py-8 px-4">
                <p className="text-muted-foreground text-sm">No topics found matching "{searchQuery}"</p>
              </div>
            )}
          </section>

          {/* Explore by Category */}
          <section>
            <h2 className="text-lg font-bold mb-4 px-4">Explore by category</h2>
            <CategoryCards categories={categories} />
          </section>
        </div>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </div>
  );
}
