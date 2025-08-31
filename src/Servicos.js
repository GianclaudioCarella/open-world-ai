import React from "react";
import { Link } from "react-router-dom";

const Servicos = () => (
  <div>
    <nav className="mobile">
      <Link to="/">
        <img src="/open-world-mobile.png" width={120} height={60} alt="Open World" />
      </Link>
    </nav>
    <div className="banner-internas">
      <p>Banner interno</p>
    </div>
    <section>
      <article className="open-world">
        <h2>Serviços de desembaraço aduaneiro para embarques aéreos, marítimos e rodoviários</h2>
        <h4>Todo nosso empenho está voltado ao atendimento rápido e personalizado de nossos clientes.</h4>
        <p>
          Nossas atividades vão desde as áreas de assessoria em comércio exterior, logística, importação, exportação, transporte e consumo de bordo, garantido assim custos competitivos aos nossos clientes e colaboradores.<br />
          Aproveitamos ainda para reafirmar que mantemo-nos cada vez mais à disposição com nossa equipe altamente qualificada para todas e quaisquer consultas referentes ao comércio exterior.
        </p>
        {/* Accordion sections as static content */}
        <div className="panel-group" id="accordion">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">Exportação</h4>
            </div>
            <div className="panel-collapse">
              <div className="panel-body">
                <ul className="lista">
                  <li>Emissão de Fatura Comercial</li>
                  <li>Emissão de Certificado de Origem</li>
                  <li>Trâmites de documentos junto à Receita Federal, Ministério da Agricultura, Ministério da Saúde, Ibama</li>
                  <li>Reserva e confirmação de praça</li>
                  <li>Coordenação de transporte</li>
                  <li>Contratação de seguro</li>
                  <li>Emissão de R.E. (Registro de Exportação)</li>
                  <li>Emissão de D.D.E. (Declaração de Despacho de Exportação)</li>
                  <li>Emissão de D.S.E. (Declaração Simplificada de Exportação)</li>
                  <li>Emissão de R.V. (Registro de Venda)</li>
                  <li>Emissão de R.C. (Registro de Compra)</li>
                  <li>Desembaraço Aduaneiro</li>
                  <li>Processos Atípicos</li>
                  <li>Consulta com a fiscalização</li>
                  <li>Pagamentos de fretes e taxas</li>
                  <li>Desembaraço aduaneiro</li>
                  <li>Acompanhamento da chegada no destino</li>
                  <li>Follow-up on line</li>
                  <li>Envios de documentos originais para os portos de destino</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">Importação</h4>
            </div>
            <div className="panel-collapse">
              <div className="panel-body">
                <ul className="lista">
                  <li>Regimes especiais e atípicos</li>
                  <li>Pick-up da mercadoria no exterior</li>
                  <li>Transporte internacional</li>
                  <li>Classificação de mercadoria</li>
                  <li>Análise e acompanhamento para obtenção de Ex-tarifário</li>
                  <li>Autorização de embarques de mercadorias no exterior</li>
                  <li>Confecção e deferimento de L.I. junto aos Ministérios e órgãos anuentes</li>
                  <li>Trâmites de documentos junto à Receita Federal, Ministério da Agricultura, Ministério da Saúde, Ibama, etc</li>
                  <li>Drawback</li>
                  <li>Emissão de Declarações de Importação (D.I.)</li>
                  <li>Emissão de notas fiscais de entrada</li>
                  <li>Fechamento cambial</li>
                  <li>Desembaraço Aduaneiro</li>
                  <li>Consulta com a fiscalização</li>
                  <li>Coordenação de transporte</li>
                  <li>Follow-up on line</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">Consumo de bordo</h4>
            </div>
            <div className="panel-collapse">
              <div className="panel-body">
                <p>
                  Especializada em mercadorias destinadas a uso e consumo de bordo em embarcações de passageiros de tráfego internacional, de bandeira brasileira ou estrangeira.
                </p>
              </div>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">Gerenciamento de serviços</h4>
            </div>
            <div className="panel-collapse">
              <div className="panel-body">
                <ul className="lista">
                  <li>Transportadora</li>
                  <li>Agente de Carga</li>
                  <li>Ova e desova de container</li>
                  <li>Companhias Aéreas</li>
                  <li>Agências Marítimas</li>
                  <li>Armazéns Alfandegados e Gerais</li>
                  <li>Seguros Nacionais e Internacionais</li>
                  <li>Corretoras de Câmbio</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </article>
      <br />
      <br />
    </section>
    <section className="open-world" style={{ marginTop: 32 }}>
      <h4>Acompanhamento online</h4>
      <p>
        Para atendimento aos processos de desembaraço alfandegário, contamos com uma área operacional informatizada, o que nos permite a elaboração de toda a documentação necessária, rapidez e segurança, além de podermos disponibilizar um serviço de informações on-line.
      </p>
    </section>
    <div className="box-cinza" style={{ background: "#f5f5f5", padding: 24, margin: "32px 0" }}>
      <img
        src="/img/area-de-atuacao.png"
        alt="área, marítima e rodoviária"
        width={300}
        height={200}
        style={{ maxWidth: 300, height: "auto", marginRight: 16 }}
      />
      <img
        src="/img/area-de-atuacao.png"
        alt="área, marítima e rodoviária"
        width={300}
        height={200}
        style={{ maxWidth: 300, height: "auto" }}
      />
    </div>
    <footer style={{ textAlign: "center", padding: 24, background: "#eee" }}>
      <p>Todos os direitos reservados - Open World 2025</p>
      <a href="http://www.quedesign.com.br/" title="Desenvolvimento de websites" target="_blank" rel="noopener noreferrer">@quedesign</a>
    </footer>
  </div>
);

export default Servicos;