'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { UserProfile, UserPreferences, Article, Topic } from '@/types/news';

interface AppContextType {
  user: UserProfile | null;
  preferences: UserPreferences;
  savedArticles: Article[];
  followedTopics: Topic[];
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  toggleBookmark: (article: Article) => void;
  followTopic: (topic: Topic) => void;
  unfollowTopic: (topicId: string) => void;
  isArticleBookmarked: (articleId: string) => boolean;
  isTopicFollowed: (topicId: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: 'light',
    fontSize: 'medium',
    notifications: true,
  });
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const [followedTopics, setFollowedTopics] = useState<Topic[]>([]);

  const updatePreferences = useCallback((prefs: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...prefs }));
  }, []);

  const toggleBookmark = useCallback((article: Article) => {
    setSavedArticles(prev => {
      const exists = prev.find(a => a.id === article.id);
      if (exists) {
        return prev.filter(a => a.id !== article.id);
      }
      return [...prev, { ...article, isBookmarked: true }];
    });
  }, []);

  const followTopic = useCallback((topic: Topic) => {
    setFollowedTopics(prev => {
      if (prev.find(t => t.id === topic.id)) return prev;
      return [...prev, topic];
    });
  }, []);

  const unfollowTopic = useCallback((topicId: string) => {
    setFollowedTopics(prev => prev.filter(t => t.id !== topicId));
  }, []);

  const isArticleBookmarked = useCallback((articleId: string) => {
    return savedArticles.some(a => a.id === articleId);
  }, [savedArticles]);

  const isTopicFollowed = useCallback((topicId: string) => {
    return followedTopics.some(t => t.id === topicId);
  }, [followedTopics]);

  return (
    <AppContext.Provider value={{
      user,
      preferences,
      savedArticles,
      followedTopics,
      updatePreferences,
      toggleBookmark,
      followTopic,
      unfollowTopic,
      isArticleBookmarked,
      isTopicFollowed,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
