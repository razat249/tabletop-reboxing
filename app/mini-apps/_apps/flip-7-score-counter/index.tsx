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

export default function Flip7ScoreCounter() {
  const [players, setPlayers] = useState<Player[]>(() => [
    createPlayer("Player 1"),
    createPlayer("Player 2"),
  ]);
  const [newName, setNewName] = useState("");
  const [roundInputs, setRoundInputs] = useState<Record<number, string>>({});

  const addPlayer = useCallback(() => {
    if (players.length >= 8) return;
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

  const sortedByTotal = [...players].sort(
    (a, b) =>
      b.rounds.reduce((s, r) => s + r, 0) - a.rounds.reduce((s, r) => s + r, 0)
  );
  const leaderId = sortedByTotal.length > 0 ? sortedByTotal[0].id : -1;

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs text-muted-foreground">
          {players.length}/8 players · {totalRounds} round{totalRounds !== 1 && "s"}
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
          disabled={players.length >= 8}
          className="px-3 py-2 rounded-lg text-xs font-semibold text-white bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed smooth-transition flex items-center gap-1.5"
        >
          <Plus size={14} strokeWidth={2.5} />
          Add
        </button>
      </div>

      {/* Player Cards */}
      <div className="space-y-3 mb-5">
        {players.map((p) => {
          const total = p.rounds.reduce((s, r) => s + r, 0);
          const isLeader = p.id === leaderId && totalRounds > 0;

          return (
            <div
              key={p.id}
              className={`rounded-xl border p-3 sm:p-4 smooth-transition ${
                isLeader
                  ? "border-primary/40 bg-primary/5"
                  : "border-border/60 bg-secondary/30"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground text-sm">
                    {p.name}
                  </span>
                  {isLeader && (
                    <span className="px-1.5 py-0.5 rounded-full bg-primary/15 text-primary text-2xs font-semibold">
                      Lead
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-foreground tabular-nums">
                    {total}
                  </span>
                  {players.length > 1 && (
                    <button
                      onClick={() => removePlayer(p.id)}
                      className="p-1 rounded text-muted-foreground/50 hover:text-destructive smooth-transition"
                      aria-label={`Remove ${p.name}`}
                    >
                      <Trash2 size={13} strokeWidth={2} />
                    </button>
                  )}
                </div>
              </div>

              {/* Round scores */}
              {p.rounds.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {p.rounds.map((score, i) => (
                    <span
                      key={i}
                      className={`px-2 py-0.5 rounded-md text-2xs font-medium tabular-nums ${
                        score >= 0
                          ? "bg-background/60 text-muted-foreground"
                          : "bg-red-500/10 text-red-600 dark:text-red-400"
                      }`}
                    >
                      R{i + 1}: {score}
                    </span>
                  ))}
                </div>
              )}

              {/* Round input */}
              <div className="flex items-center gap-2">
                <span className="text-2xs text-muted-foreground">R{totalRounds + 1}:</span>
                <input
                  type="number"
                  value={roundInputs[p.id] ?? ""}
                  onChange={(e) =>
                    setRoundInputs((prev) => ({ ...prev, [p.id]: e.target.value }))
                  }
                  className="w-16 px-2 py-1 bg-background border border-border/60 rounded-md text-sm text-center text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 smooth-transition"
                  placeholder="0"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Log Round */}
      <div className="flex justify-center">
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
