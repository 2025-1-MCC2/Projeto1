import React, { useState } from "react";
import { tw } from 'twind';
import { setup } from 'twind';
import { virtualSheet } from 'twind/sheets';
import Navbar from "../../componentes/navbar/Navbar";
import Acessibilidade from "../../componentes/acessibilidade/Acessibilidade";
import Footer from "../footer/Footer";
import ChatBot from "../../componentes/chatBot/ChatBot"; 

// Configuração do tema Twind
const theme = {
  fontFamily: {
    poppins: ['Poppins', 'sans-serif'],
  },
  colors: {
    teal: '#1CEBE5',
    yellow: '#FFE911',
    pink: '#FF4464',
  },
  extend: {
    backgroundImage: {
      'wave-pattern': "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNDQwIDMyMCI+PHBhdGggZD0iTTAsNjRMNDgsODBDOTYsOTYsMTkyLDEyOCwyODgsMTU0LjdDMzg0LDE4MSw0ODAsMjAzLDU3NiwxOTcuM0M2NzIsMTkyLDc2OCwxNjAsODY0LDE0OS4zQzk2MCwxMzksMTA1NiwxNDksMTE1MiwxNjBDMTI0OCwxNzEsMTM0NCwxODEsMTM5MiwxODYuN0wxNDQwLDE5MlYzMjBIMTM5MkMxMzQ0LDMyMCwxMjQ4LDMyMCwxMTUyLDMyMEMxMDU2LDMyMCw5NjAsMzIwLDg2NCwzMjBDNzY4LDMyMCw2NzIsMzIwLDU3NiwzMjBDNDgwLDMyMCwzODQsMzIwLDI4OCwzMjBDMTkyLDMyMCw5NiwzMjAsNDgsMzIwSDBaIiBmaWxsPSIjRkZGRkZGIi8+PC9zdmc+')"
    }
  }
}

// Configuração do Twind
setup({
  theme,
  sheet: virtualSheet(),
  preflight: true
});

