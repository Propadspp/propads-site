const TOKEN_URL = 'https://id.teya.xyz/oauth/v2/oauth-token';
const API_URL = 'https://api.teya.xyz';

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

export async function createPaymentLink(cart: CartItem[]): Promise<string> {
  const accessToken = await getTeyaAccessToken();

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 8000 ? 0 : 990;
  const total = subtotal + shipping;

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
      line_items: [
        ...cart.map((item) => ({
          description: `${item.name} – Stærð ${item.size}`,
          quantity: item.qty,
          unit_price: item.price,
        })),
        ...(shipping > 0 ? [{ description: 'Sending', quantity: 1, unit_price: shipping }] : []),
      ],
      success_url: `${process.env.NEXT_PUBLIC_URL}/greidslutekist`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/klara-kaup`,
      post_success_payment: 'REDIRECT',
      transaction_type: 'SALE',
      type: 'SINGLE_USE',
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(`Teya villa: ${JSON.stringify(data)}`);

  return data.payment_link;
}
