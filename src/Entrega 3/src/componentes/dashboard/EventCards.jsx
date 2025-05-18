import { FaCalendarAlt, FaEdit, FaTrash } from "react-icons/fa";

export default function EventCards({
  eventos,
  userData,
  activeTab,
  toggleEditar,
  handleDeletarEvento
}) {
  const eventosFiltradosOrdenados = [...eventos]
    .filter(e =>
      activeTab === "meus" ? e.autor_id === userData.id : e.autor_id !== userData.id
    )
    .sort((a, b) => new Date(b.data_criacao) - new Date(a.data_criacao));

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {eventosFiltradosOrdenados.map((evento) => (
        <div
          key={evento.id}
          className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col ${
            activeTab === "outros" ? "opacity-90 hover:opacity-100" : ""
          }`}
        >
          <div
            className={`p-3 flex justify-between items-center font-semibold ${
              evento.status === "concluido"
                ? "bg-green-100 text-green-700"
                : evento.status === "pendente"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            <span className="text-sm truncate">
              {evento.ano} - {evento.titulo}
            </span>
            <div className="flex gap-2 text-xs">
              <button
                onClick={() => toggleEditar(evento)}
                className="p-1.5 hover:bg-black/10 rounded-full transition-colors"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDeletarEvento(evento.id)}
                className="p-1.5 hover:bg-black/10 rounded-full transition-colors"
              >
                <FaTrash />
              </button>
            </div>
          </div>
          <div className="p-4 flex-grow">
            <img
              src={
                evento.imagem
                  ? `http://localhost:5000/uploads/${evento.imagem}`
                  : "/img/img_placeholder.jpeg"
              }
              alt={`Imagem ${evento.titulo}`}
              className="w-full h-36 object-cover rounded-md mb-3 shadow"
            />
            <p className="text-xs text-gray-600 mb-3 leading-relaxed line-clamp-2">
              {evento.descricao}
            </p>
          </div>
          <div className="p-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <FaCalendarAlt /> {evento.ano}
            </span>
            <span className="text-xs font-medium">
              <span className="text-gray-700">Status:</span>{" "}
              <span
                className={
                  evento.status === "concluido"
                    ? "text-green-600"
                    : evento.status === "pendente"
                    ? "text-red-600"
                    : "text-yellow-600"
                }
              >
                {evento.status === "concluido"
                  ? "Concluído"
                  : evento.status === "pendente"
                  ? "Pendente"
                  : evento.status}
              </span>
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}
