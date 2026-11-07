import { NextRequest, NextResponse } from 'next/server';
import { createVerify } from 'crypto';
import { markOrderPaid, incrementDiscountUsage } from '@/lib/sanity-server';
import { sendOrderConfirmation, sendAdminNotification } from '@/lib/email';
import { getPaymentLink } from '@/lib/teya';

function verifySignature(rawBody: string, signature: string): boolean {
  try {
    const publicKeyDer = Buffer.from(process.env.TEYA_WEBHOOK_PUBLIC_KEY!, 'base64');
    const verify = createVerify('SHA256');
    verify.update(rawBody);
    return verify.verify(
      { key: publicKeyDer, format: 'der', type: 'spki' },
      signature,
      'base64'
    );
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-signature') ?? '';

    let signatureOk = false;
    if (process.env.TEYA_WEBHOOK_PUBLIC_KEY && signature) {
      if (!verifySignature(rawBody, signature)) {
        console.error('Teya webhook: ógild undirskrift');
        return NextResponse.json({ error: 'Ógild undirskrift' }, { status: 401 });
      }
      signatureOk = true;
    }

    const payload = JSON.parse(rawBody);
    console.log('Teya webhook payload:', JSON.stringify(payload));

    const { event, payment_link_id, status } = payload;
    const linkId = String(payment_link_id ?? payload.id ?? payload.paymentLinkId ?? payload.payment_link?.id ?? '');

    const claimsPaid = event === 'payment.completed' || event === 'payment_link.paid' || status === 'PAID' || status === 'paid';

    if (claimsPaid && !signatureOk) {
      // Engin gild undirskrift — spyrjum Teya beint hvort hlekkurinn hafi verið greiddur,
      // svo enginn geti falsað "greiðsla tókst" skilaboð.
      const link = await getPaymentLink(linkId);
      const teyaStatus = String(link?.status ?? '').toUpperCase();
      if (teyaStatus !== 'COMPLETED' && teyaStatus !== 'PAID') {
        console.error(`Teya webhook: greiðsla EKKI staðfest hjá Teya (link ${linkId}, staða "${teyaStatus || 'engin'}") — pöntun ekki merkt greidd`);
        return NextResponse.json({ received: true, confirmed: false });
      }
    }

    if (claimsPaid) {
      const order = await markOrderPaid(linkId);

      if (order) {
        const emailData = {
          orderNumber: order.orderNumber,
          customer: order.customer,
          shippingAddress: order.shippingAddress,
          items: order.items,
          subtotal: order.subtotal,
          shippingCost: order.shippingCost,
          total: order.total,
        };

        await Promise.allSettled([
          sendOrderConfirmation(emailData),
          sendAdminNotification(emailData),
          order.internalNotes?.startsWith('Afsláttarkóði:')
            ? incrementDiscountUsage(order.internalNotes.replace('Afsláttarkóði: ', ''))
            : Promise.resolve(),
        ]);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook villa:', err);
    return NextResponse.json({ error: 'Villa' }, { status: 400 });
  }
}
