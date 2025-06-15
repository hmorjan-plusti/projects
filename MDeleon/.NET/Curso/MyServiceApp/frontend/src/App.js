import React from "react";
import LogViewer from "./components/LogViewer";

function App() {
  return (
    <div className="App" style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Dashboard del Servicio</h1>
      <LogViewer />
    </div>
  );
}

export default App;
