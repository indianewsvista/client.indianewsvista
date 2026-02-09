'use server';

import { Story, StorySlide } from '@/types/story';
import { apiClient } from '@/lib/api';
import { ApiStory, PaginatedResponse } from '@/types/api';

// Helper to convert API story to app story format
function convertApiStory(apiStory: ApiStory): Story {
  const slides = apiStory.slides || [];
  
  return {
    id: apiStory.id.toString(),
    name: apiStory.title || 'Untitled Story',
    imageUrl: slides[0]?.image_url || '',
    isViewed: apiStory.is_viewed || false,
    slides: slides.map((slide): StorySlide => ({
      id: slide.id.toString(),
      type: apiStory.source_article ? 'article' : 'image',
      imageUrl: slide.image_url || '',
      title: apiStory.title || 'Untitled',
      description: slide.content || '',
      articleId: apiStory.source_article?.id.toString(),
    })),
  };
}

export async function getStories(): Promise<Story[]> {
  const response = await apiClient.get<PaginatedResponse<ApiStory>>('/stories/');
  return response.results.map(convertApiStory);
}

export async function getStoryById(id: string): Promise<Story | undefined> {
  const apiStory = await apiClient.get<ApiStory>(`/stories/${id}/`);
  return convertApiStory(apiStory);
}
