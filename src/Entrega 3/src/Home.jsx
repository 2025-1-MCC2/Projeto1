import React, { useEffect, useState } from "react";
import Navbar from "./componentes/navbar/Navbar";
import BannerHero from "./componentes/bannerHero/BannerHero";
import SobreNos from "./componentes/sobreNos/SobreNos";
import Valores from "./componentes/valores/Valores";
import Segmentos from "./componentes/segmentos/Segmentos";
import ImpactoSocial from "./componentes/impactoSocial/ImpactoSocial";
import GaleriaFotos from "./componentes/galeriaFotos/GaleriaFotos";
import TimeInstituto from "./componentes/timeInstituto/TimeInstituto";
import CarrosselVoluntarios from "./componentes/carrosselVoluntarios/CarroselVoluntarios";
import Apoiadores from "./componentes/apoiadores/Apoiadores";
import JunteSe from "./componentes/junteSe/JunteSe";
import Newsletter from "./componentes/newsletter/Newsletter";
import Footer from "./componentes/footer/Footer";
import ChatBot from "./componentes/chatBot/ChatBot";
import Acessibilidade from "./componentes/acessibilidade/Acessibilidade";

const Home = () => {
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const logoutFlag = localStorage.getItem("logoutSuccess");
    if (logoutFlag === "true") {
      setShowLogoutMessage(true);
      localStorage.removeItem("logoutSuccess");

      setTimeout(() => {
        setShowLogoutMessage(false);
      }, 3000);
    }
  }, []);

  return (
    <div className="bg-white scroll-smooth relative">
      <Navbar />

      {/* Alerta flutuante sobre o Banner */}
      {showLogoutMessage && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-100 text-green-800 border border-green-400 px-4 py-2 rounded shadow text-sm transition-opacity duration-500">
            Logout realizado com sucesso!
          </div>
        </div>
      )}

      <main className="font-sans">
        <BannerHero />
        <div id="sobre"><SobreNos /></div>
        <Valores />
        <div id="segmento"><Segmentos /></div>
        <GaleriaFotos />
        <div id="impacto"><ImpactoSocial /></div>
        <div id="colaborador"><TimeInstituto /></div>
        <CarrosselVoluntarios />
        <Apoiadores />
        <JunteSe />
        <Newsletter />
      </main>

      <Footer />
      <ChatBot />
      <Acessibilidade />
    </div>
  );
};

export default Home;
