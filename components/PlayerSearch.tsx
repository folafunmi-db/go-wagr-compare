"use client";

import { useState, useEffect } from "react";
import { getPlayersBySearch } from "@/lib/data";
import { Player } from "@/lib/types";

interface PlayerSearchProps {
  onSelect: (player: Player) => void;
  disabled?: boolean;
}

export default function PlayerSearch({ onSelect, disabled }: PlayerSearchProps) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Player[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (search.length >= 2) {
      const searchResults = getPlayersBySearch(search);
      setResults(searchResults);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [search]);

  const handleSelect = (player: Player) => {
    onSelect(player);
    setSearch("");
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a player..."
        disabled={disabled}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
      />

      {isOpen && results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border max-h-96 overflow-y-auto">
          {results.map((player) => (
            <button
              key={player.id}
              onClick={() => handleSelect(player)}
              className="w-full p-3 text-left hover:bg-gray-50 flex items-center justify-between"
            >
              <div>
                <div className="font-medium">{player.name}</div>
                <div className="text-sm text-gray-500">
                  {player.club} · {player.position}
                </div>
              </div>
              <div className="text-sm text-gray-500">{player.nationality}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}