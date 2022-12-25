import React from 'react';
import ParallaxImage from './ParallaxImage';

type IProps = {
  heading: string;
  message: string;
  image: string;
};

const Hero: React.FC<IProps> = ({ heading, message, image }) => {
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <ParallaxImage image={image}>
      {/* Overlay */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/20 hover:bg-black/50 z-[2] ease-out duration-300" />
      <div className="p-5 text-white z-[2] mt-[-10rem]">
        <h2 className="text-5xl font-bold">{heading}</h2>
        <p className="py-5 text-xl">{message}</p>
        <button onClick={handleScrollDown} className="px-8 py-2 border">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
            <path
              fillRule="evenodd"
              d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </button>
      </div>
    </ParallaxImage>
  );
};

export default Hero;
