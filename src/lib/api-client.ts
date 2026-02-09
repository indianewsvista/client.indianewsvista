// Client-side API utilities for authenticated requests
'use client';

import { apiClient, getAuthToken } from './api';
import { ApiArticle } from '@/types/api';

export async function toggleArticleBookmark(articleId: number): Promise<boolean> {
  const token = getAuthToken();
  if (!token) throw new Error('Authentication required');

  const response = await apiClient.post<{ is_bookmarked: boolean }>(
    `/articles/${articleId}/bookmark/`,
    undefined,
    token
  );
  return response.is_bookmarked;
}

export async function toggleArticleLike(articleId: number): Promise<boolean> {
  const token = getAuthToken();
  if (!token) throw new Error('Authentication required');

  const response = await apiClient.post<{ is_liked: boolean }>(
    `/articles/${articleId}/like/`,
    undefined,
    token
  );
  return response.is_liked;
}

export async function toggleTopicFollow(topicSlug: string): Promise<boolean> {
  const token = getAuthToken();
  if (!token) throw new Error('Authentication required');

  const response = await apiClient.post<{ is_following: boolean }>(
    `/topics/${topicSlug}/follow/`,
    undefined,
    token
  );
  return response.is_following;
}

export async function unfollowTopic(topicSlug: string): Promise<void> {
  const token = getAuthToken();
  if (!token) throw new Error('Authentication required');

  await apiClient.post(`/topics/${topicSlug}/unfollow/`, undefined, token);
}

export async function getBookmarkedArticles(): Promise<ApiArticle[]> {
  const token = getAuthToken();
  if (!token) throw new Error('Authentication required');

  const response = await apiClient.get<{ results: ApiArticle[] }>(
    '/articles/bookmarked/',
    token
  );
  return response.results;
}

export async function addComment(
  articleId: number,
  content: string,
  parentId?: number
): Promise<void> {
  const token = getAuthToken();
  if (!token) throw new Error('Authentication required');

  await apiClient.post(
    `/articles/${articleId}/comment/`,
    { content, parent_id: parentId },
    token
  );
}

export async function updateUserProfile(data: {
  first_name?: string;
  last_name?: string;
  bio?: string;
  location?: string;
  website?: string;
}): Promise<void> {
  const token = getAuthToken();
  if (!token) throw new Error('Authentication required');

  await apiClient.patch('/auth/me/update/', data, token);
}

export async function updateUserPreferences(data: {
  email_notifications?: boolean;
  push_notifications?: boolean;
}): Promise<void> {
  const token = getAuthToken();
  if (!token) throw new Error('Authentication required');

  await apiClient.patch('/auth/me/update/', data, token);
}
