import { FaPlus } from "react-icons/fa";

export default function Header({ 
  userData, 
  activeMainTab, 
  toggleNovoEvento,
  logo 
}) {
  const titles = {
    eventos: "PAINEL CRIATIVO",
    chat: "CHAT ENTRE COLABORADORES"
  };

  const subtitles = {
    eventos: `Bem-vindo de volta, ${userData.nome}! 👋`,
    chat: "Converse com seus colegas de trabalho"
  };

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {titles[activeMainTab]}
          </h1>
        </div>
        <p className="text-gray-500 mt-2">{subtitles[activeMainTab]}</p>
      </div>
      
      {activeMainTab === "eventos" && (
        <div className="flex items-center gap-3">
          <button
            className="bg-yellow-400 hover:bg-yellow-300 text-yellow-800 font-semibold px-5 py-2.5 rounded-full flex items-center gap-2 shadow-sm hover:shadow-md transition-all duration-300"
            onClick={toggleNovoEvento}
          >
            <FaPlus /> Novo Evento
          </button>
        </div>
      )}
    </header>
  );
}