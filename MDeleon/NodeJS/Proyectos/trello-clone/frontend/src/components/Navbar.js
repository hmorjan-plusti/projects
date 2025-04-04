import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/dashboard">Tablero</Link>
      <Link to="/login">Iniciar sesión</Link>
      <Link to="/register">Registrarse</Link>
    </nav>
  );
}

export default Navbar;
