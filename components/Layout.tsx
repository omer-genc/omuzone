import React from 'react';
import { ICategorie } from '../bloc/api';
import Footer from './Footer';
import Navbar from './Navbar';
import UserModal from './UserModal';

type Props = {
  children: React.ReactNode;
  categories: ICategorie[];
  isOneColor?: boolean;
};

const Layout: React.FC<Props> = ({ children, categories, isOneColor }) => {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar isOneColor={isOneColor} categories={categories} />
      {children}
      <Footer categories={categories} />
      <UserModal />
    </main>
  );
};

export default Layout;
