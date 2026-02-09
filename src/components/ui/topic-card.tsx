import { Topic } from '@/types/news';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

interface TopicCardProps {
  topic: Topic;
  index?: number;
  onClick?: () => void;
}

export function TopicCard({ topic, index = 0, onClick }: TopicCardProps) {
  const formatViewCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="topic-card text-center group"
    >
      <div className="relative">
        <img
          src={topic.imageUrl}
          alt={topic.name}
          className="w-20 h-20 rounded-full object-cover mx-auto ring-4 ring-secondary group-hover:ring-primary/20 transition-all"
        />
      </div>
      <h4 className="font-semibold text-sm mt-3 line-clamp-1">{topic.name}</h4>
      <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mt-1">
        <Eye className="w-3 h-3" />
        <span>{formatViewCount(topic.viewCount)} views</span>
      </div>
    </motion.button>
  );
}
