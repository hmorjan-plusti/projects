import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function Menu() {
  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <nav style={{display:"flex", gap:12, padding:12, borderBottom:"1px solid #ddd"}}>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    );
  }
  return null;
}

export default function App(){
  return (
    <BrowserRouter>
      <Menu/>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/login" element={<LoginRedirect/>}/>
        <Route path="/register" element={<RegisterRedirect/>}/>
        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
    </BrowserRouter>
  );
}

function LoginRedirect() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  if (token) {
    navigate("/");
    return null;
  }
  return <Login/>;
}

function RegisterRedirect() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  if (token) {
    navigate("/");
    return null;
  }
  return <Register/>;
}
