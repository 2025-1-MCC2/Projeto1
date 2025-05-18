import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import ContatoImg from "../../assets/img4.jpeg";
import Acessibilidade from "../acessibilidade/Acessibilidade";
import ChatBot from "../chatBot/ChatBot";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    mensagem: ""
  });

  const [status, setStatus] = useState({
    enviando: false,
    enviado: false,
    erro: null
  });

  // Efeito para desaparecer a mensagem após 5 segundos
  useEffect(() => {
    let timer;
    if (status.enviado) {
      timer = setTimeout(() => {
        setStatus(prev => ({ ...prev, enviado: false }));
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [status.enviado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.nome.trim()) return "Por favor, insira seu nome";
    if (!formData.email.trim()) return "Por favor, insira seu e-mail";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "E-mail inválido";
    if (!formData.mensagem.trim()) return "Por favor, insira sua mensagem";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const error = validateForm();
    if (error) {
      setStatus({ enviando: false, enviado: false, erro: error });
      return;
    }

    setStatus({ enviando: true, enviado: false, erro: null });

    try {
      const response = await fetch("https://formspree.io/f/mqaqbvjb", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          sobrenome: formData.sobrenome,
          email: formData.email,
          mensagem: formData.mensagem
        }),
      });

      if (response.ok) {
        setStatus({ enviando: false, enviado: true, erro: null });
        setFormData({ nome: "", sobrenome: "", email: "", mensagem: "" });
      } else {
        throw new Error('Falha no envio');
      }
    } catch (error) {
      setStatus({ enviando: false, enviado: false, erro: 'Erro ao enviar mensagem. Tente novamente.' });
    }
  };

  return (
    <div className="m-0 p-0 bg-white">
      <Navbar />
      <div className="relative h-[80vh] min-h-[500px] overflow-hidden">
        <img
          alt="Crianças e professora em sala de aula"
          className="w-full h-full object-cover object-center brightness-50 scale-100"
          src={ContatoImg}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 -translate-y-20 px-4">
          <h1 className="text-white text-5xl md:text-5xl font-bold mb-6 drop-shadow-lg leading-tight text-center">
            Entre em Contato<br />Conosco
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[150px] overflow-hidden z-10">
          <div
            className="absolute bottom-0 left-0 w-full h-full bg-cover bg-no-repeat bg-bottom"
            style={{
              backgroundImage: 'url(\'data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="%23FFE911" opacity="0.3"/></svg>\')'
            }}
          />
        </div>
      </div>

      <div className="relative bg-white pt-20 -mt-[150px]">
        <section className="max-w-3xl mx-auto bg-white px-6 sm:px-10 pt-16 pb-16">
          <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-2 text-gray-700">Seu Nome</label>
              <input
                className="bg-gray-100 border-2 border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Esther"
                type="text"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-2 text-gray-700">Sobrenome</label>
              <input
                className="bg-gray-100 border-2 border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition"
                name="sobrenome"
                value={formData.sobrenome}
                onChange={handleChange}
                placeholder="Oliveira"
                type="text"
              />
            </div>
            <div className="sm:col-span-2 flex flex-col">
              <label className="text-sm font-semibold mb-2 text-gray-700">E-mail</label>
              <input
                className="bg-gray-100 border-2 border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seuemail@exemplo.com"
                type="email"
                required
              />
            </div>
            <div className="sm:col-span-2 flex flex-col">
              <label className="text-sm font-semibold mb-2 text-gray-700">Mensagem</label>
              <textarea
                className="bg-gray-100 border-2 border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-300 transition"
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                placeholder="Digite sua mensagem"
                rows="5"
                required
              />
            </div>

            {status.erro && (
              <div className="sm:col-span-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                {status.erro}
              </div>
            )}

            {status.enviado && (
              <div className="sm:col-span-2 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded animate-fade">
                Mensagem enviada com sucesso! Responderemos em breve.
              </div>
            )}

            <div className="sm:col-span-2 flex justify-center">
              <button
                className={`bg-[#FF4464] text-white text-base font-semibold w-[300px] py-3 rounded-lg shadow-lg transition ${
                  status.enviando ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#e63b58] hover:border-white'
                }`}
                type="submit"
                disabled={status.enviando}
              >
                {status.enviando ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                ) : 'Enviar Mensagem'}
              </button>
            </div>
          </form>
        </section>
      </div>

      <Footer />
      <Acessibilidade />
      <ChatBot />
    </div>
  );
};

export default ContactPage;