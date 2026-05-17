import { getProducts, getPlayers, getSiteSettings } from '@/lib/sanity';
import HomeClient from '@/components/HomeClient';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [products, players, settings] = await Promise.all([getProducts(), getPlayers(), getSiteSettings()]);
  return <HomeClient products={products} players={players} settings={settings} />;
}
