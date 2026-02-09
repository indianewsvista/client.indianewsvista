import { Metadata } from 'next';
import { HomeClient } from './home-client';
import { getArticles, getTrendingArticles } from '@/actions/articles';
import { getStories } from '@/actions/stories';

export const metadata: Metadata = {
  title: 'Home - Intel Drift',
  description: 'Discover trending news, stories, and personalized content on Intel Drift.',
};

export default async function HomePage() {
  const [articles, trendingArticles, stories] = await Promise.all([
    getArticles(),
    getTrendingArticles(),
    getStories(),
  ]);

  return (
    <HomeClient 
      initialArticles={articles}
      initialTrendingArticles={trendingArticles}
      initialStories={stories}
    />
  );
}
