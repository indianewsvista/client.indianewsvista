export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  source: {
    name: string;
    logo?: string;
  };
  author: {
    name: string;
    avatar?: string;
  };
  category: Category;
  publishedAt: string;
  readingTime: number;
  upvotes: number;
  isBookmarked: boolean;
  isTrending: boolean;
  aiSummary?: string;
  tags: string[];
}

export type Category = 
  | 'business'
  | 'technology'
  | 'politics'
  | 'sports'
  | 'entertainment'
  | 'health'
  | 'science'
  | 'world';

export interface Topic {
  id: string;
  name: string;
  imageUrl: string;
  viewCount: number;
  type: 'person' | 'company' | 'event';
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  role: string;
  topicsFollowed: Topic[];
  savedArticles: Article[];
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  notifications: boolean;
}
