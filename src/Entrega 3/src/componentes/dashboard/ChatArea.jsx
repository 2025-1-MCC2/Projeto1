import { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaChevronUp, FaChevronDown, FaCircle, FaComments } from "react-icons/fa";
import { io } from "socket.io-client";
import logo from "../../assets/logo.png";

const MESSAGES_LIMIT = 6;

const formatarDataMensagem = (dataISO) => {
  const data = new Date(dataISO);
  const hoje = new Date();
  const ontem = new Date();
  ontem.setDate(ontem.getDate() - 1);

  const isHoje = data.toDateString() === hoje.toDateString();
  const isOntem = data.toDateString() === ontem.toDateString();

  if (isHoje) return "Hoje";
  if (isOntem) return "Ontem";

  return data.toLocaleDateString('pt-BR');
};

export default function ChatArea({ userData, setUnreadCounts: setGlobalUnreadCounts }) {
  const [allMessages, setAllMessages] = useState([]);
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [messageOffset, setMessageOffset] = useState(0);
  const [newMessage, setNewMessage] = useState("");
  const [colaboradores, setColaboradores] = useState([]);
  const [destinatario, setDestinatario] = useState(null);
  const [localUnreadCounts, setLocalUnreadCounts] = useState({});
  const chatContainerRef = useRef(null);
  const socketRef = useRef(null);
  const [forceUpdate, setForceUpdate] = useState(false);


  const totalUnreadMessages = Object.values(localUnreadCounts).reduce((sum, count) => sum + count, 0);


  useEffect(() => {
    const hasChanges = JSON.stringify(localUnreadCounts) !== JSON.stringify(globalUnreadCountsRef.current);
    if (hasChanges) {
      setGlobalUnreadCounts({...localUnreadCounts});
      globalUnreadCountsRef.current = {...localUnreadCounts};
    }
  }, [localUnreadCounts, setGlobalUnreadCounts, forceUpdate]);


  const globalUnreadCountsRef = useRef({});


  const fetchUnreadCounts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/messages/unread/count', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Erro ao buscar contagens não lidas');
      const data = await response.json();
      
      const newCounts = {};
      data.forEach(item => {
        newCounts[item.sender_id] = item.count;
      });
      
      setLocalUnreadCounts(newCounts);
    } catch (error) {
      console.error('Erro ao buscar contagens não lidas:', error);
    }
  };


  useEffect(() => {

    fetchUnreadCounts();

    socketRef.current = io('http://localhost:5000', {
      withCredentials: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });


    socketRef.current.emit('register', userData.id);


    socketRef.current.on('newMessage', (data) => {
      const newMsg = {
        id: data.messageId,
        remetente_id: data.from,
        destinatario_id: userData.id,
        conteudo: data.content,
        data_envio: data.timestamp,
        remetente_nome: data.senderName,
        destinatario_nome: userData.nome,
        lida: data.from === destinatario?.id
      };

      setAllMessages(prev => [...prev, newMsg]);
      updateVisibleMessages([...allMessages, newMsg], 0);

  
      if (data.from !== destinatario?.id) {
        setLocalUnreadCounts(prev => {
          const newCount = (prev[data.from] || 0) + 1;
          return {...prev, [data.from]: newCount};
        });
        
        // Force immediate UI update
        setForceUpdate(prev => !prev);
      }
    });

    return () => {
      socketRef.current.off('newMessage');
      socketRef.current.disconnect();
    };
  }, [userData, destinatario]);


  const loadColaboradores = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Erro ao carregar colaboradores');
      const users = await response.json();
      const filteredUsers = users.filter(user => user.id !== userData.id);

  
      const sortedUsers = filteredUsers.sort((a, b) => {
        const lastMessageA = allMessages.filter(msg =>
          msg.remetente_id === a.id || msg.destinatario_id === a.id
        ).sort((msg1, msg2) => new Date(msg2.data_envio) - new Date(msg1.data_envio))[0];

        const lastMessageB = allMessages.filter(msg =>
          msg.remetente_id === b.id || msg.destinatario_id === b.id
        ).sort((msg1, msg2) => new Date(msg2.data_envio) - new Date(msg1.data_envio))[0];

        return (lastMessageB?.data_envio || 0) - (lastMessageA?.data_envio || 0);
      });

      setColaboradores(sortedUsers);
    } catch (error) {
      console.error('Erro ao carregar colaboradores:', error);
    }
  };


  useEffect(() => {
    const loadMessages = async () => {
      if (!destinatario) return;

      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/messages/${destinatario.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error('Erro ao carregar mensagens');
        const messages = await response.json();
        
        setAllMessages(messages);
        updateVisibleMessages(messages, 0);


        const unreadMessages = messages.filter(msg => 
          !msg.lida && msg.destinatario_id === userData.id
        );
        
        if (unreadMessages.length > 0) {
          await fetch('http://localhost:5000/api/messages/read', {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              senderId: destinatario.id
            })
          });
          
          // Update local counter
          setLocalUnreadCounts(prev => ({
            ...prev,
            [destinatario.id]: 0
          }));
          
    
          setForceUpdate(prev => !prev);
        }

      } catch (error) {
        console.error('Erro ao carregar mensagens:', error);
      }
    };

    loadMessages();
  }, [destinatario, userData.id]);


  const updateVisibleMessages = (messages, offset) => {
    const start = Math.max(0, messages.length - MESSAGES_LIMIT - offset);
    const end = start + MESSAGES_LIMIT;
    setVisibleMessages(messages.slice(start, end));
    setMessageOffset(offset);
  };

  const showOlderMessages = () => {
    if (messageOffset + MESSAGES_LIMIT < allMessages.length) {
      updateVisibleMessages(allMessages, messageOffset + 1);
    }
  };

  const showNewerMessages = () => {
    if (messageOffset > 0) {
      updateVisibleMessages(allMessages, messageOffset - 1);
    } else {
      updateVisibleMessages(allMessages, 0);
    }
  };


  useEffect(() => {
    if (chatContainerRef.current && messageOffset === 0) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [visibleMessages, messageOffset]);


  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !destinatario?.id) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: destinatario.id,
          content: newMessage
        })
      });

      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData.message);

      const newMsg = {
        id: responseData.messageId || Date.now(),
        remetente_id: userData.id,
        destinatario_id: destinatario.id,
        conteudo: newMessage,
        data_envio: new Date().toISOString(),
        remetente_nome: userData.nome,
        destinatario_nome: destinatario.nome,
        lida: false
      };

      const updatedMessages = [...allMessages, newMsg];
      setAllMessages(updatedMessages);
      setNewMessage('');
      updateVisibleMessages(updatedMessages, 0);


      socketRef.current.emit('sendMessage', {
        to: destinatario.id,
        content: newMessage,
        senderName: userData.nome
      });

    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };


  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchUnreadCounts(), loadColaboradores()]);
    };

    loadData();
    

    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, [userData.id]);

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="bg-white p-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo da Empresa" className="h-8 w-auto" />
          <h1 className="text-lg font-semibold text-gray-800">Chat Corporativo</h1>
        </div>

        <div className="flex items-center">
          <div className="relative">
            <FaComments className="text-gray-600" />
            {totalUnreadMessages > 0 && (
              <span 
                key={`badge-${totalUnreadMessages}-${forceUpdate}`}
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce"
              >
                {totalUnreadMessages > 9 ? '9+' : totalUnreadMessages}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Collaborators list */}
        <div className="w-60 border-r border-gray-200 bg-white flex flex-col">
          <div className="p-3 border-b border-gray-200">
            <h2 className="font-medium text-gray-700">Colaboradores</h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            {colaboradores.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                Nenhum colaborador disponível
              </div>
            ) : (
              colaboradores.map(colaborador => (
                <div
                  key={colaborador.id}
                  onClick={() => setDestinatario(colaborador)}
                  className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                    destinatario?.id === colaborador.id ? 'bg-yellow-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-medium">
                        {colaborador.nome.charAt(0)}
                      </div>
                      {localUnreadCounts[colaborador.id] > 0 && (
                        <span 
                          key={`indicator-${colaborador.id}-${localUnreadCounts[colaborador.id]}`}
                          className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse"
                        >
                          {localUnreadCounts[colaborador.id]}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-gray-800 truncate">
                          {colaborador.nome}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 truncate">
                        {colaborador.cargo}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col bg-white">
          {destinatario ? (
            <>
              <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-medium">
                    {destinatario.nome.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{destinatario.nome}</p>
                    <p className="text-xs text-gray-500">{destinatario.cargo}</p>
                  </div>
                </div>

                <div className="flex gap-1 opacity-50 hover:opacity-100 transition-opacity">
                  <button
                    onClick={showNewerMessages}
                    disabled={messageOffset === 0}
                    className={`p-1 rounded ${messageOffset === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <FaChevronUp size={12} />
                  </button>
                  <button
                    onClick={showOlderMessages}
                    disabled={messageOffset + MESSAGES_LIMIT >= allMessages.length}
                    className={`p-1 rounded ${messageOffset + MESSAGES_LIMIT >= allMessages.length ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <FaChevronDown size={12} />
                  </button>
                </div>
              </div>

              <div ref={chatContainerRef} className="flex-1 p-3 overflow-y-auto bg-gray-50 relative">
                {visibleMessages.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                    Nenhuma mensagem trocada ainda
                  </div>
                ) : (
                  <div className="space-y-2">
                    {(() => {
                      const agrupadas = [];
                      let ultimaData = "";

                      visibleMessages.forEach((msg) => {
                        const dataAtual = formatarDataMensagem(msg.data_envio);
                        if (dataAtual !== ultimaData) {
                          agrupadas.push({ tipo: "data", data: dataAtual });
                          ultimaData = dataAtual;
                        }
                        agrupadas.push({ tipo: "mensagem", mensagem: msg });
                      });

                      return agrupadas.map((item, index) => {
                        if (item.tipo === "data") {
                          return (
                            <div key={`data-${index}`} className="text-center text-xs text-gray-500 my-4">
                              <span className="bg-gray-200 px-3 py-1 rounded-full inline-block">
                                {item.data}
                              </span>
                            </div>
                          );
                        }

                        const msg = item.mensagem;
                        const isRemetente = msg.remetente_id === userData.id;

                        return (
                          <div key={msg.id} className={`flex ${isRemetente ? "justify-end" : "justify-start"}`}>
                            <div className="max-w-[80%]">
                              {!isRemetente && (
                                <p className="text-xs text-gray-500 mb-1 ml-1">{msg.remetente_nome}</p>
                              )}

                              <div className={`px-3 py-2 rounded-lg ${
                                isRemetente
                                  ? "bg-yellow-100 text-yellow-900 rounded-tr-none"
                                  : "bg-gray-200 text-gray-800 rounded-tl-none"
                              }`}>
                                <p className="text-sm">{msg.conteudo}</p>
                                <p className="text-xs text-gray-500 mt-1 text-right">
                                  {new Date(msg.data_envio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  {!isRemetente && !msg.lida && (
                                    <span className="ml-1 text-green-500">●</span>
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                )}
              </div>

              <form onSubmit={sendMessage} className="p-3 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-400 text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-yellow-400 hover:bg-yellow-300 text-yellow-800 px-3 py-2 rounded-lg text-sm"
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Selecione um colaborador para iniciar o chat
            </div>
          )}
        </div>
      </div>
    </div>
  );
}