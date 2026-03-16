"use client";

import { useState, useCallback } from "react";
import { Plus, Trash2, RotateCcw } from "lucide-react";

interface Player {
  id: number;
  name: string;
  rounds: number[];
}

let nextId = 1;

function createPlayer(name: string): Player {
  return { id: nextId++, name, rounds: [] };
}

export default function SeaSaltAndPaperScoreCounter() {
  const [players, setPlayers] = useState<Player[]>(() => [
    createPlayer("Player 1"),
    createPlayer("Player 2"),
  ]);
  const [newName, setNewName] = useState("");
  const [roundInputs, setRoundInputs] = useState<Record<number, string>>({});

  const addPlayer = useCallback(() => {
    const name = newName.trim() || `Player ${players.length + 1}`;
    setPlayers((prev) => [...prev, createPlayer(name)]);
    setNewName("");
  }, [newName, players.length]);

  const removePlayer = useCallback((id: number) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const addRound = useCallback(() => {
    setPlayers((prev) =>
      prev.map((p) => ({
        ...p,
        rounds: [...p.rounds, parseInt(roundInputs[p.id] || "0", 10) || 0],
      }))
    );
    setRoundInputs({});
  }, [roundInputs]);

  const reset = useCallback(() => {
    nextId = 1;
    setPlayers([createPlayer("Player 1"), createPlayer("Player 2")]);
    setRoundInputs({});
  }, []);

  const totalRounds = players.length > 0 ? Math.max(...players.map((p) => p.rounds.length), 0) : 0;

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs text-muted-foreground">
          {players.length} player{players.length !== 1 && "s"} · {totalRounds} round{totalRounds !== 1 && "s"}
        </p>
        <button
          onClick={reset}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary smooth-transition"
          aria-label="Reset"
        >
          <RotateCcw size={16} strokeWidth={2} />
        </button>
      </div>

      {/* Add Player */}
      <div className="flex gap-2 mb-5">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addPlayer()}
          placeholder="Player name"
          className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 smooth-transition"
        />
        <button
          onClick={addPlayer}
          className="px-3 py-2 rounded-lg text-xs font-semibold text-white bg-primary hover:bg-primary/90 smooth-transition flex items-center gap-1.5"
        >
          <Plus size={14} strokeWidth={2.5} />
          Add
        </button>
      </div>

      {/* Score Table */}
      <div className="overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60">
              <th className="text-left py-2 pr-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Player
              </th>
              {Array.from({ length: totalRounds }, (_, i) => (
                <th
                  key={i}
                  className="text-center py-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                >
                  R{i + 1}
                </th>
              ))}
              <th className="text-center py-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider min-w-[3rem]">
                New
              </th>
              <th className="text-right py-2 pl-3 text-xs font-semibold text-primary uppercase tracking-wider">
                Total
              </th>
              <th className="w-8" />
            </tr>
          </thead>
          <tbody>
            {players.map((p) => {
              const total = p.rounds.reduce((s, r) => s + r, 0);
              return (
                <tr key={p.id} className="border-b border-border/30">
                  <td className="py-2.5 pr-3 font-medium text-foreground truncate max-w-[8rem]">
                    {p.name}
                  </td>
                  {Array.from({ length: totalRounds }, (_, i) => (
                    <td key={i} className="text-center py-2.5 px-2 tabular-nums text-muted-foreground">
                      {p.rounds[i] ?? "–"}
                    </td>
                  ))}
                  <td className="text-center py-2.5 px-1">
                    <input
                      type="number"
                      value={roundInputs[p.id] ?? ""}
                      onChange={(e) =>
                        setRoundInputs((prev) => ({ ...prev, [p.id]: e.target.value }))
                      }
                      className="w-14 px-2 py-1 bg-secondary/60 border border-border/60 rounded-md text-sm text-center text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 smooth-transition"
                      placeholder="0"
                    />
                  </td>
                  <td className="text-right py-2.5 pl-3 font-bold text-foreground tabular-nums">
                    {total}
                  </td>
                  <td className="py-2.5 pl-1">
                    {players.length > 1 && (
                      <button
                        onClick={() => removePlayer(p.id)}
                        className="p-1 rounded text-muted-foreground/50 hover:text-destructive smooth-transition"
                        aria-label={`Remove ${p.name}`}
                      >
                        <Trash2 size={13} strokeWidth={2} />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Round Button */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={addRound}
          className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-primary hover:bg-primary/90 smooth-transition"
        >
          Log Round {totalRounds + 1}
        </button>
      </div>
    </div>
  );
}
