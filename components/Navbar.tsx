import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { ICategorie } from '../bloc/api';
import { useStore } from '../bloc/store';

type Props = {
  categories: ICategorie[];
  isOneColor?: boolean;
};

const Navbar: React.FC<Props> = ({ categories, isOneColor }) => {
  const [color, setColor] = useState('transparent');
  const [textColor, setTextColor] = useState('white');

  const { handleUserModal, user } = useStore();
  const router = useRouter();

  const handleUserModalClick = () => {
    handleUserModal(true);
  };

  const handleCart = () => {
    if (user) {
      router.push('/cart');
    } else {
      handleUserModal(true);
    }
  };

  useEffect(() => {
    if (isOneColor) {
      setColor('#ffffff');
      setTextColor('#000000');
      return;
    }
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setColor('#ffffff');
        setTextColor('#000000');
      } else {
        setColor('transparent');
        setTextColor('#ffffff');
      }
    };
    window.addEventListener('scroll', changeColor);

    return () => {
      window.removeEventListener('scroll', changeColor);
    };
  }, []);

  return (
    <div
      style={{ backgroundColor: `${color}` }}
      className="fixed left-0 top-0 w-full z-10 ease-in duration-300 border-b-2 border-gray-300"
    >
      <div className="max-w-[1240px] m-auto flex justify-between items-center p-4 text-white">
        <Link href="/">
          <h1 style={{ color: `${textColor}` }} className="font-bold text-4xl">
            omuzone
          </h1>
        </Link>
        <ul style={{ color: `${textColor}` }} className="flex">
          <li onClick={handleUserModalClick} className="p-4 cursor-pointer">
            <BiUser size={20} />
          </li>
          <li onClick={handleCart} className="p-4 cursor-pointer relative">
            <AiOutlineShoppingCart size={20} />
            {user?.cart?.length ? <span className='absolute top-2 right-2 text-sm text-orange-500'>{user.cart.length}</span> : null}
          </li>
          <li onClick={handleUserModalClick} className="p-4 cursor-pointer">
            <AiOutlineHeart size={20} />
          </li>
        </ul>
      </div>
      <div
        style={{
          color: `${textColor}`,
        }}
        className="hidden mb-2 overflow-y-scroll sm:flex justify-center items-center gap-4"
      >
        {categories.map((categorie) => (
          <Link
            href={`/product?categories=${categorie.kategori_id}`}
            key={categorie.kategori_id}
            style={{
              flex: '0 0 auto',
            }}
            className="p-2 list-none hover:bg-gray-500 hover:text-white"
          >
            <li>{categorie.kategori_ismi}</li>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
