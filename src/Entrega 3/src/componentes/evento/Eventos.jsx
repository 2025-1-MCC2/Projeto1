import headerBgImage from "../../assets/img11.jpeg";
import React, { useState, useEffect } from "react";
import Navbar from "../../componentes/navbar/Navbar";
import Footer from "../footer/Footer";
import Acessibilidade from "../../componentes/acessibilidade/Acessibilidade";
import ChatBot from "../../componentes/chatBot/ChatBot";
import {
  FaCalendarAlt,
  FaStar,
  FaMapMarkerAlt,
  FaClock,
  FaFilter,
  FaRegCalendarCheck,
} from "react-icons/fa";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ptBR from 'date-fns/locale/pt-BR';
import img12 from '../../assets/img12.jpeg';
import img4 from '../../assets/img4.jpg';
import img5 from '../../assets/img5.jpeg';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { 'pt-BR': ptBR },
});

const defaultEvents = [
  {
    id: 1,
    titulo: "Workshop de Inovação Criativa",
    descricao: "Um workshop intensivo para desenvolver habilidades criativas e inovadoras. Aprenda técnicas práticas para estimular a geração ",
    
    local: "São Paulo - Auditório Principal",
    data_criacao: "2024-06-15",
    tipo: "Presencial",
    status: "pendente",
    imagem: img12,
    isDefault: true
  },
  {
    id: 2,
    titulo: "Feira de Tecnologia",
    descricao: "Evento anual que reuniu especialistas e entusiastas para apresentar as últimas inovações tecnológicas. Contou com exposições interativas. ",
    local: "São Paulo - Centro de Convenções",
    data_criacao: "2023-05-20",
    tipo: "Presencial",
    status: "concluido",
    imagem: img4,
    isDefault: true
  },
  {
    id: 3,
    titulo: "Webinar: Marketing Digital",
    descricao: "O evento apresentou as melhores estratégias de marketing digital com especialistas renomados. Os participantes tiveram uma introdução ",
    local: "São Paulo - Online",
    data_criacao: "2023-11-15",
    tipo: "Presencial",
    status: "concluido",
    imagem: img5,
    isDefault: true
  }
].sort((a, b) => new Date(b.data_criacao) - new Date(a.data_criacao));

