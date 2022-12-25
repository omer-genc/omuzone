import React from 'react';
import { ICategorie, IProduct } from '../bloc/api';
import Footer from './Footer';
import Navbar from './Navbar';
import UserModal from './UserModal';

type Props = {
  children: React.ReactNode;
  categories: ICategorie[];
  products: IProduct[];
  isOneColor?: boolean;
};

const Layout: React.FC<Props> = ({
  children,
  categories,
  isOneColor,
  products,
}) => {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar isOneColor={isOneColor} categories={categories} />
      {children}
      <Footer categories={categories} />
      <UserModal products={products} />
    </main>
  );
};

export default Layout;
