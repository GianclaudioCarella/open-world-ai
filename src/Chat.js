// src/Chat.js
import React, { useState, useRef, useEffect } from "react";
import "./Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Welcome! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
  e.preventDefault();
  if (!input.trim()) return;

  // Add the user's message immediately
  setMessages([...messages, { sender: "user", text: input }]);
  
  try {
    // Call the Azure Function POST API
    const response = await fetch("https://yellow-tree-0a4f71e10.1.azurestaticapps.net:4280/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: input })  // matches C# model property
    });

    if (!response.ok) {
      throw new Error(`Function returned status ${response.status}`);
    }

    const data = await response.json();  // { sender: "bot", text: "..." }

    // Add the bot's response message
    setMessages((prevMessages) => [...prevMessages, { sender: data.sender, text: data.text }]);
    } catch (error) {
        // On error, show fallback message from bot
        setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: "Sorry, something went wrong." }]);
        console.error("Error calling Azure Function:", error);
    }

    setInput("");
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
        <div ref={messagesEndRef} />
      </div>
      <form className="chat-input-container" onSubmit={sendMessage}>
        <input
          className="chat-input"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="chat-send-btn" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
