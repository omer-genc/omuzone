import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import api, { ICategorie, IProduct } from '../../bloc/api';
import Layout from '../../components/Layout';

type Props = {
  categories: ICategorie[];
  product: IProduct;
};

const ProductDetail: React.FC<Props> = ({ categories, product }) => {
  const [mainImage, setMainImage] = useState(product.urunFotograflari[0]);

  const handleSetImage = (image: string) => {
    setMainImage(image);
  };

  return (
    <Layout categories={categories} isOneColor={true}>
      <section className="text-gray-700 body-font overflow-hidden bg-white ">
        <div className="container px-5 py-24 mx-auto mt- md:mt-24">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <picture className="lg:w-1/2 w-full">
              <img
                alt={product.urunAdi}
                className=" object-cover object-center rounded border border-gray-200 mx-auto"
                src={mainImage}
              />
              <div className="flex mt-2 flex-wrap gap-2">
                {product.urunFotograflari.map((image, index) => (
                  <picture key={image}>
                    <img
                      onClick={() => handleSetImage(image)}
                      key={index}
                      className="w-20 h-20 object-cover object-center rounded border border-gray-200 cursor-pointer"
                      alt="product-image"
                      src={image}
                    />
                  </picture>
                ))}
              </div>
            </picture>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {product.urunKategorisi}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.urunAdi}
              </h1>
              <p className="leading-relaxed">{product.urunAciklamasi}</p>
              <div className="flex mt-6 items-center pb-5 mb-5 gap-4">
                <span>
                  Granti Türü: <strong>{product.garanti.turu}</strong>
                </span>
                <span>
                  Granti Süresi: <strong>{product.garanti.sure}</strong>
                </span>
              </div>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex">
                  <span className="mr-3">Kampanyalar</span>
                  {product.kampanyalar.length === 0 && (
                    <span className="mr-1 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                      <span className="text-gray-600 mr-2 text-xs">
                        Kampanya Bulunamadı
                      </span>
                    </span>
                  )}
                  {product.kampanyalar.map((kampanya, index) => (
                    <span
                      key={index}
                      className="mr-1 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200"
                    >
                      <span className="text-gray-600 mr-2 text-xs">
                        {kampanya}
                      </span>
                    </span>
                  ))}
                </div>

                <div className="flex ml-6 items-center">
                  <span className="mr-3">Adet</span>
                  <div className="relative">
                    <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-orange-500 text-base pl-3 pr-10">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                {product.urunIndirim ? (
                  <>
                    <span className="title-font font-medium text-2xl text-gray-900">
                      {(
                        product.urunFiyati - product.urunIndirimTutari
                      ).toLocaleString()}{' '}
                      ₺
                    </span>
                    <span className="title-font font-medium text-md text-red-500 line-through ml-3">
                      {product.urunFiyati.toLocaleString()} ₺
                    </span>
                  </>
                ) : (
                  <span className="title-font font-medium text-2xl text-gray-900">
                    {product.urunFiyati.toLocaleString()} ₺
                  </span>
                )}
                <button className="flex ml-auto text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded">
                  Sepete Ekle
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await api();

  const id = parseInt(ctx.params?.id as string);

  if (id < 0) {
    return {
      notFound: true,
    };
  }

  const product = data.urunler.find((item) => item.urunID == id);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      categories: data.kategoriler,
      product,
    },
  };
};
