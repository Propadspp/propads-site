import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'csquxojb',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: SanityImageSource) => builder.image(source);

export type Product = {
  _id: string;
  name: string;
  slug: { current: string };
  category: 'legghlifar' | 'gripsokkar';
  price: number;
  description?: string;
  images: { asset: { _ref: string }; alt?: string }[];
  sizes: { size: string; stock: number }[];
  featured?: boolean;
};

export type Player = {
  _id: string;
  name: string;
  club: string;
  image?: { asset: { _ref: string } };
  order?: number;
};

export async function getProducts(): Promise<Product[]> {
  return client.fetch(
    `*[_type=="product" && !(_id in path("drafts.**"))] | order(_createdAt asc) {
      _id, name, slug, category, price, description,
      images[]{ asset, alt },
      sizes[]{ size, stock },
      featured
    }`
  );
}

export type Bundle = {
  _id: string;
  name: string;
  slug: { current: string };
  description?: string;
  price: number;
  originalPrice?: number;
  legghlif: number;
  gripsokkar: number;
  badge?: string;
  active: boolean;
  order?: number;
};

export async function getBundles(): Promise<Bundle[]> {
  return client.fetch(
    `*[_type=="bundle" && active==true && !(_id in path("drafts.**"))] | order(order asc) {
      _id, name, slug, description, price, originalPrice, legghlif, gripsokkar, badge, active, order
    }`
  );
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const results = await client.fetch<Product[]>(
    `*[_type=="product" && slug.current==$slug && !(_id in path("drafts.**"))][0..0] {
      _id, name, slug, category, price, description,
      images[]{ asset, alt },
      sizes[]{ size, stock },
      featured
    }`,
    { slug }
  );
  return results?.[0] ?? null;
}

export async function getPlayers(): Promise<Player[]> {
  return client.fetch(
    `*[_type=="player" && !(_id in path("drafts.**"))] | order(order asc) {
      _id, name, club, image{ asset }, order
    }`
  );
}
