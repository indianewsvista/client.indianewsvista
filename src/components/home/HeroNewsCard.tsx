'use client';

import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';
import { Article } from '@/types/news';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
 
 interface HeroNewsCardProps {
   article: Article;
 }
 
 export function HeroNewsCard({ article }: HeroNewsCardProps) {
   const { toggleBookmark, isArticleBookmarked } = useApp();
   const isBookmarked = isArticleBookmarked(article.id);
 
   const timeAgo = (date: string) => {
     const hours = Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60));
     if (hours < 24) return `${hours}h ago`;
     return `${Math.floor(hours / 24)}d ago`;
   };
 
   return (
     <motion.div
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       className="relative"
     >
       <Link href={`/article/${article.id}`} className="block">
         <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
           <img
             src={article.imageUrl}
             alt={article.title}
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
           
           {/* Bookmark Button */}
           <button
             onClick={(e) => {
               e.preventDefault();
               toggleBookmark(article);
             }}
             className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center"
           >
             <Bookmark className={`w-5 h-5 text-white ${isBookmarked ? 'fill-white' : ''}`} />
           </button>
 
           {/* Content */}
           <div className="absolute bottom-0 left-0 right-0 p-5">
             <h2 className="text-white text-xl font-bold leading-tight mb-4">
               {article.title}
             </h2>
             
             <div className="flex items-center gap-3">
               <div className="flex items-center gap-2">
                 <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                   <span className="text-[8px] text-white font-bold">USA</span>
                 </div>
                 <span className="text-white/90 text-xs font-medium">{article.source.name}</span>
               </div>
               <span className="text-white/60 text-xs">{timeAgo(article.publishedAt)}</span>
             </div>
             
             <div className="flex items-center gap-4 mt-2 text-white/70 text-xs">
               <span>{article.author.name}</span>
               <span>·</span>
               <span>{article.readingTime} min Reads</span>
               <span>·</span>
               <span>{article.upvotes} Upvote</span>
             </div>
           </div>
         </div>
       </Link>
     </motion.div>
   );
 }