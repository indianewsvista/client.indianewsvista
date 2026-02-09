 export interface Story {
   id: string;
   name: string;
   imageUrl: string;
   slides: StorySlide[];
   isViewed: boolean;
 }
 
 export interface StorySlide {
   id: string;
   type: 'image' | 'article';
   imageUrl: string;
   title?: string;
   description?: string;
   articleId?: string;
 }