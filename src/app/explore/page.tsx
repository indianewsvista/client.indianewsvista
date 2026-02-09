import { Metadata } from 'next';
import { ExploreClient } from './explore-client';
import { getTopics } from '@/actions/topics';

export const metadata: Metadata = {
  title: 'Explore Topics - Intel Drift',
  description: 'Explore trending topics, people, companies, and more.',
};

export default async function ExplorePage() {
  const topics = await getTopics();

  return <ExploreClient initialTopics={topics} />;
}
