"use client";

export type LeagueTeam = {
  name: string;
  strength: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  points: number;
};

export type LeagueResult = {
  round: number;
  home: string;
  away: string;
  homeGoals: number;
  awayGoals: number;
};

export type Scorer = {
  name: string;
  club: string;
  goals: number;
};

export type LeagueState = {
  id: "serie-a" | "serie-b";
  title: string;
  season: number;
  round: number;
  teams: LeagueTeam[];
  recentResults: LeagueResult[];
  scorers: Scorer[];
  champion?: string;
};

export type DomesticSeasonChange = {
  serieA: LeagueState;
  serieB: LeagueState;
  promoted: string[];
  relegated: string[];
  news: string[];
};

const serieATeams = [
  ["Palmeiras", 86],
  ["Flamengo", 87],
  ["Botafogo", 83],
  ["São Paulo", 81],
  ["Internacional", 80],
  ["Cruzeiro", 80],
  ["Bahia", 79],
  ["Corinthians", 79],
  ["Atlético-MG", 81],
  ["Fluminense", 78],
  ["Grêmio", 78],
  ["Fortaleza", 79],
  ["Vasco", 77],
  ["Santos", 78],
  ["Bragantino", 77],
  ["Athletico-PR", 78],
  ["Ceará", 75],
  ["Sport", 74],
  ["Vitória", 74],
  ["Juventude", 73],
] as const;

const serieBTeams = [
  ["Goiás", 74],
  ["Coritiba", 75],
  ["América-MG", 74],
  ["Avaí", 72],
  ["Chapecoense", 71],
  ["Criciúma", 73],
  ["Vila Nova", 71],
  ["Novorizontino", 72],
  ["CRB", 70],
  ["Operário-PR", 69],
  ["Remo", 69],
  ["Paysandu", 68],
  ["Cuiabá", 73],
  ["Ponte Preta", 68],
  ["Athletic Club", 68],
  ["Amazonas", 67],
  ["Botafogo-SP", 67],
  ["Ferroviária", 67],
  ["Volta Redonda", 66],
  ["Brusque", 66],
] as const;

const scorerPool: Record<string, string[]> = {
  Palmeiras: ["Raphael Veiga", "Flaco López", "Estêvão"],
  Flamengo: ["Pedro", "Bruno Henrique", "Arrascaeta"],
  Botafogo: ["Igor Jesus", "Savarino", "Artur"],
  "São Paulo": ["Calleri", "Luciano", "Lucas Moura"],
  Internacional: ["Borré", "Alan Patrick", "Wesley"],
  Cruzeiro: ["Kaio Jorge", "Matheus Pereira", "Gabriel Barbosa"],
  Bahia: ["Everaldo", "Cauly", "Ademir"],
  Corinthians: ["Yuri Alberto", "Memphis", "Rodrigo Garro"],
  "Atlético-MG": ["Hulk", "Rony", "Scarpa"],
  Fluminense: ["Cano", "Arias", "Keno"],
  Grêmio: ["Braithwaite", "Cristaldo", "Pavón"],
  Fortaleza: ["Lucero", "Moisés", "Pochettino"],
  Vasco: ["Vegetti", "Philippe Coutinho", "Rayan"],
  Santos: ["Neymar", "Guilherme", "Tiquinho"],
  Bragantino: ["Eduardo Sasha", "Vitinho", "Jhon Jhon"],
  "Athletico-PR": ["Mastriani", "Zapelli", "Canobbio"],
  Ceará: ["Pedro Raul", "Galeano", "Mugni"],
  Sport: ["Pablo", "Barletta", "Lucas Lima"],
  Vitória: ["Alerrandro", "Osvaldo", "Matheuzinho"],
  Juventude: ["Gilberto", "Nenê", "Erick Farias"],
};

const emptyTeam = (name: string, strength: number): LeagueTeam => ({
  name,
  strength,
  played: 0,
  won: 0,
  drawn: 0,
  lost: 0,
  gf: 0,
  ga: 0,
  points: 0,
});

