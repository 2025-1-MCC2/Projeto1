import { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaTimes, FaSave, FaDesktop } from "react-icons/fa";

export default function SettingsPanel({ userData, setUserData, setActiveConfigTab }) {
  const [systemInfo, setSystemInfo] = useState({
    os: "Carregando...",
    browser: "Carregando...",
    resolution: "Carregando...",
    lastLogin: "Carregando..."
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("success"); // 'success' | 'error'

  useEffect(() => {
    const os = navigator.platform.includes("Win") ? "Windows 10" : navigator.platform;
    const browser = navigator.userAgent.match(/(Chrome|Firefox|Safari|Edge)\//)?.[0] || "Navegador desconhecido";
    const resolution = `${window.screen.width}x${window.screen.height}`;
    const lastLogin = new Date().toLocaleString();

    setSystemInfo({ os, browser, resolution, lastLogin });
  }, []);

  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setStatusMessage(""); // Limpa a mensagem antes de tentar salvar novamente
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:5000/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: userData.nome,
          email: userData.email
        })
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Erro da API:", data);
        setStatusType("error");
        setStatusMessage(data.error || 'Erro ao atualizar perfil');
        return;
      }

      localStorage.setItem('user', JSON.stringify(data.user || userData));

      setStatusType("success");
      setStatusMessage("Perfil atualizado com sucesso!");

      // Você pode manter a aba ou mudar para o dashboard após um delay, se quiser
      setTimeout(() => {
        setActiveConfigTab("dashboard");
      }, 1500);

    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      setStatusType("error");
      setStatusMessage(error.message);
    }
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
      <div className="flex items-center mb-6">
        <FaDesktop className="text-[#FF4464] text-2xl mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Configurações do Perfil</h2>
      </div>

      {statusMessage && (
        <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium 
          ${statusType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {statusMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-md bg-gray-200 flex items-center justify-center">
                  <FaUser className="text-gray-500 text-5xl" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-medium text-gray-700 mb-3 flex items-center">
              <FaDesktop className="text-[#FF4464] mr-2" /> Informações do Sistema
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500">Sistema Operacional</p>
                <p className="text-sm font-medium">{systemInfo.os}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Navegador</p>
                <p className="text-sm font-medium">{systemInfo.browser}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Resolução</p>
                <p className="text-sm font-medium">{systemInfo.resolution}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Último Login</p>
                <p className="text-sm font-medium">{systemInfo.lastLogin}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <form onSubmit={handleSaveProfile}>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-4 flex items-center">
                    <FaUser className="text-[#FF4464] mr-2" /> Informações Pessoais
                  </h3>
                </div>

                <div>
                  <label htmlFor="nome" className="block text-sm font-medium mb-1 text-gray-600">
                    Nome Completo
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={userData.nome || ""}
                      onChange={handleUserDataChange}
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#FF4464] transition-shadow focus:border-[#FF4464]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-600">
                    E-mail
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={userData.email || ""}
                      onChange={handleUserDataChange}
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#FF4464] transition-shadow focus:border-[#FF4464]"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveConfigTab("dashboard")}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                >
                  <FaTimes className="mr-2" /> Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#FF4464] hover:bg-[#e03a5a] text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all flex items-center"
                >
                  <FaSave className="mr-2" /> Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
