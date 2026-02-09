'use server';

import { Topic } from '@/types/news';
import { mockTopics } from '@/data/mockData';

export async function getTopics(): Promise<Topic[]> {
  await new Promise(resolve => setTimeout(resolve, 50));
  return mockTopics;
}

export async function getTopicById(id: string): Promise<Topic | undefined> {
  await new Promise(resolve => setTimeout(resolve, 50));
  return mockTopics.find(topic => topic.id === id);
}

export async function getTrendingTopics(): Promise<Topic[]> {
  await new Promise(resolve => setTimeout(resolve, 50));
  return mockTopics.slice(0, 8);
}
