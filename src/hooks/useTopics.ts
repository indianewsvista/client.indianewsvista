import { useState, useMemo } from 'react';
import { Topic } from '@/types/news';

export function useTopics() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [activeTab, setActiveTab] = useState<'People' | 'Company' | 'Days'>('People');

  const filteredTopics = useMemo(() => {
    switch (activeTab) {
      case 'People':
        return topics.filter(t => t.type === 'person');
      case 'Company':
        return topics.filter(t => t.type === 'company');
      default:
        return topics;
    }
  }, [topics, activeTab]);

  const topTopics = useMemo(() => {
    return [...topics].sort((a, b) => b.viewCount - a.viewCount).slice(0, 6);
  }, [topics]);

  return {
    topics: filteredTopics,
    allTopics: topics,
    topTopics,
    activeTab,
    setActiveTab,
    setTopics,
  };
}
