import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Chat from "./Chat";
import Sobre from "./Sobre";
import Servicos from "./Servicos";
import Links from "./Links";
import Header from "./Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/links" element={<Links />} />
      </Routes>
    </Router>
  );
}

export default App;
