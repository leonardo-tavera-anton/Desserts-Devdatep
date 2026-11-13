import { QuantityStepper } from './QuantityStepper';

export interface Product {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface ProductCardProps {
  product: Product;
  quantity: number;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const ProductCard = ({
  product,
  quantity,
  onAdd,
  onIncrement,
  onDecrement,
}: ProductCardProps) => {
  return (
    <article className="flex flex-col gap-2">
      <div className="relative mb-4">
        <picture>
          <source media="(min-width: 1024px)" srcSet={product.image.desktop} />
          <source media="(min-width: 768px)" srcSet={product.image.tablet} />
          <img
            src={product.image.mobile}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className={`h-auto w-full rounded-xl object-cover ${
              quantity > 0 ? 'border-2 border-red-600' : ''
            }`}
          />
        </picture>

        <div className="absolute -bottom-5 left-1/2 flex w-full -translate-x-1/2 justify-center">
          {quantity === 0 ? (
            <button
              type="button"
              onClick={onAdd}
              aria-label={`Add ${product.name} to cart`}
              className="flex items-center gap-2 whitespace-nowrap rounded-full border border-rose-400 bg-white px-6 py-3 font-semibold text-rose-900 shadow-md transition-colors hover:border-red-600 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <img src="/assets/images/icon-add-to-cart.svg" alt="" aria-hidden="true" />
              Add to Cart
            </button>
          ) : (
            <QuantityStepper
              quantity={quantity}
              productName={product.name}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
            />
          )}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm text-rose-500">{product.category}</p>
        <h2 className="text-base font-semibold text-rose-900">{product.name}</h2>
        <p className="font-semibold text-red-600">${product.price.toFixed(2)}</p>
      </div>
    </article>
  );
};
