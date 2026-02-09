'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Story, StorySlide } from '@/types/story';
import { useRouter } from 'next/navigation';
 
 interface StoryViewerProps {
   stories: Story[];
   initialIndex: number;
   onClose: () => void;
   onStoryViewed: (storyId: string) => void;
 }
 
 export function StoryViewer({ stories, initialIndex, onClose, onStoryViewed }: StoryViewerProps) {
  const router = useRouter();
   const [currentStoryIndex, setCurrentStoryIndex] = useState(initialIndex);
   const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
   const [progress, setProgress] = useState(0);
   const [isPaused, setIsPaused] = useState(false);
 
   const currentStory = stories[currentStoryIndex];
   const currentSlide = currentStory?.slides[currentSlideIndex];
   const slideDuration = 5000; // 5 seconds per slide
 
   const goToNextSlide = useCallback(() => {
     if (currentSlideIndex < currentStory.slides.length - 1) {
       setCurrentSlideIndex(prev => prev + 1);
       setProgress(0);
     } else if (currentStoryIndex < stories.length - 1) {
       onStoryViewed(currentStory.id);
       setCurrentStoryIndex(prev => prev + 1);
       setCurrentSlideIndex(0);
       setProgress(0);
     } else {
       onStoryViewed(currentStory.id);
       onClose();
     }
   }, [currentSlideIndex, currentStoryIndex, currentStory, stories.length, onStoryViewed, onClose]);
 
   const goToPrevSlide = useCallback(() => {
     if (currentSlideIndex > 0) {
       setCurrentSlideIndex(prev => prev - 1);
       setProgress(0);
     } else if (currentStoryIndex > 0) {
       setCurrentStoryIndex(prev => prev - 1);
       const prevStory = stories[currentStoryIndex - 1];
       setCurrentSlideIndex(prevStory.slides.length - 1);
       setProgress(0);
     }
   }, [currentSlideIndex, currentStoryIndex, stories]);
 
   // Auto-progress timer
   useEffect(() => {
     if (isPaused) return;
 
     const interval = setInterval(() => {
       setProgress(prev => {
         if (prev >= 100) {
           goToNextSlide();
           return 0;
         }
         return prev + (100 / (slideDuration / 50));
       });
     }, 50);
 
     return () => clearInterval(interval);
   }, [isPaused, goToNextSlide]);
 
   // Reset progress when slide changes
   useEffect(() => {
     setProgress(0);
   }, [currentSlideIndex, currentStoryIndex]);
 
   // Handle keyboard navigation
   useEffect(() => {
     const handleKeyDown = (e: KeyboardEvent) => {
       if (e.key === 'ArrowRight' || e.key === ' ') goToNextSlide();
       if (e.key === 'ArrowLeft') goToPrevSlide();
       if (e.key === 'Escape') onClose();
     };
 
     window.addEventListener('keydown', handleKeyDown);
     return () => window.removeEventListener('keydown', handleKeyDown);
   }, [goToNextSlide, goToPrevSlide, onClose]);
 
   const handleArticleClick = () => {
     if (currentSlide?.articleId) {
       onClose();
       router.push(`/article/${currentSlide.articleId}`);
     }
   };
 
   if (!currentStory || !currentSlide) return null;
 
   return (
     <motion.div
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0 }}
       className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
     >
       {/* Story Container */}
       <div className="relative w-full h-full max-w-md mx-auto">
         {/* Progress Bars */}
         <div className="absolute top-4 left-4 right-4 z-20 flex gap-1">
           {currentStory.slides.map((_, idx) => (
             <div key={idx} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
               <div
                 className="h-full bg-white transition-all duration-50"
                 style={{
                   width: idx < currentSlideIndex 
                     ? '100%' 
                     : idx === currentSlideIndex 
                       ? `${progress}%` 
                       : '0%'
                 }}
               />
             </div>
           ))}
         </div>
 
         {/* Header */}
         <div className="absolute top-8 left-4 right-4 z-20 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent overflow-hidden">
               {currentStory.imageUrl && (
                 <img src={currentStory.imageUrl} alt={currentStory.name} className="w-full h-full object-cover" />
               )}
             </div>
             <span className="text-white font-medium text-sm">{currentStory.name}</span>
           </div>
           <div className="flex items-center gap-2">
             <button
               onClick={() => setIsPaused(!isPaused)}
               className="p-2 text-white/80 hover:text-white"
             >
               {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
             </button>
             <button onClick={onClose} className="p-2 text-white/80 hover:text-white">
               <X className="w-5 h-5" />
             </button>
           </div>
         </div>
 
         {/* Slide Content */}
         <AnimatePresence mode="wait">
           <motion.div
             key={`${currentStoryIndex}-${currentSlideIndex}`}
             initial={{ opacity: 0, scale: 1.1 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.9 }}
             transition={{ duration: 0.3 }}
             className="absolute inset-0"
           >
             <img
               src={currentSlide.imageUrl}
               alt={currentSlide.title || ''}
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
           </motion.div>
         </AnimatePresence>
 
         {/* Content Overlay */}
         <div className="absolute bottom-20 left-4 right-4 z-20">
           <motion.div
             key={`content-${currentStoryIndex}-${currentSlideIndex}`}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
           >
             {currentSlide.title && (
               <h3 className="text-white text-xl font-bold mb-2">{currentSlide.title}</h3>
             )}
             {currentSlide.description && (
               <p className="text-white/80 text-sm">{currentSlide.description}</p>
             )}
             {currentSlide.articleId && (
               <button
                 onClick={handleArticleClick}
                 className="mt-4 px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-white/90 transition-colors"
               >
                 Read Article
               </button>
             )}
           </motion.div>
         </div>
 
         {/* Navigation Areas */}
         <button
           onClick={goToPrevSlide}
           className="absolute left-0 top-0 bottom-0 w-1/3 z-10"
           onMouseDown={() => setIsPaused(true)}
           onMouseUp={() => setIsPaused(false)}
           onTouchStart={() => setIsPaused(true)}
           onTouchEnd={() => setIsPaused(false)}
         />
         <button
           onClick={goToNextSlide}
           className="absolute right-0 top-0 bottom-0 w-1/3 z-10"
           onMouseDown={() => setIsPaused(true)}
           onMouseUp={() => setIsPaused(false)}
           onTouchStart={() => setIsPaused(true)}
           onTouchEnd={() => setIsPaused(false)}
         />
 
         {/* Navigation Arrows - Desktop */}
         <button
           onClick={goToPrevSlide}
           className="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
         >
           <ChevronLeft className="w-6 h-6" />
         </button>
         <button
           onClick={goToNextSlide}
           className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
         >
           <ChevronRight className="w-6 h-6" />
         </button>
 
         {/* Story Navigation Thumbnails */}
         <div className="absolute bottom-4 left-0 right-0 z-20">
           <div className="flex justify-center gap-2 px-4 overflow-x-auto scrollbar-hide">
             {stories.map((story, idx) => (
               <button
                 key={story.id}
                 onClick={() => {
                   if (idx !== currentStoryIndex) {
                     onStoryViewed(currentStory.id);
                   }
                   setCurrentStoryIndex(idx);
                   setCurrentSlideIndex(0);
                   setProgress(0);
                 }}
                 className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all flex-shrink-0 ${
                   idx === currentStoryIndex ? 'border-white scale-110' : 'border-white/30 opacity-60'
                 }`}
               >
                 {story.imageUrl ? (
                   <img src={story.imageUrl} alt={story.name} className="w-full h-full object-cover" />
                 ) : (
                   <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                     {story.name[0]}
                   </div>
                 )}
               </button>
             ))}
           </div>
         </div>
       </div>
     </motion.div>
   );
 }