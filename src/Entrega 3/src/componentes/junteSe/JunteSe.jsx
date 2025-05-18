import React, { useState } from 'react';

const JunteSe = () => {
  const [modalAberto, setModalAberto] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    instagram: "",
    cidade: "",
    estado: "",
    motivacao: "",
    areas: ""
  });
  const [status, setStatus] = useState({
    enviando: false,
    enviado: false,
    erro: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Formatação do telefone com máscara
  const formatPhone = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const validateForm = () => {
    if (!formData.nome.trim()) return "Por favor, insira seu nome completo";
    if (!formData.email.trim()) return "Por favor, insira seu e-mail";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "E-mail inválido";
    if (!formData.telefone.trim()) return "Por favor, insira seu telefone";
    if (formData.telefone.replace(/\D/g, '').length < 11) return "Telefone incompleto";
    if (!formData.cidade.trim()) return "Por favor, insira sua cidade";
    if (!formData.estado.trim()) return "Por favor, insira seu estado";
    if (!formData.motivacao.trim()) return "Por favor, explique por que deseja ser embaixador";
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
      const response = await fetch("https://formspree.io/f/xbloyvej", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assunto: "Novo candidato a embaixador - Instituto Criativo",
          nome_completo: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          instagram: formData.instagram || "Não informado",
          localizacao: `${formData.cidade}, ${formData.estado}`,
          motivacao: formData.motivacao,
          areas_interesse: formData.areas || "Não especificado"
        }),
      });

      if (response.ok) {
        setStatus({ enviando: false, enviado: true, erro: null });
        setFormData({
          nome: "",
          email: "",
          telefone: "",
          instagram: "",
          cidade: "",
          estado: "",
          motivacao: "",
          areas: ""
        });
        
        // Fecha o modal após 3 segundos
        setTimeout(() => {
          setModalAberto(false);
          setStatus({ enviando: false, enviado: false, erro: null });
        }, 3000);
      } else {
        throw new Error('Falha no envio');
      }
    } catch (error) {
      setStatus({ enviando: false, enviado: false, erro: 'Erro ao enviar formulário. Tente novamente.' });
    }
  };

  return (
    <div className="bg-[#FFFFD8] flex flex-col items-center">
      <div className="w-full bg-[#FFFA96] py-5 text-center">
        <h4 className="text-3xl font-medium">Junte-se ao time de embaixadores!</h4>
      </div>

      <div className="flex flex-col items-center w-full py-10 px-4">
        <div className="text-center mb-8 md:mb-0 max-w-3xl mx-auto">
          <h3 className="text-2xl mb-6">
            Junte-se ao Instituto Criativo como embaixador(a) e tenha uma página exclusiva para captar doações aos nossos projetos. É simples e gratuito!
          </h3>
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setModalAberto(true)}
              className="bg-[#FF4464] text-white px-4 py-2 rounded-full text-base font-medium hover:bg-[#e83c59] w-[200px] transition duration-300 hover:scale-105"
            >
              Preencher Formulário
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-[#FF4464]">Formulário de Embaixador</h2>
              <button 
                onClick={() => {
                  setModalAberto(false);
                  setStatus({ enviando: false, enviado: false, erro: null });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            {status.erro && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
                {status.erro}
              </div>
            )}
            
            {status.enviado && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded">
                Formulário enviado com sucesso! Entraremos em contato em breve.
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Nome completo*</label>
                  <input 
                    type="text" 
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#FF4464] focus:border-transparent" 
                    required
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">E-mail*</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#FF4464] focus:border-transparent" 
                    required
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Telefone com DDD*</label>
                  <input 
                    type="text" 
                    name="telefone"
                    value={formData.telefone}
                    onChange={(e) => {
                      const formatted = formatPhone(e.target.value);
                      handleChange({ target: { name: 'telefone', value: formatted } });
                    }}
                    maxLength={15}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#FF4464] focus:border-transparent" 
                    required
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Instagram (opcional)</label>
                  <input 
                    type="text" 
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#FF4464] focus:border-transparent" 
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Cidade*</label>
                  <input 
                    type="text" 
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#FF4464] focus:border-transparent" 
                    required
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Estado*</label>
                  <input 
                    type="text" 
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#FF4464] focus:border-transparent" 
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Por que deseja ser um embaixador?*</label>
                <textarea
                  name="motivacao"
                  value={formData.motivacao}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-4 py-2 h-24 resize-none focus:ring-2 focus:ring-[#FF4464] focus:border-transparent"
                  required
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Em quais áreas gostaria de contribuir? (educação, eventos, divulgação, etc.)</label>
                <textarea
                  name="areas"
                  value={formData.areas}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-4 py-2 h-20 resize-none focus:ring-2 focus:ring-[#FF4464] focus:border-transparent"
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setModalAberto(false);
                    setStatus({ enviando: false, enviado: false, erro: null });
                  }}
                  className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={status.enviando}
                  className={`px-4 py-2 rounded-md text-white ${status.enviando ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'} transition flex items-center justify-center min-w-[100px]`}
                >
                  {status.enviando ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                  ) : 'Enviar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JunteSe;