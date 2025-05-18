import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ScrollToHash = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { pathname, hash } = location;

    if (pathname === "/" && hash) {
      const id = hash.replace("#", "");

      // Espera um pouco para a Home ser montada
      const timeout = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);

      return () => clearTimeout(timeout);
    }


    if (pathname !== "/" && hash) {
      navigate("/" + hash);
    }
  }, [location, navigate]);

  return null;
};

export default ScrollToHash;
