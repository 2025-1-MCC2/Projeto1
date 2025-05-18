import React from 'react';
import lucyImg from '../../assets/lucy.jpeg';
import rodrigoImg from '../../assets/rodrigo_assirati.jpg';

const TimeInstituto = () => {
  const membros = [
    {
      nome: "Lucy Mari",
      cargo: "Presidente e fundadora",
      imagem: lucyImg,
      descricao:
        "Lucy Mari é empresária, educadora e psicoterapeuta, com formação em Matemática e doutorado em Engenharia de Computação pela USP. Atua na interseção entre educação, tecnologia e psicologia, liderando projetos inovadores. Sua trajetória é focada em transformar vidas por meio da criatividade.",
    },
    {
      nome: "Rodrigo Assirati",
      cargo: "Vice-presidente",
      imagem: rodrigoImg,
      descricao:
        "Rodrigo Assirati é formado em Ciências da Computação pela USP e atua como coordenador e professor universitário desde 2012. Especialista em educação pela Microsoft, ele lidera projetos de transformação digital e capacitação de professores. Além disso, é consultor de tecnologia e empreendedor, com foco em soluções inovadoras para a educação.",
    },
  ];

  return (
      <section className="pt-0 pb-16 px-4 max-w-6xl mx-auto" id="colaborador">
          <h2 className="text-4xl font-bold text-center mb-4">Nosso Time</h2>
          <div className="w-20 mx-auto h-1 bg-[#FFE911] mb-12"></div>
          <p className="text-xl text-center text-gray-600 mb-12">
              Quem faz acontecer no Instituto Criativo
          </p>



      <div className="space-y-12">
        {membros.map((membro, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            } gap-8 items-center`}
          >
            <div className="w-full md:w-1/3">
              <img
                src={membro.imagem}
                alt={membro.nome}
   
                className="rounded-2xl object-cover object-center w-full h-72 shadow-md"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h3 className="text-3xl font-bold">{membro.nome}</h3>
              <p className="text-xl text-[#20B2AA] mb-4">{membro.cargo}</p>
              <p className="text-gray-700">{membro.descricao}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TimeInstituto;