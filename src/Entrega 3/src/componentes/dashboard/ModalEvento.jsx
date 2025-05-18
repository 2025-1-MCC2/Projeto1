import { useState, useRef, useEffect } from "react";
import { FaTimes, FaCamera, FaTrash, FaLink, FaCalendarAlt } from "react-icons/fa";

const ModalEvento = ({
  modalAberto,
  evento,
  previewImagem,
  onFechar,
  onSalvar,
  onImagemChange,
  onRemoverImagem,
  modoEdicao = false
}) => {
  const fileInputRef = useRef(null);
  const [erroImagem, setErroImagem] = useState(false);
  const [imagemRemovida, setImagemRemovida] = useState(false);

  const triggerFileSelect = () => {
    setErroImagem(false);
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const temImagem = previewImagem || (!imagemRemovida && evento?.imagem);

    if (!temImagem) {
      setErroImagem(true);
      return;
    }

    setErroImagem(false);
    onSalvar(e);
  };

  const handleRemoverImagem = () => {
    setImagemRemovida(true);
    onRemoverImagem();
  };

  useEffect(() => {
    // resetar estado ao abrir o modal
    if (modalAberto) {
      setErroImagem(false);
      setImagemRemovida(false);
    }
  }, [modalAberto]);

  return (
    modalAberto && (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
          {/* Cabeçalho */}
          <div className="bg-[#FF4464]/100 p-5 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">
              {modoEdicao ? "Editar Evento" : "Criar Novo Evento"}
            </h3>
            <button 
              onClick={onFechar} 
              className="text-white hover:text-gray-100 transition-colors"
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* Formulário */}
          <form 
            onSubmit={handleSubmit}
            encType="multipart/form-data" 
            className="space-y-6 p-6"
            id="evento-form"
          >
            {/* Título */}
            <div className="space-y-2">
              <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
                Título do Evento *
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                defaultValue={evento?.titulo || ""}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
                placeholder="Digite o título do evento"
                required
              />
            </div>

            {/* Descrição */}
            <div className="space-y-2">
              <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
                Descrição *
              </label>
              <textarea
                id="descricao"
                name="descricao"
                rows={3}
                defaultValue={evento?.descricao || ""}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
                placeholder="Descreva o evento com detalhes"
                required
              />
            </div>

            {/* Ano e Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ano */}
              <div className="space-y-2">
                <label htmlFor="ano" className="block text-sm font-medium text-gray-700">
                  Ano
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FaCalendarAlt />
                  </div>
                  <select
                    id="ano"
                    name="ano"
                    defaultValue={evento?.ano || new Date().getFullYear().toString()}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all appearance-none"
                  >
                    {Array.from({length: 10}, (_, i) => new Date().getFullYear() - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status *
                </label>
                <select
                  id="status"
                  name="status"
                  defaultValue={evento?.status || "pendente"}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
                  required
                >
                  <option value="pendente">Pendente</option>
                  <option value="concluido">Concluído</option>
                </select>
              </div>
            </div>

            {/* Upload de Imagem */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Imagem do Evento *
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Preview */}
                <div className="flex-shrink-0">
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
                    {previewImagem ? (
                      <>
                        <img 
                          src={previewImagem} 
                          alt="Preview" 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <FaCamera className="text-white text-xl" />
                        </div>
                      </>
                    ) : (!imagemRemovida && evento?.imagem) ? (
                      <>
                        <img 
                          src={evento.imagem} 
                          alt="Evento" 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <FaCamera className="text-white text-xl" />
                        </div>
                      </>
                    ) : (
                      <div className="text-gray-400 flex flex-col items-center">
                        <FaCamera className="text-2xl mb-2" />
                        <span className="text-xs">Sem imagem</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Controles */}
                <div className="flex-1 space-y-3">
                  <input
                    type="file"
                    id="imagem"
                    name="imagem"
                    onChange={(e) => {
                      setErroImagem(false);
                      setImagemRemovida(false); // caso escolha outra
                      onImagemChange(e);
                    }}
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                  />
                  
                  <button
                    type="button"
                    onClick={triggerFileSelect}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FaCamera />
                    {previewImagem || (!imagemRemovida && evento?.imagem) ? "Alterar Imagem" : "Selecionar Imagem"}
                  </button>

                  {(previewImagem || (!imagemRemovida && evento?.imagem)) && (
                    <button
                      type="button"
                      onClick={handleRemoverImagem}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 border border-red-100 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <FaTrash />
                      Remover Imagem
                    </button>
                  )}
                </div>
              </div>
              {erroImagem && (
                <p className="text-sm text-red-500 mt-1">
                  A imagem é obrigatória 
                </p>
              )}
            </div>

            {/* Rodapé */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={onFechar}
                className="px-5 py-2.5 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#FF4464] hover:bg-[#e63b58] text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                {modoEdicao ? "Salvar Alterações" : "Criar Evento"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default ModalEvento;
