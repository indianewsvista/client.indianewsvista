import { Search, Bell, Sun, Moon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
}

export function Header({ title = 'Home', showSearch = true }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Title - Mobile only */}
        <h1 className="text-xl font-bold lg:hidden">{title}</h1>

        {/* Search - Desktop */}
        {showSearch && (
          <div className="hidden lg:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search topics, media, or journalists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 h-11 bg-secondary/50 border-0 rounded-xl focus-visible:ring-2 focus-visible:ring-primary/20"
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-xl">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl hidden sm:flex">
            <Sun className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
