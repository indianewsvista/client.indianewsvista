'use server';

import { Story } from '@/types/story';
import { mockStories } from '@/data/storiesData';

export async function getStories(): Promise<Story[]> {
  await new Promise(resolve => setTimeout(resolve, 50));
  return mockStories;
}

export async function getStoryById(id: string): Promise<Story | undefined> {
  await new Promise(resolve => setTimeout(resolve, 50));
  return mockStories.find(story => story.id === id);
}
