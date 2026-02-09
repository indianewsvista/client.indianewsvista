'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, TrendingUp, Bookmark, User, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/explore', icon: Compass, label: 'Explore' },
  { href: '/trending', icon: TrendingUp, label: 'Trending' },
  { href: '/saved', icon: Bookmark, label: 'Saved' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-card border-r border-border">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold text-foreground">NewsAI</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'nav-link relative',
                isActive && 'active'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <item.icon className={cn(
                'w-5 h-5 relative z-10',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )} />
              <span className={cn(
                'relative z-10',
                isActive && 'text-primary'
              )}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-6 border-t border-border">
        <p className="text-xs text-muted-foreground">
          AI-Powered News Platform
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          © 2024 NewsAI
        </p>
      </div>
    </aside>
  );
}
