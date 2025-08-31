// src/Chat.js
import React, { useState, useRef, useEffect } from "react";
import "./Chat.css";

const ThinkingDots = () => {
  const [dots, setDots] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return <span>Pensando{dots}</span>;
};

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Olá! Como posso ajudá-lo hoje? Sou um assistente em comércio exterior e posso ajudar com informações sobre tarifas, regulamentações e muito mais." }
  ]);
  const [input, setInput] = useState("");
  const [botThinking, setBotThinking] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
  e.preventDefault();
  if (!input.trim()) return;

  setMessages((prev) => [...prev, { sender: "user", text: input }]);
  setInput("");
  setBotThinking(true); // Mostra "Pensando..."

  try {
    // Call the Azure Function POST API
    //const response = await fetch("http://localhost:4280/api/chat", {
    const response = await fetch("https://yellow-tree-0a4f71e10.1.azurestaticapps.net/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    if (!response.ok) throw new Error(`Function returned status ${response.status}`);

    const data = await response.json();
    setMessages((prev) => [...prev, { sender: data.sender, text: data.text }]);
  } catch (error) {
    setMessages((prev) => [...prev, { sender: "bot", text: "Estou com problemas de conexão. Por favor, tente novamente mais tarde." }]);
    console.error("Error calling Azure Function:", error);
  }
  setBotThinking(false); // Esconde "Pensando..."
};

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-message ${msg.sender === "user" ? "user" : "bot"}`}
          >
            {msg.text}
          </div>
        ))}
        {botThinking && (
          <div className="chat-message bot">
            <ThinkingDots />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form className="chat-input-container" onSubmit={sendMessage}>
        <input
          className="chat-input"
          placeholder="Escreva sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="chat-send-btn" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Chat;
