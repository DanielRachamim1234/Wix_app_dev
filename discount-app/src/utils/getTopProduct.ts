// src/utils/getTopProduct.ts

import { getMostExpensiveProductWithoutDiscount } from 'backend/get-product';

export async function mostExpensiveNonDiscountedProduct() {
  try {
    const product = await getMostExpensiveProductWithoutDiscount();
    console.log('✅ Filtered product: ', product);
    return product;
  } catch (err) {
    console.error('❌ Backend error:', err);
    return null;
  }
}
