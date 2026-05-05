import { getProducts, getPlayers } from '@/lib/sanity';
import HomeClient from '@/components/HomeClient';

export const revalidate = 60;

export default async function HomePage() {
  const [products, players] = await Promise.all([getProducts(), getPlayers()]);
  return <HomeClient products={products} players={players} />;
}
