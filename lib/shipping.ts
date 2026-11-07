// Sendingarreglur — notaðar bæði í vafranum (til að sýna verð) og á þjóninum (til að rukka).
export const FREE_SHIPPING_THRESHOLD = 8000;
export const SHIPPING_CAPITAL = 700;
export const SHIPPING_RURAL = 1500;

export function isCapitalArea(postal: string): boolean {
  const n = parseInt(postal, 10);
  if (isNaN(n) || postal.length < 3) return true;
  return (n >= 100 && n <= 172) ||
         (n >= 200 && n <= 212) ||
         (n >= 220 && n <= 226) ||
         (n >= 270 && n <= 271);
}

// Tilboðspakkar af /tilbod fara í körfuna með category 'bundle' og fá alltaf fría sendingu.
export function cartHasBundle(cart: { category: string }[]): boolean {
  return cart.some(i => i.category === 'bundle');
}

export function calcShipping(opts: {
  subtotal: number;
  hasBundle: boolean;
  freeShippingCode: boolean;
  capital: boolean;
}): number {
  if (opts.hasBundle || opts.freeShippingCode || opts.subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return opts.capital ? SHIPPING_CAPITAL : SHIPPING_RURAL;
}
