'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArticleCard } from '@/components/articles';
import { useApp } from '@/context/AppContext';
import { 
  ChevronLeft, 
  Bookmark, 
  Share2, 
  Clock, 
  Calendar,
  Sparkles,
  Twitter,
  Facebook,
  Link as LinkIcon,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { MobileNav } from '@/components/layout/MobileNav';
import { DesktopSidebar } from '@/components/layout/DesktopSidebar';
import { Article } from '@/types/news';

// Mock sources for overlapping badges
const mockSources = [
  { id: '1', name: 'TechCrunch', logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=50', color: 'bg-green-500' },
  { id: '2', name: 'Bloomberg', logo: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=50', color: 'bg-blue-500' },
  { id: '3', name: 'Reuters', logo: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=50', color: 'bg-orange-500' },
  { id: '4', name: 'CNN', logo: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=50', color: 'bg-red-500' },
];

interface ArticleDetailClientProps {
  article: Article;
  relatedArticles: Article[];
}

export function ArticleDetailClient({ article, relatedArticles }: ArticleDetailClientProps) {
  const router = useRouter();
  const { toggleBookmark, isArticleBookmarked } = useApp();
  const [readingProgress, setReadingProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(article.upvotes);
  
  const isBookmarked = isArticleBookmarked(article.id);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href,
      });
    }
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <div 
        className="reading-progress"
        style={{ width: `${readingProgress}%` }}
      />

      <div className="min-h-screen bg-background">
        <DesktopSidebar />
        
        <div className="lg:ml-64 lg:pt-0">
          {/* Header */}
          <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm px-4 py-3 border-b border-border lg:border-0">
            <div className="flex items-center justify-between">
              <button onClick={() => router.back()} className="p-1 -ml-1">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleLike}
                  className={cn(
                    'p-2 rounded-full transition-colors flex items-center gap-1',
                    isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
                  )}
                >
                  <Heart className={cn('w-5 h-5', isLiked && 'fill-current')} />
                  <span className="text-sm font-medium">{likeCount}</span>
                </button>
                <button
                  onClick={() => toggleBookmark(article)}
                  className={cn(
                    'p-2 rounded-full transition-colors',
                    isBookmarked ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                  )}
                >
                  <Bookmark className={cn('w-5 h-5', isBookmarked && 'fill-current')} />
                </button>
                <button onClick={handleShare} className="p-2 rounded-full bg-secondary">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          <article className="max-w-3xl mx-auto px-4 pb-24 lg:pb-8">
            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative rounded-2xl overflow-hidden mb-6 -mx-4 lg:mx-0 lg:rounded-2xl"
            >
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full aspect-[16/10] object-cover"
              />
            </motion.div>

            {/* Article Header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              {/* Category */}
              <span className="category-chip inline-block mb-3 capitalize text-xs">
                {article.category}
              </span>

              {/* Title */}
              <h1 className="text-2xl lg:text-4xl font-bold leading-tight mb-4">
                {article.title}
              </h1>

              {/* Meta with author and sources */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <img 
                    src={article.author.avatar} 
                    alt={article.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-foreground text-sm">{article.author.name}</p>
                  </div>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs">{format(new Date(article.publishedAt), 'MMM d, yyyy')}</span>
                </div>
                <span>•</span>
                <span className="text-xs">{article.readingTime} min read</span>
              </div>

              {/* Overlapping Source Badges */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">Sources:</span>
                <div className="flex items-center">
                  {mockSources.slice(0, 4).map((source, idx) => (
                    <div
                      key={source.id}
                      className={cn(
                        'w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-white text-xs font-bold overflow-hidden',
                        source.color
                      )}
                      style={{ marginLeft: idx > 0 ? '-8px' : 0, zIndex: 10 - idx }}
                      title={source.name}
                    >
                      {source.name[0]}
                    </div>
                  ))}
                  <span className="ml-2 text-xs text-muted-foreground">+{mockSources.length} sources</span>
                </div>
              </div>
            </motion.header>

            {/* AI Summary */}
            {article.aiSummary && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-primary/5 border border-primary/10 rounded-2xl p-4 mb-6"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-primary text-sm">AI Summary</span>
                </div>
                <p className="text-foreground/90 leading-relaxed text-sm">
                  {article.aiSummary}
                </p>
              </motion.div>
            )}

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="article-content text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Like Section - Mobile */}
            <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-border lg:hidden">
              <button
                onClick={handleLike}
                className={cn(
                  'flex items-center gap-2 px-6 py-3 rounded-full transition-all',
                  isLiked 
                    ? 'bg-red-500/10 text-red-500' 
                    : 'bg-secondary text-muted-foreground hover:text-red-500'
                )}
              >
                <Heart className={cn('w-5 h-5', isLiked && 'fill-current')} />
                <span className="font-medium">{likeCount} likes</span>
              </button>
              <button
                onClick={() => toggleBookmark(article)}
                className={cn(
                  'flex items-center gap-2 px-6 py-3 rounded-full transition-all',
                  isBookmarked 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-muted-foreground'
                )}
              >
                <Bookmark className={cn('w-5 h-5', isBookmarked && 'fill-current')} />
                <span className="font-medium">Save</span>
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-border">
              {article.tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-secondary rounded-full text-xs font-medium">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Share Section */}
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="font-semibold mb-3 text-sm">Share this article</h3>
              <div className="flex gap-3">
                <Button variant="outline" size="icon" className="rounded-full w-10 h-10">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full w-10 h-10">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full w-10 h-10">
                  <LinkIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <section className="mt-8 pt-6 border-t border-border">
                <h2 className="text-lg font-bold mb-4">Related Articles</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedArticles.map((a, i) => (
                    <ArticleCard key={a.id} article={a} index={i} />
                  ))}
                </div>
              </section>
            )}
          </article>

          <MobileNav />
        </div>
      </div>
    </>
  );
}
