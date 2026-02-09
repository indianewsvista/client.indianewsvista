'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
 
 interface Category {
   id: string;
   label: string;
   color: string;
   illustration?: string;
 }
 
 interface CategoryCardsProps {
   categories: Category[];
 }
 
 export function CategoryCards({ categories }: CategoryCardsProps) {
   // Define background colors that match the design
   const categoryColors: Record<string, string> = {
     business: 'bg-amber-100 dark:bg-amber-900/30',
     technology: 'bg-cyan-100 dark:bg-cyan-900/30',
     politics: 'bg-red-100 dark:bg-red-900/30',
     sports: 'bg-green-100 dark:bg-green-900/30',
     entertainment: 'bg-purple-100 dark:bg-purple-900/30',
     health: 'bg-pink-100 dark:bg-pink-900/30',
     science: 'bg-blue-100 dark:bg-blue-900/30',
     world: 'bg-orange-100 dark:bg-orange-900/30',
   };
 
   return (
     <div className="grid grid-cols-2 gap-3 px-4">
       {categories.map((category, index) => (
         <motion.div
           key={category.id}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: index * 0.05 }}
         >
           <Link
             href={`/category/${category.id}`}
             className={`block aspect-[4/3] rounded-2xl ${categoryColors[category.id] || category.color} p-4 relative overflow-hidden`}
           >
             <div className="absolute bottom-4 left-4">
               <h3 className="text-lg font-bold text-foreground">{category.label}</h3>
             </div>
             {/* Placeholder for illustration - in production would use actual SVG illustrations */}
             <div className="absolute right-2 top-2 bottom-8 w-1/2 opacity-30">
               {/* Illustration would go here */}
             </div>
           </Link>
         </motion.div>
       ))}
     </div>
   );
 }