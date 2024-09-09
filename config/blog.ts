export const BLOG_CATEGORIES: {
  title: string;
  slug: 'news' | 'education';
  description: string;
}[] = [
  {
    title: 'News',
    slug: 'news',
    description: 'Updates and announcements from WordWizzz!',
  },
  {
    title: 'Education',
    slug: 'education',
    description: 'Educational content about English language learning.',
  },
];

export const BLOG_AUTHORS = {
  lilliputten: {
    name: 'lilliputten',
    image: '/_static/avatars/lilliputten.jpeg',
    website: 'https://lilliputten.com',
  },
  mickasmt: {
    name: 'mickasmt',
    image: '/_static/avatars/mickasmt.png',
    twitter: 'miickasmt',
  },
  shadcn: {
    name: 'shadcn',
    image: '/_static/avatars/shadcn.jpeg',
    twitter: 'shadcn',
  },
};
