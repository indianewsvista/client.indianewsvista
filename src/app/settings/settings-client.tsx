'use client';

import { useApp } from '@/context/AppContext';
import { 
  Settings as SettingsIcon, 
  Sun, 
  Moon, 
  Monitor,
  Type,
  Bell,
  BellOff,
  Shield,
  LogOut,
  ChevronLeft,
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { MobileNav } from '@/components/layout/MobileNav';
import { DesktopSidebar } from '@/components/layout/DesktopSidebar';

const themeOptions = [
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'system', label: 'System', icon: Monitor },
] as const;

const fontSizeOptions = [
  { id: 'small', label: 'Small', size: '14px' },
  { id: 'medium', label: 'Medium', size: '16px' },
  { id: 'large', label: 'Large', size: '18px' },
] as const;

export function SettingsClient() {
  const { preferences, updatePreferences } = useApp();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <DesktopSidebar />
      
      <div className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="p-1 -ml-1">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-primary/10">
                <SettingsIcon className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Settings</h1>
            </div>
          </div>
        </header>

        <div className="px-4 lg:px-8 pb-24 lg:pb-8 max-w-2xl mx-auto">
          {/* Display Preferences */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="font-semibold mb-4">Display preferences</h2>
            
            {/* Theme */}
            <div className="bg-card rounded-2xl p-4 mb-4 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Sun className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Theme</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {themeOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => updatePreferences({ theme: option.id })}
                    className={cn(
                      'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                      preferences.theme === option.id
                        ? 'border-primary bg-primary/5'
                        : 'border-transparent bg-secondary/50 hover:bg-secondary'
                    )}
                  >
                    <option.icon className={cn(
                      'w-6 h-6',
                      preferences.theme === option.id ? 'text-primary' : 'text-muted-foreground'
                    )} />
                    <span className="text-sm font-medium">{option.label}</span>
                    {preferences.theme === option.id && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size */}
            <div className="bg-card rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Type className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Font size</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {fontSizeOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => updatePreferences({ fontSize: option.id })}
                    className={cn(
                      'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                      preferences.fontSize === option.id
                        ? 'border-primary bg-primary/5'
                        : 'border-transparent bg-secondary/50 hover:bg-secondary'
                    )}
                  >
                    <span style={{ fontSize: option.size }} className="font-medium">Aa</span>
                    <span className="text-sm">{option.label}</span>
                    {preferences.fontSize === option.id && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Notifications */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h2 className="font-semibold mb-4">Notifications</h2>
            
            <div className="bg-card rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {preferences.notifications ? (
                    <Bell className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <BellOff className="w-5 h-5 text-muted-foreground" />
                  )}
                  <div>
                    <p className="font-medium">Push notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified about breaking news
                    </p>
                  </div>
                </div>
                <Switch
                  checked={preferences.notifications}
                  onCheckedChange={(checked) => updatePreferences({ notifications: checked })}
                />
              </div>
            </div>
          </motion.section>

          {/* Privacy */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="font-semibold mb-4">Privacy</h2>
            
            <div className="bg-card rounded-2xl overflow-hidden shadow-sm">
              <button className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">Privacy policy</span>
                </div>
                <ChevronLeft className="w-5 h-5 text-muted-foreground rotate-180" />
              </button>
              <div className="h-px bg-border mx-4" />
              <button className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">Terms of service</span>
                </div>
                <ChevronLeft className="w-5 h-5 text-muted-foreground rotate-180" />
              </button>
            </div>
          </motion.section>

          {/* Logout */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button className="w-full flex items-center justify-center gap-2 p-4 bg-destructive/10 text-destructive rounded-2xl hover:bg-destructive/20 transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Log out</span>
            </button>
          </motion.section>

          {/* Version */}
          <p className="text-center text-xs text-muted-foreground mt-8">
            Intel Drift v1.0.0
          </p>
        </div>

        <MobileNav />
      </div>
    </div>
  );
}
