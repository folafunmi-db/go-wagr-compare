import { Player } from "./types";
import playersData from "./playersData.json";

export const players: Player[] = playersData?.players;

export const calculatePlayerScore = (
  goals: number,
  assists: number,
  appearances: number
): number => {
  return goals * 4 + assists * 3 + appearances / 10;
};

export const getPlayersBySearch = (searchTerm: string): Player[] => {
  if (!searchTerm) return [];
  const lowercaseSearch = searchTerm.toLowerCase();
  return players.filter(
    (player) =>
      player.name.toLowerCase().includes(lowercaseSearch) ||
      player.club?.toLowerCase().includes(lowercaseSearch) ||
      player.nationality.toLowerCase().includes(lowercaseSearch)
  );
};

export const getPlayerById = (id: number): Player | undefined => {
  return players.find((player) => player.id === id);
};

