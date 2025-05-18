import React, { useState, useEffect } from "react";
import { FaQrcode, FaCopy, FaUniversity, FaHandshake, FaQuestionCircle } from "react-icons/fa";
import Footer from "../footer/Footer";
import Acessibilidade from "../../componentes/acessibilidade/Acessibilidade";
import ChatBot from "../../componentes/chatBot/ChatBot";
import Navbar from "../../componentes/navbar/Navbar";

const Doacoes = () => {
  const [activeTab, setActiveTab] = useState('pix');
  const [notification, setNotification] = useState({
    visible: false,
    message: ""
  });
  const pixKey = "12.345.678/0001-99";
  const bankData = {
    banco: "Banco do Brasil (001)",
    agencia: "1234-5",
    conta: "98765-4",
    cnpj: "12.345.678/0001-99",
    titular: "Instituto Criativo"
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setNotification({ visible: true, message: "Copiado para a área de transferência!" });
    }).catch(err => {
      console.error("Falha ao copiar: ", err);
      setNotification({ visible: true, message: "Falha ao copiar." });
    });
  };

  useEffect(() => {
    if (notification.visible) {
      const timer = setTimeout(() => {
        setNotification({ visible: false, message: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const paypalDonateUrl = "https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=EYE7VJQTJKGVE&source=url";

  return (
    <>
      <Navbar />
      <section className="pt-[80px] relative h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="/src/assets/img7.jpeg"
            alt="Alunos em sala de aula criativa"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#3b3b3b]/50"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-md">
            Educação que Transforma Vidas
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto mb-8 drop-shadow-md">
            Sua contribuição mantém nossos projetos educacionais ativos
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveTab('pix')}
              className={`px-6 py-3 rounded-full font-bold transition-all ${activeTab === 'pix' ? 'bg-[#FF4464] text-white scale-105' : 'bg-white text-[#FF4464] hover:scale-105'}`}
            >
              <FaQrcode className="inline mr-2" /> PIX
            </button>
            <button
              onClick={() => setActiveTab('transferencia')}
              className={`px-6 py-3 rounded-full font-bold transition-all ${activeTab === 'transferencia' ? 'bg-[#FF4464] text-white scale-105' : 'bg-white text-[#FF4464] hover:scale-105'}`}
            >
              <FaUniversity className="inline mr-2" /> Transferência
            </button>
            <button
              onClick={() => setActiveTab('presencial')}
              className={`px-6 py-3 rounded-full font-bold transition-all ${activeTab === 'presencial' ? 'bg-[#FF4464] text-white scale-105' : 'bg-white text-[#FF4464] hover:scale-105'}`}
            >
              <FaHandshake className="inline mr-2" /> Presencial
            </button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12 max-w-5xl">
        {activeTab === 'pix' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="p-8 md:w-1/2 bg-[#FFE911]/30 flex flex-col items-center justify-center">
                <div className="text-center">
                  <FaQrcode className="text-5xl text-[#FF4464] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Doação via PIX</h3>
                  <p className="text-gray-600 mb-6">A forma mais rápida e segura</p>
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(pixKey)}`}
                    alt="QR Code PIX"
                    className="mx-auto border border-gray-200 rounded-lg"
                  />
                </div>
              </div>
              <div className="p-8 md:w-1/2">
                <h3 className="text-xl font-bold text-[#FF4464] mb-4">Chave PIX (CNPJ)</h3>
                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                  <p className="font-mono text-lg break-all">{pixKey}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(pixKey)}
                  className="w-full bg-[#FF4464] text-white py-3 rounded-lg font-semibold flex items-center justify-center hover:bg-[#ff2a4a] transition"
                >
                  <FaCopy className="mr-2" /> Copiar Chave
                </button>
                <div className="mt-6 p-4 rounded-lg border border-[#1CEBE5]/50">
                  <p className="text-sm text-gray-700">
                    <strong>Envie o comprovante para:</strong> financeiro@institutocriativo.org.br
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transferencia' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="p-8 md:w-1/2 bg-[#1CEBE5]/50 flex flex-col items-center justify-center">
                <FaUniversity className="text-5xl text-[#FF4464] mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Dados Bancários</h3>
                <p className="text-gray-600">Para transferência ou depósito</p>
              </div>
              <div className="p-8 md:w-1/2">
                <div className="space-y-4">
                  {Object.entries(bankData).map(([key, value]) => (
                    <div key={key} className="border-b border-gray-200 pb-4">
                      <p className="text-sm font-medium text-gray-500 capitalize">{key}:</p>
                      <div className="flex justify-between items-center">
                        <p className="font-semibold">{value}</p>
                        <button
                          onClick={() => copyToClipboard(value)}
                          className="text-[#FF4464] hover:text-[#ff2a4a]"
                        >
                          <FaCopy />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-lg bg-[#FFE911]/40">
                  <p className="text-sm text-gray-700">
                    <strong>Importante:</strong> Envie o comprovante para emitirmos seu recibo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'presencial' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="p-8 md:w-1/2 bg-[#FFE911]/30 flex flex-col items-center justify-center">
                <FaHandshake className="text-5xl text-[#FF4464] mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Doação Presencial</h3>
                <p className="text-gray-600">Visite nossa sede</p>
              </div>
              <div className="p-8 md:w-1/2">
                <h3 className="text-xl font-bold text-[#FF4464] mb-4">Nossa Localização</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-500">Endereço:</p>
                    <p className="font-semibold">Rua da Educação, 123 - Centro, São Paulo/SP</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Horário:</p>
                    <p className="font-semibold">Segunda a Sexta, das 9h às 17h</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Aceitamos:</p>
                    <p className="font-semibold">Dinheiro, materiais escolares e livros</p>
                  </div>
                </div>
                <div className="mt-6 p-4 rounded-lg border border-[#1CEBE5]/50">
                  <p className="text-sm text-gray-700">
                    <strong>Agendamento:</strong> visite@institutocriativo.org.br
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="py-20 bg-[#1CEBE5]/10">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <FaQuestionCircle className="text-4xl text-[#FF4464] mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-[#FF4464]">Dúvidas Frequentes</h2>
          </div>
          <div className="space-y-4">
            {[
              { pergunta: "Como recebo o recibo da minha doação?", resposta: "Para doações online, envie o comprovante para financeiro@institutocriativo.org.br. Para doações presenciais, emitimos no local." },
              { pergunta: "Posso deduzir no Imposto de Renda?", resposta: "Sim, somos uma OSC certificada. Doações a partir de R$100 são dedutíveis até o limite de 6% do lucro operacional (PJ) ou 8% do IR devido (PF)." },
              { pergunta: "Há um valor mínimo para doar?", resposta: "Não! Aceitamos qualquer valor, pois acreditamos que toda contribuição faz diferença." },
              { pergunta: "Posso fazer doações recorrentes?", resposta: "Sim, oferecemos opção de débito automático mensal. Entre em contato para configurar." },
              { pergunta: "Quais materiais aceitamos como doação?", resposta: "Livros didáticos, materiais escolares novos, equipamentos eletrônicos em bom estado e materiais de escritório." }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <details className="group">
                  <summary className="list-none p-4 cursor-pointer flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">{item.pergunta}</h3>
                    <span className="text-[#FF4464] group-open:hidden">+</span>
                    <span className="text-[#FF4464] hidden group-open:inline">−</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600">
                    <p>{item.resposta}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#FF4464] text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">A Educação Precisa de Você</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Sua doação leva conhecimento criativo para quem mais precisa.
          </p>
          <button
            onClick={() => window.open(paypalDonateUrl, '_blank')}
            className="bg-white text-[#FF4464] px-8 py-3 rounded-full font-bold shadow-md transition hover:bg-gray-100 hover:scale-105 transform"
          >
            Doar Agora
          </button>
        </div>
      </section>

      {notification.visible && (
        <div
          className={`fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white py-3 px-6 rounded-lg shadow-lg transition-all duration-500 ease-out transform ${notification.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          style={{ zIndex: 1000 }}
        >
          {notification.message}
        </div>
      )}

      <Footer />
      <Acessibilidade />
      <ChatBot />
    </>
  );
};

export default Doacoes;