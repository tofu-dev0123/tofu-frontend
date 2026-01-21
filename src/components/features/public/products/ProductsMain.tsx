import { productList } from '@/constants/public/productList';
import Product from './Product';

function ProductsMain() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col">
      {productList.map((product, index) => (
        <div key={product.title}>
          {index !== 0 && <hr className="w-full my-10" />}
          <Product product={product} />
        </div>
      ))}
    </div>
  );
}

export default ProductsMain;
