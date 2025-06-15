import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

function Chat() {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5000/chathub")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("Conectado a SignalR");

          connection.on("ReceiveMessage", (user, message) => {
            setMessages((prev) => [...prev, `${user}: ${message}`]);
          });

          connection.on("ReceiveNotification", (message) => {
            alert("🔔 Notificación: " + message);
          });
        })
        .catch((e) => console.log("Error de conexión: ", e));
    }
  }, [connection]);

  const sendMessage = async () => {
    if (connection && connection.state === "Connected") {
      await connection.invoke("SendMessage", user, message);
      setMessage("");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat en tiempo real</h2>
      <input
        type="text"
        placeholder="Tu nombre"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <input
        type="text"
        placeholder="Mensaje"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <button onClick={sendMessage}>Enviar</button>

      <ul style={{ marginTop: 20 }}>
        {messages.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </div>
  );
}

export default Chat;
