import Product from './Product';
import type { Product as ProductType } from '@/types/api/public/products';

type Props = {
  products: ProductType[];
};

function ProductsMain({ products }: Props) {
  return (
    <div className="min-h-[70vh] w-full flex flex-col">
      {products.map((product, index) => (
        <div key={product.product_id}>
          {index !== 0 && <hr className="w-full my-10" />}
          <Product product={product} />
        </div>
      ))}
    </div>
  );
}

export default ProductsMain;
