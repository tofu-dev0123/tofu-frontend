import ProductsMain from '@/components/features/public/products/ProductsMain';
import { get } from '@/lib/api/http';
import { API_ENDPOINTS } from '@/lib/api/endpoint';
import type { ProductListResponse } from '@/types/api/public/products';

export const revalidate = 3600;

export default async function Page() {
  const { products } = await get<ProductListResponse>(
    API_ENDPOINTS.products.get
  );

  return (
    <div>
      <ProductsMain products={products} />
    </div>
  );
}
