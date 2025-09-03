import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between">
      <Link to="/" className="font-bold text-lg">
        Plataforma Segura
      </Link>
      <div className="flex gap-4">
        <Link to="/products">Productos</Link>
        <Link to="/orders">Pedidos</Link>
        {user?.role === "admin" && <Link to="/admin">Admin</Link>}
        {user?.role === "admin" && <Link to="/reports">Reportes</Link>}
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registro</Link>
          </>
        ) : (
          <button onClick={logout} className="btn btn-secondary">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