function createLeague(
  id: LeagueState["id"],
  title: string,
  season: number,
  sourceTeams: readonly (readonly [string, number])[],
): LeagueState {
  return {
    id,
    title,
    season,
    round: 0,
    teams: sourceTeams.map(([name, strength]) => emptyTeam(name, strength)),
    recentResults: [],
    scorers: [],
  };
}

export function createLeagueState(season: number): LeagueState {
  return createLeague("serie-a", "Brasileirão Série A", season, serieATeams);
}

export function createSecondDivisionState(season: number): LeagueState {
  return createLeague("serie-b", "Brasileirão Série B", season, serieBTeams);
}

function resetWithTeams(
  state: LeagueState,
  season: number,
  teams: Array<{ name: string; strength: number }>,
): LeagueState {
  return {
    id: state.id,
    title: state.title,
    season,
    round: 0,
    teams: teams.map((team) => emptyTeam(team.name, team.strength)),
    recentResults: [],
    scorers: [],
  };
}

export function rollDomesticSeason(
  serieA: LeagueState,
  serieB: LeagueState,
  nextSeason: number,
): DomesticSeasonChange {
  const orderedA = [...serieA.teams];
  const orderedB = [...serieB.teams];
  const relegatedTeams = orderedA.slice(-4);
  const promotedTeams = orderedB.slice(0, 4);

  const remainingA = orderedA.slice(0, -4);
  const remainingB = orderedB.slice(4);

  const nextATeams = [...remainingA, ...promotedTeams].map((team) => ({
    name: team.name,
    strength: Math.min(90, team.strength + (promotedTeams.some((p) => p.name === team.name) ? 1 : 0)),
  }));

  const nextBTeams = [...remainingB, ...relegatedTeams].map((team) => ({
    name: team.name,
    strength: Math.max(62, team.strength - (relegatedTeams.some((r) => r.name === team.name) ? 1 : 0)),
  }));

  const promoted = promotedTeams.map((team) => team.name);
  const relegated = relegatedTeams.map((team) => team.name);

  return {
    serieA: resetWithTeams(serieA, nextSeason, nextATeams),
    serieB: resetWithTeams(serieB, nextSeason, nextBTeams),
    promoted,
    relegated,
    news: [
      `Acesso à Série A: ${promoted.join(", ")}.`,
      `Rebaixados para a Série B: ${relegated.join(", ")}.`,
    ],
  };
}

function generateSchedule(teamNames: string[]) {
  const teams = [...teamNames];
  const rounds: Array<Array<[string, string]>> = [];
  const n = teams.length;

  for (let round = 0; round < n - 1; round += 1) {
    const pairings: Array<[string, string]> = [];
    for (let i = 0; i < n / 2; i += 1) {
      const home = teams[i];
      const away = teams[n - 1 - i];
      pairings.push(round % 2 === 0 ? [home, away] : [away, home]);
    }
    rounds.push(pairings);
    teams.splice(1, 0, teams.pop() as string);
  }

  const returnRounds = rounds.map((fixtures) =>
    fixtures.map(([home, away]) => [away, home] as [string, string]),
  );

  return [...rounds, ...returnRounds];
}

function expectedGoals(attacking: number, defending: number, homeAdvantage: number) {
  const diff = attacking - defending;
  return Math.max(0.35, 1.25 + diff / 18 + homeAdvantage);
}

function sampleGoals(lambda: number) {
  const L = Math.exp(-lambda);
  let p = 1;
  let k = 0;

  do {
    k += 1;
    p *= Math.random();
  } while (p > L && k < 9);

  return Math.max(0, k - 1);
}

function addGoalToScorer(scorers: Scorer[], club: string) {
  const candidates = scorerPool[club] ?? [`Atacante do ${club}`, `Meia do ${club}`, `Ponta do ${club}`];
  const roll = Math.random();
  const index = roll < 0.58 ? 0 : roll < 0.84 ? 1 : Math.min(2, candidates.length - 1);
  const name = candidates[index] ?? candidates[0];
  const current = scorers.find((item) => item.name === name && item.club === club);

  if (current) current.goals += 1;
  else scorers.push({ name, club, goals: 1 });
}

