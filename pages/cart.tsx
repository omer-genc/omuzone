import { Dialog, Transition } from '@headlessui/react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React, { Fragment, useState } from 'react';
import api, { IProduct, IRes } from '../bloc/api';
import { useStore } from '../bloc/store';
import CartProduct from '../components/CartProduct';
import Layout from '../components/Layout';

type Props = {
  data: IRes;
};

const Cart: React.FC<Props> = ({ data }) => {
  const { user, complateOrder, handleUserModal } = useStore();
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  if (!user) {
    return (
      <Layout
        products={data.urunler}
        categories={data.kategoriler}
        isOneColor={true}
      >
        <div className="h-screen">
          <div className="container mx-auto h-full flex justify-center items-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold">Lütfen Giriş Yapınız</h1>
              <p className="text-2xl">
                Giriş Yapmak İçin{' '}
                <span
                  onClick={() => handleUserModal(true)}
                  className="text-orange-500 hover:text-orange-600"
                >
                  tıklayın
                </span>
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (user.cart.length === 0) {
    return (
      <Layout
        products={data.urunler}
        categories={data.kategoriler}
        isOneColor={true}
      >
        <div className="h-screen">
          <div className="container mx-auto h-full flex justify-center items-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold">Sepetiniz Boş</h1>
              <p className="text-2xl">
                Sepete ürün eklemek için{' '}
                <Link
                  className="text-orange-500 hover:text-orange-600"
                  href="/product"
                >
                  tıklayın
                </Link>
              </p>
            </div>
          </div>
        </div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Siparişiniz Alındı
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Profilinizden sipariş geçmişinize ulaşabilirsiniz.
                      </p>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="w-full mt-4 py-2 px-1 outline-orange-600 border border-orange-500 hover:bg-orange-500 hover:text-white"
                        onClick={closeModal}
                      >
                        Tamam
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </Layout>
    );
  }
  const handleComplateOrder = () => {
    const res = complateOrder(data.urunler);
    if (res) {
      openModal();
    }
  };

  const cartItems = user.cart.reduce((acc, crr) => {
    const product = data.urunler.find((p) => p.urunID === crr.id);
    if (product) {
      acc.push({ product, count: crr.count });
    }
    return acc;
  }, [] as { product: IProduct; count: number }[]);

  return (
    <Layout
      products={data.urunler}
      categories={data.kategoriler}
      isOneColor={true}
    >
      <div className="container mx-auto mt-20 md:mt-32">
        <div className="md:flex shadow-md my-10">
          <div className="w-full md:w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Sepet</h1>
              <h2 className="font-semibold text-2xl">
                {cartItems.reduce((acc, crr) => acc + crr.count, 0)} Ürün
              </h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Ürün Detayı
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                Adet
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                Fiyat
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                Toplam
              </h3>
            </div>

            {cartItems.map((item) => (
              <CartProduct
                key={item.product.urunID}
                product={item.product}
                count={item.count}
              />
            ))}
            <Link
              href="/product"
              className="flex font-semibold text-indigo-600 text-sm mt-10"
            >
              <svg
                className="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Alışverişe Devam Et
            </Link>
          </div>

          <div id="summary" className="md:w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Sipariş Özeti
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">
                {cartItems.reduce((acc, crr) => acc + crr.count, 0)} Ürün
              </span>
            </div>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Toplam Fiyat</span>
                <span>
                  {cartItems
                    .reduce(
                      (acc, crr) => acc + crr.count * crr.product.urunFiyati,
                      0
                    )
                    .toLocaleString()}{' '}
                  ₺
                </span>
              </div>
              <button
                onClick={handleComplateOrder}
                className="bg-orange-500 font-semibold hover:bg-orange-600 py-3 text-sm text-white uppercase w-full cursor-pointer"
              >
                Siparişi Tamamla
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await api();

  return {
    props: {
      data,
    },
  };
};
