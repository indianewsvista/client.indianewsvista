'use client';

import { useAuth } from '@/context/AuthContext';
import { AuthDialog } from '@/components/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User } from 'lucide-react';

export default function AuthTestPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthDialog />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome back!</CardTitle>
          <CardDescription>You are successfully logged in</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.avatar} alt={user?.username} />
              <AvatarFallback>
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">
                {user?.first_name} {user?.last_name}
              </h3>
              <p className="text-sm text-muted-foreground">@{user?.username}</p>
            </div>
          </div>

          {user?.bio && (
            <div>
              <p className="text-sm text-muted-foreground">{user.bio}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 rounded-lg bg-secondary">
              <p className="text-2xl font-bold">{user?.followers_count || 0}</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary">
              <p className="text-2xl font-bold">{user?.following_count || 0}</p>
              <p className="text-xs text-muted-foreground">Following</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Email:</span>
              <span>{user?.email}</span>
            </div>
            {user?.location && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Location:</span>
                <span>{user.location}</span>
              </div>
            )}
            {user?.website && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Website:</span>
                <a
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {user.website}
                </a>
              </div>
            )}
          </div>

          <Button onClick={logout} variant="destructive" className="w-full">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
