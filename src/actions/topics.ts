'use server';

import { Topic } from '@/types/news';
import { apiClient } from '@/lib/api';
import { ApiTopic, PaginatedResponse } from '@/types/api';

// Helper to convert API topic to app topic format
function convertApiTopic(apiTopic: ApiTopic): Topic {
  return {
    id: apiTopic.id.toString(),
    name: apiTopic.name || 'Unknown Topic',
    imageUrl: apiTopic.image_url || '',
    viewCount: apiTopic.views || 0,
    type: 'person', // Default, can be enhanced based on backend data
  };
}

export async function getTopics(): Promise<Topic[]> {
  const response = await apiClient.get<PaginatedResponse<ApiTopic>>('/topics/');
  return response.results.map(convertApiTopic);
}

export async function getTopicById(id: string): Promise<Topic | undefined> {
  const apiTopic = await apiClient.get<ApiTopic>(`/topics/${id}/`);
  return convertApiTopic(apiTopic);
}

export async function getTrendingTopics(): Promise<Topic[]> {
  const topics = await getTopics();
  return topics.sort((a, b) => b.viewCount - a.viewCount).slice(0, 8);
}
