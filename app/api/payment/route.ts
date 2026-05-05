import { NextRequest, NextResponse } from 'next/server';
import { createPaymentLink, CartItem } from '@/lib/teya';

export async function POST(req: NextRequest) {
  try {
    const { cart }: { cart: CartItem[] } = await req.json();

    if (!cart?.length) {
      return NextResponse.json({ error: 'Karfan er tóm' }, { status: 400 });
    }

    const paymentLink = await createPaymentLink(cart);
    return NextResponse.json({ payment_link: paymentLink });
  } catch (err) {
    console.error('Payment villa:', err);
    return NextResponse.json({ error: 'Villa kom upp' }, { status: 500 });
  }
}