const Educacao = () => {
  // Estado para controlar o modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMateria, setSelectedMateria] = useState(null);

  // Função para abrir o modal
  const openModal = (materia) => {
    setSelectedMateria(materia);
    setModalOpen(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedMateria(null);
  };

  // Dados dos vídeos
  const videos = [
    {
      id: 1,
      title: "Aprendizagem Criativa",
      url: "https://www.youtube.com/embed/4TCTSqmVH80",
      description: "Descubra como transformar seu processo de aprendizagem através de métodos criativos e inovadores.",
      duration: "10:32",
      views: "15.7k"
    },
    {
      id: 2,
      title: "Educação do Futuro",
      url: "https://www.youtube.com/embed/-cZJ-erRG1Y",
      description: "Explore as tendências que estão moldando o futuro da educação e como se preparar para elas.",
      duration: "8:45",
      views: "12.3k"
    },
    {
      id: 3,
      title: "Inovação na Educação",
      url: "https://www.youtube.com/embed/gPHI53pwwmE",
      description: "Conheça as mais recentes inovações que estão revolucionando o setor educacional.",
      duration: "12:18",
      views: "9.5k"
    },
    {
      id: 4,
      title: "Tecnologia Educacional",
      url: "https://www.youtube.com/embed/bua0ozc7Uhc",
      description: "Como a tecnologia está transformando a maneira como aprendemos e ensinamos.",
      duration: "15:07",
      views: "18.2k"
    }
  ];

  // Dados das matérias com conteúdo expandido para o modal
  const materias = [
    {
      id: 1,
      title: "O Futuro da Educação Pós-Pandemia",
      category: "Tendências",
      description: "Como a pandemia acelerou transformações no ensino e quais tendências vieram para ficar.",
      fullContent: "A pandemia de COVID-19 forçou uma transformação radical na educação em todo o mundo. Escolas e universidades tiveram que se adaptar rapidamente ao ensino remoto, revelando tanto desafios quanto oportunidades. Neste artigo, exploramos como o blended learning (modelo híbrido) veio para ficar, a importância da capacitação digital de professores e o crescimento das plataformas de aprendizagem adaptativa. Além disso, discutimos como a pandemia acelerou em 5 anos a adoção de tecnologias educacionais e quais lições podemos levar para o futuro da educação.",
      readTime: "5 min",
      views: "1.2k",
      image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
      author: "Dra. Ana Silva",
      date: "15 de Março, 2023"
    },
    {
      id: 2,
      title: "Inteligência Artificial na Educação",
      category: "Tecnologia",
      description: "Como a IA está personalizando o aprendizado e revolucionando a forma como ensinamos.",
      fullContent: "A Inteligência Artificial está transformando a educação de maneiras profundas. Sistemas de tutoria inteligente podem adaptar o conteúdo ao ritmo de aprendizagem de cada aluno, enquanto algoritmos de análise preditiva ajudam a identificar estudantes em risco de evasão. Nesta matéria, mostramos casos reais de escolas que implementaram IA com sucesso, incluindo uma plataforma que reduz em 30% o tempo necessário para aprender matemática. Também discutimos os desafios éticos e como garantir que a tecnologia sirva para reduzir, e não aumentar, as desigualdades educacionais.",
      readTime: "7 min",
      views: "2.4k",
      image: "https://th.bing.com/th/id/OIP.6noAx6V_zIN5qc9Vqi0WOAHaEJ?w=277&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      author: "Prof. Carlos Mendes",
      date: "22 de Abril, 2023"
    },
    {
      id: 3,
      title: "Aprendizagem Criativa na Prática",
      category: "Metodologias",
      description: "Descubra métodos inovadores para estimular a criatividade em sala de aula.",
      fullContent: "A Aprendizagem Criativa, baseada nos trabalhos do MIT Media Lab, propõe uma abordagem 'mãos na massa' para a educação. Neste artigo detalhado, apresentamos 5 estratégias comprovadas para implementar essa metodologia: 1) Projetos baseados em paixões pessoais, 2) Cultura do 'faça você mesmo', 3) Valorização do processo sobre o produto, 4) Aprendizagem entre pares e 5) Reflexão constante. Incluímos exemplos de escolas brasileiras que aumentaram em 40% o engajamento dos alunos com essas técnicas, além de um guia prático para professores começarem a aplicar em suas aulas.",
      readTime: "6 min",
      views: "1.8k",
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
      author: "Pedro Oliveira",
      date: "10 de Maio, 2023"
    },
    {
      id: 4,
      title: "Educação Inclusiva: Desafios e Soluções",
      category: "Inclusão",
      description: "Como criar ambientes educacionais verdadeiramente inclusivos para todos os alunos.",
      fullContent: "A educação inclusiva vai muito além da simples matrícula de alunos com deficiência em escolas regulares. Este artigo aprofundado explora as 3 dimensões da verdadeira inclusão: 1) Acessibilidade física e digital, 2) Adaptação curricular e 3) Cultura escolar acolhedora. Apresentamos cases de sucesso, como uma escola pública que desenvolveu um programa de formação continuada para professores que reduziu em 75% os casos de bullying contra alunos com necessidades especiais. Também discutimos tecnologias assistivas emergentes e políticas públicas eficazes para promover a inclusão em larga escala.",
      readTime: "8 min",
      views: "3.1k",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
      author: "Lucia Fernandes",
      date: "5 de Junho, 2023"
    }
  ];

  return (
    
    <div className={tw`flex flex-col min-h-screen font-poppins bg-gray-50`}>
     <Navbar />
      {/* Hero Section */}
      <section className={tw`relative bg-[#FFFBCC] overflow-hidden`}>
        <div className={tw`container mx-auto px-4 pt-24 pb-40 relative z-10 text-center`}>
          <h2 className={tw`text-4xl md:text-5xl font-bold mb-6 text-gray-800`}>
            <span className={tw`text-[#FF4464]`}>Conteúdos Educacionais</span> para sua evolução
          </h2>
          <p className={tw`text-xl text-gray-700`}>
          "Mergulhe em uma jornada de conhecimento com nossos especialistas, por meio de vídeos inspiradores e matérias produzidas com atenção aos detalhes para levar até você conteúdo de qualidade, acessível e transformador.
          </p>
        </div>
      
        <div className={tw`absolute bottom-0 left-0 w-full overflow-hidden leading-[0]`}>
          <svg className={tw`relative block w-full h-32`} viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path d="M0,64L48,80C96,96,192,128,288,154.7C384,181,480,203,576,197.3C672,192,768,160,864,149.3C960,139,1056,149,1152,160C1248,171,1344,181,1392,186.7L1440,192V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320H0Z" fill="#FFFFFF"></path>
          </svg>
        </div>
      </section>

      {/* Vídeos Section */}
      <section id="videos" className={tw`container mx-auto px-4 py-12`}>
        <h2 className={tw`text-3xl font-bold text-center mb-12 text-gray-800`}>
          Nossos <span className={tw`text-[#FF4464]`}>Vídeos</span>
        </h2>
        
        <div className={tw`space-y-8`}>
          <div className={tw`grid grid-cols-1 md:grid-cols-2 gap-8`}>
            {videos.slice(0, 2).map((video) => (
              <div key={video.id} className={tw`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg`}>
                <div className={tw`relative pb-[56.25%] h-0 overflow-hidden`}>
                  <iframe 
                    className={tw`absolute top-0 left-0 w-full h-full`} 
                    src={video.url}
                    allowFullScreen
                  ></iframe>
                </div>
                <div className={tw`p-6`}>
                  <h3 className={tw`text-xl font-bold text-gray-800 mb-3`}>{video.title}</h3>
                  <p className={tw`text-gray-600 mb-4`}>{video.description}</p>
                  <div className={tw`flex items-center text-sm text-gray-500`}>
                    <span className={tw`mr-4`}>Duração: {video.duration}</span>
                    <span>Visualizações: {video.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className={tw`grid grid-cols-1 md:grid-cols-2 gap-8`}>
            {videos.slice(2, 4).map((video) => (
              <div key={video.id} className={tw`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg`}>
                <div className={tw`relative pb-[56.25%] h-0 overflow-hidden`}>
                  <iframe 
                    className={tw`absolute top-0 left-0 w-full h-full`} 
                    src={video.url}
                    allowFullScreen
                  ></iframe>
                </div>
                <div className={tw`p-6`}>
                  <h3 className={tw`text-xl font-bold text-gray-800 mb-3`}>{video.title}</h3>
                  <p className={tw`text-gray-600 mb-4`}>{video.description}</p>
                  <div className={tw`flex items-center text-sm text-gray-500`}>
                    <span className={tw`mr-4`}>Duração: {video.duration}</span>
                    <span>Visualizações: {video.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Matérias Section com botão "Saiba Mais" */}
      <section className={tw`container mx-auto px-4 py-12 rounded-lg`}>
        <h2 className={tw`text-3xl font-bold text-center mb-12 text-gray-800`}>
          Matérias <span className={tw`text-[#FF4464]`}>Educacionais</span>
        </h2>
        
        <div className={tw`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8`}>
          {materias.map((materia) => (
            <div key={materia.id} className={tw`group bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg`}>
              <div className={tw`relative h-48 overflow-hidden`}>
                <img 
                  src={materia.image} 
                  alt={materia.title} 
                  className={tw`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105`}
                  loading="lazy"
                />
                <div className={tw`absolute inset-0 bg-gradient-to-t from-black/30 to-transparent`}></div>
                <span className={tw`absolute top-3 right-3 bg-[#1CEBE5] text-white text-xs px-2 py-1 rounded-full`}>
                  {materia.category}
                </span>
              </div>
              <div className={tw`p-6`}>
                <h3 className={tw`text-xl font-bold text-gray-800 mb-3 line-clamp-2`}>{materia.title}</h3>
                <p className={tw`text-gray-600 mb-4 line-clamp-3`}>{materia.description}</p>
                <div className={tw`flex items-center text-sm text-gray-500 mb-4`}>
                  <span className={tw`mr-4`}>{materia.readTime} de leitura</span>
                  <span className={tw`mx-2 text-gray-400`}>•</span>
                  <span>{materia.views} visualizações</span>
                </div>
                <button 
                  onClick={() => openModal(materia)}
                  className={tw`w-full py-2 bg-[#FF4464] text-white rounded-lg font-medium hover:bg-[#e03a58] transition-colors`}
                >
                  Saiba Mais
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {modalOpen && selectedMateria && (
  <div className={tw`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm`}>
    <div className={tw`relative bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl`}>
      {/* Botão de fechar */}
      <button 
        onClick={closeModal}
        className={tw`absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={tw`h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      {/* Conteúdo do Modal */}
      <div className={tw`p-8`}>
        {/* Cabeçalho */}
        <div className={tw`mb-8`}>
          <span className={tw`inline-block bg-gradient-to-r from-[#1CEBE5] to-[#FF4464] text-white text-sm px-3 py-1 rounded-full mb-4 shadow-md`}>
            {selectedMateria.category}
          </span>
          <h2 className={tw`text-3xl md:text-4xl font-bold text-gray-800 mb-3 leading-tight`}>
            {selectedMateria.title}
          </h2>
          <div className={tw`flex flex-wrap items-center text-gray-500 text-sm mb-4 gap-2`}>
            <div className={tw`flex items-center`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={tw`h-4 w-4 mr-1`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Por {selectedMateria.author}</span>
            </div>
            <span className={tw`text-gray-300`}>•</span>
            <div className={tw`flex items-center`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={tw`h-4 w-4 mr-1`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{selectedMateria.date}</span>
            </div>
            <span className={tw`text-gray-300`}>•</span>
            <div className={tw`flex items-center`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={tw`h-4 w-4 mr-1`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{selectedMateria.readTime} de leitura</span>
            </div>
          </div>
        </div>
        
        {/* Imagem Destaque */}
        <div className={tw`relative h-80 mb-8 rounded-xl overflow-hidden shadow-lg`}>
          <img 
            src={selectedMateria.image} 
            alt={selectedMateria.title} 
            className={tw`w-full h-full object-cover transition-transform duration-500 hover:scale-105`}
            loading="lazy"
          />
          <div className={tw`absolute inset-0 bg-gradient-to-t from-black/30 to-transparent`}></div>
        </div>
        
        {/* Conteúdo do Artigo */}
        <div className={tw`prose max-w-none`}>
          <p className={tw`text-gray-700 mb-6 text-lg leading-relaxed`}>
            {selectedMateria.fullContent}
          </p>
          
          {/* Seção de Destaque */}
          <div className={tw`bg-[#FFFBCC] border-l-4 border-[#FF4464] p-4 my-6 rounded-r-lg`}>
            <h3 className={tw`text-xl font-bold text-gray-800 mb-2`}>Destaque</h3>
            <p className={tw`text-gray-700`}>
              Este artigo faz parte da nossa série especial sobre inovação educacional. 
              Confira outros conteúdos relacionados na nossa seção de educação.
            </p>
          </div>
        </div>
        
        {/* Rodapé do Modal */}
        <div className={tw`mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4`}>
          <div className={tw`flex items-center text-gray-500`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={tw`h-5 w-5 mr-1`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>{selectedMateria.views} visualizações</span>
          </div>
          
          </div>
        </div>
        </div>
    </div>

)}
      {/* CTA Section */}
      <section className={tw`bg-[#FF4464] bg-opacity-100 text-white py-16`}>
        <div className={tw`container mx-auto px-4 text-center`}>
          <h2 className={tw`text-3xl md:text-4xl font-bold mb-6`}>
            Pronto para transformar sua aprendizagem?
          </h2>
          <p className={tw`text-xl mb-8 max-w-2xl mx-auto`}>
            Junte-se a milhares de alunos que já estão revolucionando sua forma de aprender.
          </p>
         
        </div>
      </section>

      <Footer className={tw`mt-auto`} />
      <Acessibilidade />
      <ChatBot />
    </div>
  )
}

export default Educacao;