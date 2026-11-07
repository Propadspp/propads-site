import type { MetadataRoute } from 'next';
import { getProducts } from '@/lib/sanity';
import { SITE_URL } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/legghlifar`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/gripsokkar`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/tilbod`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/staerd-leidbeiningar`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/um-okkur`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/skilaregla`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/personuvernd`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
  try {
    const products = await getProducts();
    for (const p of products) {
      pages.push({ url: `${SITE_URL}/vara/${encodeURIComponent(p.slug.current)}`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 });
    }
  } catch {}
  return pages;
}
