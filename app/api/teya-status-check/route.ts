// TÍMABUNDIÐ greiningartól — fjarlægt strax eftir prófun. Skilar engum persónuupplýsingum.
import { NextRequest, NextResponse } from 'next/server';
import { getTeyaAccessToken } from '@/lib/teya';
import { getOrderPaymentInfo } from '@/lib/sanity-server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get('pantun') ?? '';
  const info = await getOrderPaymentInfo(orderId);
  if (!info?.linkId) return NextResponse.json({ found: false });
  let token: string;
  try { token = await getTeyaAccessToken(); } catch { return NextResponse.json({ found: true, token: 'failed' }); }
  const res = await fetch(`https://api.teya.com/v2/payment-links/${encodeURIComponent(info.linkId)}`, {
    headers: { Authorization: `Bearer ${token}` }, cache: 'no-store',
  });
  const body = await res.json().catch(() => ({}));
  const pick = (o: Record<string, unknown>) => Object.fromEntries(
    Object.entries(o ?? {}).map(([k, v]) => [k, typeof v === 'object' && v !== null ? `{${Object.keys(v).join(',')}}` : /status|state|type|error/i.test(k) ? v : typeof v])
  );
  return NextResponse.json({ found: true, http: res.status, body: pick(body as Record<string, unknown>) });
}
