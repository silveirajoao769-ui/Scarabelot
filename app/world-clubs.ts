export type ClubRegion = "América do Sul" | "Europa" | "Ásia" | "África";

export type ClubProfile = {
  name: string;
  country: string;
  region: ClubRegion;
  rep: number;
  budget: number;
  squad: number;
  interest: string;
  badge: {
    initials: string;
    shape: "round" | "shield" | "diamond";
    primary: string;
    secondary: string;
  };
};

export const worldClubs: ClubProfile[] = [
  { name: "Palmeiras", country: "Brasil", region: "América do Sul", rep: 88, budget: 78000000, squad: 82, interest: "Kaio César", badge: { initials: "PAL", shape: "round", primary: "#1f7a4f", secondary: "#d7efe2" } },
  { name: "Flamengo", country: "Brasil", region: "América do Sul", rep: 89, budget: 92000000, squad: 83, interest: "João Pedro", badge: { initials: "FLA", shape: "shield", primary: "#9f2531", secondary: "#1b2229" } },
  { name: "Botafogo", country: "Brasil", region: "América do Sul", rep: 84, budget: 70000000, squad: 81, interest: "Estêvão", badge: { initials: "BOT", shape: "shield", primary: "#202830", secondary: "#dfe5e9" } },
  { name: "River Plate", country: "Argentina", region: "América do Sul", rep: 88, budget: 85000000, squad: 83, interest: "Lamine Yamal", badge: { initials: "RIV", shape: "shield", primary: "#e9ecef", secondary: "#a33c4b" } },
  { name: "Boca", country: "Argentina", region: "América do Sul", rep: 87, budget: 72000000, squad: 81, interest: "Rodrygo", badge: { initials: "BOC", shape: "shield", primary: "#234d84", secondary: "#d8b84e" } },

  { name: "Real Madrid", country: "Espanha", region: "Europa", rep: 99, budget: 420000000, squad: 92, interest: "Endrick", badge: { initials: "RM", shape: "round", primary: "#eef1f5", secondary: "#c6a95a" } },
  { name: "Barcelona", country: "Espanha", region: "Europa", rep: 96, budget: 175000000, squad: 89, interest: "Estêvão", badge: { initials: "BAR", shape: "shield", primary: "#2d4b93", secondary: "#8d334d" } },
  { name: "Liverpool", country: "Inglaterra", region: "Europa", rep: 95, budget: 230000000, squad: 90, interest: "Rodrygo", badge: { initials: "LIV", shape: "shield", primary: "#a83b46", secondary: "#d8efe9" } },
  { name: "Chelsea", country: "Inglaterra", region: "Europa", rep: 92, budget: 315000000, squad: 87, interest: "Lamine Yamal", badge: { initials: "CHE", shape: "round", primary: "#31549a", secondary: "#d6e1ef" } },
  { name: "Manchester City", country: "Inglaterra", region: "Europa", rep: 95, budget: 360000000, squad: 91, interest: "Vini Jr.", badge: { initials: "MCI", shape: "round", primary: "#6cadd7", secondary: "#ece6c9" } },
  { name: "Arsenal", country: "Inglaterra", region: "Europa", rep: 93, budget: 280000000, squad: 89, interest: "João Pedro", badge: { initials: "ARS", shape: "shield", primary: "#a9404a", secondary: "#e9dcc7" } },
  { name: "Bayern", country: "Alemanha", region: "Europa", rep: 95, budget: 290000000, squad: 90, interest: "Florian Wirtz", badge: { initials: "BAY", shape: "round", primary: "#a73345", secondary: "#3e5ea0" } },
  { name: "PSG", country: "França", region: "Europa", rep: 94, budget: 320000000, squad: 90, interest: "Rodrygo", badge: { initials: "PSG", shape: "round", primary: "#244884", secondary: "#b64255" } },
  { name: "Inter de Milão", country: "Itália", region: "Europa", rep: 91, budget: 190000000, squad: 88, interest: "Endrick", badge: { initials: "INT", shape: "round", primary: "#234d79", secondary: "#1c242c" } },
  { name: "Milan", country: "Itália", region: "Europa", rep: 90, budget: 175000000, squad: 87, interest: "Kaio César", badge: { initials: "MIL", shape: "shield", primary: "#9d3540", secondary: "#23292e" } },

  { name: "Al Hilal", country: "Arábia Saudita", region: "Ásia", rep: 90, budget: 340000000, squad: 87, interest: "Vini Jr.", badge: { initials: "HIL", shape: "shield", primary: "#2e63a8", secondary: "#dce8f4" } },
  { name: "Al Nassr", country: "Arábia Saudita", region: "Ásia", rep: 88, budget: 280000000, squad: 85, interest: "Rodrygo", badge: { initials: "NAS", shape: "round", primary: "#d4b847", secondary: "#3c5a88" } },
  { name: "Al Ittihad", country: "Arábia Saudita", region: "Ásia", rep: 86, budget: 240000000, squad: 84, interest: "João Pedro", badge: { initials: "ITT", shape: "shield", primary: "#c8a845", secondary: "#20262c" } },
  { name: "Urawa Reds", country: "Japão", region: "Ásia", rep: 82, budget: 65000000, squad: 80, interest: "Kaio César", badge: { initials: "URA", shape: "diamond", primary: "#a63742", secondary: "#e9edf1" } },
  { name: "Kawasaki Frontale", country: "Japão", region: "Ásia", rep: 80, budget: 52000000, squad: 79, interest: "Estêvão", badge: { initials: "KAW", shape: "shield", primary: "#4a8bb6", secondary: "#222b34" } },
  { name: "Jeonbuk Motors", country: "Coreia do Sul", region: "Ásia", rep: 81, budget: 58000000, squad: 80, interest: "Endrick", badge: { initials: "JEO", shape: "round", primary: "#2f7b53", secondary: "#e1e8dd" } },

  { name: "Al Ahly", country: "Egito", region: "África", rep: 87, budget: 75000000, squad: 82, interest: "João Pedro", badge: { initials: "AHL", shape: "shield", primary: "#a7333f", secondary: "#e7d7b5" } },
  { name: "Wydad Casablanca", country: "Marrocos", region: "África", rep: 82, budget: 45000000, squad: 79, interest: "Kaio César", badge: { initials: "WYD", shape: "round", primary: "#a93c48", secondary: "#eceff1" } },
  { name: "Raja Casablanca", country: "Marrocos", region: "África", rep: 82, budget: 43000000, squad: 79, interest: "Estêvão", badge: { initials: "RAJ", shape: "shield", primary: "#337b55", secondary: "#e7ece7" } },
  { name: "Espérance", country: "Tunísia", region: "África", rep: 81, budget: 40000000, squad: 78, interest: "Rodrygo", badge: { initials: "EST", shape: "shield", primary: "#c3a241", secondary: "#9d3e48" } },
  { name: "Mamelodi Sundowns", country: "África do Sul", region: "África", rep: 83, budget: 50000000, squad: 80, interest: "Endrick", badge: { initials: "SUN", shape: "round", primary: "#d0b440", secondary: "#315d7f" } },
  { name: "TP Mazembe", country: "RD Congo", region: "África", rep: 80, budget: 34000000, squad: 77, interest: "Kaio César", badge: { initials: "TPM", shape: "shield", primary: "#202830", secondary: "#e7eaec" } },
];

export const transferDestinationNames = worldClubs.map((club) => club.name);
