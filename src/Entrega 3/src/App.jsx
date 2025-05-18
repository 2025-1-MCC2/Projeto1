import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import Educacao from "./componentes/educacao/Educacao";
import Contato from "./componentes/contato/Contato";
import Doacoes from "./componentes/doacoes/Doacoes";
import Login from "./componentes/login/Login";
import ScrollToHash from "./componentes/ScrollToHash";
import Eventos from "./componentes/evento/Eventos";
import Dashboard from "./componentes/dashboard/Dashboard"; // Verifique se o nome do componente está correto!

function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/educacao" element={<Educacao />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/doacoes" element={<Doacoes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/evento" element={<Eventos />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Adicionada a rota do Dashboard */}
      </Routes>
    </>
  );
}

export default App;
