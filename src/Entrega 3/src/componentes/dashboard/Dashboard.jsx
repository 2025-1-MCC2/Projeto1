import { useState, useEffect, useRef } from "react";
import { FaPalette, FaUsers, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import Sidebar from "./Sidebar";
import Header from "./Header";
import StatsCards from "./StatsCards";
import EventCards from "./EventCards";
import ChatArea from "./ChatArea";
import SettingsPanel from "./SettingsPanel";
import ModalEvento from "./ModalEvento";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { generateEventReport } from '../utils/reportUtils';

export default function Dashboard() {
  const [userData, setUserData] = useState({
    id: "",
    nome: "",
    email: "",
    telefone: "",
    cargo: "",
    localizacao: "",
    tipo: "",
    profilePicUrl: "/img/lucy_mari.jpg",
  });

  const [modalNovoEvento, setModalNovoEvento] = useState(false);
  const [modalEditarEvento, setModalEditarEvento] = useState(false);
  const [eventoParaEditar, setEventoParaEditar] = useState(null);
  const [previewNovaImagem, setPreviewNovaImagem] = useState(null);
  const [activeMainTab, setActiveMainTab] = useState("eventos");
  const [activeConfigTab, setActiveConfigTab] = useState("dashboard");
  const [activeTab, setActiveTab] = useState("meus");
  const [eventos, setEventos] = useState([]);
  const [contadores, setContadores] = useState({
    concluidos: 0,
    pendentes: 0,
    outrosUsuarios: 0,
    todos: 0,
  });
  const [colaboradores, setColaboradores] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success'
  });
  const [unreadCounts, setUnreadCounts] = useState({});
  const [totalUnreadMessages, setTotalUnreadMessages] = useState(0);
  const fileInputRef = useRef(null);
  const unreadCountsRef = useRef({});
  

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);


  const handleSidebarItemClick = (callback) => {
    return (...args) => {
      if (window.innerWidth < 1024) { 
        setSidebarOpen(false);
      }
      callback(...args);
    };
  };

  // Atualiza o total de mensagens não lidas e a referência
  useEffect(() => {
    const total = Object.values(unreadCounts).reduce((a, b) => a + b, 0);
    setTotalUnreadMessages(total);
    unreadCountsRef.current = unreadCounts;
    console.log('Contador atualizado:', unreadCounts, 'Total:', total);
  }, [unreadCounts]);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { 
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const fetchUnreadMessagesGlobal = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const response = await fetch('http://localhost:5000/api/messages/unread/count', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error('Erro ao buscar contagens não lidas');
      
      const data = await response.json();
      

      if (data.total !== undefined) {
        setTotalUnreadMessages(data.total || 0);
      } else if (Array.isArray(data)) {
        const newCounts = {};
        data.forEach(item => {
          newCounts[item.sender_id] = item.count;
        });
        setUnreadCounts(newCounts);
      }
    } catch (error) {
      console.error('Erro ao buscar mensagens não lidas:', error);
    }
  };


  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };


  const calcularContadores = (eventosList) => {
    const meusEventos = eventosList.filter(evento => evento.autor_id === userData.id);
    const concluidos = meusEventos.filter(evento => evento.status === 'concluido').length;
    const pendentes = meusEventos.filter(evento => evento.status === 'pendente').length;
    const outrosUsuarios = eventosList.filter(evento => evento.autor_id !== userData.id).length;
    const todos = eventosList.length;

    return {
      concluidos,
      pendentes,
      outrosUsuarios,
      todos
    };
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserData({
        ...user,
        profilePicUrl: user.profilePicUrl || "/img/lucy_mari.jpg",
      });
  
      const url =
        user.tipo === "ADM_MASTER"
          ? `http://localhost:5000/api/eventos`
          : `http://localhost:5000/api/eventos/usuario/${user.id}`;
  
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            console.error("Erro ao carregar eventos:", res.status);
            return Promise.reject(`Erro na requisição: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          const eventosOrdenados = data.sort(
            (a, b) => new Date(b.data_criacao) - new Date(a.data_criacao)
          );
          setEventos(eventosOrdenados);
          setContadores(calcularContadores(eventosOrdenados));
        })
        .catch((err) => {
          console.error("Erro ao carregar eventos:", err);
          showToast("Erro ao carregar eventos", "error");
        });
        
      // NOVO: Buscar mensagens não lidas ao montar o componente
      fetchUnreadMessagesGlobal();
    } else {
      window.location.href = "/login";
    }
  }, []);
  

  useEffect(() => {

    const interval = setInterval(fetchUnreadMessagesGlobal, 30000);
    return () => clearInterval(interval);
  }, []);
  

  useEffect(() => {
    if (userData.id) {
      setContadores(calcularContadores(eventos));
    }
  }, [eventos, userData.id]);

  // Funções de controle e handlers
  const toggleNovoEvento = () => setModalNovoEvento(!modalNovoEvento);

  const toggleEditar = (evento) => {
    setEventoParaEditar(evento);
    if (evento.imagem) {
      setPreviewNovaImagem(`http://localhost:5000/uploads/${evento.imagem}`);
    } else {
      setPreviewNovaImagem(null);
    }
    setModalEditarEvento(true);
  };

  const toggleEditarEvento = () => setModalEditarEvento(!modalEditarEvento);

  const handleDeletarEvento = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/eventos/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao excluir evento');
      }
  
      setEventos(eventos.filter(evento => evento.id !== id));
      showToast('Evento excluído com sucesso!');
    } catch (error) {
      console.error("Erro ao excluir evento:", error);
      showToast(`Erro: ${error.message}`, 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.setItem("logoutSuccess", "true");
    window.location.href = "/";
  };

  const handleGenerateReport = () => {
    if (!eventos.length) {
      alert("Nenhum evento disponível para gerar relatório.");
      return;
    }
    generateEventReport(eventos, userData);
  };

  const handleSalvarNovoEvento = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    formData.append('autor_id', userData.id);
  
    try {
      const response = await fetch("http://localhost:5000/api/eventos", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao criar evento');
      }
  
      const novoEvento = await response.json();
  
      setModalNovoEvento(false);
      setPreviewNovaImagem(null);

      const novoEventoObj = {
        ...novoEvento,
        titulo: formData.get('titulo'),
        descricao: formData.get('descricao'),
        status: formData.get('status'),
        ano: formData.get('ano'),
        autor_id: userData.id,
        imagem: novoEvento.imagem || null,
        data_criacao: novoEvento.data_criacao || new Date().toISOString(),
      };
  
      setEventos(prevEventos => {
        const eventosAtualizados = [novoEventoObj, ...prevEventos];
        return eventosAtualizados.sort(
          (a, b) => new Date(b.data_criacao) - new Date(a.data_criacao)
        );
      });
  
      showToast('Evento criado com sucesso!');
  
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      showToast(`Erro: ${error.message}`, 'error');
    }
  };
  
  const handleSalvarEdicaoEvento = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    formData.append('id', eventoParaEditar.id);
    formData.append('autor_id', eventoParaEditar.autor_id);
  
    if (
      !formData.get('titulo') ||
      !formData.get('descricao') ||
      !formData.get('ano') ||
      !formData.get('status') ||
      !formData.get('autor_id')
    ) {
      showToast("Por favor, preencha todos os campos obrigatórios!", 'error');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/eventos/${eventoParaEditar.id}`, {
        method: "PUT",
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao atualizar evento');
      }
  
      const eventoAtualizado = await response.json();
  
      setModalEditarEvento(false);
      setPreviewNovaImagem(null);
  
      // Atualiza o estado com os dados completos retornados pelo servidor
      setEventos(prevEventos => 
        prevEventos.map(e =>
          e.id === eventoParaEditar.id
            ? { 
                ...e, 
                ...eventoAtualizado,
                titulo: formData.get('titulo'),
                descricao: formData.get('descricao'),
                status: formData.get('status'),
                ano: formData.get('ano'),
                // Mantém a imagem existente se não houver nova imagem no retorno
                imagem: eventoAtualizado.imagem || e.imagem
              }
            : e
        )
      );
  
      showToast('Evento atualizado com sucesso!');
    } catch (error) {
      console.error("Erro ao atualizar evento:", error);
      showToast(`Erro: ${error.message}`, 'error');
    }
  };
  
  
  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewNovaImagem(URL.createObjectURL(file));
    }
  };
  
  const handleRemoverImagem = () => {
    setPreviewNovaImagem(null);
    if (modalEditarEvento && eventoParaEditar.imagem) {
      setPreviewNovaImagem(`http://localhost:5000/uploads/${eventoParaEditar.imagem}?t=${Date.now()}`);
    }
  };
  
  const handleUserDataChange = (campo, valor) => {
    setUserData((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleSaveProfile = () => {
    console.log("Salvando perfil:", userData);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData((prev) => ({
        ...prev,
        profilePicUrl: URL.createObjectURL(file),
      }));
    }
  };

  return (
    <div className="app-container">
      {/* Botão de menu para dispositivos móveis e tablets */}
      <button 
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow-md"
        aria-label={sidebarOpen ? "Fechar menu" : "Abrir menu"}
      >
        {sidebarOpen ? <FaTimes className="text-gray-700" /> : <FaBars className="text-gray-700" />}
      </button>

      {/* Overlay para fechar o sidebar em dispositivos móveis e tablets */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar responsivo - ocupando altura total em todos os dispositivos */}
      <aside 
        className={`
          sidebar-main
          ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'} 
        `}
      >
        {/* Botão para fechar o sidebar quando aberto */}
        {sidebarOpen && (
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 z-50 bg-white p-2 rounded-full shadow-md"
            aria-label="Fechar menu"
          >
            <FaTimes className="text-gray-700" />
          </button>
        )}
        
        <Sidebar 
          userData={userData}
          activeMainTab={activeMainTab}
          setActiveMainTab={handleSidebarItemClick(setActiveMainTab)}
          toggleNovoEvento={handleSidebarItemClick(toggleNovoEvento)}
          setActiveConfigTab={handleSidebarItemClick(setActiveConfigTab)}
          handleLogout={handleLogout}
          generateReport={handleGenerateReport}
          unreadMessagesCount={totalUnreadMessages}
        />
      </aside>

      <main className="main-content">
        {activeConfigTab === "dashboard" ? (
          <>
            {activeMainTab === "eventos" ? (
              <>
                <Header
                  userData={userData}
                  activeMainTab={activeMainTab}
                  toggleNovoEvento={toggleNovoEvento}
                  logo={logo}
                />

<StatsCards contadores={contadores} userData={userData} />

<div className="flex flex-wrap border-b border-gray-200 mb-6 overflow-x-auto">
  <button
    className={`px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm flex items-center gap-1 sm:gap-2 ${
      activeTab === "meus"
        ? "text-indigo-600 border-b-2 border-indigo-600"
        : "text-gray-500 hover:text-indigo-500"
    }`}
    onClick={() => setActiveTab("meus")}
  >
    <FaPalette /> <span>Meus Eventos</span>
  </button>

  {userData.tipo === "ADM_MASTER" && (
    <button
      className={`px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm flex items-center gap-1 sm:gap-2 ${
        activeTab === "outros"
          ? "text-indigo-600 border-b-2 border-indigo-600"
          : "text-gray-500 hover:text-indigo-500"
      }`}
      onClick={() => setActiveTab("outros")}
    >
      <FaUsers /> <span>Outros Colaboradores</span>
    </button>
  )}
</div>


                <EventCards
                  eventos={eventos}
                  userData={userData}
                  activeTab={activeTab}
                  toggleEditar={toggleEditar}
                  handleDeletarEvento={handleDeletarEvento}
                />
              </>
            ) : (
              <div className="w-full h-full flex flex-col">
                {/* Wrapper para o ChatArea com responsividade */}
                <div className="w-full flex-1 overflow-hidden chat-wrapper">
                  <ChatArea
                    userData={userData}
                    setUnreadCounts={setUnreadCounts}
                    unreadCountsRef={unreadCountsRef}
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <SettingsPanel
            userData={userData}
            setActiveConfigTab={setActiveConfigTab}
            setUserData={setUserData}
            handleSaveProfile={handleSaveProfile}
            profilePicUrl={userData.profilePicUrl}
            triggerFileSelect={triggerFileSelect}
            fileInputRef={fileInputRef}
            handleProfilePicChange={handleProfilePicChange}
          />
        )}
      </main>

      {/* Modais */}
      <ModalEvento
        modalAberto={modalNovoEvento}
        onFechar={toggleNovoEvento}
        onSalvar={handleSalvarNovoEvento}
        onImagemChange={handleImagemChange}
        onRemoverImagem={handleRemoverImagem}
        previewImagem={previewNovaImagem}
      />

      <ModalEvento
        modalAberto={modalEditarEvento}
        evento={eventoParaEditar}
        onFechar={toggleEditarEvento}
        onSalvar={handleSalvarEdicaoEvento}
        onImagemChange={handleImagemChange}
        onRemoverImagem={handleRemoverImagem}
        previewImagem={previewNovaImagem}
        modoEdicao={true}
      />

      {/* Modal de Logout */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 max-w-sm w-full text-center shadow-lg">
            <h2 className="text-base sm:text-lg font-semibold mb-4">Deseja realmente sair da conta?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
              <button
                onClick={handleLogout}
                className="bg-[#FF4464] text-white px-4 py-2 rounded hover:bg-[#D93B56] transition w-full sm:w-auto"
              >
                Sim, sair
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition w-full sm:w-auto mt-2 sm:mt-0"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed bottom-4 right-4 px-4 sm:px-6 py-2 sm:py-3 rounded-md shadow-lg text-white text-sm ${
          toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } animate-fade-in-up max-w-[90%] sm:max-w-md`}>
          {toast.message}
        </div>
      )}

      {/* Estilos para animações e responsividade */}
      <style jsx global>{`
        /* Reset básico para garantir comportamento consistente */
        *, *::before, *::after {
          box-sizing: border-box;
        }
        
        /* Estilos para o corpo e html */
        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          overflow: hidden;
        }
        
        /* Container principal da aplicação */
        .app-container {
          display: flex;
          flex-direction: row;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          background-color: #f9fafb;
          position: relative;
        }
        
        /* Sidebar principal */
        .sidebar-main {
          height: 100vh;
          min-height: 100vh;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 50;
          transition: transform 0.3s ease-in-out;
          background-color: #fff;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        /* Sidebar fechado em dispositivos móveis e tablets */
        .sidebar-closed {
          transform: translateX(-100%);
        }
        
        /* Sidebar aberto em dispositivos móveis e tablets */
        .sidebar-open {
          transform: translateX(0);
        }
        
        /* Conteúdo principal */
        .main-content {
          flex: 1;
          padding: 1rem;
          overflow-y: auto;
          margin-top: 3rem;
          width: 100%;
        }
        
        /* Estilos para garantir que o chat seja responsivo */
        .chat-wrapper {
          display: flex;
          flex-direction: column;
          height: calc(100vh - 120px);
          max-height: calc(100vh - 120px);
          overflow: hidden;
        }
        
        /* Garantir que o componente ChatArea ocupe todo o espaço disponível */
        .chat-wrapper > div {
          height: 100%;
          max-height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        /* Garantir que a lista de colaboradores seja responsiva */
        .chat-wrapper .colaboradores-list {
          max-height: 100%;
          overflow-y: auto;
        }
        
        /* Animação para toast */
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
        
        /* Media queries para diferentes tamanhos de tela */
        @media (min-width: 1024px) {
          .sidebar-main {
            position: relative;
            transform: translateX(0);
            height: 100vh;
            min-height: 100vh;
          }
          
          .main-content {
            margin-top: 0;
            padding: 1.5rem 2rem;
          }
        }
        
        @media (max-width: 1023px) {
          .app-container {
            flex-direction: column;
          }
          
          .chat-wrapper {
            height: calc(100vh - 100px);
            max-height: calc(100vh - 100px);
          }
        }
      `}</style>
    </div>
  );
}
