import Link from 'next/link';
import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { IProduct } from '../bloc/api';
import { useStore } from '../bloc/store';

type ProductProps = {
  data: IProduct;
};

const Product: React.FC<ProductProps> = ({ data }) => {
  const { user, addTofavorites } = useStore();

  const handleAddToFavorites = () => {
    if (user) {
      addTofavorites(data.urunID);
    }
  };

  return (
    <div className="shadow-xl p-2 h-80 bg-white flex flex-col relative">
      <AiFillHeart
        onClick={handleAddToFavorites}
        className="absolute right-4 top-4 hover:fill-red-600 cursor-pointer"
        fill={user ? (user.favorites.includes(data.urunID) ? 'red' : '') : ''}
        size={20}
      />

      <Link href={`/product/${data.urunID}`}>
        <div className="h-52 overflow-hidden border">
          <picture>
            <img
              className="h-full object-contain w-full p-2"
              src={data.urunFotograflari[0]}
              alt={data.urunAdi}
            />
          </picture>
        </div>

        <div className="mt-auto">
          <h1 className="mt-2 h-12 overflow-hidden">{data.urunAdi}</h1>

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
      </Link>
    </div>
  );
};

export default Product;
