import { useState } from "react";
import { FaSignOutAlt, FaPlus, FaCalendarAlt, FaComments, FaCog, FaQuestionCircle, FaFilePdf, FaUser, FaTimes } from "react-icons/fa";

export default function Sidebar({ 
  userData, 
  activeMainTab, 
  setActiveMainTab, 
  toggleNovoEvento, 
  setActiveConfigTab, 
  handleLogout, 
  generateReport,
  unreadMessagesCount = 0 // Nova prop para contagem de mensagens não lidas
}) {
  const [showSuporteModal, setShowSuporteModal] = useState(false);

  const toggleSuporteModal = () => setShowSuporteModal(!showSuporteModal);

  return (
    <>
      <aside className="w-72 bg-white shadow-lg flex flex-col h-screen min-h-screen">
        <div className="p-6 text-center bg-yellow-50 border-b border-gray-200">
          <div className="relative inline-block mb-2">
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-md bg-gray-200 flex items-center justify-center mx-auto">
              <FaUser className="text-gray-500 text-4xl" />
            </div>
          </div>
          <h3 className="font-semibold text-gray-800 mt-2">{userData.nome}</h3>
          <span className="inline-block bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full px-3 py-1 mt-1">
            {userData.tipo === 'ADM_MASTER' ? 'ADM Master' : 'Colaborador'}
          </span>
          
          <div className="flex justify-center mt-4">
            <button 
              onClick={handleLogout}
              className="w-4/5 py-2 bg-[#FF4464] text-white rounded-full hover:bg-[#D93B56] transition flex justify-center items-center gap-2 shadow hover:shadow-md"
            >
              <FaSignOutAlt /> Sair da Conta
            </button>
          </div>
          
          {userData.tipo === 'ADM_MASTER' && (
            <div className="flex justify-center mt-4">
              <button 
                onClick={generateReport}
                className="w-4/5 py-2 bg-[#1CEBE5] bg-opacity-70 text-white rounded-full hover:bg-[#1CEBE5] hover:bg-opacity-70 transition flex justify-center items-center gap-2 shadow hover:shadow-md"
              >
                <FaFilePdf /> Gerar Relatório
              </button>
            </div>
          )}
        </div>
        
        <nav className="flex-1 bg-gray-50 p-4 space-y-3 overflow-y-auto">
          <div>
            <h3 className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2 px-2">Menu Principal</h3>
            <button
              onClick={() => setActiveMainTab("eventos")}
              className={`w-full text-left flex items-center px-4 py-2.5 ${activeMainTab === "eventos" ? "text-yellow-700 bg-yellow-50" : "text-gray-600 hover:bg-yellow-50 hover:text-yellow-700"} rounded-lg transition-colors duration-200 font-medium`}
            >
              <FaCalendarAlt className="mr-3" /> Eventos
            </button>
            <button
              onClick={() => {
                setActiveMainTab("chat");
                // Opcional: resetar o contador apenas se quiser
                // setUnreadMessagesCount(0);
              }}
              className="relative w-full text-left flex items-center px-4 py-2.5 text-gray-600 hover:bg-yellow-50 hover:text-yellow-700 rounded-lg transition-colors duration-200 font-medium"
            >
              <div className="relative flex items-center">
                <FaComments className="mr-3" />
                {/* Contador sempre visível */}
                <span className={`absolute -top-2 -right-2 ${unreadMessagesCount > 0 ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-200 text-gray-500'} text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center`}>
                  {unreadMessagesCount > 9 ? '9+' : unreadMessagesCount}
                </span>
              </div>
              <span className="ml-2">Chat</span>
            </button>
          </div>
          
          <div>
            <h3 className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2 px-2">Gerenciar Eventos</h3>
            <button 
              onClick={toggleNovoEvento}
              className="w-full text-left flex items-center px-4 py-2.5 text-gray-600 hover:bg-yellow-50 hover:text-yellow-700 rounded-lg transition-colors duration-200 font-medium"
            >
              <FaPlus className="mr-3" /> Novo Evento
            </button>
          </div>
          
          <div>
            <h3 className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2 px-2">Minha Conta</h3>
            <button 
              onClick={() => setActiveConfigTab("configuracoes")}
              className="w-full text-left flex items-center px-4 py-2.5 text-gray-600 hover:bg-yellow-50 hover:text-yellow-700 rounded-lg transition-colors duration-200 font-medium"
            >
              <FaCog className="mr-3" /> Configurações
            </button>
            <button 
              onClick={toggleSuporteModal}
              className="w-full text-left flex items-center px-4 py-2.5 text-gray-600 hover:bg-yellow-50 hover:text-yellow-700 rounded-lg transition-colors duration-200 font-medium"
            >
              <FaQuestionCircle className="mr-3" /> Suporte
            </button>
          </div>
        </nav>
      </aside>

      {/* Modal de Suporte */}
      {showSuporteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <FaQuestionCircle className="text-[#FF4464] mr-2" /> Suporte Instituto Criativo
              </h3>
              <button 
                onClick={toggleSuporteModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700">Como usar o sistema:</h4>
                <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                  <li>Para criar um novo evento, clique em "Novo Evento"</li>
                  <li>Acesse "Configurações" para editar seu perfil</li>
                  <li>Navegue entre "Eventos" e "Chat" no menu principal</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700">Suporte Técnico:</h4>
                <p className="text-gray-600 mt-2">
                  Entre em contato com nosso time de suporte:
                  <br />
                  <strong>Email:</strong> suporte@institutocriativo.com.br
                  <br />
                  <strong>Telefone:</strong> (11) 1234-5678
                </p>
              </div>
              
              <div className="pt-4">
                <button
                  onClick={toggleSuporteModal}
                  className="w-full py-2 bg-[#FF4464] text-white rounded-lg hover:bg-[#D93B56] transition"
                >
                  Entendido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Estilos adicionais para garantir altura total */}
      <style jsx>{`
        aside {
          height: 100vh !important;
          min-height: 100vh !important;
          display: flex !important;
          flex-direction: column !important;
        }
        
        nav {
          flex: 1 !important;
          display: flex !important;
          flex-direction: column !important;
          overflow-y: auto !important;
        }
      `}</style>
    </>
  );
}
