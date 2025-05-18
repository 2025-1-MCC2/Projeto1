import React from 'react';

const SobreNos = () => {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-white" id="sobre">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          {/* Título*/}
          <div className="w-full lg:w-1/3">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800">
              <br />
              Sobre Nós
            </h2>
            <div className="mt-4 h-1 w-16 bg-[#FFE911] rounded-full"></div>
          </div>
          
          {/* Conteúdo */}
          <div className="w-full lg:w-2/3">
            <p className="text-lg sm:text-xl leading-relaxed text-gray-600 mb-6">
              O <span className="font-semibold text-[#FFE911]">Instituto Criativo</span> é uma ONG que nasceu para transformar a vida das pessoas por meio da educação criativa e inovadora.
            </p>
            <p className="text-lg sm:text-xl leading-relaxed text-gray-600">
              Empoderamos indivíduos com conhecimento de qualidade e diferenciado que pode ser aplicado nos estudos, negócios e na vida cotidiana, contribuindo significativamente para a evolução da sociedade.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SobreNos;