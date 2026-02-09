 import { motion } from 'framer-motion';
 
 interface ExploreTabsProps {
   tabs: readonly string[];
   activeTab: string;
   onTabChange: (tab: string) => void;
 }
 
 export function ExploreTabs({ tabs, activeTab, onTabChange }: ExploreTabsProps) {
   return (
     <div className="flex justify-center px-4 py-4">
       <div className="inline-flex bg-secondary/50 rounded-full p-1">
         {tabs.map((tab) => (
           <button
             key={tab}
             onClick={() => onTabChange(tab)}
             className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all`}
           >
             {activeTab === tab && (
               <motion.div
                 layoutId="explore-tab-bg"
                 className="absolute inset-0 bg-card rounded-full shadow-sm"
                 transition={{ type: 'spring', stiffness: 500, damping: 30 }}
               />
             )}
             <span className={`relative z-10 ${
               activeTab === tab ? 'text-foreground' : 'text-muted-foreground'
             }`}>
               {tab}
             </span>
           </button>
         ))}
       </div>
     </div>
   );
 }