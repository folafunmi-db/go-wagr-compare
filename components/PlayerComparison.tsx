"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Player, Season, Competition, PlayerScore } from "@/lib/types";
import { calculatePlayerScore } from "@/lib/data";

interface PlayerComparisonProps {
  players: Player[];
  onPlayerRemove: (id: number) => void;
}

export default function PlayerComparison({ players, onPlayerRemove }: PlayerComparisonProps) {
  const [selectedSeason, setSelectedSeason] = useState<Season>("2023-2024");
  const [selectedCompetition, setSelectedCompetition] = useState<Competition>("Champions League");

  const getPlayerStats = (player: Player): PlayerScore => {
    const seasonStats = player.statsBySeason[selectedSeason];
    const score = calculatePlayerScore(
      seasonStats.goals,
      seasonStats.assists,
      seasonStats.appearances
    );

    return {
      score,
      goals: seasonStats.goals,
      assists: seasonStats.assists,
      appearances: seasonStats.appearances,
    };
  };

  const getRecentForm = (player: Player) => {
    return player.statsBySeason[selectedSeason].recentMatches
      .filter(match => match.competition === selectedCompetition)
      .slice(0, 5);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <div className="flex gap-4 mb-4">
          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value as Season)}
            className="p-2 border rounded-md"
          >
            <option value="2023-2024">2023-2024</option>
            <option value="2022-2023">2022-2023</option>
            <option value="2021-2022">2021-2022</option>
          </select>

          <select
            value={selectedCompetition}
            onChange={(e) => setSelectedCompetition(e.target.value as Competition)}
            className="p-2 border rounded-md"
          >
            <option value="Champions League">Champions League</option>
            <option value="Premier League">Premier League</option>
            <option value="LaLiga">LaLiga</option>
            <option value="Bundesliga">Bundesliga</option>
            <option value="Serie A">Serie A</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {players.map((player) => {
            const stats = getPlayerStats(player);
            const recentForm = getRecentForm(player);

            return (
              <div key={player.id} className="relative">
                <button
                  onClick={() => onPlayerRemove(player.id)}
                  className="absolute -top-2 -right-2 p-1 bg-red-100 rounded-full hover:bg-red-200"
                >
                  <X className="w-4 h-4 text-red-600" />
                </button>

                <div className="p-4 border rounded-lg">
                  <h3 className="text-xl font-bold mb-2">{player.name}</h3>
                  <div className="text-sm text-gray-500 mb-4">
                    {player.club} · {player.position} · {player.nationality}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {stats.score.toFixed(1)}
                      </div>
                      <div className="text-sm text-gray-500">Player Score</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold">{stats.appearances}</div>
                      <div className="text-sm text-gray-500">Appearances</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold">{stats.goals}</div>
                      <div className="text-sm text-gray-500">Goals</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold">{stats.assists}</div>
                      <div className="text-sm text-gray-500">Assists</div>
                    </div>
                  </div>

                  <h4 className="font-semibold mb-2">Recent Form</h4>
                  <div className="space-y-2">
                    {recentForm.map((match, index) => (
                      <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                        <div className="flex justify-between mb-1">
                          <span>{match.opponent}</span>
                          <span>
                            {match.teamGoals} - {match.opponentGoals}
                          </span>
                        </div>
                        <div className="text-gray-500">
                          {match.goals} goals · {match.assists} assists
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}