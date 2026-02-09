'use client';

import Link from 'next/link';
import { Bookmark, Clock, ThumbsUp, Sparkles } from 'lucide-react';
import { Article } from '@/types/news';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { formatDistanceToNow } from 'date-fns';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'compact' | 'hero';
  index?: number;
}

export function ArticleCard({ article, variant = 'default', index = 0 }: ArticleCardProps) {
  const { toggleBookmark, isArticleBookmarked } = useApp();
  const isBookmarked = isArticleBookmarked(article.id);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(article);
  };

  if (variant === 'hero') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Link href={`/article/${article.id}`} className="block group">
          <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="hero-overlay absolute inset-0" />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              {/* AI Badge */}
              {article.aiSummary && (
                <span className="ai-badge mb-4">
                  <Sparkles className="w-3 h-3" />
                  AI Summary
                </span>
              )}
              
              <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4 line-clamp-3">
                {article.title}
              </h2>
              
              <div className="flex items-center gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <img 
                    src={article.author.avatar} 
                    alt={article.author.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span>{article.author.name}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{article.readingTime} min read</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{article.upvotes}</span>
                </div>
              </div>
            </div>

            {/* Bookmark Button */}
            <button
              onClick={handleBookmark}
              className={cn(
                'absolute top-4 right-4 p-3 rounded-xl transition-all',
                isBookmarked 
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
              )}
            >
              <Bookmark className={cn('w-5 h-5', isBookmarked && 'fill-current')} />
            </button>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
      >
        <Link href={`/article/${article.id}`} className="group flex gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {article.title}
            </h4>
            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
              <span>{article.source.name}</span>
              <span>•</span>
              <span>{article.readingTime} min</span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/article/${article.id}`} className="block group">
        <article className="card-news">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Bookmark */}
            <button
              onClick={handleBookmark}
              className={cn(
                'absolute top-3 right-3 p-2.5 rounded-xl transition-all',
                isBookmarked 
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card/90 backdrop-blur-sm text-foreground hover:bg-card'
              )}
            >
              <Bookmark className={cn('w-4 h-4', isBookmarked && 'fill-current')} />
            </button>

            {/* AI Badge */}
            {article.aiSummary && (
              <span className="ai-badge absolute bottom-3 left-3">
                <Sparkles className="w-3 h-3" />
                AI
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-4 lg:p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="category-chip text-xs py-1 px-3">
                {article.category}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
              </span>
            </div>

            <h3 className="font-bold text-lg leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {article.title}
            </h3>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {article.summary}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img 
                  src={article.author.avatar} 
                  alt={article.author.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="text-sm font-medium">{article.author.name}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readingTime} min
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  {article.upvotes}
                </span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
