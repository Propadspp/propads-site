import { getProducts, getGripsokkarBundles } from '@/lib/sanity';
import GripsokkarClient from './GripsokkarClient';

export const revalidate = 60;

export default async function GripsokkarPage() {
  const [products, tiers] = await Promise.all([getProducts(), getGripsokkarBundles()]);
  const gripsokkar = products.filter(p => p.category === 'gripsokkar');
  return <GripsokkarClient products={gripsokkar} tiers={tiers} />;
}
