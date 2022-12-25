import create from 'zustand';
import { persist } from 'zustand/middleware';
import { IProduct } from './api';

type IUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  cart: number[];
  favorites: number[];
  orders: IOrder[];
};

type IOrder = {
  products: IProduct[];
  total: number;
  date: string;
};

type ICart = {
  id: number;
  products: IProduct[];
};

interface IState {
  user: null | IUser;
  userModal: boolean;
  handleUserModal: (open: boolean) => void;
}

export const useStore = create<IState>()(
  persist(
    (set, get) => ({
      user: null,
      userModal: false,
      handleUserModal: (open: boolean) => {
        set({ userModal: open });
      },
    }),
    {
      name: 'activeUser',
    }
  )
);

const updateLocalStorage = (state: IState) => {
  const usersData = localStorage.getItem('users');

  if (usersData) {
    const users = JSON.parse(usersData);

    const user = users.find((user: IUser) => user.email === state.user?.email);

    if (user) {
      const index = users.indexOf(user);
      users[index] = state.user;
      localStorage.setItem('users', JSON.stringify(users));
    }
  }
};
