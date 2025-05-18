import React, { useEffect } from 'react';
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.jpeg';
import img4 from '../../assets/img4.jpeg';
import img5 from '../../assets/img5.jpeg';
import img6 from '../../assets/img6.jpeg';
import img7 from '../../assets/img7.jpeg';
import img8 from '../../assets/img8.jpeg';
import img9 from '../../assets/img9.jpeg';
import img10 from '../../assets/img10.jpeg';
import img11 from '../../assets/img11.jpeg';
import img12 from '../../assets/img12.jpeg';


const GaleriaFotos = () => {
  const imagens = [
    img1, img2, img3, img4, img5, img6, img7, img8, img9,
    img10, img11, img12
  ];

  useEffect(() => {
    const trocarPosicoes = (img1, img2) => {
      const galeria = document.querySelector('.galeria-grid');
      if (!galeria) return;

      const temp = document.createElement('div');
      galeria.insertBefore(temp, img1);
      galeria.insertBefore(img1, img2);
      galeria.insertBefore(img2, temp);
      galeria.removeChild(temp);
    };

    const trocarAleatorio = () => {
      const elementos = document.querySelectorAll('.galeria-grid > div');
      if (elementos.length < 2) return;

      const array = Array.from(elementos);
      let i1 = Math.floor(Math.random() * array.length);
      let i2 = Math.floor(Math.random() * array.length);
      while (i2 === i1) i2 = Math.floor(Math.random() * array.length);

      trocarPosicoes(array[i1], array[i2]);
    };

    const intervalo = setInterval(trocarAleatorio, 1000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <section className="w-full bg-white overflow-x-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="galeria-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px">
          {imagens.map((img, index) => (
            <div
              key={index}
              className="relative overflow-hidden bg-white rounded-2xl p-3 sm:p-4"
              style={{ height: '25vw', minHeight: '180px' }}
            >
              <img
                src={img}
                alt={`Atividade ${index + 1}`}
                className="absolute inset-3 sm:inset-4 w-[calc(100%-24px)] h-[calc(100%-24px)] sm:w-[calc(100%-32px)] sm:h-[calc(100%-32px)] object-cover hover:scale-110 transition-transform duration-500 ease-in-out rounded-2xl"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GaleriaFotos;