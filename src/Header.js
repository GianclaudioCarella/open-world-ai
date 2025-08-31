import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => (
  <header className="header">
    <h1>
      Open World &gt;&gt; Serviços especializado na área de comércio exterior
    </h1>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/chat">Open World AI</Link>
      <Link to="/sobre">Sobre</Link>
      <Link to="/servicos">Serviços</Link>
      <Link to="/links">Links</Link>
    </nav>
  </header>
);

export default Header;
