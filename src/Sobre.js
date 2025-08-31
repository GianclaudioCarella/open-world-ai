import React from "react";
import { Link } from "react-router-dom";
import "./css/home.css";
import "./css/base.css";
import "./css/style.css";

const Sobre = () => (
  <div>
    <div className="banner-internas">
      <p>Banner interno</p>
    </div>
    <section style={{ maxWidth: 900, margin: "0 auto" }}>
      <article className="open-world" style={{ marginBottom: 32 }}>
        <h2>Open World - Unindo você com o mundo!</h2>
        <h4>
          Com mais de 17 anos de existência, a{" "}
          <strong>OPEN WORLD</strong> é uma empresa 100% brasileira e com uma
          localização estratégica, no Porto de Santos.
        </h4>
        <p>
          Oferecemos a nossos clientes uma rede de suportes para todas as etapas
          de serviços especializados na área de{" "}
          <strong>comércio exterior</strong>, seja negociando as melhores
          condições de frete dentro do modal que traga a concretização do
          negócio dentro do menor custo possível, seja no desembaraço aduaneiro,
          sempre com informações atualizadas on-line via Internet, inclusive
          bagagem de viajante, na importação ou na exportação, transportados por
          qualquer via.
        </p>
      </article>
    </section>
    <section
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 32,
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <div style={{ flex: "1 1 300px", minWidth: 280 }}>
        <strong>Missão</strong>
        <p>
          A Open World está no mercado para desenvolver um trabalho diferenciado,
          eficiente e ágil, tendo como base a credibilidade e conhecimentos de
          toda sua equipe.
        </p>
        <p>
          Sua função principal é aliar todos os requisitos técnicos e econômicos
          do mercado para oferecer os melhores serviços desde a classificação da
          mercadoria até o transporte final para o cliente.
        </p>
      </div>
      <div style={{ flex: "1 1 300px", minWidth: 280 }}>
        <strong>Visão</strong>
        <p>
          Ser uma empresa de atuação e reconhecimento nacional e internacional na
          área de comércio exterior, com eficiência em seus serviços, procurando
          contribuir para processos menos burocráticos.
        </p>
      </div>
    </section>
    <div
      className="box-cinza"
      style={{
        background: "#ededed",
        margin: "32px auto",
        padding: 24,
        maxWidth: 900,
        borderRadius: 8,
      }}
    >
      <section className="open-world">
        <h3>Nossa equipe</h3>
        <p>
          A Open World é formada por uma equipe de profissionais, colaboradores
          diretos e indiretos com amplo conhecimento e experiência, atuando em
          Santos, Guarulhos, Viracopos, Rio de Janeiro e Itajaí.
        </p>
      </section>
    </div>
    <footer
      style={{
        marginTop: 48,
        textAlign: "center",
        padding: 24,
        background: "#f5f5f5",
      }}
    >
      <p>Todos os direitos reservados - Open World 2025</p>
      <a
        href="http://www.quedesign.com.br/"
        target="_blank"
        rel="noopener noreferrer"
        title="Desenvolvimento de websites"
      >
        @quedesign
      </a>
    </footer>
  </div>
);

export default Sobre;