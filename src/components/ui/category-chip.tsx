import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CategoryChipProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function CategoryChip({ label, isActive = false, onClick }: CategoryChipProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'category-chip whitespace-nowrap',
        isActive && 'active'
      )}
    >
      {label}
    </motion.button>
  );
}
