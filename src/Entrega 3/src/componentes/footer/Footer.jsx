import React from "react";
import logo from "../../assets/logo.png";
import { FaLinkedin, FaInstagram, FaWhatsapp, FaEnvelope, FaYoutube } from 'react-icons/fa';

function Footer() {
  const emailAddress = "info@institutocriativo.com";

  return (
    <footer className="bg-[#313131] text-white">

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

        <div className="flex flex-col items-start space-y-6">
          <div className="flex items-center space-x-4">
            <img
              src={logo}
              alt="Instituto Criativo"
              className="h-20 rounded-md"
            />
            <p className="text-2xl font-bold">INSTITUTO CRIATIVO</p>
          </div>
          <p className="text-[13px] ml-3">
  Transformamos vidas com inovação e oportunidades<br />
  porque a criatividade é a chave para mudar o mundo!
</p>


        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between space-y-6 sm:space-y-0 sm:space-x-10">
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-bold">Seja Criativo</h3>
            <a href="#sobre" className="hover:underline">Sobre-nós</a>
            <a href="#marcas" className="hover:underline">Patrocinadores</a>
            <a href="#colaborador" className="hover:underline">Equipe</a>
            <a href="/Doacoes" className="hover:underline">Doação</a>
          </div>


          <div className="flex flex-col space-y-4 mt-6 sm:mt-0">
            <h3 className="text-lg font-bold">Contato</h3>
            <p>Email: <a href={`mailto:${emailAddress}`} className="hover:underline">{emailAddress}</a></p>
            <p>Av. São Gualter, 1084 - Alto de Pinheiros, São Paulo</p>
            <div className="flex space-x-4 pt-2 flex-wrap">
              <a
                href="https://www.linkedin.com/company/institutocriativo/?originalSubdomain=br"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn do Instituto Criativo"
                className="text-gray-300 hover:text-[#FF254A] transform hover:scale-125 transition-all duration-200"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://www.instagram.com/institutocriativo?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram do Instituto Criativo"
                className="text-gray-300 hover:text-[#FF254A] transform hover:scale-125 transition-all duration-200"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=5511910747492&text=Quero%20falar%20sobre%20o%20Instituto%20Criativo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp do Instituto Criativo"
                className="text-gray-300 hover:text-[#FF254A] transform hover:scale-125 transition-all duration-200"
              >
                <FaWhatsapp size={24} />
              </a>
              <a
                href={`mailto:${emailAddress}`}
                aria-label="Enviar email para Instituto Criativo"
                className="text-gray-300 hover:text-[#FF254A] transform hover:scale-125 transition-all duration-200"
              >
                <FaEnvelope size={24} />
              </a>
              <a
                href="http://www.youtube.com/@institutocriativo7676"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Canal do YouTube do Instituto Criativo"
                className="text-gray-300 hover:text-[#FF254A] transform hover:scale-125 transition-all duration-200"
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden">
          <iframe
            title="Localização Instituto Criativo"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.479148653153!2d-46.71137092569258!3d-23.51511785934705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce57658c3d2e4f%3A0x3c8e3e189df30626!2sAv.%20S%C3%A3o%20Gualter%2C%201084%20-%20Alto%20de%20Pinheiros%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2005455-001!5e0!3m2!1spt-BR!2sbr!4v1714983950114!5m2!1spt-BR!2sbr"
            className="w-full h-48 border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>



      </div>

      <div className="bg-[#FF254A] text-center py-4 mt-6">
        <p>Copyright © {new Date().getFullYear()} Instituto Criativo</p>
      </div>
    </footer>
  );
}

export default Footer;