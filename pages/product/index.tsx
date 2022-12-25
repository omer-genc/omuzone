import { Switch } from '@headlessui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import api, { ICategorie, IProduct } from '../../bloc/api';
import Layout from '../../components/Layout';
import Product from '../../components/Product';
import { IoIosOptions } from 'react-icons/io';
import Pagination from '../../components/Pagination';
type Props = {
  products: IProduct[];
  allProducts: IProduct[];
  categories: ICategorie[];
  selectedCategories: string[];
  isPromotion: boolean;
  meta: {
    page: number;
    totalPage: number;
    totalProduct: number;
    title: string;
    maxPrice: number;
    minPrice: number;
    mostCheapPrice: number;
    mostExpensivePrice: number;
  };
};
const Products: React.FC<Props> = ({
  selectedCategories,
  categories,
  products,
  allProducts,
  meta,
  isPromotion,
}) => {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleCategory = (category: number, isAdd: boolean) => {
    const query = new URLSearchParams(router.query as any);
    const categories = query.get('categories')?.split(',') || [];
    if (isAdd) {
      categories.push(category.toString());
    }
    if (!isAdd) {
      const index = categories.indexOf(category.toString());
      categories.splice(index, 1);
    }
    query.set('categories', categories.join(','));

    router.push({
      pathname: '/product',
      query: query.toString(),
    });
  };

  const handleOpenFilter = () => {
    const filter = document.getElementById('filter') as HTMLElement;

    if (filter.classList.contains('invisible')) {
      filter.classList.remove('invisible');
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = 'auto';
    filter.classList.add('invisible');
    return;
  };

  const handlePromotion = (isPromotion: boolean) => {
    const query = new URLSearchParams(router.query as any);
    if (isPromotion) {
      query.set('promotion', 'true');
    }
    if (!isPromotion) {
      query.delete('promotion');
    }
    router.push({
      pathname: '/product',
      query: query.toString(),
    });
  };

  const handleMaxPrice = (maxPrice: number) => {
    const query = new URLSearchParams(router.query as any);
    query.set('maxPrice', maxPrice.toString());
    router.push({
      pathname: '/product',
      query: query.toString(),
    });
  };

  const handleMinPrice = (minPrice: number) => {
    const query = new URLSearchParams(router.query as any);
    query.set('minPrice', minPrice.toString());
    router.push({
      pathname: '/product',
      query: query.toString(),
    });
  };

  const handleChangePage = (page: number) => {
    const query = new URLSearchParams(router.query as any);
    query.set('page', page.toString());
    router.push({
      pathname: '/product',
      query: query.toString(),
    });
  };

  return (
    <div>
      <Layout isOneColor={true} categories={categories} products={allProducts}>
        <div className="container mx-auto p-2 mt-20 sm:mt-48 relative">
          {/* Search */}
          <div className="flex items-center justify-center my-4 md:mt-0">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Ara..."
                className="border border-orange-300 rounded-md p-2 outline-orange-500 w-72 md:w-96"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          {/* Search result */}
          {search && (
            <div className="absolute z-20 w-full top-20 left-0 bg-orange-500 flex flex-wrap">
              {allProducts.filter((item) =>
                item.urunAdi.includes(search)
              ).length === 0 ? (
                <div className="w-full text-center p-4 text-xl text-white font-bold">
                  Sonuç bulunamadı
                </div>
              ) : (
                <div className="w-full text-center p-4 text-xl text-white font-bold">
                  Sonuçlar
                </div>
              )}
              {allProducts
                .filter((item) =>
                  item.urunAdi.toLowerCase().includes(search.toLowerCase())
                )
                .map((item) => (
                  <div
                    key={item.urunID}
                    className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 p-2"
                  >
                    <Product data={item} />
                  </div>
                ))}
            </div>
          )}

          <div className="grid grid-cols-12">
            <div
              id="filter"
              className="fixed z-10 md:z-0 invisible md:visible bg-white w-screen md:w-auto md:h-auto p-4 h-screen top-0 left-0 md:relative md:col-span-4 lg:col-span-3 overflow-auto"
            >
              <h1 className="text-2xl my-2">Kategoriler</h1>
              <Switch.Group>
                <div className="space-y-4">
                  {categories.map((item) => (
                    <div key={item.kategori_ismi} className="flex items-center">
                      <Switch
                        checked={selectedCategories.includes(
                          item.kategori_ismi
                        )}
                        onChange={(isAdd) =>
                          handleCategory(item.kategori_id, isAdd)
                        }
                        className={`${
                          selectedCategories.includes(item.kategori_ismi)
                            ? 'bg-orange-500'
                            : 'bg-gray-700'
                        }
                          relative inline-flex h-[19px] w-[35px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                      >
                        <span className="sr-only">Use setting</span>
                        <span
                          aria-hidden="true"
                          className={`${
                            selectedCategories.includes(item.kategori_ismi)
                              ? 'translate-x-4'
                              : 'translate-x-0'
                          }
                            pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                        />
                      </Switch>
                      <Switch.Label>
                        <span className="ml-2 text-sm">
                          {item.kategori_ismi}
                        </span>
                      </Switch.Label>
                    </div>
                  ))}
                </div>
              </Switch.Group>

              <h1 className="text-2xl my-2 mt-8">Diğer</h1>
              <Switch.Group>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Switch
                      checked={isPromotion}
                      onChange={handlePromotion}
                      className={`${
                        isPromotion ? 'bg-orange-500' : 'bg-gray-700'
                      }
                          relative inline-flex h-[19px] w-[35px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                      <span className="sr-only">Use setting</span>
                      <span
                        aria-hidden="true"
                        className={`${
                          isPromotion ? 'translate-x-4' : 'translate-x-0'
                        }
                            pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                      />
                    </Switch>
                    <Switch.Label>
                      <span className="ml-2 text-sm">İndirimli Ürünler</span>
                    </Switch.Label>
                  </div>
                </div>
              </Switch.Group>

              <div className="lg:w-3/4">
                <label
                  htmlFor="min-range"
                  className="block mt-8 mb-2 text-sm font-medium text-gray-90"
                >
                  Minumum fiyat {meta.minPrice.toLocaleString()} ₺
                </label>
                <input
                  id="min-range"
                  type="range"
                  min={meta.mostCheapPrice}
                  step={100}
                  max="9999"
                  onMouseUp={(e) =>
                    handleMinPrice(parseInt(e.currentTarget.value))
                  }
                  defaultValue={0}
                  className="w-full h-2 bg-orange-500 rounded-lg appearance-none cursor-pointer"
                />

                <label
                  htmlFor="max-range"
                  className="block mt-8 mb-2 text-sm font-medium text-gray-90"
                >
                  Maximum fiyat {meta.maxPrice.toLocaleString()} ₺
                </label>
                <input
                  id="max-range"
                  type="range"
                  min={meta.minPrice}
                  step={100}
                  max={meta.mostExpensivePrice}
                  onMouseUp={(e) =>
                    handleMaxPrice(parseInt(e.currentTarget.value))
                  }
                  className="w-full h-2 bg-orange-500 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-8 lg:col-span-9 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((item) => (
                <Product key={item.urunID} data={item} />
              ))}
              <div className="col-span-2 md:col-span-3 lg:col-span-4">
                <Pagination
                  page={meta.page}
                  totalPage={meta.totalPage}
                  onchange={handleChangePage}
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>

      <div
        onClick={handleOpenFilter}
        className="fixed bottom-10 right-4 z-20 bg-orange-500 p-2 rounded-full md:hidden"
      >
        <IoIosOptions className="" size={30} />
      </div>
    </div>
  );
};

