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

/* ── Background SVGs ── */

function CardScatter() {
  return (
    <svg
      viewBox="0 0 400 200"
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Card 1 - top left, tilted */}
      <g transform="translate(30,20) rotate(-15)">
        <rect width="32" height="44" rx="3" fill="none" stroke="#E879F9" strokeWidth="1.5" />
        <text x="16" y="28" textAnchor="middle" fill="#E879F9" fontSize="16" fontWeight="700" fontFamily="system-ui">7</text>
      </g>
      {/* Card 2 - top right */}
      <g transform="translate(340,15) rotate(12)">
        <rect width="28" height="40" rx="3" fill="none" stroke="#C084FC" strokeWidth="1.2" />
        <text x="14" y="26" textAnchor="middle" fill="#C084FC" fontSize="14" fontWeight="700" fontFamily="system-ui">3</text>
      </g>
      {/* Card 3 - mid left */}
      <g transform="translate(10,120) rotate(8)">
        <rect width="26" height="36" rx="2.5" fill="none" stroke="#A78BFA" strokeWidth="1" />
        <text x="13" y="23" textAnchor="middle" fill="#A78BFA" fontSize="12" fontWeight="700" fontFamily="system-ui">5</text>
      </g>
      {/* Card 4 - bottom right */}
      <g transform="translate(360,150) rotate(-20)">
        <rect width="30" height="42" rx="3" fill="none" stroke="#F0ABFC" strokeWidth="1.2" />
        <text x="15" y="27" textAnchor="middle" fill="#F0ABFC" fontSize="15" fontWeight="700" fontFamily="system-ui">1</text>
      </g>
      {/* Card 5 - center-ish */}
      <g transform="translate(190,160) rotate(5)">
        <rect width="24" height="34" rx="2" fill="none" stroke="#D8B4FE" strokeWidth="1" />
        <text x="12" y="22" textAnchor="middle" fill="#D8B4FE" fontSize="11" fontWeight="700" fontFamily="system-ui">4</text>
      </g>
    </svg>
  );
}

function Lucky7() {
  return (
    <svg
      viewBox="0 0 100 120"
      className="absolute -top-2 -right-2 w-28 h-32 pointer-events-none opacity-[0.04]"
    >
      <text
        x="50"
        y="95"
        textAnchor="middle"
        fill="#E879F9"
        fontSize="100"
        fontWeight="900"
        fontFamily="system-ui"
      >
        7
      </text>
    </svg>
  );
}

function Sparkles() {
  const dots = [
    { cx: 45, cy: 30, r: 1.2, d: "3s", dl: "0s" },
    { cx: 120, cy: 18, r: 0.8, d: "4s", dl: "0.5s" },
    { cx: 200, cy: 45, r: 1, d: "3.5s", dl: "1s" },
    { cx: 280, cy: 22, r: 0.7, d: "4.5s", dl: "1.5s" },
    { cx: 350, cy: 38, r: 1.1, d: "3s", dl: "2s" },
    { cx: 80, cy: 55, r: 0.6, d: "3.8s", dl: "0.8s" },
    { cx: 160, cy: 60, r: 0.9, d: "4.2s", dl: "2.5s" },
    { cx: 310, cy: 50, r: 0.7, d: "3.2s", dl: "1.2s" },
    { cx: 240, cy: 15, r: 0.8, d: "3.6s", dl: "0.3s" },
    { cx: 380, cy: 55, r: 0.5, d: "4s", dl: "1.8s" },
    { cx: 20, cy: 48, r: 0.9, d: "3.4s", dl: "3s" },
    { cx: 140, cy: 40, r: 0.6, d: "4.8s", dl: "0.6s" },
  ];

  return (
    <svg
      viewBox="0 0 400 70"
      preserveAspectRatio="none"
      className="absolute top-0 left-0 w-full h-20 pointer-events-none"
    >
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.cx}
          cy={d.cy}
          r={d.r}
          fill="#E879F9"
          style={{
            animation: `sparkle ${d.d} ease-in-out infinite ${d.dl}`,
          }}
        />
      ))}
    </svg>
  );
}

function FeltTexture() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.03]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, white 0.5px, transparent 0.5px)",
        backgroundSize: "16px 16px",
      }}
    />
  );
}

/* ── Player colors ── */

const PLAYER_COLORS = [
  { bg: "rgba(168,85,247,0.14)", border: "rgba(168,85,247,0.28)", accent: "#A855F7", label: "#C084FC" },
  { bg: "rgba(236,72,153,0.14)", border: "rgba(236,72,153,0.28)", accent: "#EC4899", label: "#F472B6" },
  { bg: "rgba(59,130,246,0.14)", border: "rgba(59,130,246,0.28)", accent: "#3B82F6", label: "#60A5FA" },
  { bg: "rgba(245,158,11,0.14)", border: "rgba(245,158,11,0.28)", accent: "#F59E0B", label: "#FBBF24" },
  { bg: "rgba(16,185,129,0.14)", border: "rgba(16,185,129,0.28)", accent: "#10B981", label: "#34D399" },
  { bg: "rgba(239,68,68,0.14)", border: "rgba(239,68,68,0.28)", accent: "#EF4444", label: "#F87171" },
  { bg: "rgba(99,102,241,0.14)", border: "rgba(99,102,241,0.28)", accent: "#6366F1", label: "#818CF8" },
  { bg: "rgba(20,184,166,0.14)", border: "rgba(20,184,166,0.28)", accent: "#14B8A6", label: "#2DD4BF" },
];

