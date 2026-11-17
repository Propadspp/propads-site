import { markOrderPaid, incrementDiscountUsage, getOrderPaymentInfo } from './sanity-server';
import { sendOrderConfirmation, sendAdminNotification } from './email';
import { getPaymentLink } from './teya';

// Merkir pöntun greidda og sendir staðfestingu (viðskiptavinur) + tilkynningu (þú).
// Skilar true ef þetta kall merkti pöntunina greidda (false ef hún var þegar greidd eða fannst ekki).
export async function finalizePaidOrder(linkId: string): Promise<boolean> {
  const order = await markOrderPaid(linkId);
  if (!order) return false;

  const emailData = {
    orderNumber: order.orderNumber,
    customer: order.customer,
    shippingAddress: order.shippingAddress,
    items: order.items,
    subtotal: order.subtotal,
    shippingCost: order.shippingCost,
    total: order.total,
  };

  const results = await Promise.allSettled([
    sendOrderConfirmation(emailData),
    sendAdminNotification(emailData),
    order.internalNotes?.startsWith('Afsláttarkóði:')
      ? incrementDiscountUsage(order.internalNotes.replace('Afsláttarkóði: ', ''))
      : Promise.resolve(),
  ]);
  results.forEach((r, i) => {
    if (r.status === 'rejected') console.error(`Pöntun ${order.orderNumber}: skref ${i} mistókst`, r.reason);
  });
  console.log(`Pöntun ${order.orderNumber} merkt greidd`);
  return true;
}

// Spyr Teya beint hvort greiðsluhlekkurinn hafi verið greiddur.
export async function isLinkPaidAtTeya(linkId: string): Promise<boolean> {
  const link = await getPaymentLink(linkId);
  const status = String(link?.status ?? '').toUpperCase();
  if (status === 'COMPLETED' || status === 'PAID') return true;
  console.log(`Teya hlekkur ${linkId}: staða "${status || 'engin'}"`);
  return false;
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

// Notað á „Greiðsla tókst“-síðunni: staðfestir pöntun hjá Teya ef webhook hefur ekki þegar gert það.
export async function confirmOrderById(orderId: string): Promise<'paid' | 'pending' | 'unknown'> {
  try {
    const info = await getOrderPaymentInfo(orderId);
    if (!info?.linkId) return 'unknown';
    if (info.paymentStatus === 'paid') return 'paid';
    // Teya getur verið örlítið á eftir þegar viðskiptavinur er sendur til baka — reynum nokkrum sinnum
    for (let i = 0; i < 3; i++) {
      if (await isLinkPaidAtTeya(info.linkId)) {
        await finalizePaidOrder(info.linkId);
        return 'paid';
      }
      if (i < 2) await sleep(1500);
    }
    return 'pending';
  } catch (err) {
    console.error('confirmOrderById villa:', err);
    return 'unknown';
  }
}
