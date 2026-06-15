import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://propads.is';
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/legghlífar`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/gripsokkar`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/um-okkur`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/skilareglur`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];
}
