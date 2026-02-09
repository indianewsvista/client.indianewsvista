# API Integration

This directory contains the API integration for connecting to the Django backend.

## Files

- **`api.ts`** - Core API client with request methods
- **`api-client.ts`** - Client-side specific API utilities (bookmark, like, follow, etc.)

## Environment Variables

Create `.env.local` with:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Usage

### Server Components (Server Actions)

```typescript
import { getArticles } from '@/actions/articles';

const articles = await getArticles();
```

### Client Components

```typescript
'use client';
import { useAuth } from '@/context/AuthContext';
import { toggleArticleBookmark } from '@/lib/api-client';

function MyComponent() {
  const { isAuthenticated } = useAuth();
  
  const handleBookmark = async (articleId: number) => {
    if (!isAuthenticated) return;
    await toggleArticleBookmark(articleId);
  };
}
```

## Authentication

The app uses JWT authentication with access and refresh tokens stored in localStorage.

- Access token expires in 1 hour
- Refresh token expires in 7 days
- Tokens are automatically included in authenticated requests

## Fallback Behavior

All server actions include fallback to mock data if the backend is unavailable, ensuring the app works during development.
