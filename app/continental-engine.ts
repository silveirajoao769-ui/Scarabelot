"use client";

export type CupMatch = {
  stage: string;
  home: string;
  away: string;
  homeGoals: number;
  awayGoals: number;
  winner: string;
  penalties?: string;
};

export type TournamentState = {
  id: "libertadores" | "champions" | "afc" | "caf";
  title: string;
  season: number;
  stageIndex: number;
  participants: string[];
  matches: CupMatch[];
  history: CupMatch[];
  weeksToNextStage: number;
  champion?: string;
};

const stages = ["Oitavas", "Quartas", "Semifinal", "Final"] as const;

const strengths: Record<string, number> = {
  Palmeiras: 86, Flamengo: 87, Botafogo: 83, "São Paulo": 81, Internacional: 80,
  Cruzeiro: 80, Bahia: 79, Corinthians: 79, "River Plate": 85, Boca: 83, Racing: 81,
  Estudiantes: 80, "Peñarol": 79, Nacional: 78, "LDU Quito": 77, "Independiente del Valle": 78,

  "Real Madrid": 94, Barcelona: 91, Liverpool: 92, Chelsea: 88, "Manchester City": 92,
  Arsenal: 90, Bayern: 91, PSG: 91, "Inter de Milão": 89, Milan: 87, Juventus: 87,
  "Atlético de Madrid": 88, Dortmund: 87, Leverkusen: 88, Napoli: 87, Benfica: 85,

  "Al Hilal": 90, "Al Nassr": 88, "Al Ittihad": 86, "Urawa Reds": 82,
  "Kawasaki Frontale": 80, "Jeonbuk Motors": 81, "Yokohama F. Marinos": 80,
  "Ulsan HD": 80, "Al Sadd": 82, "Al Ain": 83, "Persepolis": 80, "Esteghlal": 79,
  "Buriram United": 76, "Johor Darul Ta'zim": 77, "Shanghai Port": 78, "Pohang Steelers": 79,

  "Al Ahly": 87, "Wydad Casablanca": 82, "Raja Casablanca": 82, Espérance: 81,
  "Mamelodi Sundowns": 83, "TP Mazembe": 80, "Zamalek": 81, "Pyramids": 81,
  "Orlando Pirates": 79, "Simba SC": 76, "Young Africans": 76, "AS FAR": 78,
  "CR Belouizdad": 78, "Petro de Luanda": 77, "ASEC Mimosas": 76, "USM Alger": 78,
};

const defaultLibertadores = [
  "Palmeiras","Flamengo","Botafogo","São Paulo","Internacional","Cruzeiro","Bahia","Corinthians",
  "River Plate","Boca","Racing","Estudiantes","Peñarol","Nacional","LDU Quito","Independiente del Valle",
];

const defaultChampions = [
  "Real Madrid","Barcelona","Liverpool","Chelsea","Manchester City","Arsenal","Bayern","PSG",
  "Inter de Milão","Milan","Juventus","Atlético de Madrid","Dortmund","Leverkusen","Napoli","Benfica",
];

const defaultAfc = [
  "Al Hilal","Al Nassr","Al Ittihad","Urawa Reds","Kawasaki Frontale","Jeonbuk Motors",
  "Yokohama F. Marinos","Ulsan HD","Al Sadd","Al Ain","Persepolis","Esteghlal",
  "Buriram United","Johor Darul Ta'zim","Shanghai Port","Pohang Steelers",
];

const defaultCaf = [
  "Al Ahly","Wydad Casablanca","Raja Casablanca","Espérance","Mamelodi Sundowns","TP Mazembe",
  "Zamalek","Pyramids","Orlando Pirates","Simba SC","Young Africans","AS FAR",
  "CR Belouizdad","Petro de Luanda","ASEC Mimosas","USM Alger",
];

function shuffled<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function goalsFor(team: string, rival: string, homeBonus: number) {
  const teamStrength = strengths[team] ?? 78;
  const rivalStrength = strengths[rival] ?? 78;
  const lambda = Math.max(0.35, 1.25 + (teamStrength - rivalStrength) / 20 + homeBonus);
  const L = Math.exp(-lambda);
  let p = 1;
  let k = 0;
  do {
    k += 1;
    p *= Math.random();
  } while (p > L && k < 8);
  return Math.max(0, k - 1);
}

