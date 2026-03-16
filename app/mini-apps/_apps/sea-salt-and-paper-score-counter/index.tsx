"use client";

import { useState, useCallback, useRef } from "react";

/* ── Types ── */

interface Player {
  id: number;
  name: string;
  rounds: number[];
}

let nextId = 1;

function createPlayer(name: string): Player {
  return { id: nextId++, name, rounds: [] };
}

/* ── Ocean background SVGs ── */

function Waves() {
  return (
    <svg
      viewBox="0 0 400 60"
      preserveAspectRatio="none"
      className="absolute bottom-0 left-0 w-full h-16 pointer-events-none"
    >
      <path
        d="M0 35 Q25 20 50 35 Q75 50 100 35 Q125 20 150 35 Q175 50 200 35 Q225 20 250 35 Q275 50 300 35 Q325 20 350 35 Q375 50 400 35 L400 60 L0 60Z"
        fill="#0E4D5E"
        opacity="0.3"
        className="animate-wave-slow"
      />
      <path
        d="M0 42 Q30 28 60 42 Q90 56 120 42 Q150 28 180 42 Q210 56 240 42 Q270 28 300 42 Q330 56 360 42 Q390 28 400 38 L400 60 L0 60Z"
        fill="#0A3D4A"
        opacity="0.5"
        className="animate-wave-mid"
      />
    </svg>
  );
}

function WavesTop() {
  return (
    <svg
      viewBox="0 0 400 40"
      preserveAspectRatio="none"
      className="absolute top-0 left-0 w-full h-10 pointer-events-none opacity-30"
    >
      <path
        d="M0 25 Q50 10 100 25 Q150 40 200 25 Q250 10 300 25 Q350 40 400 25 L400 0 L0 0Z"
        fill="#2A9D8F"
        opacity="0.15"
        className="animate-wave-slow"
      />
    </svg>
  );
}

function Bubbles() {
  const bubbles = [
    { cx: 30, cy: 80, r: 3, d: "8s", dl: "0s" },
    { cx: 85, cy: 70, r: 2, d: "6s", dl: "1s" },
    { cx: 160, cy: 85, r: 4, d: "10s", dl: "2s" },
    { cx: 240, cy: 75, r: 2.5, d: "7s", dl: "0.5s" },
    { cx: 310, cy: 82, r: 3, d: "9s", dl: "3s" },
    { cx: 370, cy: 78, r: 2, d: "6.5s", dl: "1.5s" },
    { cx: 55, cy: 60, r: 1.5, d: "7.5s", dl: "4s" },
    { cx: 200, cy: 65, r: 2, d: "8.5s", dl: "2.5s" },
    { cx: 130, cy: 55, r: 1.5, d: "7s", dl: "3.5s" },
    { cx: 280, cy: 60, r: 2.5, d: "9.5s", dl: "1s" },
  ];
  return (
    <svg
      viewBox="0 0 400 100"
      preserveAspectRatio="none"
      className="absolute bottom-4 left-0 w-full h-32 pointer-events-none"
    >
      {bubbles.map((b, i) => (
        <circle
          key={i}
          cx={b.cx}
          cy={b.cy}
          r={b.r}
          fill="none"
          stroke="#2A9D8F"
          strokeWidth="0.5"
          opacity="0.3"
          style={{
            animation: `bubble-rise ${b.d} ease-in-out infinite ${b.dl}`,
          }}
        />
      ))}
    </svg>
  );
}

function FishLeft() {
  return (
    <svg
      viewBox="0 0 50 30"
      className="absolute bottom-16 left-3 w-10 h-6 opacity-10 pointer-events-none animate-swim-left"
    >
      <path
        d="M5 15 Q15 5 30 12 Q35 10 38 15 Q35 20 30 18 Q15 25 5 15Z"
        fill="#45B7AA"
      />
      <circle cx="28" cy="14" r="1.2" fill="#0D2F3A" />
      <path d="M2 15 L8 10 L8 20Z" fill="#45B7AA" opacity="0.7" />
    </svg>
  );
}

function FishRight() {
  return (
    <svg
      viewBox="0 0 50 30"
      className="absolute top-20 right-4 w-8 h-5 opacity-[0.07] pointer-events-none animate-swim-right"
      style={{ transform: "scaleX(-1)" }}
    >
      <path
        d="M5 15 Q15 5 30 12 Q35 10 38 15 Q35 20 30 18 Q15 25 5 15Z"
        fill="#E76F51"
      />
      <circle cx="28" cy="14" r="1.2" fill="#0D2F3A" />
      <path d="M2 15 L8 10 L8 20Z" fill="#E76F51" opacity="0.7" />
    </svg>
  );
}

