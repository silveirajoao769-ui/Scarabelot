"use client";

export type EnginePlayer = {
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

export type TransferRecord = [string, string, string, number];

type SimulationInput = {
  days: number;
  dayOfWeek: number;
  week: number;
  season: number;
  money: number;
  reputation: number;
  players: EnginePlayer[];
  transfers: TransferRecord[];
};

export type SimulationResult = {
  dayOfWeek: number;
  week: number;
  season: number;
  money: number;
  reputation: number;
  players: EnginePlayer[];
  transfers: TransferRecord[];
  news: string[];
  weeksProcessed: number;
  commissionEarned: number;
  operatingCost: number;
};

const destinationClubs = [
  "Real Madrid",
  "Barcelona",
  "Liverpool",
  "Chelsea",
  "Manchester City",
  "Arsenal",
  "Bayern",
  "PSG",
  "Inter de Milão",
  "Milan",
  "Palmeiras",
  "Flamengo",
  "Botafogo",
  "Al Hilal",
];

const youthFirstNames = [
  "Gabriel",
  "Matheus",
  "João",
  "Lucas",
  "Rafael",
  "Pedro",
  "Kauã",
  "Thiago",
  "Vinícius",
  "Caio",
];

const youthLastNames = [
  "Silva",
  "Souza",
  "Oliveira",
  "Santos",
  "Costa",
  "Almeida",
  "Rocha",
  "Ferreira",
  "Moraes",
  "Nunes",
];

const positions = ["ATA", "PD", "PE", "MEI", "MC", "VOL", "ZAG", "LE", "LD", "GOL"];

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

function estimateValue(player: EnginePlayer) {
  const ageFactor =
    player.age <= 21 ? 1.2 :
    player.age <= 25 ? 1.08 :
    player.age <= 29 ? 1 :
    player.age <= 32 ? 0.82 : 0.58;

  const quality = Math.pow(Math.max(45, player.ger) / 80, 4);
  const potentialBonus = 1 + Math.max(0, player.pot - player.ger) * 0.035;
  return Math.max(
    150_000,
    Math.round(12_000_000 * quality * ageFactor * potentialBonus / 50_000) * 50_000,
  );
}

function evolvePlayer(player: EnginePlayer): EnginePlayer {
  let ger = player.ger;
  let pot = player.pot;

  if (player.age <= 23 && ger < pot && Math.random() < 0.22) ger += 1;
  if (player.age >= 31 && Math.random() < 0.14) ger -= 1;
  if (player.age >= 33 && pot > ger && Math.random() < 0.18) pot -= 1;

  const relationDelta = Math.random() < 0.48 ? -1 : Math.random() < 0.7 ? 1 : 0;
  const evolved = {
    ...player,
    ger: clamp(ger, 45, 99),
    pot: clamp(Math.max(ger, pot), 45, 99),
    relation: clamp(player.relation + relationDelta, 1, 100),
  };

  return { ...evolved, value: estimateValue(evolved) };
}

function createYouth(season: number, week: number, index: number): EnginePlayer {
  const first = youthFirstNames[Math.floor(Math.random() * youthFirstNames.length)];
  const last = youthLastNames[Math.floor(Math.random() * youthLastNames.length)];
  const age = 16 + Math.floor(Math.random() * 3);
  const ger = 60 + Math.floor(Math.random() * 13);
  const pot = Math.min(95, ger + 12 + Math.floor(Math.random() * 14));
  const club = ["Palmeiras", "Flamengo", "Botafogo", "São Paulo", "Santos"][
    Math.floor(Math.random() * 5)
  ];

  const player: EnginePlayer = {
    name: `${first} ${last} ${String(season).slice(-2)}${week}${index}`,
    age,
    pos: positions[Math.floor(Math.random() * positions.length)],
    club,
    country: "BR",
    ger,
    pot,
    value: 1_000_000,
    salary: 5_000 + Math.floor(Math.random() * 16_000),
    relation: 20 + Math.floor(Math.random() * 45),
    agent: false,
  };

  return { ...player, value: estimateValue(player) };
}

function runTransfer(players: EnginePlayer[]) {
  if (players.length === 0 || Math.random() > 0.42) return null;

  const weighted = players.filter((player) => player.age <= 31 && player.ger >= 72);
  if (!weighted.length) return null;

  const candidate = weighted[Math.floor(Math.random() * weighted.length)];
  const destinations = destinationClubs.filter((club) => club !== candidate.club);
  const destination = destinations[Math.floor(Math.random() * destinations.length)];
  const fee = Math.max(
    1_000_000,
    Math.round(candidate.value * (0.82 + Math.random() * 0.42) / 100_000) * 100_000,
  );

  return { candidate, destination, fee };
}

export function simulateWorld(input: SimulationInput): SimulationResult {
  let { dayOfWeek, week, season, money, reputation } = input;
  let players = input.players.map((player) => ({ ...player }));
  let transfers = [...input.transfers];
  const news: string[] = [];
  let weeksProcessed = 0;
  let commissionEarned = 0;
  let operatingCost = 0;

  const daysToAdvance = Math.max(1, input.days);

  for (let d = 0; d < daysToAdvance; d += 1) {
    dayOfWeek += 1;

    if (dayOfWeek <= 7) continue;

    dayOfWeek = 1;
    week += 1;
    weeksProcessed += 1;

    if (week > 52) {
      week = 1;
      season += 1;

      players = players
        .map((player) => ({ ...player, age: player.age + 1 }))
        .filter((player) => {
          const retires = player.age >= 37 || (player.age >= 34 && Math.random() < 0.22);
          if (retires) news.push(`${player.name} anunciou sua aposentadoria aos ${player.age} anos.`);
          return !retires;
        });

      news.push(`A temporada ${season} começou. Clubes renovam elencos e metas.`);
    }

    players = players.map(evolvePlayer);

    const clientRevenue = players
      .filter((player) => player.agent)
      .reduce((sum, player) => sum + Math.round(player.salary * 0.02), 0);
    const weeklyCost = 18_500 + reputation * 330;

    commissionEarned += clientRevenue;
    operatingCost += weeklyCost;
    money = Math.max(0, money + clientRevenue - weeklyCost);

    if (Math.random() > 0.66) reputation = clamp(reputation + 1, 0, 100);

    const deal = runTransfer(players);
    if (deal) {
      const { candidate, destination, fee } = deal;
      const origin = candidate.club;

      players = players.map((player) =>
        player.name === candidate.name
          ? {
              ...player,
              club: destination,
              salary: Math.max(player.salary, Math.round(player.salary * (1.08 + Math.random() * 0.18))),
              relation: clamp(player.relation + (player.agent ? 3 : 0), 1, 100),
            }
          : player,
      );

      const record: TransferRecord = [candidate.name, origin, destination, fee];
      transfers = [record, ...transfers].slice(0, 12);
      news.push(`${candidate.name} deixou o ${origin} e acertou com o ${destination} por € ${Math.round(fee / 1_000_000)} mi.`);

      if (candidate.agent) {
        const commission = Math.round(fee * 0.035);
        money += commission;
        commissionEarned += commission;
        reputation = clamp(reputation + 1, 0, 100);
        news.push(`Sua agência recebeu comissão de € ${Math.round(commission / 1_000_000 * 10) / 10} mi pela transferência de ${candidate.name}.`);
      }
    }

    if (Math.random() < 0.18) {
      const youth = createYouth(season, week, players.length);
      players = [...players, youth];
      news.push(`Novo talento apareceu no Brasil: ${youth.name}, ${youth.age} anos, potencial ${youth.pot}.`);
    }

    if (Math.random() < 0.16 && players.length) {
      const player = players[Math.floor(Math.random() * players.length)];
      news.push(`${player.name} ganhou destaque após boa sequência pelo ${player.club}.`);
    }

    if (Math.random() < 0.12 && players.length) {
      const player = players[Math.floor(Math.random() * players.length)];
      player.relation = clamp(player.relation - 3, 1, 100);
      news.push(`Um agente rival iniciou contato com ${player.name}.`);
    }
  }

  if (weeksProcessed === 0) {
    if (Math.random() < 0.18) {
      news.push("O mercado segue se movimentando enquanto os clubes preparam novas propostas.");
    }
  }

  return {
    dayOfWeek,
    week,
    season,
    money,
    reputation,
    players,
    transfers,
    news,
    weeksProcessed,
    commissionEarned,
    operatingCost,
  };
}