export default Products;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const data = await api();

  const categoryIds = encodeURI(ctx.query.categories as string)
    .split(',')
    .filter((item) => item !== '');

  const isPromotion = ctx.query.promotion === 'true';

  const mostCheapPrice = data.urunler.reduce(
    (prev, current) => (prev.urunFiyati < current.urunFiyati ? prev : current),
    data.urunler[0]
  ).urunFiyati;

  const mostExpensivePrice = data.urunler.reduce(
    (prev, current) => (prev.urunFiyati > current.urunFiyati ? prev : current),
    data.urunler[0]
  ).urunFiyati;

  const minPrice = parseInt(ctx.query.minPrice as string) || mostCheapPrice;
  const maxPrice = parseInt(ctx.query.maxPrice as string) || mostExpensivePrice;

  const categories = data.kategoriler
    .filter((item) => categoryIds.includes(item.kategori_id.toString()))
    .map((item) => item.kategori_ismi);

  const pageQuery = typeof ctx.query.page === 'string' ? ctx.query.page : '1';
  const page = parseInt(pageQuery) || 1;
  const limit = 24;
  const offset = (page - 1) * limit;

  let urunler = data.urunler;

  if (categories.length) {
    urunler = data.urunler.filter((item) =>
      categories.includes(item.urunKategorisi)
    );
  }

  if (isPromotion) {
    urunler = data.urunler.filter((item) => item.urunIndirim);
  }

  urunler = urunler.filter(
    (item) => item.urunFiyati >= minPrice && item.urunFiyati <= maxPrice
  );
  const totalPage = Math.ceil(urunler.length / limit);
  urunler = urunler.slice(offset, offset + limit);

  return {
    props: {
      products: urunler,
      categories: data.kategoriler,
      selectedCategories: categories || [],
      isPromotion: isPromotion,
      allProducts: data.urunler,
      meta: {
        page: page,
        totalPage: totalPage,
        totalProduct: urunler.length,
        title: categories[0] || 'Tüm Ürünler',
        maxPrice: maxPrice,
        minPrice: minPrice,
        mostCheapPrice: mostCheapPrice,
        mostExpensivePrice: mostExpensivePrice,
      },
    },
  };
};
