import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';

export async function GET() {
  try {
    const doc = await client.fetch(
      `*[_type=="siteSettings"][0]{ freeShipping }`,
      {},
      { cache: 'no-store' }
    );
    return NextResponse.json({ freeShipping: doc?.freeShipping ?? false });
  } catch {
    return NextResponse.json({ freeShipping: false });
  }
}
