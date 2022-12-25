import Head from 'next/head';
import { Fragment } from 'react';
import { GetServerSideProps } from 'next';
import api, { IRes } from '../bloc/api';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import Link from 'next/link';

type IProps = {
  data: IRes;
};
const Home: React.FC<IProps> = ({ data }) => {
  return (
    <Fragment>
      <Head>
        <title>omuzone | Anasayfa</title>
        <meta name="description" content="açıklama" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout categories={data.kategoriler} products={data.urunler}>
        <div className="flex-1">
          <Hero
            heading="omuzone"
            message="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80"
          />
        </div>
        <div className="my-8 container mx-auto p-2">
          <h1 className="text-5xl">Popüler Ürünler</h1>
          <div className="border-b border-black border-spacing mb-4 dark:border-white"></div>
          <div className="grid grid-cols-4 gap-8">
            {data.urunler.slice(0, 7).map((item) => {
              return (
                <Link
                  className="col-span-2 md:col-span-1"
                  href={`/product/${item.urunID}`}
                  key={item.urunID}
                >
                  <div className="shadow-xl p-2 relative bg-white h-full">
                    <div className="h-52 overflow-hidden border">
                      <picture className="">
                        <img
                          className="h-full object-contain w-full p-2"
                          src={item.urunFotograflari[0]}
                          alt={item.urunAdi}
                        />
                      </picture>
                    </div>

                    <h1 className="text-xl mt-2">{item.urunAdi}</h1>
                    {item.urunIndirim ? (
                      <Fragment>
                        <h1 className="text-sm mt-2 line-through">
                          {item.urunFiyati.toLocaleString()} ₺
                        </h1>
                        <h1 className="text-xl mt-2">
                          {(
                            item.urunFiyati - item.urunIndirimTutari
                          ).toLocaleString()}{' '}
                          ₺
                        </h1>
                      </Fragment>
                    ) : (
                      <h1 className="text-xl mt-2">
                        {item.urunFiyati.toLocaleString()} ₺
                      </h1>
                    )}

                    {/* Overlay */}
                    <div className="flex justify-center w-full h-full items-center absolute top-0 left-0 right-0 bottom-0 hover:bg-black/50 group">
                      <p className="text-gray-300 hidden group-hover:flex group-hover:flex-col group-hover:items-center text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                          />
                        </svg>
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="flex justify-center mt-12">
            <Link href="/product">
              <button className="bg-black text-white hover:bg-slate-400 px-8 py-4 text-xl font-bold">
                Şimdi Alışveriş Yap
              </button>
            </Link>
          </div>

          <h1 className="text-5xl mt-10">Kategoriler</h1>
          <div className="border-b border-black border-spacing mb-4 dark:border-white"></div>
          <div className="grid grid-cols-4 gap-8">
            {data.kategoriler.map((kategori) => {
              const item = data.urunler.find(
                (urun) => urun.urunKategorisi === kategori.kategori_ismi
              );

              if (!item) return null;
              return (
                <Link
                  className="col-span-2 md:col-span-1"
                  href={`/product?categories=${kategori.kategori_id}`}
                  key={kategori.kategori_id}
                >
                  <div className="shadow-xl p-2 relative bg-white">
                    <div className="h-52 overflow-hidden border">
                      <picture className="">
                        <img
                          className="h-full object-contain w-full p-2"
                          src={item.urunFotograflari[0]}
                          alt={kategori.kategori_ismi}
                        />
                      </picture>
                    </div>

                    {/* Overlay */}
                    <div className="flex justify-center w-full h-full items-center absolute top-0 left-0 right-0 bottom-0 hover:bg-black/50 group">
                      <p className="text-gray-300 hidden group-hover:flex group-hover:flex-col group-hover:items-center text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                          />
                        </svg>
                        <span>{kategori.kategori_ismi}</span>
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await api();
  return {
    props: {
      data: data,
    },
  };
};
