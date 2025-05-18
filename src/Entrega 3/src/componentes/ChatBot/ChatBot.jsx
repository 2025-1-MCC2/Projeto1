import React, { useState, useEffect, useRef } from "react";
import { FaTimes, FaPaperPlane, FaCommentDots } from 'react-icons/fa';
import logoPng from "../../assets/logo.png";

const LinkRenderer = ({ parts }) => {
    return (
        <>
            {parts?.map((part, i) => {
                if (part.type === 'link') {
                    return (
                        <a
                            key={i}
                            href={part.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline font-medium"
                        >
                            {part.text}
                        </a>
                    );
                } else if (part.type === 'email') {
                    return (
                        <a
                            key={i}
                            href={`mailto:${part.email}`}
                            className="text-blue-600 hover:underline"
                        >
                            {part.email}
                        </a>
                    );
                }
                return part.content?.split('\n').map((line, j) => (
                    <React.Fragment key={`${i}-${j}`}>
                        {line}
                        {j < part.content.split('\n').length - 1 && <br />}
                    </React.Fragment>
                )) ?? null;
            })}
        </>
    );
};


const ChatBot = () => {
  const [showChat, setShowChat] = useState(false);

  const initialOptions = [
    "Doar",
    "Parceria",
    "Voluntariado",
    "Funcionário",
    "Horários e Localização",
    "Redes Sociais",
  ];

  const createTextPart = (content) => ({ type: 'text', content });
  const createLinkPart = (text, url) => ({ type: 'link', text, url });
  const createEmailPart = (email) => ({ type: 'email', email });

  const initialMessages = [
    { parts: [createTextPart("Olá! Sou o Chat do Instituto Criativo. Como posso te ajudar?")], sender: "bot" },
    { parts: [createTextPart("Escolha uma das opções abaixo ou digite sua pergunta:")], sender: "bot", options: initialOptions },
  ];

  const endConversationOptions = ["Encerrar Chat", "Novo Atendimento"];

  const CONTACT_EMAIL = "institutocriativo@institutocriativo.org.br";
  const CONTACT_PHONE_TEXT = "(11) 91074-7492 (ligações e Whatsapp)";

  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

   useEffect(() => {
        if (showChat && messages.length > initialMessages.length) {
        }
   }, [showChat]);

  const getBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase().trim();

    let response = {
      parts: [
          createTextPart("Desculpe, não entendi. Selecione novamente uma das opções ou entre em contato conosco pelo telefone "),
          createTextPart(CONTACT_PHONE_TEXT),
          createTextPart(".")
        ],
      followUpOptions: initialOptions,
      isFinalAnswer: false
    };

    if (lowerInput === "como posso fazer uma doação para o instituto criativo?") {
       response = {
           parts: [
               createTextPart("Você pode fazer uma doação via PIX ou boleto bancário.\nPara mais informações, acesse nossa página de doações ou entre em contato:\nTelefone: "),
               createTextPart(CONTACT_PHONE_TEXT),
               createTextPart("\nEmail: "),
               createEmailPart(CONTACT_EMAIL)
            ],
           followUpOptions: null,
           isFinalAnswer: true
       };
    }
    else if (lowerInput === "quais são as vantagens de ser patrocinador/parceiro do instituto criativo?") {
        response = {
            parts: [createTextPart("Ser patrocinador ou parceiro permite que você se envolva com nossa missão, tenha visibilidade em nossos projetos e contribua para o desenvolvimento da comunidade.")],
            followUpOptions: null,
            isFinalAnswer: true
        };
    }
    else if (lowerInput === "como faço para ser um patrocinador/parceiro do instituto criativo?") {
        response = {
            parts: [
                createTextPart("Oferecemos várias formas de parceria (apoio financeiro, doações, etc.).\nEntre em contato para discutir as opções:\nEmail: "),
                createEmailPart(CONTACT_EMAIL),
                createTextPart("\nTelefone: "),
                createTextPart(CONTACT_PHONE_TEXT)
            ],
            followUpOptions: null,
            isFinalAnswer: true
        };
    }
    else if (lowerInput === "como posso me tornar um voluntário no instituto criativo?") {
        response = {
            parts: [
                createTextPart("Preencha o formulário em nosso site ou entre em contato:\nEmail: "),
                createEmailPart(CONTACT_EMAIL),
                createTextPart("\nTelefone: "),
                createTextPart(CONTACT_PHONE_TEXT)
            ],
            followUpOptions: null,
            isFinalAnswer: true
        };
    }
    else if (lowerInput === "quais são as atividades ou projetos que os voluntários podem participar?") {
        response = {
            parts: [createTextPart("Nossos voluntários podem apoiar em eventos, aulas, oficinas, campanhas e mais. Há diversas formas de participação!")],
            followUpOptions: null,
            isFinalAnswer: true
        };
    }
    else if (lowerInput === "como posso me candidatar para uma vaga de funcionário no instituto criativo?") {
        response = {
            parts: [
                createTextPart("As vagas são anunciadas em nosso site e redes sociais. Envie seu currículo para o e-mail indicado ou candidate-se pelo "),
                createLinkPart("LinkedIn", "https://br.linkedin.com/company/institutocriativo"),
                createTextPart(".")
            ],
            followUpOptions: null,
            isFinalAnswer: true
        };
    }
     else if (lowerInput === "onde o instituto criativo está localizado e quais os horarios de funcionamento?") {
        response = {
            parts: [
                createTextPart("Nosso endereço é Av. São Gualter, 1084 - Alto de Pinheiros, São Paulo - SP, 05455-001.\nAtendemos geralmente de Segunda a Sexta das 09:00 às 18:00.\nRecomendamos ligar antes de visitar: "),
                createTextPart(CONTACT_PHONE_TEXT + ".")
            ],
            followUpOptions: null,
            isFinalAnswer: true
        };
    }
    else if (lowerInput === "doar" || lowerInput.includes("doação") || lowerInput.includes("pix") || lowerInput.includes("ajudar")) {
       response = {
           parts: [createTextPart("Que ótimo que você quer ajudar! Selecione a opção abaixo para saber como:")],
           followUpOptions: ["Como posso fazer uma doação para o Instituto Criativo?"],
           isFinalAnswer: false
       };
    }
    else if (lowerInput === "parceria" || lowerInput.includes("parceria") || lowerInput.includes("patrocinador")) {
      response = {
          parts: [createTextPart("Que bom que você tem interesse em fazer parceria conosco! Selecione uma das opções abaixo:")],
          followUpOptions: [
            "Quais são as vantagens de ser patrocinador/parceiro do Instituto Criativo?",
            "Como faço para ser um patrocinador/parceiro do Instituto Criativo?"
          ],
          isFinalAnswer: false
       };
    }
    else if (lowerInput === "voluntariado" || lowerInput.includes("voluntário") || lowerInput.includes("voluntaria")) {
        response = {
            parts: [createTextPart("Que legal que você quer ser voluntário(a)! Para saber mais, selecione uma das opções:")],
            followUpOptions: [
                "Como posso me tornar um voluntário no Instituto Criativo?",
                "Quais são as atividades ou projetos que os voluntários podem participar?"
            ],
            isFinalAnswer: false
        };
    }
    else if (lowerInput === "funcionário" || lowerInput.includes("trabalhar") || lowerInput.includes("vaga")) {
      response = {
          parts: [createTextPart("Interessado em fazer parte da nossa equipe? Selecione a opção abaixo:")],
          followUpOptions: ["Como posso me candidatar para uma vaga de funcionário no Instituto Criativo?"],
          isFinalAnswer: false
       };
    }
     else if (lowerInput === "horários e localização" || lowerInput.includes("horário") || lowerInput.includes("endereço") || lowerInput.includes("localização")) {
        response = {
            parts: [createTextPart("Para saber onde estamos e nossos horários, selecione a opção abaixo:")],
            followUpOptions: ["Onde o Instituto Criativo está localizado e quais os horarios de funcionamento?"],
            isFinalAnswer: false
        };
    }
    else if (lowerInput === "redes sociais" || lowerInput.includes("social") || lowerInput.includes("instagram") || lowerInput.includes("linkedin") || lowerInput.includes("youtube")) {
      response = {
          parts: [
              createTextPart("Siga-nos em nossas redes!\n"),
              createLinkPart("LinkedIn", "https://www.linkedin.com/company/institutocriativo/?originalSubdomain=br"),
              createTextPart("\n"),
              createLinkPart("Instagram", "https://www.instagram.com/institutocriativo?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="),
              createTextPart("\n"),
              createLinkPart("YouTube", "https://youtube.com/@institutocriativo7676?si=dNFuys7u50QfZqqa")
            ],
          followUpOptions: null,
          isFinalAnswer: true
      };
    }
     else if (lowerInput.includes("o que é a ong") || lowerInput.includes("o que é o instituto criativo") || lowerInput.includes("missão") || lowerInput.includes("qual é a missão da ong") || lowerInput.includes("objetivo da ong") || lowerInput.includes("o que a ong faz")) {
        response = { parts: [createTextPart("O Instituto Criativo é uma ONG dedicada a transformar vidas por meio de educação criativa e inovadora.\nNossa missão é desenvolver e compartilhar projetos que transformam a sociedade.")], followUpOptions: null, isFinalAnswer: true };
    }
    else if (lowerInput.includes("visão") || lowerInput.includes("qual é a visão")) {
        response = { parts: [createTextPart("Nossa visão é ser referência na educação criativa, empreendedorismo e eventos inovadores.")], followUpOptions: null, isFinalAnswer: true };
    }
    else if (lowerInput.includes("valores") || lowerInput.includes("quais são os valores")) {
        response = { parts: [createTextPart("Nossos valores são: Sustentabilidade, qualidade, criatividade e inovação, ética e respeito.")], followUpOptions: null, isFinalAnswer: true };
    }
    else if (lowerInput.includes("projetos") || lowerInput.includes("quais são os projetos")) {
        response = { parts: [createTextPart("Temos projetos para diferentes faixas etárias, desde crianças até adultos 50+. Veja mais detalhes em nosso site!")], followUpOptions: null, isFinalAnswer: true };
    }
    else if (lowerInput.includes("é confiável") || lowerInput.includes("é confiavel")) {
        response = { parts: [createTextPart("Sim, somos uma organização séria e transparente, com contas auditadas e prezamos pela confiança de todos.")], followUpOptions: null, isFinalAnswer: true };
    }
    else if (lowerInput.includes("quem são") || lowerInput.includes("quem faz parte") || lowerInput.includes("equipe")) {
        response = { parts: [createTextPart("Somos liderados por Lucy Mari e Rodrigo Assirati, com uma equipe dedicada. Saiba mais na seção 'Equipe' do nosso site.")], followUpOptions: null, isFinalAnswer: true };
    }
    else if (lowerInput.includes("história") || lowerInput.includes("como começou")) {
        response = { parts: [createTextPart("A ONG foi fundada por Lucy Mari para promover a educação criativa e o desenvolvimento social. Veja nossa trajetória no site!")], followUpOptions: null, isFinalAnswer: true };
    }
    else if (lowerInput.includes("eventos") || lowerInput.includes("quais são os próximos eventos")) {
        response = { parts: [createTextPart("Realizamos diversos eventos de educação e inovação. Acompanhe nossa agenda no site ou redes sociais!")], followUpOptions: null, isFinalAnswer: true };
    }
    else if (lowerInput.includes("contato") || lowerInput.includes("como posso entrar em contato")) {
        response = { parts: [createTextPart("Entre em contato:\nEmail: "), createEmailPart(CONTACT_EMAIL), createTextPart("\nTelefone/WhatsApp: "), createTextPart(CONTACT_PHONE_TEXT)], followUpOptions: null, isFinalAnswer: true };
    }
    else if (lowerInput.includes("impacto social") || lowerInput.includes("como a ONG impacta")) {
        response = { parts: [createTextPart("Impactamos comunidades com projetos que estimulam criatividade, empreendedorismo e inclusão social.")], followUpOptions: null, isFinalAnswer: true };
    }
    else if (lowerInput.includes("site") || lowerInput.includes("onde encontrar mais informações")) {
        response = { parts: [createTextPart("Acesse nosso site para informações completas:\n"), createLinkPart("www.institutocriativo.org.br", "http://www.institutocriativo.org.br")], followUpOptions: null, isFinalAnswer: true };
    }
    else if (lowerInput.includes("obrigado") || lowerInput.includes("grata") || lowerInput.includes("valeu")) {
        response = { parts: [createTextPart("De nada! 😊 Se precisar de mais alguma coisa, é só perguntar.")], followUpOptions: null, isFinalAnswer: true };
    }

    return response;
  };

  const addConcludingSequence = (currentMessages) => {
      const concludingText = { parts: [createTextPart("Espero ter ajudado! 😊")], sender: "bot" };
      const endOptionsMsg = {
          parts: [createTextPart("O que deseja fazer agora?")],
          sender: "bot",
          options: endConversationOptions,
          optionsType: 'END_CONVERSATION'
      };
      return [...currentMessages, concludingText, endOptionsMsg];
  };

  const handleSendMessage = () => {
    const trimmedInput = input.trim();
    if (trimmedInput === "") return;

    const userMessage = { parts: [createTextPart(trimmedInput)], sender: "user" };
    const botResponseData = getBotResponse(trimmedInput);
    const botMessage = {
        parts: botResponseData.parts,
        sender: "bot",
        ...(botResponseData.followUpOptions && { options: botResponseData.followUpOptions }),
        ...(botResponseData.optionsType && { optionsType: botResponseData.optionsType })
    };

    let updatedMessages = [...messages, userMessage, botMessage];

    if (botResponseData.isFinalAnswer) {
        updatedMessages = addConcludingSequence(updatedMessages);
    }

    setMessages(updatedMessages);
    setInput("");
  };

  const handleOptionClick = (option) => {
    if (option === "Encerrar Chat") {
        setShowChat(false);
        setMessages(initialMessages);
        return;
    }
    if (option === "Novo Atendimento") {
        setMessages(initialMessages);
        return;
    }

    const userMessage = { parts: [createTextPart(option)], sender: "user" };
    const botResponseData = getBotResponse(option);
    const botMessage = {
        parts: botResponseData.parts,
        sender: "bot",
        ...(botResponseData.followUpOptions && { options: botResponseData.followUpOptions }),
        ...(botResponseData.optionsType && { optionsType: botResponseData.optionsType })
    };

    let updatedMessages = [...messages, userMessage, botMessage];

    if (botResponseData.isFinalAnswer) {
        updatedMessages = addConcludingSequence(updatedMessages);
    }

    setMessages(updatedMessages);
  };

  return (
    <div>
      <button
        onClick={() => {
            if (!showChat && messages.length > initialMessages.length) {
                setMessages(initialMessages);
            }
            setShowChat(!showChat)
        }}
        className="fixed bottom-6 right-6 bg-teal-500 hover:bg-teal-600 p-4 rounded-full text-white shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-110"
        style={{ zIndex: 2147483647 }}
        aria-label={showChat ? "Fechar chat" : "Abrir chat"}
      >
        <FaCommentDots size={24} />
      </button>

      {showChat && (
        <div
          className="fixed bottom-24 right-6 w-full max-w-sm h-[500px] bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200 flex flex-col"
          style={{ zIndex: 2147483647 }}
        >
          <div className="bg-teal-500 text-white p-3 flex justify-between items-center flex-shrink-0">
            <div className="flex items-center space-x-2">
                <img
                    src={logoPng}
                    alt="Logo Instituto Criativo"
                    className="h-6 w-6 object-contain rounded-sm"
                 />
                 <h3 className="font-semibold text-base">Chat Instituto Criativo</h3>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className="text-white hover:text-gray-100 focus:outline-none"
              aria-label="Fechar chat"
            >
              <FaTimes size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
            {messages.map((message, index) => (
               <div key={index} className={`flex flex-col ${message.sender === "bot" ? "items-start" : "items-end"}`}>
                 <div
                   className={`max-w-xs px-4 py-2 rounded-lg inline-block ${
                     message.sender === "bot"
                       ? "bg-yellow-100 text-yellow-900 rounded-tl-none"
                       : "bg-teal-500 text-white rounded-br-none"
                   }`}
                 >
                   <LinkRenderer parts={message.parts} />
                 </div>

                 {message.options && message.sender === 'bot' && (
                   <div className="mt-2 flex flex-wrap gap-2 justify-start">
                     {message.options.map((option, i) => {
                        let buttonClass = 'border px-3 py-1 rounded-full text-sm transition-colors duration-200 focus:outline-none focus:ring-1 ';
                        if (message.optionsType === 'END_CONVERSATION') {
                            if (option === 'Encerrar Chat') {
                                buttonClass += 'bg-red-500 border-red-600 text-white hover:bg-red-600 focus:ring-red-400';
                            } else {
                                buttonClass += 'bg-gray-200 border-gray-300 text-gray-700 hover:bg-gray-300 focus:ring-gray-400';
                            }
                        } else {
                            buttonClass += 'bg-white border-teal-400 text-teal-600 hover:bg-teal-50 focus:ring-teal-400';
                        }

                        return (
                            <button
                                key={i}
                                onClick={() => handleOptionClick(option)}
                                className={buttonClass}
                            >
                                {option}
                            </button>
                         );
                      })}
                   </div>
                 )}
               </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-gray-200 bg-white flex-shrink-0">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                placeholder="Digite sua mensagem..."
                aria-label="Digite sua mensagem"
              />
              <button
                onClick={handleSendMessage}
                className="bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-600 disabled:opacity-50"
                aria-label="Enviar mensagem"
              >
                <FaPaperPlane size={18}/>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;