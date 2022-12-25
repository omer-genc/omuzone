import create from 'zustand';
import { persist } from 'zustand/middleware';
import { IProduct } from './api';

type IUser = {
  name: string;
  email: string;
  password: string;
  cart: { id: number; count: number }[];
  favorites: number[];
  orders: IOrder[];
};

type IOrder = {
  products: { id: number; count: number; price: number }[];
  total: number;
  date: string;
};

interface IState {
  user: null | IUser;
  userModal: boolean;
  handleUserModal: (open: boolean) => void;
  signup: (user: IUser) => void;
  signin: (email: string, password: string) => void;
  signout: () => void;
  addTocart: (id: number, count: number) => void;
  updateCount: (id: number, count: number) => void;
  addTofavorites: (id: number) => void;
  complateOrder: (products: IProduct[]) => boolean;
}

export const useStore = create<IState>()(
  persist(
    (set, get) => ({
      user: null,
      userModal: false,
      handleUserModal: (open: boolean) => {
        set({ userModal: open });
      },
      signup: (user: IUser) => {
        const usersData = localStorage.getItem('users');

        if (usersData) {
          const users = JSON.parse(usersData);
          const userExists = users.find(
            (userItem: IUser) => userItem.email === user.email
          );

          if (userExists) {
            alert('User already exists');
          } else {
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            set({ user });
            updateLocalStorage(user);
          }
        } else {
          localStorage.setItem('users', JSON.stringify([user]));
          updateLocalStorage(user);
          set({ user });
        }
      },
      signin: (email: string, password: string) => {
        const usersData = localStorage.getItem('users');

        if (usersData) {
          const users = JSON.parse(usersData);
          const user = users.find(
            (user: IUser) => user.email === email && user.password === password
          );

          if (user) {
            set({ user });
          } else {
            alert('User not found');
          }
        } else {
          alert('User not found');
        }
      },

      signout: () => {
        set({ user: null });
      },

      addTocart: (id: number, count: number) => {
        const { user } = get();
        if (user) {
          const cart = user.cart;
          const product = cart.find((item) => item.id === id);
          if (product) {
            const index = cart.indexOf(product);
            cart[index].count = count;
          } else {
            cart.push({ id, count });
          }
          set({ user: { ...user, cart } });
          updateLocalStorage({ ...user, cart });
        }
      },

      updateCount: (id: number, count: number) => {
        const { user } = get();
        if (user) {
          const cart = user.cart;
          const product = cart.find((item) => item.id === id);
          if (product) {
            const index = cart.indexOf(product);
            cart[index].count = count;
          }
          const newCart = cart.filter((item) => item.count > 0);
          set({ user: { ...user, cart: newCart } });
          updateLocalStorage({ ...user, cart: newCart });
        }
      },
      addTofavorites: (id: number) => {
        const { user } = get();
        if (user) {
          let favorites = user.favorites;
          const isInclude = favorites.includes(id);

          if (isInclude) {
            favorites = favorites.filter((item) => item !== id);
          } else {
            console.log('add');
            console.log(favorites);

            console.log(id);

            favorites.push(id);
          }
          set({ user: { ...user, favorites } });
          updateLocalStorage({ ...user, favorites });
        }
      },
      complateOrder: (allProducts) => {
        const { user } = get();
        if (user) {
          const cart = user.cart;
          
          const date = new Date().toLocaleString();
          const products = cart.map((item) => ({
            id: item.id,
            count: item.count,
            price: allProducts.find((product) => product.urunID === item.id)?.urunFiyati || 0, 
          }));
          const total = products.reduce(
            (acc, item) => acc + item.count * item.price,
            0
          );
          const order: IOrder = { products, total, date };
          const orders = user.orders;
          orders.push(order);
          set({ user: { ...user, orders, cart: [] } });
          updateLocalStorage({ ...user, orders, cart: [] });
          return true;
        }
        return false;
      },
    }),
    {
      name: 'activeUser',
    }
  )
);

const updateLocalStorage = (data: IUser) => {
  const usersData = localStorage.getItem('users');

  if (usersData) {
    const users = JSON.parse(usersData);

    const user = users.find((user: IUser) => user.email === user?.email);

    if (user) {
      const index = users.indexOf(user);
      users[index] = data;
      localStorage.setItem('users', JSON.stringify(users));
      return;
    }

    users.push(data);
    localStorage.setItem('users', JSON.stringify(users));
  }
};
