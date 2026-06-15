import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.TEYA_CLIENT_ID ?? 'MISSING';
  const clientSecret = process.env.TEYA_CLIENT_SECRET ?? 'MISSING';
  const storeId = process.env.TEYA_STORE_ID ?? 'MISSING';

  const tokenRes = await fetch('https://id.teya.com/oauth/v2/oauth-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      scope: 'payment-links/create payment-links/id/get payment-links/id/update',
    }),
  });

  const body = await tokenRes.text();

  return NextResponse.json({
    status: tokenRes.status,
    clientId_prefix: clientId.slice(0, 8) + '...',
    clientSecret_set: clientSecret !== 'MISSING',
    storeId_prefix: storeId.slice(0, 8) + '...',
    response: body,
  });
}
