export function formatPrice(price: number): string {
  return 'Rp' + price.toLocaleString('id-ID');
}

export function calculateDiscount(price: number, originalPrice?: number): number {
  if (!originalPrice) return 0;
  return Math.round(100 - (price / originalPrice) * 100);
}
