import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/lib/sanity';

export async function POST(req: NextRequest) {
  try {
    const { code, subtotal } = await req.json();
    if (!code) return NextResponse.json({ error: 'Enginn kóði' }, { status: 400 });

    const doc = await client.fetch(
      `*[_type=="discountCode" && code==$code && active==true][0]`,
      { code: code.toUpperCase().trim() }
    );

    if (!doc) return NextResponse.json({ error: 'Kóðinn er ekki gildur' }, { status: 404 });

    if (doc.expiresAt && new Date(doc.expiresAt) < new Date()) {
      return NextResponse.json({ error: 'Kóðinn er útrunninn' }, { status: 400 });
    }

    if (doc.usageLimit && doc.usageCount >= doc.usageLimit) {
      return NextResponse.json({ error: 'Kóðinn hefur náð hámarks notkun' }, { status: 400 });
    }

    const discount = doc.type === 'percent'
      ? Math.round(subtotal * doc.value / 100)
      : Math.min(doc.value, subtotal);

    return NextResponse.json({
      valid: true,
      code: doc.code,
      type: doc.type,
      value: doc.value,
      discount,
      freeShipping: doc.freeShipping ?? false,
      allowOnBundles: doc.allowOnBundles ?? false,
    });
  } catch (err) {
    console.error('validate-code villa:', err);
    return NextResponse.json({ error: 'Villa' }, { status: 500 });
  }
}
