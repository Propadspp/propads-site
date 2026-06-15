import { Resend } from 'resend';

function getResend() { return new Resend(process.env.RESEND_API_KEY ?? process.env.resend_api); }
const FROM = () => process.env.FROM_EMAIL ?? 'onboarding@resend.dev';
const ADMIN = () => process.env.ADMIN_EMAIL ?? 'propadspp@gmail.com';

type OrderEmailData = {
  orderNumber: string;
  customer: { name: string; email: string };
  shippingAddress: { street: string; city: string; postcode: string; country?: string; notes?: string };
  items: { productName: string; size: string; quantity: number; unitPrice: number; imageUrl?: string }[];
  subtotal: number;
  shippingCost: number;
  total: number;
};

function fmtPrice(n: number) { return n.toLocaleString('is-IS') + ' kr'; }

function orderRows(items: OrderEmailData['items']) {
  return items.map(i => `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid #1e1e1e;vertical-align:middle">
        <div style="display:flex;align-items:center;gap:14px">
          ${i.imageUrl ? `<img src="${i.imageUrl}" width="64" height="64" alt="${i.productName}" style="border-radius:10px;object-fit:cover;flex-shrink:0;display:block" />` : `<div style="width:64px;height:64px;border-radius:10px;background:#1a1a1a;flex-shrink:0"></div>`}
          <div>
            <div style="color:#fff;font-size:14px;font-weight:600;margin-bottom:3px">${i.productName}</div>
            <div style="color:rgba(255,255,255,0.4);font-size:12px">Stærð ${i.size} · ${i.quantity} stk</div>
          </div>
        </div>
      </td>
      <td style="padding:14px 0;border-bottom:1px solid #1e1e1e;color:#fff;font-size:14px;font-weight:600;text-align:right;white-space:nowrap;vertical-align:middle">${fmtPrice(i.unitPrice * i.quantity)}</td>
    </tr>`).join('');
}

function baseTemplate(title: string, body: string) {
  return `<!DOCTYPE html>
<html lang="is">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#080808;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#080808;padding:40px 16px">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">
        <!-- Logo -->
        <tr><td style="padding-bottom:32px">
          <span style="font-size:22px;font-weight:900;letter-spacing:-0.035em;color:#fff">PROPADS</span>
        </td></tr>
        <!-- Card -->
        <tr><td style="background:#0f0f0f;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:32px">
          ${body}
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding-top:24px;text-align:center;color:rgba(255,255,255,0.25);font-size:12px">
          Propads · propadspp@gmail.com · Ísland
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export async function sendOrderConfirmation(order: OrderEmailData) {
  const html = baseTemplate('Pöntun staðfest', `
    <p style="color:#b8f03a;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 8px">Pöntun staðfest</p>
    <h1 style="color:#fff;font-size:24px;font-weight:900;letter-spacing:-0.02em;margin:0 0 4px">Takk, ${order.customer.name.split(' ')[0]}!</h1>
    <p style="color:rgba(255,255,255,0.45);font-size:14px;margin:0 0 28px">Pöntunarnúmer: <strong style="color:#fff">${order.orderNumber}</strong></p>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px">
      <tbody>${orderRows(order.items)}</tbody>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px">
      <tr><td style="font-size:13px;color:rgba(255,255,255,0.45);padding:4px 0">Millisamtals</td><td style="font-size:13px;color:#fff;text-align:right;padding:4px 0">${fmtPrice(order.subtotal)}</td></tr>
      <tr><td style="font-size:13px;color:rgba(255,255,255,0.45);padding:4px 0">Sending</td><td style="font-size:13px;color:#fff;text-align:right;padding:4px 0">${order.shippingCost === 0 ? '<span style="color:#b8f03a">Ókeypis</span>' : fmtPrice(order.shippingCost)}</td></tr>
      <tr><td style="font-size:15px;font-weight:700;color:#fff;padding-top:10px;border-top:1px solid #1e1e1e">Samtals</td><td style="font-size:18px;font-weight:900;color:#fff;text-align:right;padding-top:10px;border-top:1px solid #1e1e1e">${fmtPrice(order.total)}</td></tr>
    </table>

    <div style="background:#0a0a0a;border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:16px 20px">
      <p style="font-size:12px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px">Sendingarfang</p>
      <p style="font-size:13px;color:rgba(255,255,255,0.7);margin:0;line-height:1.7">
        ${order.shippingAddress.street}<br>${order.shippingAddress.postcode} ${order.shippingAddress.city}
        ${order.shippingAddress.notes ? `<br><em style="color:rgba(255,255,255,0.4)">${order.shippingAddress.notes}</em>` : ''}
      </p>
    </div>
    <p style="color:rgba(255,255,255,0.35);font-size:12px;margin-top:20px;line-height:1.6">Við sendum þér tölvupóst þegar pöntunin er á leiðinni. Spurningar? Svaraðu þessum pósti eða skrifaðu á <a href="mailto:propadspp@gmail.com" style="color:#b8f03a">propadspp@gmail.com</a></p>
  `);

  return getResend().emails.send({
    from: `Propads <${FROM()}>`,
    to: order.customer.email,
    subject: `Pöntun staðfest — ${order.orderNumber}`,
    html,
  });
}

export async function sendAdminNotification(order: OrderEmailData) {
  const html = baseTemplate('Ný pöntun', `
    <p style="color:#b8f03a;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 8px">Ný pöntun</p>
    <h1 style="color:#fff;font-size:22px;font-weight:900;margin:0 0 20px">${order.orderNumber} — ${fmtPrice(order.total)}</h1>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;background:#0a0a0a;border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:16px 20px">
      <tr><td style="font-size:12px;color:rgba(255,255,255,0.35);padding-bottom:12px;text-transform:uppercase;letter-spacing:0.08em" colspan="2">Viðskiptavinur</td></tr>
      <tr><td style="font-size:13px;color:rgba(255,255,255,0.5);padding:3px 0;width:100px">Nafn</td><td style="font-size:13px;color:#fff">${order.customer.name}</td></tr>
      <tr><td style="font-size:13px;color:rgba(255,255,255,0.5);padding:3px 0">Netfang</td><td style="font-size:13px;color:#b8f03a">${order.customer.email}</td></tr>
      <tr><td style="font-size:13px;color:rgba(255,255,255,0.5);padding:3px 0">Heimilisfang</td><td style="font-size:13px;color:#fff">${order.shippingAddress.street}, ${order.shippingAddress.postcode} ${order.shippingAddress.city}</td></tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0">
      ${order.items.map(i => `<tr>
        <td style="font-size:13px;color:#fff;padding:6px 0;border-bottom:1px solid #1e1e1e">${i.quantity}× ${i.productName} (${i.size})</td>
        <td style="font-size:13px;color:rgba(255,255,255,0.5);text-align:right;padding:6px 0;border-bottom:1px solid #1e1e1e">${fmtPrice(i.unitPrice * i.quantity)}</td>
      </tr>`).join('')}
      <tr><td style="font-size:15px;font-weight:700;color:#fff;padding-top:12px">Samtals</td><td style="font-size:15px;font-weight:700;color:#b8f03a;text-align:right;padding-top:12px">${fmtPrice(order.total)}</td></tr>
    </table>
  `);

  return getResend().emails.send({
    from: `Propads <${FROM()}>`,
    to: ADMIN(),
    subject: `🛒 Ný pöntun ${order.orderNumber} — ${fmtPrice(order.total)}`,
    html,
  });
}
