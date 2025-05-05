'use client';

import React, { useEffect, useState } from 'react';
import { Box, Text, Input, Button, Card } from '@wix/design-system';
import { mostExpensiveNonDiscountedProduct } from '../../utils/getTopProduct';
import { applyDiscountToProduct } from 'backend/apply-discount';

type Product = {
  _id: string;
  name?: string;
  media?: { items?: { image?: { url?: string } }[] };
  priceData?: { price?: number };
};

export default function DiscountDashboardPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [discount, setDiscount] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      const result = await mostExpensiveNonDiscountedProduct();
      if (result && result._id) {
        setProduct(result as Product);
      } else {
        setStatus('No product found without discount.');
      }
    };
    loadProduct();
  }, []);

  const applyDiscount = async () => {
    if (!product || !product._id) {
      setStatus('No product to update.');
      return;
    }

    const numericDiscount = parseFloat(discount);
    if (isNaN(numericDiscount) || numericDiscount <= 0 || numericDiscount >= 100) {
      setStatus('Please enter a valid discount percentage (1–99).');
      return;
    }

    setIsLoading(true);
    try {
      await applyDiscountToProduct(product._id, numericDiscount);
      setStatus(`✅ Discount of ${numericDiscount}% applied successfully!`);

      const updated = await mostExpensiveNonDiscountedProduct();
      if (updated && updated._id) setProduct(updated as Product);
    } catch (err) {
      console.error(err);
      setStatus('❌ Failed to apply discount.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box padding="SP4" gap="SP3">
      <Text tagName="h1" size="medium" weight="bold">Product Discounter</Text>
      <Text size="small">Give people a break on your most expensive product.</Text>

      {product ? (
        <Card>
          <Box display="flex" gap="SP3">
            {product.media?.items?.[0]?.image?.url && (
              <img
                src={product.media.items[0].image.url}
                alt={product.name ?? 'Product Image'}
                width={180}
                height={180}
                style={{ borderRadius: '12px', objectFit: 'cover' }}
              />
            )}

            <Box>
              <Text tagName="h3" weight="bold">Most expensive product</Text>
              <Text>This is the most expensive product that is not already discounted.</Text>
              <Box marginTop="SP2">
                <Text>
                  Product name: {product.name ?? 'Unnamed product'}<br />
                  Price: ₪{product.priceData?.price?.toLocaleString() ?? 'N/A'}
                </Text>
              </Box>

              <Box marginTop="SP2">
                <Input
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="Enter discount percentage"
                  size="small"
                />
              </Box>

              <Box marginTop="SP2">
                <Button onClick={applyDiscount} disabled={isLoading}>
                  {isLoading ? 'Applying...' : 'Apply discount'}
                </Button>
              </Box>

              {status && (
                <Box marginTop="SP2">
                  <Text>{status}</Text>
                </Box>
              )}
            </Box>
          </Box>
        </Card>
      ) : (
        <Text>{status || 'Loading product...'}</Text>
      )}
    </Box>
  );
}
