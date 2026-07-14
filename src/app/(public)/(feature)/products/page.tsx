import ProductsMain from '@/components/features/public/products/ProductsMain';
import { get } from '@/lib/api/http';
import { API_ENDPOINTS } from '@/lib/api/endpoint';
import type { ProductListResponse } from '@/types/api/public/products';

export const revalidate = 3600;

export default async function Page() {
  let products: ProductListResponse['products'];
  try {
    const response = await get<ProductListResponse>(API_ENDPOINTS.products.get);
    products = response.products;
  } catch (error) {
    // バックエンド不通時はビルドを止めず ISR で後から反映させる
    console.warn('[products] 取得に失敗:', error);
    products = [];
  }

  return (
    <div>
      <ProductsMain products={products} />
    </div>
  );
}
