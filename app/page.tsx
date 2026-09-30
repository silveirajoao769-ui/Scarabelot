"use client";

import {
  ArrowRight,
  ChevronDown,
  CircleGauge,
  Factory,
  Headphones,
  Menu,
  Play,
  Search,
  ShieldCheck,
  Truck,
  Wrench,
  X,
} from "lucide-react";
import { useState } from "react";

const products = [
  { name: "Transportador de Corrente", model: "TCLS 5060", desc: "Mais praticidade e segurança no transporte.", sprite: 0 },
  { name: "Rolo Faca Green", model: "6000 e 9000", desc: "Potência, robustez e resultado no manejo de palhada.", sprite: 1 },
  { name: "Green Digger", model: "1200", desc: "Drenagem eficiente para transformar áreas encharcadas.", sprite: 2 },
  { name: "Guincho", model: "GHS-2000", desc: "Força, segurança e agilidade para trabalho pesado.", sprite: 3 },
  { name: "Lâminas Niveladoras", model: "LNR I, II e II-H", desc: "Três configurações para diferentes necessidades.", sprite: 4 },
  { name: "Limpadeira de Valo", model: "Hidráulica", desc: "Mais rendimento na limpeza e manutenção de valos.", sprite: 5 },
  { name: "Grade de Rolos", model: "Incorporadora TR", desc: "Eficiência e versatilidade no preparo do solo.", sprite: 6 },
  { name: "Rolo Faca", model: "RFS Arrozeiro", desc: "Robustez e baixa manutenção para o cultivo do arroz.", sprite: 7 },
];

