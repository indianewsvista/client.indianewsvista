import { ReactNode } from 'react';
import { DesktopSidebar } from './DesktopSidebar';
import { MobileNav } from './MobileNav';
import { Header } from './Header';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  showSearch?: boolean;
  rightPanel?: ReactNode;
}

export function MainLayout({ children, title, showSearch = true, rightPanel }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex w-full">
        {/* Desktop Sidebar */}
        <DesktopSidebar />

        {/* Main Content Area */}
         <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
          <Header title={title} showSearch={showSearch} />
          
          <div className="flex-1 flex">
            {/* Main Content */}
            <main className="flex-1 pb-24 lg:pb-8">
              {children}
            </main>

            {/* Right Panel - Desktop only */}
            {rightPanel && (
              <aside className="hidden xl:block w-80 border-l border-border p-6 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar">
                {rightPanel}
              </aside>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
}
