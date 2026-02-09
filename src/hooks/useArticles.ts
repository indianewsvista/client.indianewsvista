import { useState, useCallback, useMemo } from 'react';
import { Article, Category } from '@/types/news';
import { mockArticles } from '@/data/mockData';

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'all') return articles;
    return articles.filter(article => article.category === selectedCategory);
  }, [articles, selectedCategory]);

  const trendingArticles = useMemo(() => {
    return articles.filter(article => article.isTrending);
  }, [articles]);

  const bookmarkedArticles = useMemo(() => {
    return articles.filter(article => article.isBookmarked);
  }, [articles]);

  const toggleBookmark = useCallback((articleId: string) => {
    setArticles(prev => 
      prev.map(article => 
        article.id === articleId 
          ? { ...article, isBookmarked: !article.isBookmarked }
          : article
      )
    );
  }, []);

  const getArticleById = useCallback((id: string) => {
    return articles.find(article => article.id === id);
  }, [articles]);

  const fetchArticles = useCallback(async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setArticles(mockArticles);
    setIsLoading(false);
  }, []);

  return {
    articles: filteredArticles,
    allArticles: articles,
    trendingArticles,
    bookmarkedArticles,
    isLoading,
    selectedCategory,
    setSelectedCategory,
    toggleBookmark,
    getArticleById,
    fetchArticles,
  };
}
