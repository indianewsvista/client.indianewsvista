'use client';

import { useApp } from '@/context/AppContext';
import { 
  ChevronLeft,
  ChevronRight, 
  Edit, 
  Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MobileNav } from '@/components/layout/MobileNav';
import { DesktopSidebar } from '@/components/layout/DesktopSidebar';

export function ProfileClient() {
  const router = useRouter();
  const { user, followedTopics } = useApp();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Please log in to view your profile</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <DesktopSidebar />
      
      <div className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm px-4 py-3">
          <div className="flex items-center justify-between">
            <button onClick={() => router.back()} className="p-1 -ml-1">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="font-bold text-lg">Profile</h1>
            <button className="flex items-center gap-1 text-primary text-sm font-medium">
              <Edit className="w-4 h-4" />
              Edit
            </button>
          </div>
        </header>

        <div className="px-4 pb-24 lg:pb-8">
          {/* Profile Avatar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center pt-4 pb-6"
          >
            <img
              src={user?.avatar || '/default-avatar.png'}
              alt={user?.name || 'User'}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-secondary mb-4"
            />
            <h2 className="text-xl font-bold">{user?.name || 'User'}</h2>
            <p className="text-muted-foreground text-sm">
              {user?.role} <span className="text-primary">{user?.username}</span>
            </p>
          </motion.div>

          {/* Topics Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="bg-accent/40 rounded-3xl p-5 relative overflow-hidden">
              {followedTopics.length === 0 ? (
                <>
                  <p className="text-foreground font-medium mb-3 max-w-[60%]">
                    Hey its seems like you haven't add any topic yet.
                  </p>
                  <Link href="/explore">
                    <button className="flex items-center gap-2 bg-foreground text-background rounded-full px-4 py-2 text-sm font-medium">
                      <Plus className="w-4 h-4" />
                      Add topic
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-foreground font-medium mb-3">
                    You're following {followedTopics.length} topics
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {followedTopics.slice(0, 5).map((topic) => (
                      <span key={topic.id} className="px-3 py-1 bg-background/20 backdrop-blur-sm rounded-full text-xs">
                        {topic.name}
                      </span>
                    ))}
                    {followedTopics.length > 5 && (
                      <span className="px-3 py-1 bg-background/20 backdrop-blur-sm rounded-full text-xs">
                        +{followedTopics.length - 5} more
                      </span>
                    )}
                  </div>
                  <Link href="/explore">
                    <button className="text-sm font-medium underline">
                      Manage topics
                    </button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>

          {/* Account Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl overflow-hidden shadow-sm"
          >
            <Link href="/settings" className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors border-b border-border">
              <span className="font-medium">Settings</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
            <Link href="/saved" className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors border-b border-border">
              <span className="font-medium">Saved Articles</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
            <button className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors w-full">
              <span className="font-medium">Help & Support</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors w-full text-destructive">
              <span className="font-medium">Sign Out</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-4 mt-8"
          >
            <div className="bg-card rounded-2xl p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-primary">{followedTopics.length}</div>
              <div className="text-xs text-muted-foreground mt-1">Topics</div>
            </div>
            <div className="bg-card rounded-2xl p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-primary">24</div>
              <div className="text-xs text-muted-foreground mt-1">Read Today</div>
            </div>
            <div className="bg-card rounded-2xl p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-primary">156</div>
              <div className="text-xs text-muted-foreground mt-1">Total Read</div>
            </div>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </div>
  );
}
