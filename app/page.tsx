"use client";

import {
  Activity,
  BadgeDollarSign,
  Banknote,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Crown,
  Gavel,
  Globe2,
  Handshake,
  Home,
  Landmark,
  Menu,
  MessageSquareText,
  Search,
  Shield,
  Star,
  Trophy,
  TrendingUp,
  UserRound,
  Users,
  WalletCards,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { simulateWorld, type TransferRecord } from "./game-engine";

type Screen =
  | "inicio"
  | "jogadores"
  | "talentos"
  | "negociacoes"
  | "mercado"
  | "clubes"
  | "competicoes"
  | "financas"
  | "agencia"
  | "federacao"
  | "partida";

type CareerPreset = "zero" | "promessa" | "ex-jogador" | "herdeiro";

type Player = {
  name: string;
  age: number;
  pos: string;
  club: string;
  country: string;
  ger: number;
  pot: number;
  value: number;
  salary: number;
  relation: number;
  agent: boolean;
};

const initialPlayers: Player[] = [
  { name: "Endrick", age: 20, pos: "ATA", club: "Real Madrid", country: "BR", ger: 82, pot: 92, value: 60000000, salary: 150000, relation: 84, agent: true },
  { name: "Estêvão", age: 19, pos: "PD", club: "Chelsea", country: "BR", ger: 80, pot: 91, value: 52000000, salary: 105000, relation: 68, agent: false },
  { name: "Lamine Yamal", age: 19, pos: "PD", club: "Barcelona", country: "ES", ger: 91, pot: 96, value: 180000000, salary: 220000, relation: 34, agent: false },
  { name: "Vini Jr.", age: 26, pos: "PE", club: "Real Madrid", country: "BR", ger: 92, pot: 93, value: 180000000, salary: 410000, relation: 41, agent: false },
  { name: "Rodrygo", age: 25, pos: "ATA", club: "Real Madrid", country: "BR", ger: 87, pot: 89, value: 110000000, salary: 280000, relation: 54, agent: true },
  { name: "Jude Bellingham", age: 23, pos: "MC", club: "Real Madrid", country: "EN", ger: 91, pot: 94, value: 180000000, salary: 350000, relation: 28, agent: false },
  { name: "Florian Wirtz", age: 23, pos: "MEI", club: "Liverpool", country: "DE", ger: 89, pot: 93, value: 140000000, salary: 260000, relation: 21, agent: false },
  { name: "Pedri", age: 23, pos: "MC", club: "Barcelona", country: "ES", ger: 88, pot: 92, value: 120000000, salary: 240000, relation: 38, agent: false },
  { name: "João Pedro", age: 24, pos: "ATA", club: "Chelsea", country: "BR", ger: 84, pot: 88, value: 72000000, salary: 190000, relation: 62, agent: true },
  { name: "Kaio César", age: 22, pos: "PD", club: "Al Hilal", country: "BR", ger: 78, pot: 84, value: 25000000, salary: 120000, relation: 73, agent: true },
];

const clubs = [
  { name: "Real Madrid", country: "Espanha", rep: 99, budget: 420000000, squad: 92, interest: "Endrick" },
  { name: "Barcelona", country: "Espanha", rep: 96, budget: 175000000, squad: 89, interest: "Estêvão" },
  { name: "Liverpool", country: "Inglaterra", rep: 95, budget: 230000000, squad: 90, interest: "Rodrygo" },
  { name: "Chelsea", country: "Inglaterra", rep: 92, budget: 315000000, squad: 87, interest: "Lamine Yamal" },
  { name: "Palmeiras", country: "Brasil", rep: 88, budget: 78000000, squad: 82, interest: "Kaio César" },
  { name: "Flamengo", country: "Brasil", rep: 89, budget: 92000000, squad: 83, interest: "João Pedro" },
];

const initialTransfers: TransferRecord[] = [
  ["K. Mbappé", "Real Madrid", "Liverpool", 180000000],
  ["V. Osimhen", "Galatasaray", "Chelsea", 120000000],
  ["Bruno Guimarães", "Newcastle", "PSG", 95000000],
  ["Rafael Leão", "Milan", "Bayern", 90000000],
  ["Dani Olmo", "Barcelona", "Manchester City", 75000000],
];

const table = [
  ["Palmeiras", 18, 40],
  ["Flamengo", 18, 38],
  ["Botafogo", 18, 37],
  ["Fortaleza", 18, 34],
  ["São Paulo", 18, 32],
  ["Internacional", 18, 31],
  ["Cruzeiro", 18, 30],
  ["Bahia", 18, 29],
];

const rivalAgents = [
  { name: "Elite Sports", country: "PT", reputation: 94, clients: 38, style: "Agressivo" },
  { name: "Prime Football", country: "ES", reputation: 90, clients: 31, style: "Negociador" },
  { name: "Brazil Stars", country: "BR", reputation: 86, clients: 27, style: "Formador" },
  { name: "Global Eleven", country: "EN", reputation: 82, clients: 24, style: "Internacional" },
  { name: "Next Gen Agency", country: "DE", reputation: 78, clients: 19, style: "Talentos" },
];

const newsPool = [
  "Real Madrid monitora um dos seus clientes.",
  "Novo talento brasileiro entra no radar de clubes europeus.",
  "Janela de transferências esquenta após rodada movimentada.",
  "Patrocinador procura atletas com alto alcance internacional.",
  "Clube inglês prepara proposta por atacante sul-americano.",
  "Federação discute novas regras para registro de atletas.",
];

const formatMoney = (value: number) => {
  if (value >= 1_000_000_000) return `€ ${(value / 1_000_000_000).toFixed(1)} bi`;
  if (value >= 1_000_000) return `€ ${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)} mi`;
  return `€ ${value.toLocaleString("pt-BR")}`;
};

const navItems = [
  ["inicio", "Início", Home],
  ["jogadores", "Meus jogadores", Users],
  ["talentos", "Talentos", Star],
  ["negociacoes", "Negociações", Handshake],
  ["mercado", "Mercado", TrendingUp],
  ["clubes", "Clubes", Shield],
  ["competicoes", "Competições", Trophy],
  ["financas", "Finanças", BadgeDollarSign],
  ["agencia", "Agência", BriefcaseBusiness],
  ["federacao", "Federação", Landmark],
] as const;

const presets: Record<CareerPreset, { title: string; desc: string; money: number; rep: number; clients: number }> = {
  zero: { title: "Do zero", desc: "Sem nome, pouca grana e nenhum atalho.", money: 25000, rep: 5, clients: 1 },
  promessa: { title: "Agente promissor", desc: "Uma pequena carteira e contatos regionais.", money: 180000, rep: 18, clients: 3 },
  "ex-jogador": { title: "Ex-jogador", desc: "Reputação inicial e portas abertas em clubes.", money: 650000, rep: 32, clients: 4 },
  herdeiro: { title: "Herdeiro da agência", desc: "Capital, estrutura e pressão por resultados.", money: 2500000, rep: 48, clients: 5 },
};

export default function HomePage() {
  const [careerStarted, setCareerStarted] = useState(false);
  const [preset, setPreset] = useState<CareerPreset>("promessa");
  const [screen, setScreen] = useState<Screen>("inicio");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [week, setWeek] = useState(12);
  const [season, setSeason] = useState(2026);
  const [dayOfWeek, setDayOfWeek] = useState(1);
  const [money, setMoney] = useState(180000);
  const [reputation, setReputation] = useState(18);
  const [players, setPlayers] = useState(initialPlayers);
  const [transferHistory, setTransferHistory] = useState<TransferRecord[]>(initialTransfers);
  const [news, setNews] = useState(newsPool.slice(0, 4));
  const [advanceMode, setAdvanceMode] = useState<"dia" | "semana" | "mes">("semana");
  const [selectedPlayer, setSelectedPlayer] = useState<Player>(initialPlayers[0]);
  const [offerSalary, setOfferSalary] = useState(150000);
  const [offerYears, setOfferYears] = useState(5);
  const [offerCommission, setOfferCommission] = useState(10);
  const [negotiationStatus, setNegotiationStatus] = useState("");
  const [matchMinute, setMatchMinute] = useState(62);
  const [marketTab, setMarketTab] = useState<"transferencias" | "propostas" | "emprestimos" | "agentes">("transferencias");

  useEffect(() => {
    const raw = localStorage.getItem("agent-fc-save-v1");
    if (!raw) return;
    try {
      const saved = JSON.parse(raw);
      setCareerStarted(Boolean(saved.careerStarted));
      setPreset(saved.preset ?? "promessa");
      setWeek(saved.week ?? 12);
      setSeason(saved.season ?? 2026);
      setDayOfWeek(saved.dayOfWeek ?? 1);
      setMoney(saved.money ?? 180000);
      setReputation(saved.reputation ?? 18);
      setPlayers(saved.players ?? initialPlayers);
      setTransferHistory(saved.transferHistory ?? initialTransfers);
      setNews(saved.news ?? newsPool.slice(0, 4));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("agent-fc-save-v1", JSON.stringify({
      careerStarted, preset, week, season, dayOfWeek, money, reputation, players, transferHistory, news,
    }));
  }, [careerStarted, preset, week, season, dayOfWeek, money, reputation, players, transferHistory, news]);

  const myPlayers = useMemo(() => players.filter((p) => p.agent), [players]);
  const clientValue = myPlayers.reduce((sum, p) => sum + p.value, 0);

  function startCareer() {
    const start = presets[preset];
    setMoney(start.money);
    setReputation(start.rep);
    setPlayers((current) => current.map((p, i) => ({ ...p, agent: i < start.clients })));
    setCareerStarted(true);
  }

  function advanceTime() {
    const days = advanceMode === "dia" ? 1 : advanceMode === "semana" ? 7 : 28;
    const result = simulateWorld({
      days,
      dayOfWeek,
      week,
      season,
      money,
      reputation,
      players,
      transfers: transferHistory,
    });

    setDayOfWeek(result.dayOfWeek);
    setWeek(result.week);
    setSeason(result.season);
    setMoney(result.money);
    setReputation(result.reputation);
    setPlayers(result.players as Player[]);
    setTransferHistory(result.transfers);
    setNews((current) => [...result.news, ...current].slice(0, 8));
  }

  function resolveContractOffer() {
    const salaryRatio = offerSalary / Math.max(1, selectedPlayer.salary);
    const acceptanceScore =
      selectedPlayer.relation * 0.45 +
      Math.min(1.45, salaryRatio) * 34 +
      Math.min(offerYears, 5) * 2.2 -
      Math.max(0, offerCommission - 12) * 0.8;
    const chance = Math.min(94, Math.max(12, acceptanceScore));
    const accepted = Math.random() * 100 <= chance;

    if (accepted) {
      const updated = {
        ...selectedPlayer,
        salary: offerSalary,
        relation: Math.min(100, selectedPlayer.relation + 5),
      };
      setSelectedPlayer(updated);
      setPlayers((current) => current.map((p) => p.name === updated.name ? updated : p));
      setReputation((r) => Math.min(100, r + 1));
      setNegotiationStatus(`✅ ${selectedPlayer.name} aceitou: ${formatMoney(offerSalary)}/semana por ${offerYears} anos.`);
      setNews((current) => [`Contrato fechado com ${selectedPlayer.name}: ${offerYears} anos e ${formatMoney(offerSalary)}/semana.`, ...current].slice(0, 8));
    } else {
      const updatedRelation = Math.max(1, selectedPlayer.relation - 2);
      setSelectedPlayer((p) => ({ ...p, relation: updatedRelation }));
      setPlayers((current) => current.map((p) => p.name === selectedPlayer.name ? { ...p, relation: updatedRelation } : p));
      setNegotiationStatus(`❌ ${selectedPlayer.name} recusou. Chance estimada da proposta: ${Math.round(chance)}%.`);
      setNews((current) => [`Negociação com ${selectedPlayer.name} terminou sem acordo.`, ...current].slice(0, 8));
    }
  }

  function signPlayer(player: Player) {
    if (player.agent) return;

    const approachCost = Math.max(2_500, Math.round(player.value * 0.00008));
    if (money < approachCost) {
      setNews((current) => [`Você não tem caixa suficiente para abordar ${player.name}.`, ...current].slice(0, 8));
      return;
    }

    setMoney((m) => Math.max(0, m - approachCost));

    const difficulty = Math.max(0, (player.ger - 72) * 1.4);
    const chance = Math.min(
      92,
      Math.max(8, player.relation * 0.55 + reputation * 0.45 - difficulty),
    );

    if (Math.random() * 100 <= chance) {
      setPlayers((current) =>
        current.map((p) =>
          p.name === player.name
            ? { ...p, agent: true, relation: Math.max(p.relation, 68) }
            : p,
        ),
      );
      setReputation((r) => Math.min(100, r + (player.ger >= 85 ? 2 : 1)));
      setNews((current) => [
        `${player.name} aceitou sua proposta e agora é cliente da agência.`,
        ...current,
      ].slice(0, 8));
    } else {
      setPlayers((current) =>
        current.map((p) =>
          p.name === player.name
            ? { ...p, relation: Math.max(1, p.relation - 4) }
            : p,
        ),
      );
      const rival = rivalAgents[Math.floor(Math.random() * rivalAgents.length)];
      setNews((current) => [
        `${player.name} recusou sua abordagem. ${rival.name} também está monitorando o atleta.`,
        ...current,
      ].slice(0, 8));
    }
  }

  if (!careerStarted) {
    return (
      <main className="career-shell">
        <section className="career-card">
          <div className="brand-lockup">
            <span className="brand-ball">⚽</span>
            <div><b>FOOTBALL AGENT</b><small>CARREIRA • NEGÓCIOS • PODER</small></div>
          </div>
          <div className="career-intro">
            <span>NOVA CARREIRA</span>
            <h1>Escolha como sua história começa.</h1>
            <p>O começo muda seu caixa, reputação, carteira de atletas e dificuldade. Depois, o mundo segue vivo temporada após temporada.</p>
          </div>
          <div className="preset-grid">
            {(Object.keys(presets) as CareerPreset[]).map((key) => {
              const item = presets[key];
              return (
                <button key={key} className={preset === key ? "preset active" : "preset"} onClick={() => setPreset(key)}>
                  <span className="preset-radio">{preset === key ? "●" : "○"}</span>
                  <strong>{item.title}</strong>
                  <small>{item.desc}</small>
                  <div><b>{formatMoney(item.money)}</b><span>REP {item.rep}</span><span>{item.clients} cliente(s)</span></div>
                </button>
              );
            })}
          </div>
          <div className="career-settings">
            <div><Globe2 /><span><b>Mundo</b><small>Brasil + principais ligas internacionais</small></span></div>
            <div><Clock3 /><span><b>Ritmo livre</b><small>Avance por dia, semana ou mês</small></span></div>
            <div><Activity /><span><b>Simulação ativa</b><small>Mercado, clubes, atletas e finanças evoluem</small></span></div>
          </div>
          <button className="primary giant" onClick={startCareer}>COMEÇAR CARREIRA <ChevronRight /></button>
        </section>
      </main>
    );
  }

  const screenTitle = navItems.find(([key]) => key === screen)?.[1] ?? "Football Agent";

  return (
    <main className="game-shell">
      <header className="topbar">
        <button className="mobile-trigger" onClick={() => setMobileMenu(true)}><Menu /></button>
        <div className="game-brand"><span>⚽</span><b>FOOTBALL AGENT</b></div>
        <div className="top-stat money"><Banknote /><span><small>Saldo</small><b>{formatMoney(money)}</b></span></div>
        <div className="top-stat"><Star /><span><small>Reputação</small><b>{reputation}/100</b></span></div>
        <div className="top-stat"><CalendarDays /><span><small>Temporada</small><b>Semana {week} • {["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"][dayOfWeek - 1]} • {season}</b></span></div>
        <button className="message-button"><MessageSquareText /><span>3</span></button>
      </header>

      <div className="game-layout">
        <aside className={mobileMenu ? "sidebar open" : "sidebar"}>
          <div className="sidebar-head">
            <div className="agent-avatar"><UserRound /></div>
            <div><b>Seu Nome</b><small>Agente • Nível {Math.max(1, Math.floor(reputation / 5))}</small></div>
            <button onClick={() => setMobileMenu(false)}><X /></button>
          </div>

          <nav>
            {navItems.map(([key, label, Icon]) => (
              <button key={key} className={screen === key ? "active" : ""} onClick={() => { setScreen(key as Screen); setMobileMenu(false); }}>
                <Icon /><span>{label}</span>
                {key === "jogadores" && <em>{myPlayers.length}</em>}
                {key === "negociacoes" && <em>3</em>}
                <ChevronRight className="chev" />
              </button>
            ))}
          </nav>

          <div className="sidebar-career">
            <span>CARREIRA</span>
            <div><small>Prestígio global</small><b>{reputation}%</b></div>
            <progress value={reputation} max={100} />
            <small>Objetivo: assumir um clube e conquistar influência suficiente para disputar o controle de uma federação.</small>
          </div>
        </aside>

        <section className="content">
          <div className="content-head">
            <div><small>CARREIRA / {screenTitle.toUpperCase()}</small><h1>{screenTitle}</h1></div>
            <label className="search"><Search /><input placeholder="Buscar jogador, clube, país..." /></label>
          </div>

          {screen === "inicio" && (
            <>
              <section className="dashboard-grid">
                <article className="profile-card panel">
                  <div className="panel-title"><span><UserRound /> MEU AGENTE</span><em>ONLINE</em></div>
                  <div className="profile-main">
                    <div className="agent-avatar big"><UserRound /></div>
                    <div><h2>Seu Nome</h2><p>Agente de futebol • Brasil</p><div className="level-row"><b>Nível {Math.max(1, Math.floor(reputation / 5))}</b><progress value={reputation} max={100} /><span>{reputation}/100 REP</span></div></div>
                  </div>
                  <div className="kpi-row">
                    <div><small>CLIENTES</small><b>{myPlayers.length}</b></div>
                    <div><small>VALOR DA CARTEIRA</small><b>{formatMoney(clientValue)}</b></div>
                    <div><small>RELAÇÕES</small><b>78</b></div>
                  </div>
                </article>

                <article className="advance-card panel">
                  <div><CalendarDays /><span><small>SEMANA ATUAL</small><b>Semana {week}</b><em>{["Segunda","Terça","Quarta","Quinta","Sexta","Sábado","Domingo"][dayOfWeek - 1]} • Temporada {season}</em></span></div>
                  <select value={advanceMode} onChange={(e) => setAdvanceMode(e.target.value as typeof advanceMode)}>
                    <option value="dia">Avançar 1 dia</option>
                    <option value="semana">Avançar 1 semana</option>
                    <option value="mes">Avançar 1 mês</option>
                  </select>
                  <button className="primary advance" onClick={advanceTime}>AVANÇAR TEMPO <ChevronRight /></button>
                  <small>O mercado, contratos, partidas e finanças serão simulados.</small>
                </article>
              </section>

              <section className="home-columns">
                <article className="panel news-panel">
                  <div className="panel-title"><span><Zap /> NOTÍCIAS</span><button>Ver todas</button></div>
                  {news.map((item, index) => (
                    <button className="news-item" key={index}>
                      <span className="news-icon">{index === 0 ? "🔥" : index === 1 ? "⚽" : "📰"}</span>
                      <div><b>{item}</b><small>{index === 0 ? "Agora" : `${index + 1}h atrás`}</small></div>
                      <ChevronRight />
                    </button>
                  ))}
                </article>

                <article className="panel table-panel">
                  <div className="panel-title"><span><Trophy /> BRASILEIRÃO SÉRIE A</span><em>RODADA 18</em></div>
                  <div className="league-table">
                    <div className="tr header"><span>#</span><span>Clube</span><span>J</span><span>PTS</span></div>
                    {table.slice(0, 6).map(([club, games, pts], i) => (
                      <div className="tr" key={club}><span>{i + 1}</span><span><i className="crest">{String(club).slice(0, 1)}</i>{club}</span><span>{games}</span><b>{pts}</b></div>
                    ))}
                  </div>
                  <button className="secondary full" onClick={() => setScreen("competicoes")}>Ver competição completa</button>
                </article>
              </section>

              <section className="quick-grid">
                {[
                  ["jogadores", Users, "Meus jogadores", `${myPlayers.length} atletas representados`],
                  ["talentos", Star, "Talentos", "Descubra a próxima estrela"],
                  ["negociacoes", Handshake, "Negociações", "3 conversas em andamento"],
                  ["mercado", TrendingUp, "Mercado", "Transferências e oportunidades"],
                  ["agencia", Building2, "Minha agência", "Equipe, escritório e rede"],
                  ["financas", WalletCards, "Finanças", "Receitas, despesas e patrimônio"],
                ].map(([key, Icon, title, desc]) => (
                  <button className="quick-card" key={String(key)} onClick={() => setScreen(key as Screen)}>
                    <span><Icon /></span><div><b>{String(title)}</b><small>{String(desc)}</small></div><ChevronRight />
                  </button>
                ))}
              </section>
            </>
          )}

          {screen === "jogadores" && (
            <section className="panel data-screen">
              <div className="tabs"><button className="active">Todos ({myPlayers.length})</button><button>Principal</button><button>Em negociação</button><button>Emprestados</button></div>
              <div className="player-list head"><span>Jogador</span><span>Idade</span><span>Pos.</span><span>GER</span><span>POT</span><span>Valor</span><span>Relação</span></div>
              {myPlayers.map((p) => (
                <button className="player-list" key={p.name} onClick={() => { setSelectedPlayer(p); setScreen("negociacoes"); }}>
                  <span className="player-name"><i>{p.country}</i><span><b>{p.name}</b><small>{p.club}</small></span></span>
                  <span>{p.age}</span><span>{p.pos}</span><strong className="rating">{p.ger}</strong><strong className="rating pot">{p.pot}</strong><b>{formatMoney(p.value)}</b><span>{p.relation}%</span>
                </button>
              ))}
            </section>
          )}

          {screen === "talentos" && (
            <section className="panel data-screen">
              <div className="filterbar"><button className="active">Todos</button><button>Observados</button><button>Recomendados</button><select><option>Todos os países</option><option>Brasil</option><option>Inglaterra</option><option>Espanha</option></select><select><option>16 - 21 anos</option><option>22 - 25 anos</option></select></div>
              <div className="player-list head"><span>Jogador</span><span>Idade</span><span>Pos.</span><span>GER</span><span>POT</span><span>Valor</span><span>Ação</span></div>
              {players.filter((p) => p.age <= 23).map((p) => (
                <div className="player-list" key={p.name}>
                  <span className="player-name"><i>{p.country}</i><span><b>{p.name}</b><small>{p.club}</small></span></span>
                  <span>{p.age}</span><span>{p.pos}</span><strong className="rating">{p.ger}</strong><strong className="rating pot">{p.pot}</strong><b>{formatMoney(p.value)}</b>
                  <button className={p.agent ? "mini disabled" : "mini"} onClick={() => signPlayer(p)}>{p.agent ? "Cliente" : "Abordar"}</button>
                </div>
              ))}
            </section>
          )}

          {screen === "negociacoes" && (
            <section className="negotiation-layout">
              <article className="panel player-profile">
                <div className="player-hero"><div className="photo-placeholder"><UserRound /></div><div><span>{selectedPlayer.country} • {selectedPlayer.pos}</span><h2>{selectedPlayer.name}</h2><p>{selectedPlayer.club}</p></div><strong className="rating xl">{selectedPlayer.ger}<small>GER</small></strong></div>
                <div className="profile-stats"><div><small>Idade</small><b>{selectedPlayer.age}</b></div><div><small>Valor</small><b>{formatMoney(selectedPlayer.value)}</b></div><div><small>Potencial</small><b>{selectedPlayer.pot}</b></div><div><small>Relação</small><b>{selectedPlayer.relation}%</b></div></div>
                <div className="relationship"><span>Relação com o atleta</span><b>{selectedPlayer.relation}%</b><progress value={selectedPlayer.relation} max={100} /></div>
              </article>

              <article className="panel contract-card">
                <div className="panel-title"><span><Handshake /> NEGOCIAÇÃO DE CONTRATO</span><em>CLUBE INTERESSADO</em></div>
                <h3>Monte a proposta</h3>
                <div className="offer-row"><span>Salário semanal</span><button onClick={() => setOfferSalary(Math.max(10000, offerSalary - 10000))}>−</button><b>{formatMoney(offerSalary)}</b><button onClick={() => setOfferSalary(offerSalary + 10000)}>+</button></div>
                <div className="offer-row"><span>Duração</span><button onClick={() => setOfferYears(Math.max(1, offerYears - 1))}>−</button><b>{offerYears} anos</b><button onClick={() => setOfferYears(Math.min(8, offerYears + 1))}>+</button></div>
                <div className="offer-row"><span>Comissão do agente</span><button onClick={() => setOfferCommission(Math.max(1, offerCommission - 1))}>−</button><b>{offerCommission}%</b><button onClick={() => setOfferCommission(Math.min(20, offerCommission + 1))}>+</button></div>
                <div className="clauses"><span>Cláusulas</span><button>+ Bônus por títulos</button><button>+ Bônus por jogos</button><button>+ Cláusula de rescisão</button></div>
                <button className="primary giant" onClick={resolveContractOffer}>ENVIAR PROPOSTA</button>{negotiationStatus && <small>{negotiationStatus}</small>}
              </article>
            </section>
          )}

          {screen === "mercado" && (
            <section className="panel data-screen">
              <div className="tabs">
                <button className={marketTab === "transferencias" ? "active" : ""} onClick={() => setMarketTab("transferencias")}>Transferências</button>
                <button className={marketTab === "propostas" ? "active" : ""} onClick={() => setMarketTab("propostas")}>Propostas</button>
                <button className={marketTab === "emprestimos" ? "active" : ""} onClick={() => setMarketTab("emprestimos")}>Empréstimos</button>
                <button className={marketTab === "agentes" ? "active" : ""} onClick={() => setMarketTab("agentes")}>Agentes rivais</button>
              </div>

              {marketTab === "agentes" ? (
                <>
                  <div className="player-list head"><span>Agência rival</span><span>País</span><span>REP</span><span>Clientes</span><span>Estilo</span><span></span><span></span></div>
                  {rivalAgents.map((agent) => (
                    <div className="player-list" key={agent.name}>
                      <span className="player-name"><i>{agent.country}</i><span><b>{agent.name}</b><small>Concorrente global</small></span></span>
                      <span>{agent.country}</span>
                      <strong className="rating">{agent.reputation}</strong>
                      <span>{agent.clients}</span>
                      <b>{agent.style}</b>
                      <span>{agent.reputation > reputation ? "Ameaça alta" : "Alcançável"}</span>
                      <span></span>
                    </div>
                  ))}
                </>
              ) : marketTab === "transferencias" ? (
                <>
                  <div className="market-head"><span>Jogador</span><span>De</span><span></span><span>Para</span><span>Valor</span></div>
                  {transferHistory.map(([player, from, to, value]) => (
                    <div className="market-row" key={String(player) + String(value)}><b>{player}</b><span>{from}</span><ChevronRight /><span>{to}</span><strong>{formatMoney(Number(value))}</strong></div>
                  ))}
                </>
              ) : (
                <div className="empty-state">
                  <Search />
                  <h3>{marketTab === "propostas" ? "Nenhuma proposta pendente" : "Nenhum empréstimo em negociação"}</h3>
                  <p>Novas oportunidades aparecem conforme o mundo avança e os clubes tomam decisões.</p>
                </div>
              )}
            </section>
          )}

          {screen === "clubes" && (
            <section className="club-grid">
              {clubs.map((club) => (
                <article className="club-card panel" key={club.name}>
                  <div className="club-top"><i className="club-logo">{club.name.slice(0, 2).toUpperCase()}</i><div><h3>{club.name}</h3><p>{club.country}</p></div><span>REP {club.rep}</span></div>
                  <div className="club-metrics"><div><small>Elenco</small><b>{club.squad}</b></div><div><small>Orçamento</small><b>{formatMoney(club.budget)}</b></div></div>
                  <div className="club-interest"><Search /><span><small>Monitorando</small><b>{club.interest}</b></span></div>
                  <button className="secondary full">Abrir clube</button>
                </article>
              ))}
            </section>
          )}

          {screen === "competicoes" && (
            <section className="panel data-screen">
              <div className="competition-header"><span className="cup">🏆</span><div><small>BRASIL</small><h2>Brasileirão Série A</h2><p>Temporada {season}</p></div><button className="secondary">Resultados</button></div>
              <div className="league-table large">
                <div className="tr header"><span>#</span><span>Clube</span><span>J</span><span>V</span><span>E</span><span>D</span><span>PTS</span></div>
                {table.map(([club, games, pts], i) => (
                  <div className="tr" key={club}><span>{i + 1}</span><span><i className="crest">{String(club).slice(0, 1)}</i>{club}</span><span>{games}</span><span>{12 - Math.floor(i / 2)}</span><span>{4 + (i % 2)}</span><span>{2 + Math.floor(i / 3)}</span><b>{pts}</b></div>
                ))}
              </div>
            </section>
          )}

          {screen === "financas" && (
            <section className="finance-grid">
              <article className="balance-card panel"><small>SALDO ATUAL</small><h2>{formatMoney(money)}</h2><div><span><small>Receita semanal</small><b>+ {formatMoney(myPlayers.reduce((sum,p)=>sum+Math.round(p.salary*.02),0))}</b></span><span><small>Despesa semanal</small><b className="loss">- {formatMoney(18500 + reputation*330)}</b></span></div></article>
              <article className="panel transactions"><div className="panel-title"><span><CircleDollarSign /> ÚLTIMAS MOVIMENTAÇÕES</span></div>{myPlayers.slice(0,4).map((p,i)=><div key={p.name}><span>Comissão • {p.name}</span><b>+ {formatMoney(Math.round(p.salary*.02))}</b></div>)}<div><span>Funcionários da agência</span><b className="loss">- {formatMoney(14500)}</b></div><div><span>Escritório e operações</span><b className="loss">- {formatMoney(8500)}</b></div></article>
            </section>
          )}

          {screen === "agencia" && (
            <section className="agency-grid">
              <article className="panel agency-level"><div className="agency-icon"><Building2 /></div><div><small>MINHA AGÊNCIA</small><h2>Nível {Math.max(1, Math.floor(reputation/5))}</h2><p>Expanda sua estrutura, contrate especialistas e aumente seu alcance global.</p><progress value={reputation} max={100} /></div></article>
              {[
                ["Funcionários", Users, "8/12", "Agentes, assistentes e gestores"],
                ["Olheiros", Search, "Nível 4", "Rede global de observação"],
                ["Advogados", Gavel, "Nível 3", "Contratos e negociações complexas"],
                ["Marketing", BarChart3, "Nível 2", "Imagem, marcas e patrocinadores"],
                ["Escritório", Building2, "Nível 4", "Estrutura e capacidade operacional"],
                ["Rede de contatos", Globe2, "78", "Clubes, marcas e dirigentes"],
              ].map(([title, Icon, level, desc]) => <button className="agency-module panel" key={String(title)}><Icon /><span><b>{String(title)}</b><small>{String(desc)}</small></span><strong>{String(level)}</strong><ChevronRight /></button>)}
              <article className="panel power-path"><div className="panel-title"><span><Crown /> CAMINHO DO PODER</span></div><div className="power-steps"><div className="done"><i>1</i><span><b>Agente</b><small>Construa sua carteira</small></span></div><div className={reputation >= 45 ? "done" : ""}><i>2</i><span><b>Investidor</b><small>Compre participações</small></span></div><div className={reputation >= 70 ? "done" : ""}><i>3</i><span><b>Presidente de clube</b><small>Assuma uma instituição</small></span></div><div className={reputation >= 90 ? "done" : ""}><i>4</i><span><b>Controle da federação</b><small>Influencie o futebol nacional</small></span></div></div></article>
            </section>
          )}

          {screen === "federacao" && (
            <section className="federation panel">
              <div className="federation-hero"><Landmark /><div><span>CARREIRA AVANÇADA</span><h2>Controle da Federação</h2><p>Construa apoio político no futebol, conquiste clubes aliados e chegue ao comando da federação.</p></div></div>
              <div className="influence"><div><span><small>Reputação necessária</small><b>90</b></span><progress value={reputation} max={90} /><strong>{reputation >= 90 ? "Elegível" : `Faltam ${90-reputation} pontos`}</strong></div><div><span><small>Apoio de clubes</small><b>2 / 20</b></span><progress value={2} max={20} /><strong>10%</strong></div><div><span><small>Influência regional</small><b>18%</b></span><progress value={18} max={100} /><strong>Em crescimento</strong></div></div>
              <div className="federation-actions"><button><Gavel /><span><b>Regulamentos</b><small>Defina regras e calendários</small></span></button><button><Banknote /><span><b>Distribuição financeira</b><small>Prêmios e receitas</small></span></button><button><Trophy /><span><b>Competições</b><small>Formato e expansão</small></span></button><button><Globe2 /><span><b>Relações internacionais</b><small>Acordos e torneios</small></span></button></div>
            </section>
          )}

          {screen === "partida" && (
            <section className="match-layout">
              <article className="panel match-panel">
                <div className="scoreboard"><span>Palmeiras</span><b>2 <em>•</em> 1</b><span>Flamengo</span><small>2º TEMPO • {matchMinute}'</small></div>
                <div className="pitch">
                  {Array.from({length: 11}).map((_,i)=><i key={`g${i}`} className="dot green" style={{left:`${16 + (i%4)*17}%`, top:`${12 + Math.floor(i/4)*30 + (i%2)*8}%`}} />)}
                  {Array.from({length: 11}).map((_,i)=><i key={`r${i}`} className="dot red" style={{right:`${16 + (i%4)*17}%`, top:`${16 + Math.floor(i/4)*28 + ((i+1)%2)*8}%`}} />)}
                  <span className="ball">⚽</span>
                </div>
                <div className="match-controls"><button onClick={() => setMatchMinute((m)=>Math.min(90,m+1))}>Simular +1 min</button><button onClick={() => setMatchMinute((m)=>Math.min(90,m+5))}>+5 min</button><button className="primary" onClick={() => setMatchMinute(90)}>Até o fim</button></div>
              </article>
              <article className="panel events"><div className="panel-title"><span><Activity /> EVENTOS</span></div><div><b>12'</b><span>⚽ Gol • Palmeiras</span></div><div><b>34'</b><span>⚽ Gol • Flamengo</span></div><div><b>67'</b><span>🟨 Cartão amarelo</span></div><div><b>78'</b><span>⚽ Gol • Palmeiras</span></div></article>
            </section>
          )}

          {screen !== "partida" && (
            <button className="floating-match" onClick={() => setScreen("partida")}><span>AO VIVO</span><b>PAL 2 × 1 FLA</b><small>78' • Abrir partida 2D</small></button>
          )}
        </section>
      </div>
    </main>
  );
}
