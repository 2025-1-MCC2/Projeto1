import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { FaUser, FaBars } from "react-icons/fa";
import logo from "../../assets/logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAccess = () => {
    if (accessCode === "482590") {
      setShowModal(false);
      setAccessCode("");
      setError("");
      navigate("/Login");
    } else {
      setError("Código incorreto. Tente novamente.");
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="flex items-center justify-between p-4">
        <button onClick={() => navigate("/")} className="flex items-center space-x-2">
          <img src={logo} alt="Instituto Criativo" className="h-8" />
          <span className="font-bold text-base">INSTITUTO CRIATIVO</span>
        </button>

        <button
          className="lg:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <FaBars size={28} />
        </button>

        <nav className="hidden lg:flex items-center space-x-6 text-gray-700 font-semibold text-sm">
          <button onClick={() => navigate("#sobre")} className="transition duration-300 border-b-2 border-transparent hover:border-yellow-400 hover:text-yellow-400 transform hover:scale-105">Sobre</button>
          <button onClick={() => navigate("#segmento")} className="transition duration-300 border-b-2 border-transparent hover:border-yellow-400 hover:text-yellow-400 transform hover:scale-105">Segmento</button>
          <button onClick={() => navigate("#impacto")} className="transition duration-300 border-b-2 border-transparent hover:border-yellow-400 hover:text-yellow-400 transform hover:scale-105">Impacto Social</button>
          <button onClick={() => navigate("#colaborador")} className="transition duration-300 border-b-2 border-transparent hover:border-yellow-400 hover:text-yellow-400 transform hover:scale-105">Colaborador</button>
          <button onClick={() => navigate("/Educacao")} className="transition duration-300 border-b-2 border-transparent hover:border-yellow-400 hover:text-yellow-400 transform hover:scale-105">Educação</button>
          <button onClick={() => navigate("/Evento")} className="transition duration-300 border-b-2 border-transparent hover:border-yellow-400 hover:text-yellow-400 transform hover:scale-105">Evento</button>
          <button onClick={() => navigate("/Contato")} className="transition duration-300 border-b-2 border-transparent hover:border-yellow-400 hover:text-yellow-400 transform hover:scale-105">Contato</button>
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={() => navigate("/Doacoes")}
            className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-red-600 transition font-bold transform hover:scale-105 duration-300"
          >
            <span>Contribua</span>
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-yellow-400 p-2 rounded-full hover:bg-yellow-300 transition flex items-center justify-center"
          >
            <FaUser className="text-white text-2xl" />
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden flex flex-col items-center bg-white text-gray-700 font-semibold text-sm overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0"}`}
        style={{ zIndex: 1000 }}
      >
        <button onClick={() => handleNavigation("#sobre")} className="py-3 w-full text-center transition duration-300 border-b-2 border-transparent hover:border-yellow-400 hover:text-yellow-400 transform hover:scale-105">Sobre</button>
        <button onClick={() => handleNavigation("#segmento")} className="py-3 w-full text-center transition duration-300 border-b-2 border-transparent hover:border-yellow-400 hover:text-yellow-400 transform hover:scale-105">Segmento</button>
        <button onClick={() => handleNavigation("#impacto")} className="py-3 w-full text-center transition duration-300 border-b-2 border-transparent hover:border-yellow-400 hover:text-yellow-400 transform hover:scale-105">Impacto Social</button>
        <button onClick={() => handleNavigation("#colaborador")} className="py-3 w-full text-center transition duration-300 border-b-2 border-transparent hover:border-yellow-400 hover:text-yellow-400 transform hover:scale-105">Colaborador</button>
        <button onClick={() => handleNavigation("/Educacao")} className="py-3 w-full text-center transition duration-300 border-b-2 border-transparent hover:border-yellow-400 hover:text-yellow-400 transform hover:scale-105">Educação</button>
        <button onClick={() => handleNavigation("/Evento")} className="py-3 w-full text-center transition duration-300 border-b-2 border-transparent hover:border-yellow-400 hover:text-yellow-400 transform hover:scale-105">Evento</button>
        <button onClick={() => handleNavigation("/Contato")} className="py-3 w-full text-center transition duration-300 border-b-2 border-transparent hover:border-yellow-400 hover:text-yellow-400 transform hover:scale-105">Contato</button>

        <div className="flex flex-col items-center space-y-4 mt-4 w-full px-4">
          <button
            onClick={() => handleNavigation("/Doacoes")}
            className="bg-red-500 text-white px-4 py-3 rounded-full hover:bg-red-600 transition w-full font-bold transform hover:scale-105 duration-300"
          >
            CONTRIBUA
          </button>
          <button
            onClick={() => {
              setShowModal(true);
              setIsOpen(false);
            }}
            className="bg-yellow-400 p-3 rounded-full hover:bg-yellow-300 transition flex items-center justify-center w-12"
          >
            <FaUser className="text-white text-2xl" />
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center w-80">
            <h2 className="text-lg font-semibold mb-2">Área restrita para Colaboradores</h2>
            <p className="mb-4 text-sm text-gray-600">Digite o código de acesso:</p>
            <input
              type="password"
              maxLength={6}
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              placeholder="Código de 6 dígitos"
            />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <button
              onClick={handleAccess}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition w-full mb-2"
            >
              Entrar
            </button>
            <button
              onClick={() => {
                setShowModal(false);
                setAccessCode("");
                setError("");
              }}
              className="text-sm text-red-500 hover:underline"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
