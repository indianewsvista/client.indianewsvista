import { motion } from 'framer-motion';

export function ArticleCardSkeleton({ variant = 'default' }: { variant?: 'default' | 'hero' | 'compact' }) {
  if (variant === 'hero') {
    return (
      <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden skeleton" />
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex gap-4 p-3">
        <div className="w-20 h-20 rounded-xl skeleton flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 skeleton rounded w-full" />
          <div className="h-4 skeleton rounded w-3/4" />
          <div className="h-3 skeleton rounded w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-2xl overflow-hidden bg-card"
    >
      <div className="aspect-[16/10] skeleton" />
      <div className="p-5 space-y-4">
        <div className="flex gap-2">
          <div className="h-6 w-20 skeleton rounded-full" />
          <div className="h-6 w-24 skeleton rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-5 skeleton rounded w-full" />
          <div className="h-5 skeleton rounded w-4/5" />
        </div>
        <div className="h-4 skeleton rounded w-2/3" />
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full skeleton" />
            <div className="h-4 w-24 skeleton rounded" />
          </div>
          <div className="h-4 w-16 skeleton rounded" />
        </div>
      </div>
    </motion.div>
  );
}
