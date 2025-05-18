import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import dayse from '../../assets/dayse.jpeg';
import joao from '../../assets/joao_querlon.jpg';
import felipe from '../../assets/felipe_almeida.jpg';
import joaquim from '../../assets/joaquim_roberto.jpg';
import carlos from '../../assets/carlos_albertini.jpg';
import marcos from '../../assets/marcos_brito.jpg';

const voluntarios = [
  { nome: "Deyse Santana", cargo: "Analista Financeira", foto: dayse },
  { nome: "João Querton", cargo: "Conselheiro fiscal", foto: joao },
  { nome: "Felipe Almeida", cargo: "Designer", foto: felipe },
  { nome: "Joaquim Roberto", cargo: "Conselheiro", foto: joaquim },
  { nome: "Carlos E. Albertini", cargo: "Psicoterapeuta", foto: carlos },
  { nome: "Marcos Brito", cargo: "Conteúdo", foto: marcos }
];

const CarrosselVoluntarios = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <section className="py-16 bg-gray-100 px-4">
      <div className="max-w-6xl mx-auto">
        <Slider {...settings}>
          {voluntarios.map((voluntario, index) => (
            <div key={index} className="px-2">
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <img
                  src={voluntario.foto}
                  alt={voluntario.nome}
                  className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
                />
                <h4 className="text-xl font-bold">{voluntario.nome}</h4>
                <p className="text-gray-600">{voluntario.cargo}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default CarrosselVoluntarios;