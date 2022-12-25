import React from 'react';
import { IProduct } from '../bloc/api';
import { useStore } from '../bloc/store';

type Props = {
  product: IProduct;
  count: number;
};

const CartProduct: React.FC<Props> = ({ product, count }) => {
  const { updateCount } = useStore();

  return (
    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
      <div className="flex w-2/5">
        <picture className="w-20">
          <img className="h-24" src={product.urunFotograflari[0]} alt="" />
        </picture>
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <span className="font-bold text-sm">{product.urunAdi}</span>
          <span className="text-red-500 text-xs">{product.urunKategorisi}</span>
          <a
            onClick={() => updateCount(product.urunID, 0)}
            className="font-semibold hover:text-red-500 text-gray-500 text-xs"
          >
            Remove
          </a>
        </div>
      </div>
      <div className="flex justify-center w-1/5">
        <svg
          onClick={() => updateCount(product.urunID, count - 1)}
          className="fill-current text-gray-600 w-3"
          viewBox="0 0 448 512"
        >
          <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
        </svg>
        <picture>
          <input
            className="mx-2 border text-center w-8"
            type="text"
            value={count}
          />
        </picture>

        <svg
          onClick={() => updateCount(product.urunID, count + 1)}
          className="fill-current text-gray-600 w-3"
          viewBox="0 0 448 512"
        >
          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
        </svg>
      </div>
      <span className="text-center w-1/5 font-semibold text-sm">
        {product.urunFiyati.toLocaleString()} ₺
      </span>
      <span className="text-center w-1/5 font-semibold text-sm">
        {(product.urunFiyati * count).toLocaleString()} ₺
      </span>
    </div>
  );
};

export default CartProduct;
