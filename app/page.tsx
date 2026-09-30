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
  { name: "Transportador de Corrente", model: "TCLS 5060", text: "Praticidade, segurança e economia no transporte." },
  { name: "Rolo Faca Green", model: "6000 e 9000", text: "Potência, robustez e resultado no campo." },
  { name: "Green Digger", model: "1200", text: "Transforme áreas encharcadas em terra produtiva." },
  { name: "Guincho", model: "GHS-2000", text: "Força, segurança e agilidade para trabalho pesado." },
  { name: "Lâminas Niveladoras", model: "LNR I, II e II-H", text: "Três modelos para diferentes necessidades." },
  { name: "Limpadeira de Valo", model: "Hidráulica", text: "Mais agilidade na limpeza e manutenção de valos." },
  { name: "Grade de Rolos", model: "Incorporadora TR", text: "Eficiência e versatilidade no preparo do solo." },
  { name: "Rolo Faca", model: "RFS Arrozeiro", text: "Robusto, eficiente e de baixa manutenção." },
];

const tech = [
  ["Chassi e estrutura", "Construção pensada para operações exigentes no campo."],
  ["Sistema hidráulico", "Comandos e cilindros integrados à rotina de trabalho."],
  ["Componentes de solo", "Discos, facas e conjuntos voltados ao desempenho."],
  ["Manutenção", "Acesso visual aos principais conjuntos e pontos de serviço."],
];

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTech, setActiveTech] = useState(0);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Scarabelot">
          <span className="brand-symbol" aria-hidden="true">
            <span className="blue-piece" />
            <span className="red-piece" />
          </span>
          <span className="brand-name">Scarabelot</span>
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
            <input aria-label="Buscar implementos" placeholder="Buscar implementos, peças..." />
          </label>
          <a className="btn btn-red compact" href="#contato">Solicitar orçamento <ArrowRight size={17} /></a>
        </div>

        <button className="menu-button" onClick={() => setMobileOpen(v => !v)} aria-label="Abrir menu">
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <span className="eyebrow">DO SOLO BRASILEIRO PARA GRANDES RESULTADOS</span>
          <h1>ENGENHARIA QUE<br />TRANSFORMA<br /><strong>A TERRA.</strong></h1>
          <p>Robustez, tecnologia e desempenho no campo para quem faz o agro acontecer.</p>
          <div className="hero-actions">
            <a className="btn btn-red" href="#produtos"><Search size={18} /> Encontrar meu implemento <ArrowRight size={18} /></a>
            <a className="btn btn-outline" href="#tecnologia"><CircleGauge size={18} /> Ver tecnologia</a>
            <button className="btn btn-outline"><Play size={18} /> Assistir em campo</button>
          </div>
          <div className="hero-metrics">
            <div><strong>Desde 1991</strong><span>experiência no agro</span></div>
            <div><strong>Brasil</strong><span>engenharia para o campo</span></div>
            <div><strong>Pós-venda</strong><span>suporte especializado</span></div>
          </div>
        </div>

        <div className="hero-product" aria-label="Implementos Scarabelot">
          <div className="hero-product-image sprite sprite-2" />
          <div className="hero-product-shade" />
          <div className="hero-product-copy">
            <span>DESTAQUE SCARABELOT</span>
            <h2>Rolo Faca Green</h2>
            <p>Visual real do produto, sem ilustração genérica.</p>
          </div>
          <div className="hero-tag tag-one">ROBUSTEZ</div>
          <div className="hero-tag tag-two">CAMPO</div>
        </div>

        <aside className="hero-side">
          <span>DIFERENCIAIS <b>SCARABELOT</b></span>
          <div><ShieldCheck /><p><strong>Alta resistência</strong><small>Projetado para operações exigentes.</small></p></div>
          <div><CircleGauge /><p><strong>Tecnologia de campo</strong><small>Mais produtividade e eficiência.</small></p></div>
          <div><Wrench /><p><strong>Manutenção facilitada</strong><small>Mais praticidade no dia a dia.</small></p></div>
        </aside>
      </section>

      <section className="technology" id="tecnologia">
        <div className="tech-copy">
          <span className="eyebrow blue">TECNOLOGIA POR DENTRO</span>
          <h2>Veja o implemento em <b>detalhes.</b></h2>
          <p>Em vez de desenhar uma máquina falsa em CSS, esta área usa a imagem do produto e prepara a experiência para o exploded view 3D real.</p>

          <div className="tech-list">
            {tech.map(([title, text], index) => (
              <button key={title} onClick={() => setActiveTech(index)} className={activeTech === index ? "tech-item active" : "tech-item"}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><strong>{title}</strong><small>{text}</small></div>
                <ArrowRight size={18} />
              </button>
            ))}
          </div>
        </div>

        <div className="tech-visual">
          <div className="tech-machine sprite sprite-2" />
          <button className="tech-hotspot hs-1" onClick={() => setActiveTech(0)}>+</button>
          <button className="tech-hotspot hs-2" onClick={() => setActiveTech(1)}>+</button>
          <button className="tech-hotspot hs-3" onClick={() => setActiveTech(2)}>+</button>
          <button className="tech-hotspot hs-4" onClick={() => setActiveTech(3)}>+</button>
          <div className="tech-caption">
            <span>{String(activeTech + 1).padStart(2, "0")} / 04</span>
            <strong>{tech[activeTech][0]}</strong>
            <p>{tech[activeTech][1]}</p>
          </div>
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

        <div className="product-scroll">
          {products.map((product, index) => (
            <article className="product-card" key={product.name + product.model}>
              <div className={"product-photo sprite sprite-" + (index + 1)}>
                <span className="photo-label">{product.model}</span>
              </div>
              <div className="product-body">
                <small>{product.model}</small>
                <h3>{product.name}</h3>
                <p>{product.text}</p>
                <a href="#contato">Ver detalhes <ArrowRight size={16} /></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="results">
        <div className="results-photo sprite sprite-7">
          <div className="results-overlay">
            <span>DESEMPENHO REAL NO CAMPO</span>
            <h2>IMPLEMENTOS QUE<br />ENTREGAM <b>RESULTADOS.</b></h2>
            <p>Soluções para preparo do solo, manejo, drenagem e transporte.</p>
            <a className="btn btn-red" href="#produtos">Ver linha de implementos <ArrowRight size={17} /></a>
          </div>
        </div>

        <div className="commercial-cards">
          <article className="commercial-card blue-card">
            <CircleGauge />
            <span>SEU PROJETO NO CAMPO</span>
            <h3>Financiamento<br />facilitado</h3>
            <p>Espaço direto para apresentar condições comerciais e gerar oportunidades.</p>
            <a href="#contato">Simular financiamento <ArrowRight size={16} /></a>
          </article>

          <article className="commercial-card red-card">
            <Truck />
            <span>DISPONIBILIDADE</span>
            <h3>Entrega imediata<br />ou a combinar</h3>
            <p>Conexão rápida com o time comercial para disponibilidade e condições.</p>
            <a href="#contato">Falar com consultor <ArrowRight size={16} /></a>
          </article>

          <article className="commercial-card navy-card" id="pos-venda">
            <Headphones />
            <span>SEMPRE POR PERTO</span>
            <h3>Suporte em<br />todo o Brasil</h3>
            <p>Pós-venda, peças e assistência apresentados de forma simples.</p>
            <a href="#contato">Encontrar assistência <ArrowRight size={16} /></a>
          </article>
        </div>
      </section>

      <section className="history" id="empresa">
        <div className="history-copy">
          <span className="eyebrow blue">NOSSA HISTÓRIA</span>
          <h2>TRADIÇÃO QUE<br />IMPULSIONA O AGRO.</h2>
          <p>A apresentação institucional ganha espaço próprio, com mais respiro e menos aparência de template.</p>
          <a className="text-link" href="#contato">Conheça a Scarabelot <ArrowRight size={16} /></a>
        </div>
        <div className="history-panel">
          <Factory size={46} />
          <strong>DESDE 1991</strong>
          <span>INDÚSTRIA BRASILEIRA</span>
          <p>Engenharia, fabricação e soluções desenvolvidas para a rotina do produtor.</p>
        </div>
      </section>

      <footer id="contato">
        <a className="brand footer-brand" href="#inicio">
          <span className="brand-symbol"><span className="blue-piece" /><span className="red-piece" /></span>
          <span className="brand-name">Scarabelot</span>
        </a>
        <p>Projeto de modernização digital • Scarabelot Implementos</p>
        <a className="btn btn-red compact" href="mailto:scarabelot@scarabelotimplementos.com.br">Entrar em contato <ArrowRight size={17} /></a>
      </footer>
    </main>
  );
}
