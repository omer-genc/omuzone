import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { BsFillCartFill } from 'react-icons/bs';
import { IProduct } from '../bloc/api';

type ProductProps = {
  data: IProduct;
};
const Product: React.FC<ProductProps> = ({ data }) => {
  return (
    <div className="shadow-xl p-2 h-80 bg-white flex flex-col relative">
      <div className="h-52 overflow-hidden border">
        <picture>
          <img
            className="h-full object-contain w-full p-2"
            src={data.urunFotograflari[0]}
            alt={data.urunAdi}
          />
        </picture>
      </div>
      <AiFillHeart
        className="absolute right-4 top-4 hover:fill-red-600 cursor-pointer"
        size={20}
      />
      <BsFillCartFill
        className="absolute cursor-pointer left-4 top-4 hover:fill-orange-500"
        size={20}
      />
      <div className="mt-auto">
        <h1 className="mt-2">{data.urunAdi}</h1>

        {data.urunIndirim ? (
          <div className="flex gap-2">
            <h1 className="text-xl mt-2">
              {(data.urunFiyati - data.urunIndirimTutari).toLocaleString()} ₺
            </h1>
            <h1 className="text-sm mt-2 line-through text-red-600">
              {data.urunFiyati.toLocaleString()} ₺
            </h1>
          </div>
        ) : (
          <h1 className="text-xl mt-2">
            {data.urunFiyati.toLocaleString()} ₺
          </h1>
        )}
      </div>
    </div>
  );
};

export default Product;
