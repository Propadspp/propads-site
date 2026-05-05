import { NextRequest, NextResponse } from 'next/server';
import { createVerify } from 'crypto';

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

    if (process.env.TEYA_WEBHOOK_PUBLIC_KEY && signature) {
      if (!verifySignature(rawBody, signature)) {
        console.error('Teya webhook: ógild undirskrift');
        return NextResponse.json({ error: 'Ógild undirskrift' }, { status: 401 });
      }
    }

    const payload = JSON.parse(rawBody);
    const { event, payment_link_id, status } = payload;

    if (event === 'payment.completed' || status === 'PAID') {
      console.log(`Greiðsla tókst: ${payment_link_id}`);
      // TODO: merkja pöntun sem greidda í gagnagrunni
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook villa:', err);
    return NextResponse.json({ error: 'Villa' }, { status: 400 });
  }
}