function Shell() {
  return (
    <svg
      viewBox="0 0 40 40"
      className="absolute top-8 right-8 w-12 h-12 opacity-[0.06] pointer-events-none"
    >
      <path
        d="M20 4 Q32 10 34 22 Q34 32 24 36 Q16 38 10 32 Q4 26 6 16 Q8 8 20 4Z"
        fill="none"
        stroke="#FFB4A2"
        strokeWidth="1.5"
      />
      <path d="M20 4 Q18 18 10 32" stroke="#FFB4A2" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M20 4 Q22 16 24 36" stroke="#FFB4A2" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M20 4 Q28 14 34 22" stroke="#FFB4A2" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M20 4 Q12 12 6 16" stroke="#FFB4A2" strokeWidth="0.8" fill="none" opacity="0.4" />
    </svg>
  );
}

function Seahorse() {
  return (
    <svg
      viewBox="0 0 30 50"
      className="absolute bottom-28 right-6 w-7 h-12 opacity-[0.06] pointer-events-none"
    >
      <path
        d="M15 5 Q22 8 22 16 Q22 22 18 26 Q20 28 20 32 Q20 38 16 42 Q12 46 10 44 Q8 42 10 40 Q12 38 14 40"
        fill="none"
        stroke="#8ECAE6"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M15 5 Q10 3 8 6 Q6 10 10 12"
        fill="none"
        stroke="#8ECAE6"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="11" cy="8" r="0.8" fill="#8ECAE6" />
    </svg>
  );
}

/* ── Player color assignment ── */

const PLAYER_COLORS = [
  { bg: "rgba(42,157,143,0.12)", border: "rgba(42,157,143,0.25)", accent: "#2A9D8F", label: "#5EC4B6" },
  { bg: "rgba(231,111,81,0.12)", border: "rgba(231,111,81,0.25)", accent: "#E76F51", label: "#F09A83" },
  { bg: "rgba(142,202,230,0.12)", border: "rgba(142,202,230,0.25)", accent: "#8ECAE6", label: "#A8D8EE" },
  { bg: "rgba(255,180,162,0.12)", border: "rgba(255,180,162,0.25)", accent: "#FFB4A2", label: "#FFC8BA" },
  { bg: "rgba(233,196,106,0.12)", border: "rgba(233,196,106,0.25)", accent: "#E9C46A", label: "#F0D48A" },
  { bg: "rgba(168,130,214,0.12)", border: "rgba(168,130,214,0.25)", accent: "#A882D6", label: "#C0A4E4" },
  { bg: "rgba(100,200,150,0.12)", border: "rgba(100,200,150,0.25)", accent: "#64C896", label: "#88D8B0" },
  { bg: "rgba(230,150,100,0.12)", border: "rgba(230,150,100,0.25)", accent: "#E69664", label: "#F0B088" },
];

function getColor(index: number) {
  return PLAYER_COLORS[index % PLAYER_COLORS.length];
}

/* ── Main component ── */

