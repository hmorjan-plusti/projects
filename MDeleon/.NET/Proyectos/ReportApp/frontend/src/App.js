import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register"; // ✅ Asegúrate que este archivo exista

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página protegida, idealmente futura PrivateRoute */}
        <Route path="/" element={<Home />} />
        
        {/* Páginas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Redirección si ruta no existe */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
