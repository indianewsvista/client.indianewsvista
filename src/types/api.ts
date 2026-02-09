// API Response Types matching Django backend

export interface ApiArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string; // Optional - may not be in list responses
  author: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  topics: Array<{
    id: number;
    name: string;
    slug: string;
    is_following: boolean;
  }>;
  tags: string[];
  image_url: string;
  source_url?: string;
  is_featured: boolean;
  is_breaking: boolean;
  views: number;
  likes_count: number;
  comments_count: number;
  bookmarks_count: number;
  is_bookmarked: boolean;
  is_liked: boolean;
  published_at: string;
  created_at: string;
}

export interface ApiTopic {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image_url?: string;
  followers_count: number;
  views: number;
  is_following: boolean;
  created_at: string;
}

export interface ApiStory {
  id: number;
  title: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  source_article?: {
    id: number;
    title: string;
  };
  slides: Array<{
    id: number;
    content: string;
    image_url: string;
    order: number;
    duration: number;
  }>;
  views: number;
  is_viewed: boolean;
  created_at: string;
  expires_at: string;
}

export interface ApiUserProfile {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  bio: string;
  avatar: string;
  location?: string;
  website?: string;
  birth_date?: string;
  followers_count: number;
  following_count: number;
  email_notifications: boolean;
  push_notifications: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApiCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  article_count?: number;
}

export interface ApiComment {
  id: number;
  article: number;
  user: {
    username: string;
    avatar: string;
  };
  content: string;
  parent?: number;
  replies?: ApiComment[];
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password2: string;
  first_name?: string;
  last_name?: string;
}
