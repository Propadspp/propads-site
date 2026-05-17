import { getProducts, getGripsokkarBundles } from '@/lib/sanity';
import GripsokkarClient from './GripsokkarClient';

export const dynamic = 'force-dynamic';

export default async function GripsokkarPage() {
  const [products, tiers] = await Promise.all([getProducts(), getGripsokkarBundles()]);
  const gripsokkar = products.filter(p => p.category === 'gripsokkar');
  return <GripsokkarClient products={gripsokkar} tiers={tiers} />;
}
