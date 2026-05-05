import { getProducts } from '@/lib/sanity';
import LegghlífarClient from './LegghlífarClient';

export const revalidate = 60;

export default async function LegghlífarPage() {
  const products = await getProducts();
  const legghlifar = products.filter(p => p.category === 'legghlifar');
  return <LegghlífarClient products={legghlifar} />;
}
