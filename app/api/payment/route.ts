import { NextRequest, NextResponse } from 'next/server';
import { createPaymentLink, CartItem } from '@/lib/teya';
import { createPendingOrder, attachPaymentLinkId } from '@/lib/sanity-server';

type Customer = { name: string; email: string; phone?: string };
type ShippingAddress = { street: string; city: string; postcode: string; notes?: string };

export async function POST(req: NextRequest) {
  try {
    const {
      cart,
      area,
      customer,
      shippingAddress,
      subtotal,
      shippingCost,
      total,
      discountCode,
    }: {
      cart: CartItem[];
      area?: string;
      customer?: Customer;
      shippingAddress?: ShippingAddress;
      subtotal?: number;
      shippingCost?: number;
      total?: number;
      discountCode?: string;
    } = await req.json();

    if (!cart?.length) {
      return NextResponse.json({ error: 'Karfan er tóm' }, { status: 400 });
    }

    // Save pending order to Sanity if we have customer info
    let orderId: string | null = null;
    if (customer?.email && shippingAddress?.street) {
      try {
        const order = await createPendingOrder({
          customer,
          shippingAddress,
          items: cart.map(item => ({
            productName: item.name,
            size: item.size,
            quantity: item.qty,
            unitPrice: item.price,
          })),
          subtotal: subtotal ?? cart.reduce((s, i) => s + i.price * i.qty, 0),
          shippingCost: shippingCost ?? 0,
          total: total ?? cart.reduce((s, i) => s + i.price * i.qty, 0),
          discountCode,
        });
        orderId = order._id;
      } catch (err) {
        console.error('Sanity order creation failed:', err);
      }
    }

    const { link, linkId } = await createPaymentLink(cart, area, total, shippingCost);

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
