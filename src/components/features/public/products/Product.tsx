import type { Product } from '@/types/api/public/products';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ProductProps {
  product: Product;
}

function Product({ product }: ProductProps) {
  return (
    <div className="w-full flex flex-col justify-center p-2">
      <h3 className="text-2xl font-bold font-sub-logo tracking-[0.02em] border-b border-gray-200 pb-2 mb-2">
        {product.title}
      </h3>
      <div className="flex flex-col lg:flex-row w-full justify-between gap-4">
        <div className="w-full lg:w-[70%] flex flex-col gap-2">
          {product.description && (
            <p className="text-sm font-sub-logo py-2">{product.description}</p>
          )}
          <div className="flex gap-2 flex-wrap">
            {product.tags.map((tag) => (
              <span
                key={tag.tag_id}
                className="text-xs font-logo tracking-[0.02em] rounded-sm px-4 py-1 border border-gray-200 shadow-sm"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-[30%] flex justify-end items-end gap-2">
          {product.link_url && (
            <Button
              variant="outline"
              className="w-20 h-8 shadow-none rounded-none border-black"
            >
              <Link
                href={product.link_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-sub-logo font-bold"
              >
                View Site
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