function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [filtros, setFiltros] = useState({
    status: "",
    data: ""
  });
  const [eventosFiltrados, setEventosFiltrados] = useState([]);
  const [modoVisualizacao, setModoVisualizacao] = useState("grid");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarEventos = async () => {
      try {
        setCarregando(true);
        const response = await fetch("http://localhost:5000/api/eventos");
        
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        const eventosAPI = data
          .filter(e => e.status === "concluido" || e.status === "pendente")
          .map(evento => ({
            ...evento,
            local: "São Paulo", // Adiciona São Paulo como local padrão
            tipo: "Presencial", // Adiciona Presencial como tipo padrão
            isDefault: false
          }));
        
        const todosEventos = [...eventosAPI, ...defaultEvents]
          .filter((evento, index, self) =>
            index === self.findIndex(e => e.id === evento.id)
          )
          .sort((a, b) => new Date(b.data_criacao) - new Date(a.data_criacao));
        
        setEventos(todosEventos);
        setEventosFiltrados(todosEventos);
      } catch (error) {
        console.error("Erro ao carregar eventos:", error);
        setEventos(defaultEvents);
        setEventosFiltrados(defaultEvents);
      } finally {
        setCarregando(false);
      }
    };

    carregarEventos();
  }, []);

  useEffect(() => {
    filtrarEventos();
  }, [filtros, eventos]);

  const filtrarEventos = () => {
    let resultado = [...eventos];

    if (filtros.status) {
      resultado = resultado.filter(e => e.status === filtros.status);
    }

    if (filtros.data) {
      resultado = resultado.filter(e => {
        const eventDate = new Date(e.data_criacao).toISOString().split('T')[0];
        return eventDate === filtros.data;
      });
    }

    setEventosFiltrados(resultado);
  };

  const formatarData = (dataString) => {
    if (!dataString) return "";
    const opcoes = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dataString).toLocaleDateString('pt-BR', opcoes);
  };

  const eventosCalendario = eventosFiltrados.map(evento => ({
    title: evento.titulo,
    start: new Date(evento.data_criacao),
    end: new Date(new Date(evento.data_criacao).getTime() + (evento.duracao ? parseInt(evento.duracao) * 60 * 60 * 1000 : 2 * 60 * 60 * 1000)),
    allDay: false,
    resource: evento
  }));

  if (carregando) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-xl text-gray-500">Carregando eventos...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <header className="relative bg-gray-800 pt-28 pb-32 text-white overflow-hidden">
        <img
          src={headerBgImage}
          alt="Fundo abstrato criativo"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block p-2 bg-yellow-400 rounded-full">
                <FaStar className="text-yellow-800 text-xl" />
              </span>
              <span className="text-yellow-300 font-semibold uppercase tracking-wider text-sm">
                Eventos
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight drop-shadow-md text-white">
              Nossos Eventos
            </h1>
            <p className="text-lg md:text-xl text-white font-bold">
              Explore os eventos passados, atuais e futuros do Instituto Criativo.
              <br />
              Reviva as experiências, aprendizados e conexões que construímos juntos em nossos eventos.
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-8 pb-4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaFilter className="text-yellow-400" /> Filtros
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <select
            value={filtros.status}
            onChange={(e) => setFiltros({...filtros, status: e.target.value})}
            className="border rounded p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Todos os Status</option>
            <option value="pendente">Pendentes</option>
            <option value="concluido">Concluídos</option>
          </select>
          
          <input
            type="date"
            value={filtros.data}
            onChange={(e) => setFiltros({...filtros, data: e.target.value})}
            className="border rounded p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="flex justify-end gap-4 mb-8">
          <button
            onClick={() => setModoVisualizacao("grid")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
              modoVisualizacao === "grid"
                ? "bg-yellow-400 text-yellow-900 shadow"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Visualização em Cards
          </button>
          <button
            onClick={() => setModoVisualizacao("calendar")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
              modoVisualizacao === "calendar"
                ? "bg-yellow-400 text-yellow-900 shadow"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <FaRegCalendarCheck />
            Visualização em Calendário
          </button>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-0 md:py-0 relative z-10">
        {eventosFiltrados.length === 0 ? (
          <div className="text-center py-10 md:py-20">
            <p className="text-xl text-gray-500">
              Nenhum evento encontrado com os filtros aplicados.
            </p>
            <button 
              onClick={() => setFiltros({ status: "", data: "" })}
              className="mt-4 px-4 py-2 bg-yellow-400 text-yellow-900 rounded-md hover:bg-yellow-500"
            >
              Limpar filtros
            </button>
          </div>
        ) : modoVisualizacao === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {eventosFiltrados.map((evento) => (
              <div
                key={evento.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transform transition duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl ${
                  evento.isDefault ? "border-2 border-yellow-400 relative" : ""
                }`}
              >
                {evento.isDefault && (
                  <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full z-10">
                    Destaque
                  </div>
                )}

                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={
                      evento.isDefault 
                        ? evento.imagem
                        : evento.imagem
                          ? `http://localhost:5000/uploads/${evento.imagem}`
                          : "/img/img_placeholder.jpeg"
                    }
                    alt={evento.titulo}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
                    <h2 className="text-lg font-bold mb-1 line-clamp-2 drop-shadow">
                      {evento.titulo}
                    </h2>
                    <div className="flex items-center gap-1 text-xs text-gray-200 drop-shadow">
                      <FaCalendarAlt />
                      <span>{formatarData(evento.data_criacao)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
                    {evento.descricao}
                  </p>

                  <div className="space-y-2 text-sm text-gray-700 mb-4 border-t pt-4">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-gray-500" />
                      <span>Local: {evento.local}</span>
                    </div>
                    {evento.duracao && (
                      <div className="flex items-center gap-2">
                        <FaClock className="text-gray-500" />
                        <span>Duração: {evento.duracao}</span>
                      </div>
                    )}
                    {evento.categoria && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">#</span>
                        <span>Categoria: {evento.categoria}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">@</span>
                      <span>Tipo: {evento.tipo}</span>
                    </div>
                  </div>

                  <div className="mt-auto flex justify-between items-center border-t border-gray-100 pt-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        evento.status === "concluido"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {evento.status === "concluido" ? "Concluído" : "Pendente"}
                    </span>

                    {evento.status === "pendente" && (
                      <a
                        href="https://www.sympla.com.br/produtor/institutocriativo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded bg-yellow-400 text-yellow-900 hover:bg-yellow-500 transition-colors"
                      >
                        Inscreva-se
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[700px] mb-8 bg-white p-4 rounded-lg shadow-sm">
            <Calendar
              localizer={localizer}
              events={eventosCalendario}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "100%" }}
              messages={{
                today: 'Hoje',
                previous: 'Anterior',
                next: 'Próximo',
                month: 'Mês',
                week: 'Semana',
                day: 'Dia',
                agenda: 'Agenda',
                date: 'Data',
                time: 'Hora',
                event: 'Evento',
                noEventsInRange: 'Nenhum evento neste período.',
                showMore: total => `+ Ver mais (${total})`
              }}
              eventPropGetter={(event) => {
                let backgroundColor = '#f59e0b';
                if (event.resource.status === 'concluido') {
                  backgroundColor = '#6b7280';
                }
                return { style: { backgroundColor } };
              }}
              onSelectEvent={(event) => {
                console.log("Evento selecionado:", event.resource);
              }}
            />
          </div>
        )}
      </main>
     <br />
     <br />
      <Footer />
      <Acessibilidade />
      <ChatBot />
    </div>
  );
}

export default Eventos;