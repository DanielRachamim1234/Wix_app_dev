import { products } from '@wix/stores';

export async function getMostExpensiveProductWithoutDiscount() {
  const result = await products.queryProducts().find();

  const filtered = result.items.filter((product) => {
    return !product.discount || product.discount?.value === 0;
  });

  if (filtered.length === 0) return null;

  const mostExpensive = filtered.reduce((max, current) => {
    const currPrice = current.priceData?.price ?? 0;
    const maxPrice = max.priceData?.price ?? 0;
    return currPrice > maxPrice ? current : max;
  });

  return mostExpensive;
}
