import { client } from '@/lib/sanity';

export type DiscountResult =
  | { valid: true; code: string; type: 'percent' | 'fixed'; value: number; discount: number; freeShipping: boolean; allowOnBundles: boolean }
  | { valid: false; error: string; status: number };

// Athugar afsláttarkóða í Sanity og reiknar afsláttinn út frá millisamtali.
export async function checkDiscountCode(rawCode: string, subtotal: number): Promise<DiscountResult> {
  const code = String(rawCode ?? '').toUpperCase().trim();
  if (!code) return { valid: false, error: 'Enginn kóði', status: 400 };

  const doc = await client.fetch(
    `*[_type=="discountCode" && code==$code && active==true && !(_id in path("drafts.**"))][0]`,
    { code }
  );
  if (!doc) return { valid: false, error: 'Kóðinn er ekki gildur', status: 404 };

  if (doc.expiresAt && new Date(doc.expiresAt) < new Date()) {
    return { valid: false, error: 'Kóðinn er útrunninn', status: 400 };
  }
  if (doc.usageLimit && (doc.usageCount ?? 0) >= doc.usageLimit) {
    return { valid: false, error: 'Kóðinn hefur náð hámarks notkun', status: 400 };
  }

  const safeSubtotal = Math.max(0, Number(subtotal) || 0);
  const discount = doc.type === 'percent'
    ? Math.round(safeSubtotal * doc.value / 100)
    : Math.min(doc.value, safeSubtotal);

  return {
    valid: true,
    code: doc.code,
    type: doc.type,
    value: doc.value,
    discount,
    freeShipping: doc.freeShipping ?? false,
    allowOnBundles: doc.allowOnBundles ?? false,
  };
}
