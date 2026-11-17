import { NextRequest, NextResponse } from 'next/server';
import { createVerify } from 'crypto';
import { finalizePaidOrder, isLinkPaidAtTeya } from '@/lib/order-paid';

// Teya webhook (sjá docs.teya.com/online-payments/webhooks):
//   event: "payment.succeeded.v1", data.payment_link_id, undirskrift í "x-teya-signature" (SHA256withRSA, base64)
function verifySignature(rawBody: string, signature: string): boolean {
  try {
    const publicKeyDer = Buffer.from(process.env.TEYA_WEBHOOK_PUBLIC_KEY!, 'base64');
    const verify = createVerify('SHA256');
    verify.update(rawBody);
    return verify.verify({ key: publicKeyDer, format: 'der', type: 'spki' }, signature, 'base64');
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  let rawBody = '';
  try {
    rawBody = await req.text();
    const signature = req.headers.get('x-teya-signature') ?? req.headers.get('x-signature') ?? '';
    const signatureOk = !!(process.env.TEYA_WEBHOOK_PUBLIC_KEY && signature && verifySignature(rawBody, signature));

    let payload: Record<string, unknown>;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      console.error('Teya webhook: ólæsilegt JSON', rawBody.slice(0, 300));
      return NextResponse.json({ received: true });
    }
    const data = (payload.data ?? payload) as Record<string, unknown>;
    const event = String(payload.event ?? '');
    const linkId = String(
      data.payment_link_id ?? payload.payment_link_id ?? (payload.payment_link as { id?: string } | undefined)?.id ?? ''
    );
    console.log(`Teya webhook: event="${event}" link="${linkId}" undirskrift=${signatureOk ? 'gild' : 'engin/ógild'}`);

    const claimsPaid =
      event.startsWith('payment.succeeded') ||
      event === 'payment.completed' ||
      event === 'payment_link.paid';

    if (!claimsPaid || !linkId) {
      return NextResponse.json({ received: true });
    }

    // Án gildrar undirskriftar treystum við ekki skilaboðunum — spyrjum Teya beint.
    if (!signatureOk && !(await isLinkPaidAtTeya(linkId))) {
      console.error(`Teya webhook: greiðsla EKKI staðfest hjá Teya (link ${linkId}) — pöntun ekki merkt greidd`);
      return NextResponse.json({ received: true, confirmed: false });
    }

    await finalizePaidOrder(linkId);
    return NextResponse.json({ received: true, confirmed: true });
  } catch (err) {
    console.error('Webhook villa:', err, rawBody.slice(0, 500));
    // 500 svo Teya reyni aftur síðar (allt er idempotent, svo endurtekning er örugg)
    return NextResponse.json({ error: 'Villa' }, { status: 500 });
  }
}