const techPoints = [
  { x: "17%", y: "30%", title: "Pontos de engate", text: "Mais praticidade no acoplamento e na operação." },
  { x: "57%", y: "24%", title: "Sistema hidráulico", text: "Controle e desempenho para o trabalho no campo." },
  { x: "64%", y: "50%", title: "Chassi", text: "Estrutura robusta para operações exigentes." },
  { x: "30%", y: "67%", title: "Rolos e facas", text: "Componentes voltados ao manejo eficiente da palhada." },
];

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activePoint, setActivePoint] = useState(2);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Scarabelot">
          <img
            src="https://scarabelotimplementos.com/wp-content/uploads/2022/09/logo-scarabelot.png"
            alt="Scarabelot"
          />
        </a>

        <nav className={mobileOpen ? "nav nav-open" : "nav"}>
          <a href="#produtos">Produtos <ChevronDown size={14} /></a>
          <a href="#tecnologia">Tecnologia</a>
          <a href="#empresa">A Scarabelot</a>
          <a href="#pos-venda">Pós-venda</a>
          <a href="#conteudos">Conteúdos</a>
          <a href="#contato">Contato</a>
        </nav>

        <div className="header-actions">
          <label className="search-box">
            <Search size={18} />
            <input aria-label="Buscar" placeholder="Buscar implementos, peças..." />
          </label>
          <a className="btn btn-red compact" href="#contato">
            Solicitar orçamento <ArrowRight size={17} />
          </a>
        </div>

        <button className="menu-button" onClick={() => setMobileOpen((v) => !v)} aria-label="Abrir menu">
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <span className="eyebrow light">DO SOLO BRASILEIRO PARA GRANDES RESULTADOS</span>
          <h1>ENGENHARIA QUE<br />TRANSFORMA<br /><strong>A TERRA.</strong></h1>
          <p>Robustez, tecnologia e desempenho no campo para quem faz o agro acontecer.</p>

          <div className="hero-actions">
            <a className="btn btn-red primary" href="#produtos">
              <Search size={18} /> Encontrar meu implemento <ArrowRight size={17} />
            </a>
            <a className="btn btn-glass" href="#tecnologia"><CircleGauge size={18} /> Ver em 360°</a>
            <a className="btn btn-glass" href="#campo"><Play size={18} /> Assistir em campo</a>
          </div>

          <div className="hero-proof">
            <div><strong>Desde 1991</strong><span>tradição no agro</span></div>
            <div><strong>Engenharia própria</strong><span>soluções para o campo</span></div>
          </div>
        </div>

        <div className="hero-product" id="tecnologia">
          <div className="hero-photo sprite sprite-1" aria-label="Rolo Faca Green Scarabelot">
            <span className="photo-badge">ROLO FACA GREEN</span>

            {techPoints.map((point, index) => (
              <button
                key={point.title}
                className={activePoint === index ? "hotspot active" : "hotspot"}
                style={{ left: point.x, top: point.y }}
                onClick={() => setActivePoint(index)}
                aria-label={point.title}
              >
                +
              </button>
            ))}

            <div className="tech-card">
              <span>VISÃO TÉCNICA INTERATIVA</span>
              <h3>{techPoints[activePoint].title}</h3>
              <p>{techPoints[activePoint].text}</p>
            </div>
          </div>

          <aside className="differentials">
            <h2>DIFERENCIAIS <b>SCARABELOT</b></h2>
            <div><ShieldCheck /><p><strong>Alta resistência</strong><span>Projetado para o trabalho real no campo.</span></p></div>
            <div><CircleGauge /><p><strong>Tecnologia de campo</strong><span>Mais produtividade e eficiência operacional.</span></p></div>
            <div><Wrench /><p><strong>Manutenção facilitada</strong><span>Construção pensada para reduzir paradas.</span></p></div>
          </aside>
        </div>
      </section>

      <section className="product-section" id="produtos">
        <div className="section-heading">
          <div>
            <span className="eyebrow blue">PORTFÓLIO</span>
            <h2>Linha de implementos <b>Scarabelot</b></h2>
          </div>
          <a href="#contato">Ver todos os produtos <ArrowRight size={17} /></a>
        </div>

        <div className="product-scroller">
          {products.map((product) => (
            <article className="product-card" key={product.name + product.model}>
              <div className={`product-photo sprite sprite-${product.sprite}`}>
                <span>{product.model}</span>
              </div>
              <div className="product-body">
                <small>{product.model}</small>
                <h3>{product.name}</h3>
                <p>{product.desc}</p>
                <a href="#contato">Ver detalhes <ArrowRight size={16} /></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="field-section" id="campo">
        <div className="field-image sprite sprite-1" />
        <div className="field-copy">
          <span className="eyebrow light">DESEMPENHO REAL NO CAMPO</span>
          <h2>IMPLEMENTOS QUE<br />ENTREGAM <b>RESULTADOS.</b></h2>
          <p>Soluções para preparo do solo, manejo, drenagem e transporte com a força de quem vive o agro.</p>
          <a className="btn btn-red" href="#produtos">Conhecer implementos <ArrowRight size={17} /></a>
        </div>
      </section>

      <section className="commercial-grid">
        <article className="commercial-card finance">
          <CircleGauge />
          <span>SEU PROJETO NO CAMPO</span>
          <h3>FINANCIAMENTO<br />FACILITADO</h3>
          <p>Espaço preparado para apresentar condições e levar o cliente direto ao time comercial.</p>
          <a href="#contato">Simular financiamento <ArrowRight size={16} /></a>
        </article>

        <article className="commercial-card delivery">
          <Truck />
          <span>DISPONIBILIDADE</span>
          <h3>ENTREGA IMEDIATA<br />OU A COMBINAR</h3>
          <p>Contato rápido para verificar estoque, prazo e condições de entrega.</p>
          <a href="#contato">Falar com consultor <ArrowRight size={16} /></a>
        </article>

        <article className="commercial-card support" id="pos-venda">
          <Headphones />
          <span>SEMPRE POR PERTO</span>
          <h3>SUPORTE EM<br />TODO O BRASIL</h3>
          <p>Pós-venda, peças e atendimento técnico organizados em um único canal.</p>
          <a href="#contato">Encontrar assistência <ArrowRight size={16} /></a>
        </article>
      </section>

      <section className="history" id="empresa">
        <div>
          <span className="eyebrow blue">NOSSA HISTÓRIA</span>
          <h2>TRADIÇÃO QUE IMPULSIONA O AGRO.</h2>
          <p>Uma apresentação institucional mais forte, com foco em engenharia, evolução e proximidade com o produtor rural.</p>
          <a className="text-link" href="#contato">Conheça a Scarabelot <ArrowRight size={16} /></a>
        </div>
        <div className="factory-card">
          <Factory size={44} />
          <span>INDÚSTRIA BRASILEIRA</span>
          <strong>ENGENHARIA PARA O CAMPO</strong>
        </div>
      </section>

      <footer id="contato">
        <img
          src="https://scarabelotimplementos.com/wp-content/uploads/2022/09/logo-scarabelot.png"
          alt="Scarabelot"
        />
        <div>
          <strong>Scarabelot Implementos</strong>
          <p>Site em reconstrução visual — próxima etapa: páginas individuais, formulário e WhatsApp.</p>
        </div>
        <a className="btn btn-red" href="https://scarabelotimplementos.com/contato/" target="_blank" rel="noreferrer">
          Falar com a Scarabelot <ArrowRight size={17} />
        </a>
      </footer>
    </main>
  );
}
