import { createClient } from '@wix/sdk';
import { products } from '@wix/stores';

export const wixClient = createClient({
  modules: { products },
});
