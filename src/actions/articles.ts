'use server';

import { Article } from '@/types/news';
import { apiClient } from '@/lib/api';
import { ApiArticle, PaginatedResponse } from '@/types/api';

// Helper to convert API article to app article format
function convertApiArticle(apiArticle: ApiArticle): Article {
  const content = apiArticle.content || '';
  const wordCount = content ? content.split(' ').length : 0;
  
  return {
    id: apiArticle.id.toString(),
    title: apiArticle.title || 'Untitled',
    summary: apiArticle.excerpt || '',
    content: content,
    imageUrl: apiArticle.image_url || '',
    source: {
      name: apiArticle.author || 'Unknown',
      logo: '',
    },
    author: {
      name: apiArticle.author || 'Unknown',
      avatar: '',
    },
    category: apiArticle.category?.slug as Article['category'] || 'world',
    publishedAt: apiArticle.published_at || new Date().toISOString(),
    readingTime: wordCount > 0 ? Math.ceil(wordCount / 200) : 1,
    upvotes: apiArticle.likes_count || 0,
    isBookmarked: apiArticle.is_bookmarked || false,
    isTrending: apiArticle.is_featured || apiArticle.is_breaking || false,
    aiSummary: apiArticle.excerpt || '',
    tags: apiArticle.tags || [],
  };
}

export async function getArticles(): Promise<Article[]> {
  const response = await apiClient.get<PaginatedResponse<ApiArticle>>('/articles/');
  return response.results.map(convertApiArticle);
}

export async function getArticleById(id: string): Promise<Article | undefined> {
  const apiArticle = await apiClient.get<ApiArticle>(`/articles/${id}/`);
  return convertApiArticle(apiArticle);
}

export async function getTrendingArticles(): Promise<Article[]> {
  const response = await apiClient.get<PaginatedResponse<ApiArticle>>('/articles/featured/');
  return response.results.map(convertApiArticle);
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  if (category === 'all') {
    return getArticles();
  }
  const response = await apiClient.get<PaginatedResponse<ApiArticle>>(
    `/articles/by_category/?slug=${category}`
  );
  return response.results.map(convertApiArticle);
}

export async function getBookmarkedArticles(articleIds: string[]): Promise<Article[]> {
  // This will use the authenticated API endpoint
  const response = await apiClient.get<PaginatedResponse<ApiArticle>>('/articles/bookmarked/');
  return response.results.map(convertApiArticle);
}
