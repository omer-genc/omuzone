import { Dialog, Tab, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { AiFillCloseCircle, AiFillHeart } from 'react-icons/ai';
import { BsFillCartFill } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { IProduct } from '../bloc/api';
import { useStore } from '../bloc/store';

type Props = {
  products: IProduct[];
};

const UserModal: React.FC<Props> = ({ products }) => {
  const { userModal, handleUserModal, user, signup, signout, signin } =
    useStore();

  const favorites = user
    ? products.filter((product) => user.favorites.includes(product.urunID))
    : [];
  function closeModal() {
    handleUserModal(false);
  }

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    if (data.password !== data.password2) {
      alert('Şifreler uyuşmuyor');
      return;
    }

    signup({
      email: data.email as string,
      password: data.password as string,
      name: data.name as string,
      cart: [],
      favorites: [],
      orders: [],
    });
  };

  const handleSignin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    signin(data.email as string, data.password as string);
  };

  return (
    <Transition appear show={userModal} as={Fragment}>
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
              <Dialog.Panel className="w-full relative max-w-md transform overflow-hidden  bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="mt-4">
                  <button
                    type="button"
                    className="absolute top-0 right-0 mt-1 mr-1"
                    onClick={closeModal}
                  >
                    <AiFillCloseCircle
                      className="hover:fill-orange-500"
                      size={30}
                    />
                  </button>
                </div>
                {user ? (
                  <Tab.Group>
                    <Tab.List className="flex p-1 space-x-1 bg-gray-200 rounded">
                      <Tab
                        key={1}
                        className={({ selected }) =>
                          `${
                            selected
                              ? 'text-gray-900 bg-white'
                              : 'text-gray-500 bg-gray-200'
                          }
                        relative flex-1 rounded py-2 px-4 focus:outline-none text-sm`
                        }
                      >
                        <FaUserAlt
                          className="fill-gray-500 mx-auto"
                          size={20}
                        />
                      </Tab>
                      <Tab
                        key={2}
                        className={({ selected }) =>
                          `${
                            selected
                              ? 'text-gray-900 bg-white'
                              : 'text-gray-500 bg-gray-200'
                          }
                        relative flex-1 rounded py-2 px-4 focus:outline-none text-sm`
                        }
                      >
                        <BsFillCartFill
                          className="fill-orange-500 mx-auto"
                          size={20}
                        />
                      </Tab>
                      <Tab
                        key={3}
                        className={({ selected }) =>
                          `${
                            selected
                              ? 'text-gray-900 bg-white'
                              : 'text-gray-500 bg-gray-200'
                          }
                        relative flex-1 rounded py-2 px-4 focus:outline-none text-sm`
                        }
                      >
                        <AiFillHeart
                          className="fill-red-500 mx-auto"
                          size={20}
                        />
                      </Tab>
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                      <Tab.Panel>
                        <div className="flex flex-col gap-4">
                          <div className="flex gap-2">
                            <span className="text-gray-500">İsim: </span>
                            <span className="text-gray-900">{user.name}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-gray-500">E-posta: </span>
                            <span className="text-gray-900">{user.email}</span>
                          </div>
                        </div>
                        <div className="">
                          <button
                            className="w-full mt-4 py-2 px-1 outline-orange-600 border border-orange-500 hover:bg-orange-500 hover:text-white"
                            onClick={signout}
                          >
                            Çıkış Yap
                          </button>
                        </div>
                      </Tab.Panel>
                      <Tab.Panel>
                        <div className="flex flex-col gap-4">
                          {user.orders.map((order, index) => (
                            <div key={'order' + index}>
                              <div className="border flex flex-col gap-4 p-2">
                                {order.products.map((product) => (
                                  <div
                                    className="border flex justify-between"
                                    key={index + '' + product.id}
                                  >
                                    <div>
                                      <picture>
                                        <img
                                          src={
                                            products.find(
                                              (x) => x.urunID === product.id
                                            )?.urunFotograflari[0]
                                          }
                                          alt="product"
                                          className="w-20 h-20"
                                        />
                                      </picture>
                                    </div>
                                    <div className="flex gap-2 flex-col">
                                      <span className="text-gray-900">
                                        {
                                          products.find(
                                            (x) => x.urunID === product.id
                                          )?.urunAdi
                                        }
                                      </span>

                                      <span className="text-gray-900">
                                        {product.price.toLocaleString()} ₺
                                      </span>

                                      <span className="text-gray-900">
                                        {product.count} adet
                                      </span>
                                    </div>
                                  </div>
                                ))}

                                <div className="flex flex-col gap-2">
                                  <span className="text-gray-500">
                                    Toplam Fiyat:{' '}
                                    <span className="text-gray-900">
                                      {order.total.toLocaleString()} ₺
                                    </span>
                                  </span>

                                  <span className="text-gray-500">
                                    Tarih:{' '}
                                    <span className="text-gray-900">
                                      {order.date.split(' ')[0]}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Tab.Panel>
                      <Tab.Panel>
                        <div className='flex flex-col gap-2'>
                          {favorites.map((item, index) => (
                            <div
                              className="border flex justify-between"
                              key={index + '' + item}
                            >
                              <div>
                                <picture>
                                  <img
                                    src={
                                      products.find((x) => x.urunID === item.urunID)
                                        ?.urunFotograflari[0]
                                    }
                                    alt="product"
                                    className="w-20 h-20"
                                  />
                                </picture>
                              </div>
                              <div className="flex gap-2 flex-col">
                                <span className="text-gray-900">
                                  {
                                    products.find((x) => x.urunID === item.urunID)
                                      ?.urunAdi
                                  }
                                </span>

                                <span className="text-gray-900">
                                  {item.urunFiyati.toLocaleString()} ₺
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                ) : (
                  <Tab.Group>
                    <Tab.List className="flex p-1 space-x-1 bg-gray-200 rounded">
                      <Tab
                        key={1}
                        className={({ selected }) =>
                          `${
                            selected
                              ? 'text-gray-900 bg-white'
                              : 'text-gray-500 bg-gray-200'
                          }
                          relative flex-1 rounded py-2 px-4 focus:outline-none`
                        }
                      >
                        Giriş Yap
                      </Tab>
                      <Tab
                        key={2}
                        className={({ selected }) =>
                          `${
                            selected
                              ? 'text-gray-900 bg-white'
                              : 'text-gray-500 bg-gray-200'
                          }
                          relative flex-1 rounded py-2 px-4 focus:outline-none`
                        }
                      >
                        Kayıt Ol
                      </Tab>
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                      <Tab.Panel>
                        <form
                          className="flex flex-col gap-4"
                          onSubmit={handleSignin}
                        >
                          <input
                            className="py-2 px-1 outline-orange-600 border border-orange-500"
                            type="email"
                            name="email"
                            required
                            placeholder="E-posta"
                          />
                          <input
                            className="py-2 px-1 outline-orange-600 border border-orange-500"
                            type="password"
                            name="password"
                            placeholder="Şifre"
                            required
                          />
                          <div className="mt-4 flex justify-end gap-4">
                            <button
                              type="submit"
                              className="inline-flex justify-center border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                            >
                              Giriş Yap
                            </button>
                          </div>
                        </form>
                      </Tab.Panel>
                      <Tab.Panel>
                        <form onSubmit={handleSignup}>
                          <div className="flex flex-col gap-4">
                            <input
                              className="py-2 px-1 outline-orange-600 border border-orange-500"
                              type="text"
                              placeholder="İsim"
                              required
                              name="name"
                            />
                            <input
                              className="py-2 px-1 outline-orange-600 border border-orange-500"
                              type="text"
                              placeholder="Soyisim"
                              required
                              name="surname"
                            />
                            <input
                              className="py-2 px-1 outline-orange-600 border border-orange-500"
                              type="email"
                              placeholder="E-posta"
                              required
                              name="email"
                            />
                            <input
                              className="py-2 px-1 outline-orange-600 border border-orange-500"
                              type="password"
                              placeholder="Şifre"
                              min={6}
                              max={12}
                              required
                              name="password"
                            />
                            <input
                              className="py-2 px-1 outline-orange-600 border border-orange-500"
                              type="password"
                              placeholder="Şifreyi Doğrula"
                              required
                              name="password2"
                            />
                          </div>
                          <div className="mt-4 flex justify-end gap-4">
                            <button
                              type="submit"
                              className="inline-flex justify-center border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                            >
                              Kayıt Ol
                            </button>
                          </div>
                        </form>
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UserModal;
