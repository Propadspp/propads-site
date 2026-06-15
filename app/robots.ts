import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/klara-kaup'] },
    sitemap: 'https://propads.is/sitemap.xml',
  };
}
