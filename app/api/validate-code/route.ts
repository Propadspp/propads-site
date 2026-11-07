import { NextRequest, NextResponse } from 'next/server';
import { checkDiscountCode } from '@/lib/discount';

export async function POST(req: NextRequest) {
  try {
    const { code, subtotal } = await req.json();
    const result = await checkDiscountCode(code, subtotal);
    if (!result.valid) return NextResponse.json({ error: result.error }, { status: result.status });
    return NextResponse.json(result);
  } catch (err) {
    console.error('validate-code villa:', err);
    return NextResponse.json({ error: 'Villa' }, { status: 500 });
  }
}
