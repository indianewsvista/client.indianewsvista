 import { useState, useCallback, useMemo } from 'react';
 import { Story } from '@/types/story';
 
 export function useStories() {
   const [stories, setStories] = useState<Story[]>([]);
 
   const markAsViewed = useCallback((storyId: string) => {
     setStories(prev => prev.map(story => 
       story.id === storyId ? { ...story, isViewed: true } : story
     ));
   }, []);
 
   // Sort stories: unviewed first, then viewed
   const sortedStories = useMemo(() => {
     const unviewed = stories.filter(s => !s.isViewed);
     const viewed = stories.filter(s => s.isViewed);
     return [...unviewed, ...viewed];
   }, [stories]);
 
   return {
     stories: sortedStories,
     setStories,
     markAsViewed,
   };
 }