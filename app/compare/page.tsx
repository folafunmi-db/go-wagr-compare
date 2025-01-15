"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";
import PlayerSearch from "@/components/PlayerSearch";
import PlayerComparison from "@/components/PlayerComparison";
import { Player } from "@/lib/types";
import Link from "next/link";

export default function ComparePage() {
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);

  const handlePlayerSelect = (player: Player) => {
    if (
      selectedPlayers.length < 2 &&
      !selectedPlayers.find((p) => p.id === player.id)
    ) {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  const handlePlayerRemove = (playerId: number) => {
    setSelectedPlayers(selectedPlayers.filter((p) => p.id !== playerId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            <Link href={"/"}>
              <button className="mr-2 py-1 px-2 text-sm bg-gray-200 rounded-md hover:bg-gray-300">
                Go back
              </button>
            </Link>
            Player Comparison
          </h1>
          <UserButton afterSwitchSessionUrl="/" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-semibold">Search Players</h2>
          </div>
          <PlayerSearch
            onSelect={handlePlayerSelect}
            disabled={selectedPlayers.length >= 2}
          />
        </div>

        {selectedPlayers.length > 0 && (
          <PlayerComparison
            players={selectedPlayers}
            onPlayerRemove={handlePlayerRemove}
          />
        )}
      </main>
    </div>
  );
}
