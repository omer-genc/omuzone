import React from 'react';

type Props = {
  image: string;
  children: React.ReactNode;
};
const ParallaxImage: React.FC<Props> = ({ image, children }) => {
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div
      onScroll={handleScrollDown}
      style={{
        backgroundImage: `url(${image})`,
      }}
      className="parallax-images flex items-center justify-center h-screen bg-fixed bg-center bg-no-repeat bg-cover relative"
    >
      {children}
    </div>
  );
};

export default ParallaxImage;
