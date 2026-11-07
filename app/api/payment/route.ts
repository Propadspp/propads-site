import { NextRequest, NextResponse } from 'next/server';
import { createPaymentLink } from '@/lib/teya';
import { createPendingOrder, attachPaymentLinkId } from '@/lib/sanity-server';
import { priceCart, PricingError, type IncomingCartItem } from '@/lib/pricing';

type Customer = { name: string; email: string; phone?: string };
type ShippingAddress = { street: string; city: string; postcode: string; notes?: string };

export async function POST(req: NextRequest) {
  try {
    const {
      cart,
      customer,
      shippingAddress,
      discountCode,
    }: {
      cart: IncomingCartItem[];
      customer?: Customer;
      shippingAddress?: ShippingAddress;
      discountCode?: string;
    } = await req.json();

    if (!cart?.length) {
      return NextResponse.json({ error: 'Karfan er tóm' }, { status: 400 });
    }

    // Öll verð, sending og afsláttur eru reiknuð hér á þjóninum úr Sanity —
    // tölur frá vafranum eru hunsaðar svo enginn geti breytt verðinu sjálfur.
    let priced;
    try {
      priced = await priceCart(cart, shippingAddress?.postcode ?? '', discountCode);
    } catch (err) {
      if (err instanceof PricingError) {
        console.error('Pricing villa:', err.message);
        return NextResponse.json({ error: 'Karfan þín er úrelt — tæmdu hana og settu vörurnar aftur í.' }, { status: 400 });
      }
      throw err;
    }

    // Save pending order to Sanity if we have customer info
    let orderId: string | null = null;
    if (customer?.email && shippingAddress?.street) {
      try {
        const order = await createPendingOrder({
          customer,
          shippingAddress,
          items: priced.items.map(item => ({
            productName: item.name,
            size: item.size,
            quantity: item.qty,
            unitPrice: item.price,
            imageUrl: item.image,
          })),
          subtotal: priced.subtotal,
          shippingCost: priced.shipping,
          total: priced.total,
          discountCode: priced.discountCode,
        });
        orderId = order._id;
      } catch (err) {
        console.error('Sanity order creation failed:', err);
      }
    }

    const { link, linkId } = await createPaymentLink(priced.items, priced.total, priced.shipping);

    // Attach Teya payment link ID to the order
    if (orderId && linkId) {
      try {
        await attachPaymentLinkId(orderId, linkId);
      } catch (err) {
        console.error('Failed to attach payment link ID:', err);
      }
    }

    return NextResponse.json({ payment_link: link });
  } catch (err) {
    console.error('Payment villa:', err);
    return NextResponse.json({ error: 'Villa kom upp' }, { status: 500 });
  }
}
