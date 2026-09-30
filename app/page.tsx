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
import { useMemo, useState } from "react";

type PartKey = "hidraulico" | "chassi" | "discos" | "rolamentos" | "engate";

const parts: Record<PartKey, { title: string; text: string }> = {
  hidraulico: {
    title: "Sistema hidráulico",
    text: "Conjunto pensado para resposta rápida, força e controle durante a operação.",
  },
  chassi: {
    title: "Chassi reforçado",
    text: "Estrutura de alta resistência para suportar trabalho pesado no campo.",
  },
  discos: {
    title: "Discos e componentes de solo",
    text: "Geometria e materiais voltados a corte, incorporação e maior durabilidade.",
  },
  rolamentos: {
    title: "Rolamentos e mancais",
    text: "Proteção dos conjuntos móveis para reduzir paradas e simplificar manutenção.",
  },
  engate: {
    title: "Pontos de engate",
    text: "Configuração pensada para facilitar acoplamento e compatibilidade operacional.",
  },
};

const products = [
  ["Transportador de Corrente", "TCLS 5060", "Transporte com praticidade e segurança."],
  ["Rolo Faca Green", "6000 e 9000", "Manejo de palhada com robustez."],
  ["Green Digger", "1200", "Solução para drenagem e áreas encharcadas."],
  ["Guincho", "GHS-2000", "Força e agilidade para trabalho pesado."],
  ["Lâminas Niveladoras", "LNR I, II e II-H", "Versatilidade para diferentes necessidades."],
  ["Limpadeira de Valo", "Hidráulica", "Mais rendimento na limpeza e manutenção."],
  ["Grade de Rolos", "Incorporadora TR", "Preparo de solo com eficiência."],
  ["Rolo Faca", "RFS Arrozeiro", "Desempenho no manejo do arroz."],
];

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selected, setSelected] = useState<PartKey>("chassi");
  const selectedPart = useMemo(() => parts[selected], [selected]);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Scarabelot">
          <span className="brand-mark"><i /><b /></span>
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
            <input aria-label="Buscar" placeholder="Buscar implementos, peças..." />
          </label>
          <a className="btn btn-red compact" href="#contato">
            Solicitar orçamento <ArrowRight size={18} />
          </a>
        </div>

        <button className="menu-button" onClick={() => setMobileOpen(v => !v)} aria-label="Abrir menu">
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-overlay" />
        <div className="hero-copy">
          <span className="eyebrow">DO SOLO BRASILEIRO PARA GRANDES RESULTADOS</span>
          <h1>ENGENHARIA QUE<br />TRANSFORMA<br /><strong>A TERRA.</strong></h1>
          <p>Robustez, tecnologia e desempenho no campo para quem faz o agro acontecer.</p>
          <div className="hero-actions">
            <a className="btn btn-red" href="#produtos"><Search size={19} /> Encontrar meu implemento <ArrowRight size={18} /></a>
            <button className="btn btn-dark"><CircleGauge size={19} /> Ver em 360°</button>
            <button className="btn btn-dark"><Play size={19} /> Assistir em campo</button>
          </div>
        </div>

        <div className="exploded" id="tecnologia">
          <div className="machine-frame">
            <div className="frame-main"><span>SCARABELOT</span></div>
            <div className="frame-arm arm-left" />
            <div className="frame-arm arm-right" />
            <div className="hydraulic-cylinder" />
            <div className="disc d1" /><div className="disc d2" /><div className="disc d3" />
            <div className="disc d4" /><div className="disc d5" /><div className="disc d6" />
            <div className="hub h1" /><div className="hub h2" /><div className="hub h3" />
            <div className="roller" />
          </div>

          <button className={selected === "engate" ? "hotspot hp-engate active" : "hotspot hp-engate"} onClick={() => setSelected("engate")} aria-label="Pontos de engate">+</button>
          <button className={selected === "hidraulico" ? "hotspot hp-hid active" : "hotspot hp-hid"} onClick={() => setSelected("hidraulico")} aria-label="Sistema hidráulico">+</button>
          <button className={selected === "chassi" ? "hotspot hp-chassi active" : "hotspot hp-chassi"} onClick={() => setSelected("chassi")} aria-label="Chassi">+</button>
          <button className={selected === "discos" ? "hotspot hp-discos active" : "hotspot hp-discos"} onClick={() => setSelected("discos")} aria-label="Discos">+</button>
          <button className={selected === "rolamentos" ? "hotspot hp-rol active" : "hotspot hp-rol"} onClick={() => setSelected("rolamentos")} aria-label="Rolamentos">+</button>

          <div className="part-card">
            <span>EXPLODED VIEW INTERATIVO</span>
            <h3>{selectedPart.title}</h3>
            <p>{selectedPart.text}</p>
          </div>
        </div>

        <aside className="differentials">
          <span className="mini-title">DIFERENCIAIS <b>SCARABELOT</b></span>
          <div><ShieldCheck /><p><strong>Alta resistência</strong><small>Estruturas projetadas para trabalho exigente.</small></p></div>
          <div><CircleGauge /><p><strong>Tecnologia de campo</strong><small>Foco em produtividade e operação eficiente.</small></p></div>
          <div><Wrench /><p><strong>Manutenção facilitada</strong><small>Projeto pensado para reduzir paradas.</small></p></div>
          <div><Factory /><p><strong>Engenharia aplicada</strong><small>Soluções para diferentes etapas do campo.</small></p></div>
        </aside>
      </section>

      <section className="product-section" id="produtos">
        <div className="section-heading">
          <div>
            <span className="eyebrow blue">PORTFÓLIO</span>
            <h2>Linha de implementos <b>Scarabelot</b></h2>
          </div>
          <a href="#contato">Ver todos os produtos <ArrowRight size={17} /></a>
        </div>

        <div className="product-grid">
          {products.map(([name, model, description], index) => (
            <article className="product-card" key={name + model}>
              <div className={"product-visual visual-" + ((index % 4) + 1)}>
                <div className="mini-machine"><span /><span /><span /><span /></div>
              </div>
              <div className="product-body">
                <small>{model}</small>
                <h3>{name}</h3>
                <p>{description}</p>
                <a href="#contato">Ver detalhes <ArrowRight size={16} /></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="commercial-grid">
        <article className="field-story">
          <span>DESEMPENHO REAL</span>
          <h2>IMPLEMENTOS QUE<br />ENTREGAM <b>RESULTADOS.</b></h2>
          <p>Soluções robustas para preparo do solo, manejo, drenagem e transporte.</p>
          <a className="btn btn-red" href="#produtos">Ver implementos em campo <ArrowRight size={18} /></a>
        </article>

        <article className="info-panel navy">
          <CircleGauge />
          <h3>FINANCIAMENTO<br />FACILITADO</h3>
          <p>Uma área pronta para apresentar condições comerciais e captar leads qualificados.</p>
          <a href="#contato">Simular financiamento <ArrowRight size={16} /></a>
        </article>

        <article className="info-panel red">
          <Truck />
          <h3>ENTREGA IMEDIATA<br />OU A COMBINAR</h3>
          <p>Destaque direto para disponibilidade e contato com o time comercial.</p>
          <a href="#contato">Falar com consultor <ArrowRight size={16} /></a>
        </article>

        <article className="info-panel deep">
          <Headphones />
          <h3>SUPORTE EM<br />TODO O BRASIL</h3>
          <p>Pós-venda, peças, atendimento e rede de assistência em um só lugar.</p>
          <a href="#pos-venda">Encontrar assistência <ArrowRight size={16} /></a>
        </article>
      </section>

      <section className="history" id="empresa">
        <div>
          <span className="eyebrow blue">NOSSA HISTÓRIA</span>
          <h2>TRADIÇÃO QUE IMPULSIONA O AGRO.</h2>
          <p>Um espaço institucional mais forte para contar a evolução da Scarabelot, sua engenharia e relação com o produtor.</p>
          <a className="text-link" href="#contato">Conheça a Scarabelot <ArrowRight size={16} /></a>
        </div>
        <div className="factory-card">
          <Factory size={46} />
          <span>INDÚSTRIA BRASILEIRA</span>
          <strong>ENGENHARIA PARA O CAMPO</strong>
        </div>
      </section>

      <footer id="contato">
        <div className="footer-brand">
          <span className="brand-mark"><i /><b /></span>
          <span className="brand-name">Scarabelot</span>
        </div>
        <div>
          <strong>Próxima etapa</strong>
          <p>Adicionar logo oficial, fotos originais, páginas de produto, WhatsApp e formulário comercial.</p>
        </div>
        <a className="btn btn-red" href="mailto:contato@scarabelotimplementos.com">Entrar em contato <ArrowRight size={18} /></a>
      </footer>
    </main>
  );
}
