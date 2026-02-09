import { Metadata } from 'next';
import { TrendingClient } from './trending-client';
import { getTrendingArticles } from '@/actions/articles';

export const metadata: Metadata = {
  title: 'Trending - Intel Drift',
  description: 'Discover trending news articles ranked by popularity.',
};

export default async function TrendingPage() {
  const trendingArticles = await getTrendingArticles();

  return <TrendingClient initialTrendingArticles={trendingArticles} />;
}
