import { getProducts, getBundles, getGripsokkarBundles } from '@/lib/sanity';
import { checkDiscountCode } from '@/lib/discount';
import { calcShipping, isCapitalArea } from '@/lib/shipping';

// Það sem vafrinn sendir. Verðinu frá vafranum er EKKI treyst — það er sótt aftur úr Sanity.
export type IncomingCartItem = {
  id: string;
  name?: string;
  size: string;
  qty: number;
  category?: string;
  image?: string;
};

export type PricedItem = {
  id: string;
  name: string;
  size: string;
  qty: number;
  price: number;
  category: string;
  image?: string;
};

export type PricedCart = {
  items: PricedItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  discountCode?: string;
  total: number;
};

export class PricingError extends Error {}

const MAX_QTY = 100;

function safeImage(url?: string) {
  return url && url.startsWith('https://cdn.sanity.io/') ? url : undefined;
}

// Reiknar körfuna upp á nýtt út frá verðum í Sanity.
export async function priceCart(
  cart: IncomingCartItem[],
  postcode: string,
  discountCode?: string,
): Promise<PricedCart> {
  if (!Array.isArray(cart) || cart.length === 0) throw new PricingError('Karfan er tóm');
  if (cart.length > 50) throw new PricingError('Of margar línur í körfu');

  const [products, bundles, tiers] = await Promise.all([getProducts(), getBundles(), getGripsokkarBundles()]);

  const items: PricedItem[] = cart.map(raw => {
    const qty = Number(raw?.qty);
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) throw new PricingError('Ógilt magn');
    const id = String(raw?.id ?? '');
    const size = String(raw?.size ?? '').slice(0, 500);

    // 1) Tilboðspakki af /tilbod
    const bundle = bundles.find(b => b._id === id);
    if (bundle) {
      return { id, name: bundle.name, size, qty, price: bundle.price, category: 'bundle' };
    }

    // 2) Gripsokka-magntilboð (t.d. 3 eða 5 pör)
    const tierMatch = id.match(/^(.+)-bundle-(\d+)$/);
    if (tierMatch) {
      const product = products.find(p => p._id === tierMatch[1]);
      const tier = tiers.find(t => t.quantity === Number(tierMatch[2]));
      if (!product || !tier) throw new PricingError('Tilboð fannst ekki');
      const price = Math.round(product.price * tier.quantity * (1 - tier.discountPercent / 100));
      return {
        id, size, qty, price,
        name: `${product.name} × ${tier.quantity} (${size})`,
        category: 'Gripsokkar',
        image: safeImage(raw.image),
      };
    }

    // 3) Venjuleg vara
    const product = products.find(p => p._id === id);
    if (!product) throw new PricingError('Vara fannst ekki');
    const sizeObj = product.sizes?.find(s => s.size === size);
    if (!sizeObj) throw new PricingError('Stærð fannst ekki');
    return {
      id, size, qty,
      name: product.name,
      price: sizeObj.price ?? product.price,
      category: product.category === 'legghlifar' ? 'Legghlífar' : 'Gripsokkar',
      image: safeImage(raw.image),
    };
  });

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const hasBundle = items.some(i => i.category === 'bundle');

  let discount = 0;
  let freeShippingCode = false;
  let appliedCode: string | undefined;
  if (discountCode) {
    const res = await checkDiscountCode(discountCode, subtotal);
    if (res.valid && (!hasBundle || res.allowOnBundles)) {
      discount = res.discount;
      freeShippingCode = res.freeShipping;
      appliedCode = res.code;
    }
  }

  const shipping = calcShipping({ subtotal, hasBundle, freeShippingCode, capital: isCapitalArea(String(postcode ?? '')) });
  const total = Math.max(0, subtotal + shipping - discount);

  return { items, subtotal, shipping, discount, discountCode: appliedCode, total };
}