function simulateMatch(home: LeagueTeam, away: LeagueTeam) {
  const homeGoals = sampleGoals(expectedGoals(home.strength, away.strength, 0.2));
  const awayGoals = sampleGoals(expectedGoals(away.strength, home.strength, -0.02));
  return { homeGoals, awayGoals };
}

function sortedTeams(teams: LeagueTeam[]) {
  return [...teams].sort((a, b) => {
    const gdA = a.gf - a.ga;
    const gdB = b.gf - b.ga;
    return (
      b.points - a.points ||
      b.won - a.won ||
      gdB - gdA ||
      b.gf - a.gf ||
      a.name.localeCompare(b.name)
    );
  });
}

function simulateRound(state: LeagueState): LeagueState {
  if (state.round >= 38) return state;

  const schedule = generateSchedule(state.teams.map((team) => team.name));
  const fixtures = schedule[state.round];
  const teams = state.teams.map((team) => ({ ...team }));
  const scorers = state.scorers.map((scorer) => ({ ...scorer }));
  const roundNumber = state.round + 1;
  const results: LeagueResult[] = [];

  for (const [homeName, awayName] of fixtures) {
    const home = teams.find((team) => team.name === homeName);
    const away = teams.find((team) => team.name === awayName);
    if (!home || !away) continue;

    const { homeGoals, awayGoals } = simulateMatch(home, away);

    home.played += 1;
    away.played += 1;
    home.gf += homeGoals;
    home.ga += awayGoals;
    away.gf += awayGoals;
    away.ga += homeGoals;

    if (homeGoals > awayGoals) {
      home.won += 1;
      home.points += 3;
      away.lost += 1;
    } else if (awayGoals > homeGoals) {
      away.won += 1;
      away.points += 3;
      home.lost += 1;
    } else {
      home.drawn += 1;
      away.drawn += 1;
      home.points += 1;
      away.points += 1;
    }

    for (let i = 0; i < homeGoals; i += 1) addGoalToScorer(scorers, homeName);
    for (let i = 0; i < awayGoals; i += 1) addGoalToScorer(scorers, awayName);

    results.push({
      round: roundNumber,
      home: homeName,
      away: awayName,
      homeGoals,
      awayGoals,
    });
  }

  const ordered = sortedTeams(teams);

  return {
    ...state,
    round: roundNumber,
    teams: ordered,
    scorers: scorers.sort((a, b) => b.goals - a.goals || a.name.localeCompare(b.name)),
    recentResults: [...results, ...state.recentResults].slice(0, 30),
    champion: roundNumber === 38 ? ordered[0]?.name : state.champion,
  };
}

export function simulateLeagueWeeks(
  current: LeagueState,
  weeks: number,
  season: number,
): { state: LeagueState; news: string[] } {
  let state =
    current.season === season
      ? current
      : resetWithTeams(
          current,
          season,
          current.teams.map((team) => ({ name: team.name, strength: team.strength })),
        );

  const news: string[] = [];

  for (let i = 0; i < weeks; i += 1) {
    if (state.round >= 38) break;
    const beforeLeader = state.teams[0]?.name;
    state = simulateRound(state);
    const leader = state.teams[0]?.name;
    const latestRound = state.round;
    const roundResults = state.recentResults.filter((result) => result.round === latestRound);
    const biggest = [...roundResults].sort(
      (a, b) => Math.abs(b.homeGoals - b.awayGoals) - Math.abs(a.homeGoals - a.awayGoals),
    )[0];

    if (biggest) {
      news.push(
        `${state.title} R${latestRound}: ${biggest.home} ${biggest.homeGoals} x ${biggest.awayGoals} ${biggest.away}.`,
      );
    }

    if (leader && leader !== beforeLeader) {
      news.push(`${leader} assumiu a liderança da ${state.title} após a rodada ${latestRound}.`);
    }

    if (state.champion) {
      news.push(`${state.champion} é campeão da ${state.title} em ${season}.`);
      break;
    }
  }

  return { state, news };
}
