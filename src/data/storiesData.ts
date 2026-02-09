 import { Story } from '@/types/story';
 
 export const mockStories: Story[] = [
   {
     id: 'discover',
     name: 'Discover',
     imageUrl: '',
     isViewed: false,
     slides: [
       {
         id: 'd1',
         type: 'image',
         imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
         title: 'Discover New Stories',
         description: 'Explore trending news and personalized content curated just for you.',
       },
       {
         id: 'd2',
         type: 'image',
         imageUrl: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800',
         title: 'Stay Informed',
         description: 'Get AI-powered summaries of the most important news.',
       },
     ],
   },
   {
     id: 'tech',
     name: 'Tech',
     imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200',
     isViewed: false,
     slides: [
       {
         id: 't1',
         type: 'article',
         imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
         title: 'AI Revolution',
         description: 'How Machine Learning is Transforming Industries',
         articleId: '1',
       },
       {
         id: 't2',
         type: 'image',
         imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
         title: 'Quantum Computing Breakthrough',
         description: 'Scientists achieve major milestone in quantum error correction.',
       },
     ],
   },
   {
     id: 'business',
     name: 'Business',
     imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200',
     isViewed: false,
     slides: [
       {
         id: 'b1',
         type: 'article',
         imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
         title: 'Global Markets Rally',
         description: 'Stock markets worldwide surge on positive economic indicators.',
         articleId: '2',
       },
     ],
   },
   {
     id: 'world',
     name: 'World',
     imageUrl: 'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=200',
     isViewed: false,
     slides: [
       {
         id: 'w1',
         type: 'article',
         imageUrl: 'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=800',
         title: 'Climate Summit',
         description: 'Historic agreement on carbon emissions.',
         articleId: '3',
       },
     ],
   },
   {
     id: 'health',
     name: 'Health',
     imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200',
     isViewed: false,
     slides: [
       {
         id: 'h1',
         type: 'article',
         imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800',
         title: 'Mediterranean Diet Benefits',
         description: 'Research confirms heart-healthy benefits.',
         articleId: '5',
       },
     ],
   },
   {
     id: 'sports',
     name: 'Sports',
     imageUrl: 'https://images.unsplash.com/photo-1461896836934- voices-c9c9e58d-40b5-80c7-3e73f0?w=200',
     isViewed: false,
     slides: [
       {
         id: 's1',
         type: 'article',
         imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
         title: 'Championship Finals',
         description: 'Historic showdown between legendary teams.',
         articleId: '6',
       },
     ],
   },
   {
     id: 'entertainment',
     name: 'Entertainment',
     imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200',
     isViewed: false,
     slides: [
       {
         id: 'e1',
         type: 'article',
         imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800',
         title: 'Award Season',
         description: 'Surprising nominations shake up Hollywood.',
         articleId: '7',
       },
     ],
   },
 ];