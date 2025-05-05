// backend/apply-discount.ts
import { products } from '@wix/stores';

export async function applyDiscountToProduct(productId: string, discountPercent: number) {
  try {
    const updated = await products.updateProduct(productId, {
      discount: {
        type: 'PERCENT' as any,
        value: discountPercent,
      },
    });
    return updated;
  } catch (err) {
    console.error('❌ Failed to apply discount in backend:', err);
    throw err;
  }
}
