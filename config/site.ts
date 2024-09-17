import { SidebarNavItem, SiteConfig } from 'types';
import { env } from '@/env.mjs';

const siteUrl = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: 'WordWizzz!',
  description: 'Learn words with WordWizzz!',
  url: siteUrl,
  ogImage: `${siteUrl}/_static/og.jpg`,
  links: {
    website: 'https://lilliputten.com/',
    github: 'https://github.com/lilliputten/wordwizzz-saas',
  },
  mailSupport: 'support@saas-starter.com',
};

export const footerLinks: SidebarNavItem[] = [
  {
    title: 'Company',
    items: [
      { title: 'About', href: '#' },
      { title: 'Enterprise', href: '#' },
      { title: 'Terms', href: '/terms' },
      { title: 'Privacy', href: '/privacy' },
    ],
  },
  {
    title: 'Product',
    items: [
      { title: 'Security', href: '#' },
      { title: 'Customization', href: '#' },
      { title: 'Customers', href: '#' },
      { title: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'Docs',
    items: [
      { title: 'Introduction', href: '#' },
      { title: 'Installation', href: '#' },
      { title: 'Components', href: '#' },
      { title: 'Code Blocks', href: '#' },
    ],
  },
];
