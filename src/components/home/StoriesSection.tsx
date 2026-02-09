'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StoryViewer } from '@/components/stories';
import { Story } from '@/types/story';

interface StoriesSectionProps {
  stories: Story[];
}

export function StoriesSection({ stories }: StoriesSectionProps) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [initialStoryIndex, setInitialStoryIndex] = useState(0);
  const [viewedStories, setViewedStories] = useState<Set<string>>(new Set());
 
  const handleStoryClick = (storyIndex: number) => {
    setInitialStoryIndex(storyIndex);
    setViewerOpen(true);
    setViewedStories(prev => new Set([...prev, stories[storyIndex].id]));
  };
  
  return (
    <>
       <div className="overflow-x-auto scrollbar-hide">
         <div className="flex gap-3 px-4 py-2">
           {stories.map((story, index) => (
             <motion.button
               key={story.id}
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: index * 0.05 }}
               onClick={() => handleStoryClick(index)}
               className="flex flex-col items-center gap-1.5 min-w-[64px]"
             >
               {story.id === 'discover' ? (
                 <div 
                   className={`w-16 h-16 rounded-full flex items-center justify-center p-[2px] ${
                     viewedStories.has(story.id) 
                       ? 'bg-muted-foreground/30' 
                       : 'bg-gradient-to-br from-primary via-accent to-primary'
                   }`}
                 >
                   <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
                     <span className="text-primary-foreground text-xs font-medium">Discover</span>
                   </div>
                 </div>
               ) : (
                 <div 
                   className={`relative p-[2px] rounded-full ${
                     viewedStories.has(story.id) 
                       ? 'bg-muted-foreground/30' 
                       : 'bg-gradient-to-br from-primary via-accent to-primary'
                   }`}
                 >
                   <div className="w-[60px] h-[60px] rounded-full overflow-hidden bg-background">
                     <img
                       src={story.imageUrl}
                       alt={story.name}
                       className="w-full h-full object-cover"
                     />
                   </div>
                 </div>
               )}
               <span className="text-xs text-muted-foreground truncate max-w-[64px]">
                 {story.name}
               </span>
             </motion.button>
           ))}
         </div>
       </div>
 
       <AnimatePresence>
         {viewerOpen && (
           <StoryViewer
             stories={stories}
             initialIndex={initialStoryIndex}
             onClose={() => setViewerOpen(false)}
             onStoryViewed={(id) => setViewedStories(prev => new Set([...prev, id]))}
           />
         )}
       </AnimatePresence>
     </>
   );
 }