function simulateKnockoutMatch(stage: string, home: string, away: string): CupMatch {
  const homeGoals = goalsFor(home, away, 0.12);
  const awayGoals = goalsFor(away, home, 0);

  if (homeGoals === awayGoals) {
    const homeStrength = strengths[home] ?? 78;
    const awayStrength = strengths[away] ?? 78;
    const homeChance = homeStrength / (homeStrength + awayStrength);
    const winner = Math.random() < homeChance ? home : away;
    const loser = winner === home ? away : home;
    const winnerPens = 4 + Math.floor(Math.random() * 2);
    const loserPens = Math.max(2, winnerPens - 1 - Math.floor(Math.random() * 2));
    return {
      stage, home, away, homeGoals, awayGoals, winner,
      penalties: `${winner} ${winnerPens} x ${loserPens} ${loser}`,
    };
  }

  return { stage, home, away, homeGoals, awayGoals, winner: homeGoals > awayGoals ? home : away };
}

function createTournament(
  id: TournamentState["id"],
  title: string,
  season: number,
  participants: string[],
): TournamentState {
  return {
    id,
    title,
    season,
    stageIndex: 0,
    participants: shuffled(participants).slice(0, 16),
    matches: [],
    history: [],
    weeksToNextStage: 2,
  };
}

export function createLibertadoresState(season: number, brazilianQualifiers?: string[]): TournamentState {
  const brazilian = (brazilianQualifiers?.length ? brazilianQualifiers : defaultLibertadores.slice(0, 8)).slice(0, 8);
  const others = defaultLibertadores.filter((team) => !brazilian.includes(team));
  return createTournament("libertadores", "CONMEBOL Libertadores", season, [...brazilian, ...others].slice(0, 16));
}

export function createChampionsState(season: number): TournamentState {
  return createTournament("champions", "UEFA Champions League", season, defaultChampions);
}

export function createAfcState(season: number): TournamentState {
  return createTournament("afc", "AFC Champions Elite", season, defaultAfc);
}

export function createCafState(season: number): TournamentState {
  return createTournament("caf", "CAF Champions League", season, defaultCaf);
}

function recreateForSeason(current: TournamentState, season: number, brazilianQualifiers?: string[]) {
  if (current.id === "libertadores") return createLibertadoresState(season, brazilianQualifiers);
  if (current.id === "champions") return createChampionsState(season);
  if (current.id === "afc") return createAfcState(season);
  return createCafState(season);
}

function simulateStage(state: TournamentState): TournamentState {
  if (state.champion || state.participants.length < 2) return state;

  const stage = stages[state.stageIndex] ?? "Final";
  const draw = shuffled(state.participants);
  const matches: CupMatch[] = [];
  const winners: string[] = [];

  for (let i = 0; i < draw.length; i += 2) {
    const home = draw[i];
    const away = draw[i + 1];
    if (!away) {
      winners.push(home);
      continue;
    }
    const match = simulateKnockoutMatch(stage, home, away);
    matches.push(match);
    winners.push(match.winner);
  }

  const champion = winners.length === 1 ? winners[0] : undefined;

  return {
    ...state,
    stageIndex: Math.min(stages.length - 1, state.stageIndex + 1),
    participants: winners,
    matches,
    history: [...matches, ...state.history].slice(0, 32),
    weeksToNextStage: champion ? 0 : 3,
    champion,
  };
}

export function simulateTournamentWeeks(
  current: TournamentState,
  weeks: number,
  season: number,
  brazilianQualifiers?: string[],
): { state: TournamentState; news: string[] } {
  let state = current.season === season ? current : recreateForSeason(current, season, brazilianQualifiers);
  const news: string[] = [];

  for (let i = 0; i < weeks; i += 1) {
    if (state.champion) break;

    if (state.weeksToNextStage > 0) {
      state = { ...state, weeksToNextStage: state.weeksToNextStage - 1 };
      continue;
    }

    const beforeStage = stages[state.stageIndex] ?? "Final";
    state = simulateStage(state);

    const featured = state.matches[0];
    if (featured) {
      news.push(`${state.title} • ${beforeStage}: ${featured.home} ${featured.homeGoals} x ${featured.awayGoals} ${featured.away}.`);
    }

    if (state.champion) {
      news.push(`${state.champion} conquistou a ${state.title} de ${season}.`);
    }
  }

  return { state, news };
}
