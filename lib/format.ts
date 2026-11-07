// Íslenskt verðsnið (3.990) — sama niðurstaða á þjóni og í vafra,
// ólíkt toLocaleString sem gefur stundum "3,990" í vafranum.
export function fmtNumber(n: number): string {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function fmtPrice(n: number): string {
  return fmtNumber(n) + ' kr';
}