export default function SeaSaltAndPaperScoreCounter() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [newName, setNewName] = useState("");
  const [roundInputs, setRoundInputs] = useState<Record<number, string>>({});
  const [isLogging, setIsLogging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const totalRounds =
    players.length > 0
      ? Math.max(...players.map((p) => p.rounds.length), 0)
      : 0;

  const addPlayer = useCallback(() => {
    const name = newName.trim() || `Player ${players.length + 1}`;
    setPlayers((prev) => [...prev, createPlayer(name)]);
    setNewName("");
    inputRef.current?.focus();
  }, [newName, players.length]);

  const removePlayer = useCallback((id: number) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const addRound = useCallback(() => {
    setIsLogging(true);
    setPlayers((prev) =>
      prev.map((p) => ({
        ...p,
        rounds: [
          ...p.rounds,
          parseInt(roundInputs[p.id] || "0", 10) || 0,
        ],
      })),
    );
    setRoundInputs({});
    setTimeout(() => setIsLogging(false), 500);
  }, [roundInputs]);

  const reset = useCallback(() => {
    nextId = 1;
    setPlayers([]);
    setRoundInputs({});
  }, []);

  const leader = players.reduce(
    (best, p) => {
      const t = p.rounds.reduce((s, r) => s + r, 0);
      return t > best.score ? { id: p.id, score: t } : best;
    },
    { id: -1, score: -Infinity },
  );

  return (
    <div className="relative overflow-hidden bg-[#0D2F3A] text-white min-h-[480px]">
      <style>{`
        @keyframes wave-slow { 0%,100%{transform:translateX(0)} 50%{transform:translateX(-8px)} }
        @keyframes wave-mid  { 0%,100%{transform:translateX(0)} 50%{transform:translateX(6px)} }
        @keyframes bubble-rise { 0%{transform:translateY(0);opacity:.3} 50%{transform:translateY(-20px);opacity:.5} 100%{transform:translateY(-40px);opacity:0} }
        @keyframes swim-left { 0%,100%{transform:translateX(0)} 50%{transform:translateX(12px)} }
        @keyframes swim-right { 0%,100%{transform:translateX(0) scaleX(-1)} 50%{transform:translateX(-10px) scaleX(-1)} }
        @keyframes score-pop { 0%{transform:scale(1)} 50%{transform:scale(1.15)} 100%{transform:scale(1)} }
        .animate-wave-slow { animation: wave-slow 6s ease-in-out infinite; }
        .animate-wave-mid  { animation: wave-mid 5s ease-in-out infinite 0.5s; }
        .animate-swim-left { animation: swim-left 4s ease-in-out infinite; }
        .animate-swim-right { animation: swim-right 5s ease-in-out infinite 1s; }
        .animate-score-pop { animation: score-pop .4s ease-out; }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type="number"] { -moz-appearance: textfield; }
      `}</style>

      {/* Background layers */}
      <WavesTop />
      <Waves />
      <Bubbles />
      <FishLeft />
      <FishRight />
      <Shell />
      <Seahorse />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(42,157,143,0.08), transparent 60%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-4 pt-5 pb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-teal-300/50">
                Round
              </span>
              <span className="text-2xl font-bold tabular-nums text-teal-200/90">
                {totalRounds}
              </span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-teal-300/50">
                Players
              </span>
              <span className="text-2xl font-bold tabular-nums text-teal-200/90">
                {players.length}
              </span>
            </div>
          </div>
          <button
            onClick={reset}
            className="w-10 h-10 rounded-xl bg-white/[0.07] active:bg-white/[0.12] text-white/40 active:text-white/70 flex items-center justify-center transition-all active:scale-95 select-none"
            aria-label="Reset all"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M1 4v6h6" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
          </button>
        </div>

        {/* Player Cards */}
        <div className="space-y-2.5 mb-4">
          {players.map((p, idx) => {
            const total = p.rounds.reduce((s, r) => s + r, 0);
            const color = getColor(idx);
            const isLeader =
              leader.id === p.id && totalRounds > 0 && players.length > 1;

            return (
              <div
                key={p.id}
                className={`rounded-xl p-3 border transition-all ${isLogging ? "animate-score-pop" : ""}`}
                style={{
                  backgroundColor: color.bg,
                  borderColor: color.border,
                }}
              >
                {/* Name + Total row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    {/* Color dot */}
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: color.accent }}
                    />
                    <span
                      className="text-sm font-semibold truncate"
                      style={{ color: color.label }}
                    >
                      {p.name}
                    </span>
                    {isLeader && (
                      <span className="text-xs flex-shrink-0">👑</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-2xl font-bold tabular-nums"
                      style={{ color: color.accent }}
                    >
                      {total}
                    </span>
                    <button
                      onClick={() => removePlayer(p.id)}
                      className="w-7 h-7 rounded-lg bg-white/[0.05] active:bg-red-500/20 text-white/20 active:text-red-300 flex items-center justify-center transition-all active:scale-95 select-none"
                      aria-label={`Remove ${p.name}`}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Round scores + input */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {p.rounds.map((score, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center justify-center min-w-[28px] h-7 px-1.5 rounded-md text-xs font-medium tabular-nums bg-white/[0.06] text-white/50"
                    >
                      {score}
                    </span>
                  ))}
                  {/* Current round input */}
                  <input
                    type="number"
                    inputMode="numeric"
                    value={roundInputs[p.id] ?? ""}
                    onChange={(e) =>
                      setRoundInputs((prev) => ({
                        ...prev,
                        [p.id]: e.target.value,
                      }))
                    }
                    placeholder="+"
                    className="w-12 h-7 px-1.5 rounded-md text-xs font-medium text-center tabular-nums bg-white/[0.08] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-teal-400/40 focus:ring-1 focus:ring-teal-400/20 transition-colors"
                    style={{ borderColor: `${color.accent}33` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Log Round Button */}
        <button
          onClick={addRound}
          disabled={isLogging}
          className={`w-full py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-[0.98] select-none mb-4 ${
            isLogging ? "opacity-70" : "active:brightness-110"
          }`}
          style={{
            background: "linear-gradient(135deg, #2A9D8F 0%, #45B7AA 100%)",
          }}
        >
          Log Round {totalRounds + 1}
        </button>

        {/* Add Player */}
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addPlayer()}
            placeholder="Add player..."
            className="flex-1 px-3 py-2.5 rounded-xl text-sm bg-white/[0.06] border border-white/10 text-white placeholder:text-white/25 focus:outline-none focus:border-teal-400/30 focus:ring-1 focus:ring-teal-400/20 transition-colors"
          />
          <button
            onClick={addPlayer}
            className="px-4 py-2.5 rounded-xl text-sm font-bold bg-white/[0.08] active:bg-white/[0.15] text-teal-300 active:text-teal-200 border border-white/10 transition-all active:scale-95 select-none"
          >
            + Add
          </button>
        </div>

        {/* Subtle hint */}
        <p className="mt-4 text-[11px] text-white/20 text-center">
          Enter scores for each player, then tap Log Round.
        </p>
      </div>
    </div>
  );
}
