'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, TrendingUp, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/explore', icon: Search, label: 'Explore' },
  { href: '/trending', icon: TrendingUp, label: 'Trending' },
  { href: '/saved', icon: Bookmark, label: 'Save' },
];

export function MobileNav() {
  const pathname = usePathname();
  const { user } = useApp();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border">
      <div className="flex items-center justify-around py-2 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center gap-1 py-2 px-3"
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-active"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <item.icon className={cn(
                'w-5 h-5 relative z-10 transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )} />
              <span className={cn(
                'text-xs font-medium relative z-10 transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
        {/* Profile with avatar */}
        <Link
          href="/profile"
          className="relative flex flex-col items-center gap-1 py-2 px-3"
        >
          {pathname === '/profile' && (
            <motion.div
              layoutId="mobile-nav-active"
              className="absolute inset-0 bg-primary/10 rounded-xl"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <img 
            src={user.avatar}
            alt={user.name}
            className={cn(
              'w-5 h-5 rounded-full object-cover relative z-10 ring-1',
              pathname === '/profile' ? 'ring-primary' : 'ring-transparent'
            )}
          />
          <span className={cn(
            'text-xs font-medium relative z-10 transition-colors',
            pathname === '/profile' ? 'text-primary' : 'text-muted-foreground'
          )}>
            {user.name.split(' ')[0]}
          </span>
        </Link>
      </div>
      {/* Safe area for iOS */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
