import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Welcome to PlatformApp</h2>
      <button onClick={() => navigate("/login")} style={{ margin: "10px" }}>
        Login
      </button>
      <button onClick={() => navigate("/register")} style={{ margin: "10px" }}>
        Register
      </button>
    </div>
  );
}
