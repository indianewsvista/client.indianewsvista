 import { motion } from 'framer-motion';
 import { Topic } from '@/types/news';
 
 interface TopicBentoGridProps {
   topics: Topic[];
 }
 
 export function TopicBentoGrid({ topics }: TopicBentoGridProps) {
   const formatViews = (count: number) => {
     if (count >= 1000) return `${(count / 1000).toFixed(1)}k views`;
     return `${count} views`;
   };
 
   // Define sizes for each position to create an organic layout
   const sizes = [
     { width: 100, top: 0, left: 0 },      // 0 - top left (large)
     { width: 72, top: 30, left: 110 },    // 1 - top middle (small, offset down)
     { width: 88, top: 0, left: 195 },     // 2 - top right (medium)
     { width: 64, top: 110, left: 0 },     // 3 - bottom left (small)
     { width: 120, top: 85, left: 70 },    // 4 - center (large)
     { width: 64, top: 110, left: 200 },   // 5 - bottom right (small)
   ];
 
   return (
     <div className="relative px-4">
       <div className="relative h-[220px] mx-auto max-w-[280px]">
         {topics.slice(0, 6).map((topic, index) => {
           const size = sizes[index] || sizes[0];
           return (
             <motion.button
               key={topic.id}
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: index * 0.08 }}
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="absolute rounded-full overflow-hidden"
               style={{
                 width: size.width,
                 height: size.width,
                 top: size.top,
                 left: size.left,
               }}
             >
               <img
                 src={topic.imageUrl}
                 alt={topic.name}
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
               <div className="absolute bottom-1.5 left-0 right-0 text-center px-1">
                 <p className="text-white text-[10px] font-semibold leading-tight truncate">{topic.name}</p>
                 <p className="text-white/70 text-[8px]">{formatViews(topic.viewCount)}</p>
               </div>
             </motion.button>
           );
         })}
       </div>
     </div>
   );
 }