function getColor(index: number) {
  return PLAYER_COLORS[index % PLAYER_COLORS.length];
}

/* ── Card-themed score chip ── */

function ScoreChip({
  round,
  score,
}: {
  round: number;
  score: number;
}) {
  const isBust = score < 0;
  return (
    <div
      className={`inline-flex flex-col items-center justify-center min-w-[34px] h-[42px] rounded-lg border text-center ${
        isBust
          ? "bg-red-500/10 border-red-500/20"
          : "bg-white/[0.05] border-white/[0.08]"
      }`}
    >
      <span className="text-[9px] font-medium text-white/30 leading-none">
        R{round}
      </span>
      <span
        className={`text-sm font-bold tabular-nums leading-tight ${
          isBust ? "text-red-400" : "text-white/60"
        }`}
      >
        {score}
      </span>
    </div>
  );
}

/* ── Main component ── */

export default function Flip7ScoreCounter() {
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
    if (players.length >= 8) return;
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

  const sortedByTotal = [...players].sort(
    (a, b) =>
      b.rounds.reduce((s, r) => s + r, 0) -
      a.rounds.reduce((s, r) => s + r, 0),
  );
  const leaderId =
    sortedByTotal.length > 0 && totalRounds > 0
      ? sortedByTotal[0].id
      : -1;

  return (
    <div className="relative overflow-hidden bg-[#1A0A2E] text-white min-h-[480px]">
      <style>{`
        @keyframes sparkle { 0%,100%{opacity:.15;transform:scale(1)} 50%{opacity:.7;transform:scale(1.5)} }
        @keyframes card-deal { 0%{opacity:0;transform:translateY(-8px) scale(.95)} 100%{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes score-flash { 0%{transform:scale(1)} 40%{transform:scale(1.08)} 100%{transform:scale(1)} }
        @keyframes flip-in { 0%{transform:rotateY(90deg);opacity:0} 100%{transform:rotateY(0deg);opacity:1} }
        .animate-card-deal { animation: card-deal .3s ease-out; }
        .animate-score-flash { animation: score-flash .4s ease-out; }
        .animate-flip-in { animation: flip-in .3s ease-out; }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type="number"] { -moz-appearance: textfield; }
      `}</style>

      {/* Background layers */}
      <FeltTexture />
      <CardScatter />
      <Lucky7 />
      <Sparkles />

      {/* Purple glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(168,85,247,0.1), transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 30% at 50% 100%, rgba(236,72,153,0.06), transparent 50%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-4 pt-5 pb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-purple-300/50">
                Round
              </span>
              <span className="text-2xl font-bold tabular-nums text-purple-200/90">
                {totalRounds}
              </span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-purple-300/50">
                Players
              </span>
              <span className="text-2xl font-bold tabular-nums text-purple-200/90">
                {players.length}
                <span className="text-sm font-normal text-white/20">/8</span>
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
            const isLeader = p.id === leaderId && players.length > 1;

            return (
              <div
                key={p.id}
                className={`rounded-xl p-3 border transition-all ${isLogging ? "animate-score-flash" : ""}`}
                style={{
                  backgroundColor: color.bg,
                  borderColor: color.border,
                }}
              >
                {/* Name + Total */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
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

                {/* Round score chips + input */}
                <div className="flex items-end gap-1.5 flex-wrap">
                  {p.rounds.map((score, i) => (
                    <ScoreChip key={i} round={i + 1} score={score} />
                  ))}
                  {/* Current round input */}
                  <div className="inline-flex flex-col items-center justify-center min-w-[34px] h-[42px] rounded-lg border border-dashed border-white/15 bg-white/[0.04]">
                    <span className="text-[9px] font-medium text-white/25 leading-none">
                      R{totalRounds + 1}
                    </span>
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
                      placeholder="0"
                      className="w-10 text-sm font-bold text-center tabular-nums bg-transparent text-white placeholder:text-white/15 focus:outline-none leading-tight"
                    />
                  </div>
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
            background:
              "linear-gradient(135deg, #7C3AED 0%, #A855F7 50%, #EC4899 100%)",
          }}
        >
          <span className="flex items-center justify-center gap-2">
            {/* Card flip icon */}
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
              <rect x="2" y="3" width="12" height="16" rx="2" stroke="white" strokeWidth="1.5" fill="none" />
              <rect x="6" y="1" width="12" height="16" rx="2" stroke="white" strokeWidth="1.5" fill="white" fillOpacity="0.15" />
              <text x="12" y="12" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fontFamily="system-ui">7</text>
            </svg>
            Log Round {totalRounds + 1}
          </span>
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
            maxLength={20}
            className="flex-1 px-3 py-2.5 rounded-xl text-sm bg-white/[0.06] border border-white/10 text-white placeholder:text-white/25 focus:outline-none focus:border-purple-400/30 focus:ring-1 focus:ring-purple-400/20 transition-colors"
          />
          <button
            onClick={addPlayer}
            disabled={players.length >= 8}
            className="px-4 py-2.5 rounded-xl text-sm font-bold bg-white/[0.08] active:bg-white/[0.15] text-purple-300 active:text-purple-200 border border-white/10 transition-all active:scale-95 select-none disabled:opacity-30 disabled:active:scale-100"
          >
            + Add
          </button>
        </div>

        <p className="mt-4 text-[11px] text-white/20 text-center">
          Enter scores for each player, then tap Log Round.
        </p>
      </div>
    </div>
  );
}
