'use client';

import { ChevronLeft, Plus, Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
 
 interface MobileHeaderProps {
   title?: string;
   showBack?: boolean;
   showLogo?: boolean;
   rightAction?: React.ReactNode;
 }
 
 export function MobileHeader({ title, showBack = true, showLogo = true, rightAction }: MobileHeaderProps) {
   const { theme, toggleTheme } = useTheme();
  const router = useRouter();  
  return (     <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
       <div className="flex items-center justify-between px-4 py-3">
         {/* Left Section */}
         <div className="flex items-center gap-3">
          {showBack && (
            <button 
              onClick={() => router.back()}
               className="p-1 -ml-1"
             >
               <ChevronLeft className="w-6 h-6 text-foreground" />
             </button>
           )}
           {showLogo && (
             <div className="flex items-center gap-2">
               <div className="w-7 h-7 bg-primary rounded-full" />
               <span className="font-bold text-sm tracking-tight">
                 USA<br/>TODAY
               </span>
             </div>
           )}
           {title && !showLogo && (
             <h1 className="font-bold text-lg">{title}</h1>
           )}
         </div>
 
         {/* Right Section */}
         <div className="flex items-center gap-2">
           <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-border">
             <Plus className="w-5 h-5" />
           </button>
           
           {/* Theme Toggle */}
           <button
             onClick={toggleTheme}
             className="relative w-14 h-8 rounded-full bg-secondary flex items-center px-1 transition-colors"
           >
             <motion.div
               initial={false}
               animate={{ x: theme === 'dark' ? 24 : 0 }}
               transition={{ type: 'spring', stiffness: 500, damping: 30 }}
               className="w-6 h-6 rounded-full bg-card shadow-md flex items-center justify-center"
             >
               {theme === 'dark' ? (
                 <Moon className="w-3.5 h-3.5 text-primary" />
               ) : (
                 <Sun className="w-3.5 h-3.5 text-amber-500" />
               )}
             </motion.div>
           </button>
 
           <button className="p-2">
             <Menu className="w-5 h-5" />
           </button>
           
           {rightAction}
         </div>
       </div>
     </header>
   );
 }