import React from 'react';
import fundoImg from '../../assets/img1.jpg';

const BannerHero = () => {
  return (
    <div className="relative">
      <img
        src={fundoImg}
        alt="Crianças aprendendo"
        className="w-full h-[60vh] md:h-[75vh] object-cover"
      />

      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-4">
            Inspirando mudanças com
          </h1>

          <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8">
            criatividade!
          </p>

   
          <button className="bg-[#FF254A] hover:bg-[#1CEBE5] text-white px-8 py-3 rounded-full text-lg font-semibold transform hover:scale-105 transition-colors duration-300">
            Quero ser Criativo
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerHero;