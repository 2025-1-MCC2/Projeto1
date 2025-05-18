import React, { useEffect, useRef } from 'react';
import marca1 from '../../assets/marca1.jpg';
import marca3 from '../../assets/marca3.png';
import marca4 from '../../assets/marca4.jpg';
import marca5 from '../../assets/marca5.jpg';
import marca6 from '../../assets/marca6.jpg';
import marca7 from '../../assets/marca7.png';
import marca8 from '../../assets/marca8.jpg';
import marca9 from '../../assets/marca9.jpg';

const Apoiadores = () => {
  const marcas = [
    marca1, marca3, marca4,
    marca5, marca6, marca7,
    marca8, marca9
  ];

  const marcasDuplicadas = [...marcas, ...marcas];
  const carrosselRef = useRef(null);

  useEffect(() => {
    const carrossel = carrosselRef.current;
    let animationFrameId;
    let velocidade = 1;
    let posicao = 0;

    const animarScroll = () => {
      posicao += velocidade;
      if (posicao >= carrossel.scrollWidth / 2) {
        posicao = 0;
      }
      carrossel.scrollLeft = posicao;
      animationFrameId = requestAnimationFrame(animarScroll);
    };


    animationFrameId = requestAnimationFrame(animarScroll);

    const pausar = () => cancelAnimationFrame(animationFrameId);
    const continuar = () => {
      animationFrameId = requestAnimationFrame(animarScroll);
    };

    carrossel.addEventListener('mouseenter', pausar);
    carrossel.addEventListener('mouseleave', continuar);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (carrossel) {
        carrossel.removeEventListener('mouseenter', pausar);
        carrossel.removeEventListener('mouseleave', continuar);
      }
    };
  }, []);

  return (
    <section className="py-16 bg-white" id="marcas">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Nossos Apoiadores</h2>
        <div className="w-20 h-1 bg-[#FFE911] mx-auto mb-10"></div>

        <div ref={carrosselRef} className="w-full overflow-hidden relative">
          <div className="flex w-max">
            {marcasDuplicadas.map((marca, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-6 flex items-center justify-center"
                style={{ width: '200px' }}
              >
                <img
                  src={marca}
                  alt={`Apoiador ${index + 1}`}
                  className="max-h-24 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Apoiadores;