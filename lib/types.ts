export interface Player {
  id: number;
  name: string;
  age: number;
  club?: string;
  position: string;
  nationality: string;
  statsBySeason: {
    [key: string]: SeasonStats;
  };
}

export interface SeasonStats {
  appearances: number;
  goals: number;
  assists: number;
  recentMatches: Match[];
}

export interface Match {
  opponent: string;
  competition: string;
  minutesPlayed: number;
  goals: number;
  assists: number;
  teamGoals: number;
  opponentGoals: number;
}

export interface PlayerScore {
  score: number;
  goals: number;
  assists: number;
  appearances: number;
}

export type Season = "2023-2024" | "2022-2023" | "2021-2022";
export type Competition = "Champions League" | "Premier League" | "LaLiga" | "Bundesliga" | "Serie A";