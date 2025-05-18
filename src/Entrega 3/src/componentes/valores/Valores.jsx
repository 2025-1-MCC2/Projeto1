import React from 'react';
import { Target, Eye, HeartHandshake } from 'lucide-react'; // Ícones representando missão, visão, valores

const Valores = () => {
  return (
    <section className="py-16 bg-gray-100 text-center">
      <div className="flex justify-center gap-5 flex-wrap max-w-6xl mx-auto">
        {/* Missão */}
        <div className="bg-white rounded-xl shadow-md p-5 w-80 hover:scale-105 hover:shadow-lg transition-all">
          <div className="flex justify-center mb-4">
            <Target size={64} className="text-[#FFE911]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Missão</h2>
          <p className="text-gray-600 leading-relaxed">
            Desenvolver e compartilhar projetos de educação criativa e inovadora que transformam a sociedade.
          </p>
        </div>

        {/* Visão */}
        <div className="bg-white rounded-xl shadow-md p-5 w-80 hover:scale-105 hover:shadow-lg transition-all">
          <div className="flex justify-center mb-4">
            <Eye size={64} className="text-[#FF4464]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Visão</h2>
          <p className="text-gray-600 leading-relaxed">
            Ser referência na educação, empreendedorismo e eventos criativos por meio do aprendizado inovador.
          </p>
        </div>

        {/* Valores */}
        <div className="bg-white rounded-xl shadow-md p-5 w-80 hover:scale-105 hover:shadow-lg transition-all">
          <div className="flex justify-center mb-4">
            <HeartHandshake size={64} className="text-[#1CEBE5]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Valores</h2>
          <p className="text-gray-600 leading-relaxed">
            Sustentabilidade, qualidade, criatividade e inovação, ética e respeito, colaboração, e valorização do conhecimento.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Valores;
