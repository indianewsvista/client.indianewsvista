'use server';

import { Article } from '@/types/news';
import { mockArticles } from '@/data/mockData';

export async function getArticles() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockArticles;
}

export async function getArticleById(id: string): Promise<Article | undefined> {
  await new Promise(resolve => setTimeout(resolve, 50));
  return mockArticles.find(article => article.id === id);
}

export async function getTrendingArticles(): Promise<Article[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockArticles.filter(article => article.isTrending);
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  if (category === 'all') return mockArticles;
  return mockArticles.filter(article => article.category === category);
}

export async function getBookmarkedArticles(articleIds: string[]): Promise<Article[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockArticles.filter(article => articleIds.includes(article.id));
}
