import { Article, Topic, UserProfile, Category } from '@/types/news';

export const categories: { id: Category; label: string; color: string }[] = [
  { id: 'business', label: 'Business', color: 'bg-amber-100' },
  { id: 'technology', label: 'Technology', color: 'bg-blue-100' },
  { id: 'politics', label: 'Politics', color: 'bg-red-100' },
  { id: 'sports', label: 'Sports', color: 'bg-green-100' },
  { id: 'entertainment', label: 'Entertainment', color: 'bg-purple-100' },
  { id: 'health', label: 'Health', color: 'bg-pink-100' },
  { id: 'science', label: 'Science', color: 'bg-cyan-100' },
  { id: 'world', label: 'World', color: 'bg-orange-100' },
];

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'The Future of AI: How Machine Learning is Transforming Industries',
    summary: 'Artificial intelligence is revolutionizing how businesses operate, from healthcare to finance.',
    content: `<p>Artificial intelligence has moved from science fiction to everyday reality, transforming industries across the globe. From healthcare diagnostics to financial forecasting, AI systems are now making decisions that were once the exclusive domain of human experts.</p>
    
    <h2>The Healthcare Revolution</h2>
    <p>In hospitals and clinics worldwide, AI is helping doctors diagnose diseases earlier and more accurately than ever before. Machine learning algorithms can now detect cancer in medical images with accuracy that rivals or exceeds human radiologists.</p>
    
    <blockquote>"AI won't replace doctors, but doctors who use AI will replace those who don't." — Dr. Eric Topol</blockquote>
    
    <h2>Financial Markets</h2>
    <p>Wall Street has embraced AI with open arms. Algorithmic trading now accounts for a significant portion of market activity, with AI systems analyzing market patterns and executing trades in milliseconds.</p>
    
    <p>The technology isn't without its challenges. Concerns about bias in AI systems, job displacement, and the need for regulation continue to spark debate among policymakers and industry leaders.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    source: { name: 'TechCrunch', logo: '' },
    author: { name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
    category: 'technology',
    publishedAt: '2024-01-15T10:30:00Z',
    readingTime: 8,
    upvotes: 234,
    isBookmarked: false,
    isTrending: true,
    aiSummary: 'AI is transforming healthcare, finance, and other industries through machine learning, though challenges around bias and regulation remain.',
    tags: ['AI', 'Machine Learning', 'Technology', 'Future'],
  },
  {
    id: '2',
    title: 'Global Markets Rally as Economic Outlook Improves',
    summary: 'Stock markets worldwide surge on positive economic indicators and central bank signals.',
    content: `<p>Global stock markets experienced their strongest rally in months as investors responded to encouraging economic data and supportive comments from central bankers.</p>
    
    <p>The S&P 500 rose 2.3%, while European markets saw gains of up to 3%. Asian markets followed suit, with Japan's Nikkei index reaching levels not seen in over three decades.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    source: { name: 'Bloomberg', logo: '' },
    author: { name: 'Michael Ross', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
    category: 'business',
    publishedAt: '2024-01-15T08:00:00Z',
    readingTime: 5,
    upvotes: 189,
    isBookmarked: true,
    isTrending: true,
    aiSummary: 'Global markets rallied strongly on positive economic data, with major indices posting significant gains.',
    tags: ['Markets', 'Economy', 'Stocks', 'Finance'],
  },
  {
    id: '3',
    title: 'Climate Summit Reaches Historic Agreement on Carbon Emissions',
    summary: 'World leaders commit to ambitious new targets to combat climate change.',
    content: `<p>In a landmark decision, representatives from over 190 countries agreed to accelerate their efforts to reduce carbon emissions and transition to renewable energy sources.</p>
    
    <p>The agreement includes provisions for developed nations to increase financial support for climate adaptation in developing countries.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=800',
    source: { name: 'Reuters', logo: '' },
    author: { name: 'Emma Watson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
    category: 'world',
    publishedAt: '2024-01-14T16:45:00Z',
    readingTime: 6,
    upvotes: 456,
    isBookmarked: false,
    isTrending: true,
    aiSummary: 'Historic climate agreement reached with 190+ countries committing to accelerated emissions reduction.',
    tags: ['Climate', 'Environment', 'Politics', 'Global'],
  },
  {
    id: '4',
    title: 'Breakthrough in Quantum Computing Promises Revolutionary Changes',
    summary: 'Scientists achieve major milestone in quantum error correction, bringing practical quantum computers closer.',
    content: `<p>Researchers at a leading technology company have announced a significant breakthrough in quantum error correction, a key challenge that has long hindered the development of practical quantum computers.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
    source: { name: 'Nature', logo: '' },
    author: { name: 'Dr. James Liu', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
    category: 'science',
    publishedAt: '2024-01-14T12:00:00Z',
    readingTime: 10,
    upvotes: 567,
    isBookmarked: false,
    isTrending: false,
    aiSummary: 'Major quantum computing breakthrough achieved in error correction, accelerating path to practical applications.',
    tags: ['Quantum', 'Computing', 'Science', 'Research'],
  },
  {
    id: '5',
    title: 'New Study Reveals Benefits of Mediterranean Diet for Heart Health',
    summary: 'Research confirms Mediterranean diet reduces cardiovascular disease risk by 30%.',
    content: `<p>A comprehensive study following over 10,000 participants for a decade has provided compelling evidence for the heart-healthy benefits of the Mediterranean diet.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800',
    source: { name: 'Health Today', logo: '' },
    author: { name: 'Dr. Maria Santos', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100' },
    category: 'health',
    publishedAt: '2024-01-13T09:30:00Z',
    readingTime: 7,
    upvotes: 321,
    isBookmarked: false,
    isTrending: false,
    aiSummary: 'Decade-long study confirms Mediterranean diet reduces heart disease risk by 30%.',
    tags: ['Health', 'Diet', 'Heart', 'Research'],
  },
  {
    id: '6',
    title: 'Championship Finals Set Stage for Historic Showdown',
    summary: 'Two legendary teams prepare for what promises to be an unforgettable championship match.',
    content: `<p>Sports fans around the world are gearing up for what many are calling the match of the century as two storied franchises prepare to meet in the championship finals.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1461896836934- voices-c9c9e58d-40b5-80c7-3e73f0?w=800',
    source: { name: 'ESPN', logo: '' },
    author: { name: 'Jake Thompson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
    category: 'sports',
    publishedAt: '2024-01-13T14:00:00Z',
    readingTime: 4,
    upvotes: 278,
    isBookmarked: true,
    isTrending: true,
    aiSummary: 'Historic championship matchup set between two legendary teams.',
    tags: ['Sports', 'Championship', 'Finals'],
  },
  {
    id: '7',
    title: 'Award Season Kicks Off with Surprising Nominations',
    summary: 'This year\'s award nominations include several unexpected picks and snubs.',
    content: `<p>The entertainment industry is buzzing with reactions to this year's award nominations, which included several surprise picks and notable omissions.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800',
    source: { name: 'Variety', logo: '' },
    author: { name: 'Lisa Park', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100' },
    category: 'entertainment',
    publishedAt: '2024-01-12T20:00:00Z',
    readingTime: 5,
    upvotes: 198,
    isBookmarked: false,
    isTrending: false,
    aiSummary: 'Award season begins with surprising nominations generating industry buzz.',
    tags: ['Entertainment', 'Awards', 'Movies', 'TV'],
  },
  {
    id: '8',
    title: 'Election Results Reshape Political Landscape',
    summary: 'Recent elections bring significant changes to the political balance of power.',
    content: `<p>Voters delivered a clear message in this week's elections, bringing sweeping changes to the political landscape that will have implications for years to come.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800',
    source: { name: 'The Guardian', logo: '' },
    author: { name: 'David Miller', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100' },
    category: 'politics',
    publishedAt: '2024-01-12T11:30:00Z',
    readingTime: 8,
    upvotes: 432,
    isBookmarked: false,
    isTrending: true,
    aiSummary: 'Election results bring significant shifts to political power balance.',
    tags: ['Politics', 'Elections', 'Government'],
  },
];

export const mockTopics: Topic[] = [
  { id: '1', name: 'Elon Musk', imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200', viewCount: 15400, type: 'person' },
  { id: '2', name: 'Tim Cook', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', viewCount: 12300, type: 'person' },
  { id: '3', name: 'Taylor Swift', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200', viewCount: 18900, type: 'person' },
  { id: '4', name: 'Sam Altman', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200', viewCount: 9800, type: 'person' },
  { id: '5', name: 'Apple', imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=200', viewCount: 25600, type: 'company' },
  { id: '6', name: 'Tesla', imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=200', viewCount: 21300, type: 'company' },
  { id: '7', name: 'OpenAI', imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200', viewCount: 19800, type: 'company' },
  { id: '8', name: 'Microsoft', imageUrl: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=200', viewCount: 17200, type: 'company' },
];

export const mockUser: UserProfile = {
  id: '1',
  name: 'Alex Johnson',
  username: '@alexj',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
  bio: 'Tech enthusiast & news junkie',
  role: 'Premium Member',
  topicsFollowed: mockTopics.slice(0, 4),
  savedArticles: mockArticles.filter(a => a.isBookmarked),
};

export const trendingTabs = ['Today', 'This Week', 'This Month'] as const;
export const exploreTabs = ['People', 'Company', 'Days'] as const;
