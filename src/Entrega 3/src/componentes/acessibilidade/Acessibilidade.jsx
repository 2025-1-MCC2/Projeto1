import React, { useState, useEffect } from 'react';
import logo from "../../assets/logo.png";
import {
  FaUniversalAccess, FaPlus, FaMinus, FaAdjust, FaMousePointer, FaTintSlash, FaUnderline, FaUndo
} from 'react-icons/fa';

const HC_KEY = 'accessibility_highContrast';
const FONT_SIZE_KEY = 'accessibility_fontSize';
const LARGE_CURSOR_KEY = 'accessibility_largeCursor';
const GRAYSCALE_KEY = 'accessibility_grayscale';
const UNDERLINE_LINKS_KEY = 'accessibility_underlineLinks';

const Acessibilidade = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isHighContrast, setIsHighContrast] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(HC_KEY);
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });
  const [fontSize, setFontSize] = useState(() => {
     if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(FONT_SIZE_KEY);
      return saved ? JSON.parse(saved) : 16;
    }
    return 16;
  });
  const [isLargeCursor, setIsLargeCursor] = useState(() => {
     if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LARGE_CURSOR_KEY);
      return saved ? JSON.parse(saved) : false;
    }
     return false;
  });
  const [isGrayscale, setIsGrayscale] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(GRAYSCALE_KEY);
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });
  const [underlineLinks, setUnderlineLinks] = useState(() => {
     if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(UNDERLINE_LINKS_KEY);
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.style.setProperty('--base-font-size', `${fontSize}px`);
    document.body.classList.toggle('global-hc-mode', isHighContrast);
    document.body.classList.toggle('large-cursor-active', isLargeCursor);
    document.documentElement.classList.toggle('grayscale-mode', isGrayscale);
    document.body.classList.toggle('underline-links-mode', underlineLinks);
  }, [fontSize, isHighContrast, isLargeCursor, isGrayscale, underlineLinks]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const updateFontSize = (newSize) => {
      setFontSize(newSize);
      if (typeof window !== 'undefined') {
        localStorage.setItem(FONT_SIZE_KEY, JSON.stringify(newSize));
      }
  }
  const increaseFont = () => updateFontSize(Math.min(fontSize * 1.15, 28));
  const decreaseFont = () => updateFontSize(Math.max(fontSize / 1.15, 12));

  const toggleContrast = () => {
    const newState = !isHighContrast;
    setIsHighContrast(newState);
    if (typeof window !== 'undefined') {
      localStorage.setItem(HC_KEY, JSON.stringify(newState));
    }
  };
  
  const toggleLargeCursor = () => {
    const newState = !isLargeCursor;
    setIsLargeCursor(newState);
     if (typeof window !== 'undefined') {
      localStorage.setItem(LARGE_CURSOR_KEY, JSON.stringify(newState));
    }
  };
  
  const toggleGrayscale = () => {
     const newState = !isGrayscale;
     setIsGrayscale(newState);
      if (typeof window !== 'undefined') {
        localStorage.setItem(GRAYSCALE_KEY, JSON.stringify(newState));
      }
  };
  
  const toggleUnderlineLinks = () => {
    const newState = !underlineLinks;
    setUnderlineLinks(newState);
     if (typeof window !== 'undefined') {
      localStorage.setItem(UNDERLINE_LINKS_KEY, JSON.stringify(newState));
    }
  };

  const resetAccessibility = () => {
    setIsHighContrast(false);
    setFontSize(16);
    setIsLargeCursor(false);
    setIsGrayscale(false);
    setUnderlineLinks(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(HC_KEY);
      localStorage.removeItem(FONT_SIZE_KEY);
      localStorage.removeItem(LARGE_CURSOR_KEY);
      localStorage.removeItem(GRAYSCALE_KEY);
      localStorage.removeItem(UNDERLINE_LINKS_KEY);
    }
  };

  const panelButtonStyle = `flex items-center w-full p-3 px-4 rounded-lg transition-all duration-200 gap-3 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-teal-500`;

  const getButtonStyles = (isActive) => {
    if (isHighContrast) {
      return `border border-yellow-400 ${isActive ? 'bg-yellow-400 text-black font-semibold' : 'bg-gray-800 text-yellow-300 hover:bg-gray-700'}`;
    }
    return `${isActive ? 'bg-teal-100 text-teal-800 font-semibold' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`;
  };

  return (
    <div className="font-sans">
      <button
        onClick={toggleMenu}
        className={`accessibility-floating-btn fixed bottom-5 left-5 z-[2147483647] flex items-center gap-2 rounded-full py-2.5 px-4 shadow-lg transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400
          ${isHighContrast ? 'bg-black text-yellow-400 border-2 border-yellow-400' : 'bg-gradient-to-br from-teal-500 to-teal-600 text-white'}
          ${isMenuOpen ? (isHighContrast ? 'scale-105' : 'scale-105 from-teal-600 to-teal-700') : ''}`}
        aria-label="Abrir menu de acessibilidade"
        aria-expanded={isMenuOpen}
      >
        <FaUniversalAccess className="text-xl" />
        <span className="font-medium text-sm pr-1">Acessibilidade</span>
      </button>

      {isMenuOpen && (
        <div className={`accessibility-panel fixed bottom-20 left-5 z-[2147483646] w-72 rounded-xl shadow-2xl overflow-hidden animate-fadeInUp border
          ${isHighContrast ? 'bg-black text-yellow-400 border-yellow-400' : 'bg-white border-gray-200'}`}>

           <div className={`flex items-center p-4 gap-3 border-b
            ${isHighContrast ? 'bg-black border-yellow-500' : 'bg-gradient-to-r from-teal-50 to-teal-100 border-gray-200'}`}>

            {logo ? (
              <img
                src={logo}
                alt="Logo Instituto Criativo"
                className={`h-8 w-auto ${isHighContrast ? 'border border-yellow-400' : ''}`}
              />
            ) : (
              <FaUniversalAccess className={`text-xl ${isHighContrast ? 'text-yellow-400' : 'text-teal-600'}`} />
            )}

            <h3 className={`m-0 text-base font-semibold ${isHighContrast ? 'text-yellow-400' : 'text-teal-800'}`}>
              Opções de Acessibilidade
            </h3>
          </div>

          <div className="p-3 flex flex-col gap-2 max-h-80 overflow-y-auto">
            <div className="flex gap-2">
              <button onClick={decreaseFont} aria-label="Diminuir tamanho da fonte" className={`${panelButtonStyle} justify-center flex-1 ${getButtonStyles(false)}`}>
                <FaMinus /> A-
              </button>
              <button onClick={increaseFont} aria-label="Aumentar tamanho da fonte" className={`${panelButtonStyle} justify-center flex-1 ${getButtonStyles(false)}`}>
                <FaPlus /> A+
              </button>
            </div>
            <hr className={`my-1 ${isHighContrast ? 'border-yellow-600' : 'border-gray-200'}`} />

            <button onClick={toggleContrast} aria-pressed={isHighContrast} className={`${panelButtonStyle} ${getButtonStyles(isHighContrast)}`}>
              <FaAdjust className="w-4 h-4" /> <span>Alto Contraste</span>
            </button>

            <button onClick={toggleLargeCursor} aria-pressed={isLargeCursor} className={`${panelButtonStyle} ${getButtonStyles(isLargeCursor)}`}>
              <FaMousePointer className="w-4 h-4" /> <span>Cursor Maior</span>
            </button>
            
            <button onClick={toggleGrayscale} aria-pressed={isGrayscale} className={`${panelButtonStyle} ${getButtonStyles(isGrayscale)}`}>
              <FaTintSlash className="w-4 h-4" /> <span>Escala de Cinza</span>
            </button>
            
            <button onClick={toggleUnderlineLinks} aria-pressed={underlineLinks} className={`${panelButtonStyle} ${getButtonStyles(underlineLinks)}`}>
              <FaUnderline className="w-4 h-4" /> <span>Sublinhar Links</span>
            </button>
            
            <hr className={`my-1 ${isHighContrast ? 'border-yellow-600' : 'border-gray-200'}`} />
            
            <button onClick={resetAccessibility} className={`${panelButtonStyle} ${isHighContrast ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700 border border-yellow-400' : 'bg-red-50 text-red-700 hover:bg-red-100'}`}>
              <FaUndo className="w-4 h-4" /> <span>Redefinir Opções</span>
            </button>
          </div>

          <div className={`p-3 text-center border-t ${isHighContrast ? 'border-yellow-500' : 'border-gray-200'}`}>
             {logo && <img src={logo} alt="Logo Instituto Criativo" className={`h-5 w-auto inline-block mr-1 opacity-80 ${isHighContrast ? 'border border-yellow-400' : ''}`} />}
            <p className={`m-0 text-xs inline-block align-middle ${isHighContrast ? 'text-yellow-300' : 'text-gray-500'}`}>
              Instituto Criativo
            </p>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.25s ease-out forwards;
        }
        :root { --base-font-size: 16px; }
        html { font-size: var(--base-font-size); }
        body { font-size: var(--base-font-size); }


        .large-cursor-active,
        .large-cursor-active * {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z'%3E%3C/path%3E%3Cpath d='M13 13l6 6'%3E%3C/path%3E%3C/svg%3E") 0 0, auto !important;
        }
        
        .large-cursor-active.global-hc-mode,
        .large-cursor-active.global-hc-mode * {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90' viewBox='0 0 24 24' fill='none' stroke='%23ffeb3b' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z'%3E%3C/path%3E%3Cpath d='M13 13l6 6'%3E%3C/path%3E%3C/svg%3E") 0 0, auto !important;
        }
        
        .large-cursor-active a,
        .large-cursor-active button,
        .large-cursor-active input[type="submit"],
        .large-cursor-active input[type="button"],
        .large-cursor-active select,
        .large-cursor-active [role="button"] {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'%3E%3C/path%3E%3C/svg%3E") 0 0, pointer !important;
        }
        
        .large-cursor-active.global-hc-mode a,
        .large-cursor-active.global-hc-mode button,
        .large-cursor-active.global-hc-mode input[type="submit"],
        .large-cursor-active.global-hc-mode input[type="button"],
        .large-cursor-active.global-hc-mode select,
        .large-cursor-active.global-hc-mode [role="button"] {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90' viewBox='0 0 24 24' fill='none' stroke='%23ffeb3b' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'%3E%3C/path%3E%3C/svg%3E") 0 0, pointer !important;
        }


        body.global-hc-mode {
            background-color: #000000 !important;
            color: #ffeb3b !important;
        }
        

        body.global-hc-mode .bg-white,
        body.global-hc-mode .bg-gray-50,
        body.global-hc-mode .bg-gray-100,
        body.global-hc-mode .bg-gray-200,
        body.global-hc-mode .bg-red-50,
        body.global-hc-mode .bg-red-100,
        body.global-hc-mode .bg-red-200,
        body.global-hc-mode .bg-yellow-50,
        body.global-hc-mode .bg-yellow-100,
        body.global-hc-mode .bg-yellow-200,
        body.global-hc-mode .bg-green-50,
        body.global-hc-mode .bg-green-100,
        body.global-hc-mode .bg-green-200,
        body.global-hc-mode .bg-blue-50,
        body.global-hc-mode .bg-blue-100,
        body.global-hc-mode .bg-blue-200,
        body.global-hc-mode .bg-indigo-50,
        body.global-hc-mode .bg-indigo-100,
        body.global-hc-mode .bg-indigo-200,
        body.global-hc-mode .bg-purple-50,
        body.global-hc-mode .bg-purple-100,
        body.global-hc-mode .bg-purple-200,
        body.global-hc-mode .bg-pink-50,
        body.global-hc-mode .bg-pink-100,
        body.global-hc-mode .bg-pink-200,
        body.global-hc-mode .bg-teal-50,
        body.global-hc-mode .bg-teal-100,
        body.global-hc-mode .bg-teal-200,
        body.global-hc-mode .bg-orange-50,
        body.global-hc-mode .bg-orange-100,
        body.global-hc-mode .bg-orange-200 {
            background-color: #000000 !important;
        }

        body.global-hc-mode .bg-\[\#e0fafa\],
        body.global-hc-mode .bg-\[\#fffbd1\],
        body.global-hc-mode .bg-\[\#ffe2e2\],
        body.global-hc-mode .bg-\[\#dbf5db\],
        body.global-hc-mode .bg-\[\#f0f0f0\],
        body.global-hc-mode .bg-\[\#f5f5f5\],
        body.global-hc-mode .bg-\[\#f8f8f8\],
        body.global-hc-mode .bg-\[\#fafafa\],
        body.global-hc-mode .bg-\[\#fcfcfc\],
        body.global-hc-mode .bg-\[\#fdfdfd\],
        body.global-hc-mode .bg-\[\#fefefe\],
        body.global-hc-mode .bg-\[\#ffffff\] {
            background-color: #000000 !important;
        }
     
        body.global-hc-mode h1,
        body.global-hc-mode h2,
        body.global-hc-mode h3,
        body.global-hc-mode h4,
        body.global-hc-mode h5,
        body.global-hc-mode h6,
        body.global-hc-mode strong,
        body.global-hc-mode p,
        body.global-hc-mode span,
        body.global-hc-mode div { 
            color: #ffeb3b !important; 
        }
        
      
        body.global-hc-mode a:not(.accessibility-panel a) {
            color: #ffeb3b !important;
            text-decoration: underline !important;
        }
        
        body.global-hc-mode a:not(.accessibility-panel a):hover {
            color: #ffeb3b !important;
            text-decoration: underline !important;
        }
        
      
        body.global-hc-mode input:not(.accessibility-panel input),
        body.global-hc-mode textarea:not(.accessibility-panel textarea),
        body.global-hc-mode select:not(.accessibility-panel select) {
            background-color: #000000 !important;
            color: #ffeb3b !important;
            border: 1px solid #ffeb3b !important;
        }
        
        body.global-hc-mode input::placeholder,
        body.global-hc-mode textarea::placeholder {
            color: #ffeb3b !important;
        }
        
        /* Bordas mais visíveis */
        body.global-hc-mode .border,
        body.global-hc-mode .border-t,
        body.global-hc-mode .border-r,
        body.global-hc-mode .border-b,
        body.global-hc-mode .border-l {
            border-color: #ffeb3b !important;
        }
        
        /* Botões mais visíveis */
        body.global-hc-mode button:not(.accessibility-panel button),
        body.global-hc-mode .btn,
        body.global-hc-mode [role="button"] {
            background-color: #000000 !important;
            color: #ffeb3b !important;
            border: 2px solid #ffeb3b !important;
        }
        
        body.global-hc-mode button:not(.accessibility-panel button):hover,
        body.global-hc-mode .btn:hover,
        body.global-hc-mode [role="button"]:hover {
            background-color: #ffeb3b !important;
            color: #000000 !important;
        }
        
        /* Preservar imagens */
        body.global-hc-mode img {
            border: 1px solid #ffeb3b !important;
            filter: none !important; /* Garantir que nenhum filtro seja aplicado */
            opacity: 1 !important; /* Garantir que a imagem seja totalmente visível */
        }
        
      
        html.grayscale-mode {
            filter: grayscale(100%) !important;
        }
        
       
        body.underline-links-mode a {
            text-decoration: underline !important;
        }

       /* REGRAS PARA ALTO CONTRASTE  */
body.global-hc-mode .hc-bg {
  background-color: inherit !important;
}

body.global-hc-mode .icon-preserve,
body.global-hc-mode .icon-preserve path {
  color: initial !important;
  stroke: initial !important;
  fill: initial !important;
}

body.global-hc-mode .hc-icon,
body.global-hc-mode .hc-icon path {
  color: inherit !important;
  fill: inherit !important;
  stroke: inherit !important;
}

body.global-hc-mode .hc-card {
  border: 2px solid #ffeb3b !important;
}

body.global-hc-mode .hc-text {
  color: inherit !important;
}

@media (prefers-contrast: more) {
  .alto-contraste {
    background-color: black;
    color: white;
  }
  
  .alto-contraste-input {
    background-color: black;
    border-color: white;
    color: white;
  }
      `}</style>
    </div>
  );
};

export default Acessibilidade;
