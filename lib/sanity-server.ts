import { createClient } from '@sanity/client';

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN ?? process.env.api_vorur_sanity,
});

function generateOrderNumber() {
  const d = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `PROP-${d}-${r}`;
}

type OrderInput = {
  customer: { name: string; email: string; phone?: string };
  shippingAddress: { street: string; city: string; postcode: string; notes?: string };
  items: { productName: string; size: string; quantity: number; unitPrice: number }[];
  subtotal: number;
  shippingCost: number;
  total: number;
  discountCode?: string;
};

export async function createPendingOrder(data: OrderInput) {
  const orderNumber = generateOrderNumber();
  const doc = {
    _type: 'order',
    orderNumber,
    status: 'new',
    createdAt: new Date().toISOString(),
    customer: data.customer,
    shippingAddress: { ...data.shippingAddress, country: 'Ísland' },
    items: data.items.map((item, i) => ({
      _key: `item-${i}`,
      productName: item.productName,
      size: item.size,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    })),
    subtotal: data.subtotal,
    shippingCost: data.shippingCost,
    total: data.total,
    payment: { provider: 'teya', paymentStatus: 'pending' },
    ...(data.discountCode ? { internalNotes: `Afsláttarkóði: ${data.discountCode}` } : {}),
  };
  const result = await writeClient.create(doc);
  return { _id: result._id, orderNumber };
}

export async function attachPaymentLinkId(orderId: string, teyaPaymentLinkId: string) {
  return writeClient.patch(orderId)
    .set({ 'payment.teyaPaymentLinkId': teyaPaymentLinkId })
    .commit();
}

export async function markOrderPaid(teyaPaymentLinkId: string) {
  const order = await writeClient.fetch<{
    _id: string; orderNumber: string;
    customer: { name: string; email: string };
    shippingAddress: { street: string; city: string; postcode: string; notes?: string };
    items: { productName: string; size: string; quantity: number; unitPrice: number }[];
    subtotal: number; shippingCost: number; total: number;
    internalNotes?: string; payment: { paymentStatus: string };
  } | null>(
    `*[_type=="order" && payment.teyaPaymentLinkId==$id][0]{
      _id, orderNumber, customer, shippingAddress, items, subtotal, shippingCost, total,
      internalNotes, payment { paymentStatus }
    }`,
    { id: teyaPaymentLinkId }
  );
  if (!order) return null;

  // Idempotency — don't process twice
  if (order.payment.paymentStatus === 'paid') return null;

  await writeClient.patch(order._id).set({
    'payment.paymentStatus': 'paid',
    'payment.paidAt': new Date().toISOString(),
  }).commit();

  return order;
}

export async function incrementDiscountUsage(code: string) {
  const doc = await writeClient.fetch<{ _id: string; usageCount?: number } | null>(
    `*[_type=="discountCode" && code==$code][0]{ _id, usageCount }`,
    { code: code.toUpperCase().trim() }
  );
  if (!doc) return;
  await writeClient.patch(doc._id)
    .set({ usageCount: (doc.usageCount ?? 0) + 1 })
    .commit();
}
