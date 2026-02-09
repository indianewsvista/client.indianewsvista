'use client';

import { motion } from 'framer-motion';
import { Article } from '@/types/news';
import Link from 'next/link';
 
 interface TrendingCollectionProps {
   articles: Article[];
 }
 
 export function TrendingCollection({ articles }: TrendingCollectionProps) {
   if (!articles || articles.length === 0) {
     return null;
   }
   
   return (
     <section className="mt-6">
       <h3 className="text-lg font-bold mb-4 px-4">Trending Collection</h3>
       <div className="grid grid-cols-2 gap-3 px-4">
         {articles.slice(0, 4).map((article, index) => (
           <motion.div
             key={article.id}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: index * 0.1 }}
           >
             <Link href={`/article/${article.id}`} className="block">
               <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                 <img
                   src={article.imageUrl}
                   alt={article.title}
                   className="w-full h-full object-cover"
                 />
               </div>
             </Link>
           </motion.div>
         ))}
       </div>
     </section>
   );
 }