import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { tw } from "twind";
import ondaPng from "../../assets/onda.png";
import celuSvg from "../../assets/celu.svg";
import logoPng from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatBot from "../../componentes/chatBot/ChatBot";
import Acessibilidade from "../../componentes/acessibilidade/Acessibilidade";
import { 
  faUser, 
  faLock, 
  faEye, 
  faEyeSlash, 
  faEnvelope, 
  faTimes, 
  faUserShield, 
  faUsers 
} from "@fortawesome/free-solid-svg-icons";

const API_URL = "http://localhost:5000/api/auth";

const LoginForm = () => {
  // Estados do componente
  const [isLogin, setIsLogin] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [name, setName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [userType, setUserType] = useState("COLABORADOR");
  const [showPassword, setShowPassword] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    strength: "",
    color: "gray",
    message: "",
    percentage: 0
  });
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false
  });

  const navigate = useNavigate();

  // Efeito para limpar mensagens após 5 segundos
  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);

  // Função para verificar força da senha
  const checkPasswordStrength = (password) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[^A-Za-z0-9]/.test(password)
    };
    
    setPasswordRequirements(requirements);

    const metRequirements = Object.values(requirements).filter(Boolean).length;
    const totalRequirements = Object.keys(requirements).length;

    if (password.length === 0) {
      return {
        strength: "",
        color: "gray",
        message: "",
        percentage: 0
      };
    }

    if (password.length < 8) {
      return {
        strength: "fraca",
        color: "red",
        message: "Senha muito curta (mínimo 8 caracteres)",
        percentage: 25
      };
    }

    const strengthPercentage = (metRequirements / totalRequirements) * 100;

    if (strengthPercentage <= 50) {
      return {
        strength: "fraca",
        color: "red",
        message: "Senha fraca - atenda a mais requisitos",
        percentage: strengthPercentage
      };
    } else if (strengthPercentage <= 75) {
      return {
        strength: "média",
        color: "orange",
        message: "Senha média - pode melhorar",
        percentage: strengthPercentage
      };
    } else {
      return {
        strength: "forte",
        color: "green",
        message: "Senha forte!",
        percentage: strengthPercentage
      };
    }
  };

  // Manipuladores de eventos
  const handlePasswordChange = (e, isLoginPassword) => {
    const value = e.target.value;
    if (isLoginPassword) {
      setLoginPassword(value);
    } else {
      setRegisterPassword(value);
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const togglePrivacyModal = () => setShowPrivacyModal(!showPrivacyModal);

  // Função para lidar com o login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email: loginEmail,
        senha: loginPassword,
      });
      
      console.log("Resposta completa do login:", response.data);
      
      // Mapear os dados do usuário para a estrutura esperada pelo Dashboard
      const userData = {
        id: response.data.user.id,
        nome: response.data.user.nome,
        email: response.data.user.email,
        tipo: response.data.user.tipo_usuario,
        telefone: response.data.user.telefone || "",
        cargo: response.data.user.cargo || "",
        localizacao: response.data.user.localizacao || ""
      };
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(userData));
      
      console.log("Dados do usuário salvos no localStorage:", userData);
      
      setSuccessMessage("Login bem-sucedido! Redirecionando...");
      navigate("/Dashboard");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Erro ao tentar fazer login. Tente novamente.");
      }
      console.error("Erro no login:", error);
    }
  };

  // Função para lidar com o registro - VERSÃO CORRIGIDA
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    
    if (passwordStrength.strength === "fraca") {
      setErrorMessage("Por favor, use uma senha mais forte");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/register`, {
        nome: name,
        email: registerEmail,
        senha: registerPassword,
        tipo_usuario: userType,
      });
      
      setSuccessMessage("Usuário cadastrado com sucesso! Faça login para continuar.");
      
      // Limpa os campos do formulário
      setName("");
      setRegisterEmail("");
      setRegisterPassword("");
      setUserType("COLABORADOR");
      setPasswordStrength({ strength: "", color: "gray", message: "", percentage: 0 });
      setPasswordRequirements({
        length: false,
        uppercase: false,
        number: false,
        specialChar: false
      });
      
      // Volta para o modo de login
      setIsLogin(true);
      
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Erro ao tentar registrar. Tente novamente.");
      }
      console.error("Erro no registro:", error);
    }
  };

  // Alternar entre login e registro
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrorMessage("");
    setSuccessMessage("");
    setPasswordStrength({ strength: "", color: "gray", message: "", percentage: 0 });
    setPasswordRequirements({
      length: false,
      uppercase: false,
      number: false,
      specialChar: false
    });
  };

  // Componente de input reutilizável
  const renderInput = (icon, label, value, onChange, fieldType = "text", isPassword = false, showStrength = false) => (
    <div className={tw`relative flex items-center border-b-2 border-gray-300 my-4 py-2`}>
      <FontAwesomeIcon
        icon={icon}
        className={tw`text-gray-400 mx-2`}
      />
      <div className={tw`relative w-full`}>
        <input
          type={isPassword ? (showPassword ? "text" : "password") : fieldType}
          value={value}
          onChange={onChange}
          placeholder={label}
          className={tw`w-full px-2 py-2 bg-transparent border-none outline-none text-base text-gray-700`}
          autoComplete={fieldType === 'email' ? 'email' : (isPassword ? 'current-password' : 'off')}
        />
        {isPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={tw`absolute right-2 top-1/2 -translate-y-1/2 text-gray-500`}
          >
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </button>
        )}
      </div>
      {showStrength && passwordStrength.message && (
        <div className={tw`absolute -bottom-5 left-0 text-xs text-${passwordStrength.color}-500`}>
          {passwordStrength.message}
        </div>
      )}
    </div>
  );

  return (
    <div className={tw`font-poppins overflow-hidden bg-white h-screen relative`}>
      <img
        src={ondaPng}
        alt="Onda decorativa"
        className={tw`fixed left-0 bottom-0 h-full z-0 hidden lg:block object-cover pointer-events-none`}
      />
      <div className="relative">
        <div className="absolute top-15 right-0 w-[200px] h-[200px] z-13 pointer-events-none">
          <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
            <path fill="rgba(28, 235, 229, 0.5)" d="M300,0 L300,200 C250,250 150,150 100,150 C50,150 0,100 0,0 Z" />
          </svg>
        </div>
      </div>

      {/* Modal de Política de Privacidade */}
      {showPrivacyModal && (
        <div className={tw`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4`}>
          <div className={tw`bg-white rounded-lg p-6 max-w-4xl w-full mx-auto max-h-[90vh] overflow-y-auto`}>
            <div className={tw`flex justify-between items-center mb-6 sticky top-0 bg-white py-2 z-10`}>
              <div className={tw`flex items-center`}>
                <img
                  src={logoPng}
                  alt="Logo"
                  className={tw`w-12 h-12 object-cover rounded-full border-2 border-gray-200 mr-4`}
                />
                <h3 className={tw`text-2xl font-bold text-gray-800`}>Política de Privacidade</h3>
              </div>
              <button
                onClick={togglePrivacyModal}
                className={tw`text-gray-500 hover:text-gray-700 text-2xl`}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className={tw`prose max-w-none`}>
              <div className={tw`mb-8 p-6 bg-gray-50 rounded-xl border-l-4 border-[#FF4464]`}>
                <p className={tw`text-gray-700`}>
                  O <strong className={tw`text-[#FF4464]`}>Instituto Criativo</strong> valoriza a privacidade e a proteção dos dados pessoais de seus usuários, clientes e visitantes. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos as informações que você nos fornece ao acessar nosso site e utilizar nossos serviços.
                </p>
              </div>

              <div className={tw`space-y-8`}>
                <div className={tw`group`}>
                  <div className={tw`flex items-start gap-4 mb-4`}>
                    <div className={tw`flex-shrink-0 mt-1 w-8 h-8 rounded-full bg-[#FF4464] text-white flex items-center justify-center font-bold`}>1</div>
                    <h2 className={tw`text-xl font-bold text-gray-800`}>Quais dados coletamos?</h2>
                  </div>
                  <div className={tw`pl-12`}>
                    <p className={tw`mb-4 text-gray-700`}>
                      Podemos coletar as seguintes informações:
                    </p>
                    <ul className={tw`space-y-3`}>
                      <li className={tw`flex items-start`}>
                        <span className={tw`flex-shrink-0 mt-1 mr-3 text-[#FF4464]`}>•</span>
                        <span className={tw`text-gray-700`}><strong>Dados pessoais:</strong> Nome, e-mail, telefone, endereço, CPF, data de nascimento e outras informações fornecidas voluntariamente por você.</span>
                      </li>
                      <li className={tw`flex items-start`}>
                        <span className={tw`flex-shrink-0 mt-1 mr-3 text-[#FF4464]`}>•</span>
                        <span className={tw`text-gray-700`}><strong>Dados de navegação:</strong> Endereço IP, tipo de navegador, páginas visitadas, tempo de permanência no site e outros dados de uso coletados por meio de cookies e tecnologias semelhantes.</span>
                      </li>
                      <li className={tw`flex items-start`}>
                        <span className={tw`flex-shrink-0 mt-1 mr-3 text-[#FF4464]`}>•</span>
                        <span className={tw`text-gray-700`}><strong>Dados de transações:</strong> Informações relacionadas a pagamentos, como dados de cartão de crédito (que são processados de forma segura por gateways de pagamento).</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={tw`group`}>
                  <div className={tw`flex items-start gap-4 mb-4`}>
                    <div className={tw`flex-shrink-0 mt-1 w-8 h-8 rounded-full bg-[#FF4464] text-white flex items-center justify-center font-bold`}>2</div>
                    <h2 className={tw`text-xl font-bold text-gray-800`}>Como utilizamos seus dados?</h2>
                  </div>
                  <div className={tw`pl-12`}>
                    <div className={tw`grid md:grid-cols-2 gap-4`}>
                      <div className={tw`p-4 bg-white rounded-lg border border-gray-200`}>
                        <h3 className={tw`font-semibold text-[#FF4464] mb-2`}>Serviços</h3>
                        <p className={tw`text-gray-600`}>Fornecer, operar e melhorar nossos serviços</p>
                      </div>
                      <div className={tw`p-4 bg-white rounded-lg border border-gray-200`}>
                        <h3 className={tw`font-semibold text-[#FF4464] mb-2`}>Transações</h3>
                        <p className={tw`text-gray-600`}>Processar transações e enviar confirmações</p>
                      </div>
                      <div className={tw`p-4 bg-white rounded-lg border border-gray-200`}>
                        <h3 className={tw`font-semibold text-[#FF4464] mb-2`}>Comunicação</h3>
                        <p className={tw`text-gray-600`}>Enviar comunicações como newsletters e promoções</p>
                      </div>
                      <div className={tw`p-4 bg-white rounded-lg border border-gray-200`}>
                        <h3 className={tw`font-semibold text-[#FF4464] mb-2`}>Conformidade</h3>
                        <p className={tw`text-gray-600`}>Cumprir obrigações legais e regulatórias</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={tw`group`}>
                  <div className={tw`flex items-start gap-4 mb-4`}>
                    <div className={tw`flex-shrink-0 mt-1 w-8 h-8 rounded-full bg-[#FF4464] text-white flex items-center justify-center font-bold`}>3</div>
                    <h2 className={tw`text-xl font-bold text-gray-800`}>Compartilhamento de dados</h2>
                  </div>
                  <div className={tw`pl-12`}>
                    <div className={tw`p-5 bg-gray-50 rounded-lg mb-6`}>
                      <p className={tw`font-medium text-gray-800 mb-3`}>Seus dados pessoais não serão compartilhados com terceiros, exceto nas seguintes situações:</p>
                      <ul className={tw`space-y-3`}>
                        <li className={tw`flex items-start`}>
                          <span className={tw`flex-shrink-0 mt-1 mr-3 text-[#1CEBE5]`}>✓</span>
                          <span className={tw`text-gray-700`}>Com seu consentimento explícito</span>
                        </li>
                        <li className={tw`flex items-start`}>
                          <span className={tw`flex-shrink-0 mt-1 mr-3 text-[#1CEBE5]`}>✓</span>
                          <span className={tw`text-gray-700`}>Para cumprir obrigações legais ou solicitações de autoridades competentes</span>
                        </li>
                        <li className={tw`flex items-start`}>
                          <span className={tw`flex-shrink-0 mt-1 mr-3 text-[#1CEBE5]`}>✓</span>
                          <span className={tw`text-gray-700`}>Com parceiros e fornecedores que prestam serviços em nosso nome</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className={tw`mt-8 p-6 bg-[#FF4464] rounded-2xl text-white`}>
                  <h2 className={tw`text-xl font-bold mb-4`}>Dúvidas ou solicitações?</h2>
                  <p className={tw`mb-6`}>Entre em contato com nosso Encarregado de Proteção de Dados:</p>
                  <div className={tw`grid md:grid-cols-3 gap-6`}>
                    <div>
                      <p className={tw`font-semibold`}>E-mail</p>
                      <p>contato@institutocriativo.com.br</p>
                    </div>
                    <div>
                      <p className={tw`font-semibold`}>Telefone</p>
                      <p>(11) 998030-939</p>
                    </div>
                    <div>
                      <p className={tw`font-semibold`}>Endereço</p>
                      <p>[Av. São Gualter, 1084 - Alto de Pinheiros, São Paulo]</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={tw`container mx-auto h-full px-4 relative z-20`}>
        <div className={tw`grid grid-cols-1 lg:grid-cols-2 h-full items-center`}>
          <div className={tw`hidden lg:flex justify-end items-center`}>
            <img src={celuSvg} alt="Celular" className={tw`w-[380px] xl:w-[455px]`} />
          </div>

          <div className={tw`flex justify-center items-center text-center`}>
            <form
              onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit}
              className={tw`w-full max-w-[320px] md:max-w-[360px]`}
            >
              <img src={logoPng} alt="Logo" className={tw`w-20 md:w-24 mx-auto mb-3 md:mb-4`} />
              <h2 className={tw`text-2xl md:text-3xl lg:text-[2.5rem] xl:text-[2.9rem] uppercase mb-3 md:mb-4 text-gray-800`}>
                {isLogin ? "Login" : "Cadastre-se"}
              </h2>
              
              {errorMessage && <p className={tw`text-red-500 text-sm mb-3`}>{errorMessage}</p>}
              {successMessage && <p className={tw`text-green-500 text-sm mb-3`}>{successMessage}</p>}

              {!isLogin && (
                <>
                  {renderInput(
                    faUser,
                    "Nome",
                    name,
                    (e) => setName(e.target.value)
                  )}

                  {renderInput(
                    faEnvelope,
                    "Email",
                    registerEmail,
                    (e) => setRegisterEmail(e.target.value),
                    "email"
                  )}
                  
                  <div className={tw`flex flex-col items-start my-4`}>
                    <div className={tw`flex items-center mb-2`}>
                      <FontAwesomeIcon icon={faUsers} className={tw`text-gray-400 mr-2`} />
                      <span className={tw`text-gray-700`}>Tipo de Usuário:</span>
                    </div>
                    <div className={tw`flex space-x-2 w-full`}>
                      <button
                        type="button"
                        onClick={() => setUserType("COLABORADOR")}
                        className={tw`flex-1 py-2 rounded-lg text-sm ${userType === "COLABORADOR" ? "bg-[#FF4464] text-white" : "bg-gray-200 text-gray-700"}`}
                      >
                        <FontAwesomeIcon icon={faUsers} className={tw`mr-2`} />
                        Colaborador
                      </button>
                      <button
                        type="button"
                        onClick={() => setUserType("ADM_MASTER")}
                        className={tw`flex-1 py-2 rounded-lg text-sm ${userType === "ADM_MASTER" ? "bg-[#FF4464] text-white" : "bg-gray-200 text-gray-700"}`}
                      >
                        <FontAwesomeIcon icon={faUserShield} className={tw`mr-2`} />
                        ADM Master
                      </button>
                    </div>
                  </div>
                </>
              )}

              {isLogin && renderInput(
                faUser,
                "Email",
                loginEmail,
                (e) => setLoginEmail(e.target.value),
                "email"
              )}

              {isLogin ? (
                renderInput(
                  faLock,
                  "Senha",
                  loginPassword,
                  (e) => handlePasswordChange(e, true),
                  "password",
                  true
                )
              ) : (
                <>
                  {renderInput(
                    faLock,
                    "Senha",
                    registerPassword,
                    (e) => handlePasswordChange(e, false),
                    "password",
                    true,
                    true
                  )}
                  
                  {/* Barra de força da senha */}
                  <div className={tw`mb-2`}>
                    <div className={tw`h-2 w-full bg-gray-200 rounded-full`}>
                      <div 
                        className={tw`h-full rounded-full transition-all duration-300`}
                        style={{ 
                          width: `${passwordStrength.percentage}%`,
                          backgroundColor: passwordStrength.color === "red" ? "#ef4444" : 
                                         passwordStrength.color === "orange" ? "#f97316" : 
                                         "#22c55e"
                        }}
                      ></div>
                    </div>
                    <div className={tw`text-xs text-${passwordStrength.color}-500 mt-1`}>
                      {passwordStrength.message}
                    </div>
                  </div>
                  
                  {/* Lista de requisitos da senha */}
                  <div className={tw`text-left mb-4 text-xs text-gray-600`}>
                    <p className={tw`font-medium mb-1`}>A senha deve conter:</p>
                    <ul className={tw`space-y-1`}>
                      <li className={tw`flex items-center ${passwordRequirements.length ? 'text-green-500' : 'text-gray-400'}`}>
                        <span className={tw`mr-1`}>•</span>
                        Mínimo 8 caracteres
                      </li>
                      <li className={tw`flex items-center ${passwordRequirements.uppercase ? 'text-green-500' : 'text-gray-400'}`}>
                        <span className={tw`mr-1`}>•</span>
                        Pelo menos 1 letra maiúscula
                      </li>
                      <li className={tw`flex items-center ${passwordRequirements.number ? 'text-green-500' : 'text-gray-400'}`}>
                        <span className={tw`mr-1`}>•</span>
                        Pelo menos 1 número
                      </li>
                      <li className={tw`flex items-center ${passwordRequirements.specialChar ? 'text-green-500' : 'text-gray-400'}`}>
                        <span className={tw`mr-1`}>•</span>
                        Pelo menos 1 caractere especial
                      </li>
                    </ul>
                  </div>
                </>
              )}

              {isLogin && (
                <div className={tw`text-right mb-2`}>
                 
                </div>
              )}

              <button
                type="submit"
                className={tw`w-full h-11 rounded-[25px] my-3 text-base uppercase text-white bg-[#FF4464] transition-all duration-300 hover:bg-opacity-90`}
              >
                {isLogin ? "Entrar" : "Cadastrar"}
              </button>

              <div className={tw`text-gray-500 text-sm mt-4`}>
                {isLogin ? (
                  <>
                    Ainda não possui cadastro?{" "}
                    <button
                      type="button"
                      onClick={toggleAuthMode}
                      className={tw`text-[#FF4464] hover:underline transition-colors duration-300`}
                    >
                      Cadastre-se
                    </button>
                  </>
                ) : (
                  <>
                    Já possui uma conta?{" "}
                    <button
                      type="button"
                      onClick={toggleAuthMode}
                      className={tw`text-[#FF4464] hover:underline transition-colors duration-300`}
                    >
                      Faça login
                    </button>
                  </>
                )}
              </div>

              <div className={tw`mt-6 pt-4 border-t border-gray-200`}>
                <button
                  onClick={togglePrivacyModal}
                  className={tw`text-xs text-gray-500 hover:underline`}
                  type="button"
                >
                  Política de privacidade
                </button>
              </div>
            </form>
            <Acessibilidade />
            <ChatBot />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;