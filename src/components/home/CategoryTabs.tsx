 import { motion } from 'framer-motion';
 
 interface CategoryTabsProps {
   categories: string[];
   activeCategory: string;
   onCategoryChange: (category: string) => void;
 }
 
 export function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
   return (
     <div className="overflow-x-auto scrollbar-hide">
       <div className="flex gap-6 px-4 py-3">
         {categories.map((category) => (
           <button
             key={category}
             onClick={() => onCategoryChange(category)}
             className="relative whitespace-nowrap"
           >
             <span className={`text-sm font-medium transition-colors ${
               activeCategory === category 
                 ? 'text-primary' 
                 : 'text-muted-foreground'
             }`}>
               {category}
             </span>
             {activeCategory === category && (
               <motion.div
                 layoutId="category-underline"
                 className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                 transition={{ type: 'spring', stiffness: 500, damping: 30 }}
               />
             )}
           </button>
         ))}
       </div>
     </div>
   );
 }