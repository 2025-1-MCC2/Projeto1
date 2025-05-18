import React from 'react';
import {
  BookOpenCheck,
  Briefcase,
  RefreshCcw,
  HeartPulse
} from 'lucide-react';

const SegmentsSection = () => {
  const segments = [
    {
      id: 1,
      title: "Aprendizado",
      age: "5 a 24 anos",
      description: "Projeto de incentivo ao raciocínio lógico de crianças para desenvolver seu pensamento crítico, empreendedorismo, matemática e computação.",
      icon: <BookOpenCheck size={48} className="text-[#1CEBE5] icon-preserve" />,
      bgColor: "bg-[#e0fafa] preserve-bg"
    },
    {
      id: 2,
      title: "Primeiro emprego",
      age: "16 a 20 anos",
      description: "Jovens em busca do primeiro emprego, para fornecer competências e habilidades, desenvolvimento pessoal e conhecimentos necessários para ingressar no mercado de trabalho.",
      icon: <Briefcase size={48} className="text-[#FFE911] icon-preserve" />,
      bgColor: "bg-[#fffbd1] preserve-bg"
    },
    {
      id: 3,
      title: "Recolocação",
      age: "24 a 60 anos",
      description: "Apoio a adultos em transição de carreira com foco em capacitação, tecnologia e desenvolvimento profissional.",
      icon: <RefreshCcw size={48} className="text-[#FF4464] icon-preserve" />,
      bgColor: "bg-[#ffe2e2] preserve-bg"
    },
    {
      id: 4,
      title: "Bem-estar",
      age: "+ 50 anos",
      description: "Promovendo assistência para desenvolvimento social, por meio de atividades de conversação, terapias, doação de alimentos e palestras de reeducação da mente.",
      icon: <HeartPulse size={48} className="text-[#56c870] icon-preserve" />,
      bgColor: "bg-[#dbf5db] preserve-bg"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white" id="segmento">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Nossos Segmentos
        </h1>
        <div className="w-20 h-1 bg-[#FFE911] mx-auto rounded-full preserve-bg" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {segments.map((segment) => (
          <div key={segment.id} className="h-full">
            <div className={`${segment.bgColor} rounded-2xl p-6 hover:shadow-lg transition-all h-full flex flex-col border border-gray-100 preserve-border`}>
              <div className="w-20 h-20 rounded-full flex items-center justify-center bg-white border-4 border-white shadow-md mx-auto -mt-12 mb-4 preserve-bg">
                {segment.icon}
              </div>
              <div className="flex-grow text-center">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {segment.title}
                </h2>
                <span className="inline-block px-3 py-1 text-xs font-medium bg-white rounded-full text-gray-600 mb-3 shadow-sm preserve-bg">
                  {segment.age}
                </span>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {segment.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        body.global-hc-mode .preserve-bg {
          background-color: inherit !important;
        }
        
        body.global-hc-mode .icon-preserve,
        body.global-hc-mode .icon-preserve path {
          color: inherit !important;
          stroke: inherit !important;
          fill: inherit !important;
        }
        
        body.global-hc-mode .preserve-border {
          border-color: #ffeb3b !important;
        }
      `}</style>
    </section>
  );
};

export default SegmentsSection;