// src/dashboard/plugins/product-plugin.tsx
import React, { useEffect, useState } from 'react';
import { Card, Text, Button } from '@wix/design-system';
import { mostExpensiveNonDiscountedProduct } from '../../../utils/getTopProduct';
import { dashboard } from '@wix/dashboard';
import { applyDiscountToProduct } from 'backend/apply-discount';


type Product = {
  _id: string;
  name?: string;
  priceData?: { price?: number };
};

export default function ProductPlugin() {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    mostExpensiveNonDiscountedProduct().then((data) => {
      if (data && data._id) setProduct(data as Product);
    });
  }, []);

  const goToDashboardPage = async () => {
    await dashboard.navigate({
      pageId: '4a44c4d2-ec30-44df-b58c-479217a5b540', // ID from your `page.json`
    });
  };

  return (
    <Card>
      <Text tagName="h2" weight="bold">Most Expensive Product Without Discount</Text>
      {product ? (
        <>
          <Text>Name: {product.name}</Text>
          <Text>Price: ₪{product.priceData?.price ?? 'N/A'}</Text>
          <Button onClick={goToDashboardPage}>Give People a Break</Button>
        </>
      ) : (
        <Text>No qualifying product found.</Text>
      )}
    </Card>
  );
}
