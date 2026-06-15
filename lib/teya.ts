const TOKEN_URL = 'https://id.teya.com/oauth/v2/oauth-token';
const API_URL = 'https://api.teya.com';

export async function getTeyaAccessToken(): Promise<string> {
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.TEYA_CLIENT_ID!,
      client_secret: process.env.TEYA_CLIENT_SECRET!,
      scope: 'payment-links/create payment-links/id/get payment-links/id/update',
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Teya token mistókst: ${err}`);
  }

  const { access_token } = await res.json();
  return access_token;
}

export type CartItem = {
  name: string;
  size: string;
  qty: number;
  price: number;
};

export async function createPaymentLink(
  cart: CartItem[],
  area?: string,
  overrideTotal?: number,
  overrideShipping?: number,
): Promise<{ link: string; linkId: string }> {
  const accessToken = await getTeyaAccessToken();

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shippingRate = area === 'rural' ? 1500 : 700;
  const shipping = overrideShipping ?? (subtotal >= 8000 ? 0 : shippingRate);
  const total = overrideTotal ?? (subtotal + shipping);

  const baseUrl = (process.env.NEXT_PUBLIC_URL ?? 'https://propads.is').replace(/\/$/, '');
  const { randomUUID } = await import('crypto');

  const res = await fetch(`${API_URL}/v2/payment-links`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'Idempotency-Key': randomUUID(),
    },
    body: JSON.stringify({
      store_id: process.env.TEYA_STORE_ID,
      amount: { currency: 'ISK', value: total },
      line_items: (() => {
        const fullItems = [
          ...cart.map((item) => ({
            description: `${item.name} – Stærð ${item.size}`,
            quantity: item.qty,
            unit_price: item.price,
          })),
          ...(shipping > 0 ? [{ description: 'Sending', quantity: 1, unit_price: shipping }] : []),
        ];
        const lineSum = fullItems.reduce((s, i) => s + i.unit_price * i.quantity, 0);
        if (lineSum !== total) {
          return [{ description: 'Propads pöntun', quantity: 1, unit_price: total }];
        }
        return fullItems;
      })(),
      success_url: `${baseUrl}/greidslutekist`,
      cancel_url: `${baseUrl}/klara-kaup`,
      post_success_payment: 'REDIRECT',
      transaction_type: 'SALE',
      type: 'SINGLE_USE',
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(`Teya villa: ${JSON.stringify(data)}`);

  return { link: data.payment_link, linkId: data.id ?? data.payment_link_id ?? '' };
}
