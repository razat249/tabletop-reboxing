"use client";

import { useState, useCallback, useRef } from "react";

/* ── Resource definitions ── */

interface Resource {
  key: string;
  name: string;
  hex: string;
  icon: React.ReactNode;
}

function MCIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <circle cx="12" cy="12" r="10" fill="#D4A017" opacity={0.25} />
      <circle cx="12" cy="12" r="10" stroke="#D4A017" strokeWidth="1.5" />
      <text x="12" y="16.5" textAnchor="middle" fill="#D4A017" fontSize="13" fontWeight="700" fontFamily="system-ui">$</text>
    </svg>
  );
}

function SteelIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path d="M6 4h12l-2 8 2 8H6l2-8-2-8z" fill="#C67B30" opacity={0.25} stroke="#C67B30" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function TitaniumIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path d="M12 2l8 10-8 10-8-10z" fill="#8A8A8A" opacity={0.3} stroke="#A8A8A8" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function PlantIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path d="M12 22V12" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 12C12 8 8 4 4 4c0 4 4 8 8 8z" fill="#4CAF50" opacity={0.3} stroke="#4CAF50" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 15c0-3 3-6 6-6-1 3-3 6-6 6z" fill="#66BB6A" opacity={0.3} stroke="#66BB6A" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function EnergyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill="#9C27B0" opacity={0.3} stroke="#BA68C8" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function HeatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path d="M12 23c-4 0-7-3-7-7 0-3 3-5 5-8 1-1.5 2-3 2-6 0 3 1 4.5 2 6 2 3 5 5 5 8 0 4-3 7-7 7z" fill="#FF5722" opacity={0.3} stroke="#FF7043" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

const RESOURCES: Resource[] = [
  { key: "mc", name: "MegaCredits", hex: "#D4A017", icon: <MCIcon /> },
  { key: "steel", name: "Steel", hex: "#C67B30", icon: <SteelIcon /> },
  { key: "titanium", name: "Titanium", hex: "#A8A8A8", icon: <TitaniumIcon /> },
  { key: "plants", name: "Plants", hex: "#4CAF50", icon: <PlantIcon /> },
  { key: "energy", name: "Energy", hex: "#BA68C8", icon: <EnergyIcon /> },
  { key: "heat", name: "Heat", hex: "#FF5722", icon: <HeatIcon /> },
];

const RESOURCE_CLASSES: Record<string, { card: string; label: string }> = {
  mc: {
    card: "bg-yellow-100/80 border-yellow-300/50 dark:bg-yellow-900/20 dark:border-yellow-700/30",
    label: "text-yellow-700 dark:text-yellow-400",
  },
  steel: {
    card: "bg-orange-100/80 border-orange-300/50 dark:bg-orange-900/20 dark:border-orange-700/30",
    label: "text-orange-700 dark:text-orange-400",
  },
  titanium: {
    card: "bg-gray-100/80 border-gray-300/50 dark:bg-gray-800/30 dark:border-gray-600/30",
    label: "text-gray-600 dark:text-gray-300",
  },
  plants: {
    card: "bg-green-100/80 border-green-300/50 dark:bg-green-900/20 dark:border-green-700/30",
    label: "text-green-700 dark:text-green-400",
  },
  energy: {
    card: "bg-purple-100/80 border-purple-300/50 dark:bg-purple-900/20 dark:border-purple-700/30",
    label: "text-purple-700 dark:text-purple-400",
  },
  heat: {
    card: "bg-red-100/80 border-red-300/50 dark:bg-red-900/20 dark:border-red-700/30",
    label: "text-red-700 dark:text-red-400",
  },
};

/* ── Background SVGs ── */

function MarsHorizon() {
  return (
    <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-28 pointer-events-none opacity-20 dark:opacity-40">
      <defs>
        <linearGradient id="marsGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C0440F" stopOpacity="0" />
          <stop offset="60%" stopColor="#C0440F" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#8B2F0A" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <path d="M0 80 Q50 50 100 70 Q150 90 200 60 Q250 30 300 65 Q350 85 400 55 L400 120 L0 120Z" fill="url(#marsGrad)" />
      <path d="M0 95 Q80 75 160 90 Q240 105 320 80 Q370 70 400 85 L400 120 L0 120Z" fill="#8B2F0A" opacity="0.3" />
    </svg>
  );
}

function StarField() {
  const stars = [
    { cx: 15, cy: 12, r: 0.8 }, { cx: 52, cy: 8, r: 0.5 }, { cx: 88, cy: 22, r: 0.7 },
    { cx: 130, cy: 5, r: 0.4 }, { cx: 170, cy: 18, r: 0.9 }, { cx: 210, cy: 10, r: 0.5 },
    { cx: 250, cy: 25, r: 0.6 }, { cx: 285, cy: 7, r: 0.8 }, { cx: 320, cy: 20, r: 0.4 },
    { cx: 355, cy: 12, r: 0.7 }, { cx: 380, cy: 28, r: 0.5 }, { cx: 40, cy: 35, r: 0.4 },
    { cx: 105, cy: 40, r: 0.6 }, { cx: 195, cy: 38, r: 0.5 }, { cx: 270, cy: 42, r: 0.3 },
    { cx: 340, cy: 35, r: 0.6 }, { cx: 65, cy: 48, r: 0.7 }, { cx: 155, cy: 50, r: 0.4 },
    { cx: 230, cy: 45, r: 0.5 }, { cx: 310, cy: 52, r: 0.3 },
  ];
  return (
    <svg viewBox="0 0 400 60" preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-16 pointer-events-none hidden dark:block opacity-60">
      {stars.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="white"
          className={i % 3 === 0 ? "animate-twinkle-slow" : i % 3 === 1 ? "animate-twinkle-mid" : "animate-twinkle-fast"} />
      ))}
    </svg>
  );
}

function MarsPlanet() {
  return (
    <svg viewBox="0 0 80 80" className="absolute -top-4 -right-4 w-24 h-24 opacity-10 dark:opacity-15 pointer-events-none">
      <circle cx="40" cy="40" r="36" fill="#C0440F" />
      <ellipse cx="28" cy="30" rx="12" ry="6" fill="#A0360C" opacity="0.6" />
      <ellipse cx="50" cy="45" rx="8" ry="4" fill="#A0360C" opacity="0.5" />
      <circle cx="35" cy="50" r="5" fill="#8B2F0A" opacity="0.4" />
      <circle cx="40" cy="40" r="36" fill="none" stroke="#E05020" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}

/* ── Stepper ── */

function Stepper({
  value,
  onDec,
  onInc,
  color,
  size = "normal",
}: {
  value: number;
  onDec: () => void;
  onInc: () => void;
  color: string;
  size?: "normal" | "large";
}) {
  const btnClass = size === "large"
    ? "w-10 h-10 rounded-xl text-base"
    : "w-9 h-9 rounded-lg text-sm";
  const valClass = size === "large"
    ? "w-14 text-center text-2xl font-bold tabular-nums"
    : "w-10 text-center text-lg font-bold tabular-nums";

  return (
    <div className="flex items-center gap-0.5">
      <button
        onClick={onDec}
        className={`${btnClass} bg-black/[0.06] dark:bg-white/[0.07] active:bg-black/[0.12] dark:active:bg-white/[0.15] text-foreground/70 active:text-foreground font-bold transition-all active:scale-95 select-none`}
      >
        −
      </button>
      <span className={valClass} style={{ color }}>{value}</span>
      <button
        onClick={onInc}
        className={`${btnClass} bg-black/[0.06] dark:bg-white/[0.07] active:bg-black/[0.12] dark:active:bg-white/[0.15] text-foreground/70 active:text-foreground font-bold transition-all active:scale-95 select-none`}
      >
        +
      </button>
    </div>
  );
}

/* ── Main component ── */

type Values = Record<string, { production: number; stock: number }>;

function initValues(): Values {
  const v: Values = {};
  RESOURCES.forEach((r) => { v[r.key] = { production: 0, stock: 0 }; });
  return v;
}

export default function TerraformingMarsPlayerMat() {
  const [values, setValues] = useState<Values>(initValues);
  const [terraformRating, setTerraformRating] = useState(20);
  const [generation, setGeneration] = useState(1);
  const [isProducing, setIsProducing] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const update = useCallback(
    (key: string, field: "production" | "stock", delta: number) => {
      setValues((prev) => {
        const current = prev[key][field];
        const min = field === "production" ? -5 : 0;
        const next = Math.max(min, current + delta);
        return { ...prev, [key]: { ...prev[key], [field]: next } };
      });
    },
    [],
  );

  const produce = useCallback(() => {
    setIsProducing(true);
    setValues((prev) => {
      const next = { ...prev };
      RESOURCES.forEach((r) => {
        const p = prev[r.key];
        if (r.key === "energy") {
          next["heat"] = { ...next["heat"], stock: next["heat"].stock + p.stock };
          next[r.key] = { ...p, stock: p.production };
        } else {
          next[r.key] = { ...p, stock: p.stock + p.production };
        }
      });
      return next;
    });
    setGeneration((g) => g + 1);
    setTimeout(() => setIsProducing(false), 600);
  }, []);

  const reset = useCallback(() => {
    setValues(initValues());
    setTerraformRating(20);
    setGeneration(1);
  }, []);

  return (
    <div className="relative overflow-hidden bg-amber-50/50 dark:bg-[#0C0C14] text-foreground min-h-[480px]">
      <style>{`
        @keyframes twinkle-slow { 0%,100%{opacity:.3} 50%{opacity:1} }
        @keyframes twinkle-mid  { 0%,100%{opacity:.5} 50%{opacity:.2} }
        @keyframes twinkle-fast { 0%,100%{opacity:.2} 50%{opacity:.9} }
        @keyframes produce-glow { 0%{box-shadow:0 0 0 0 rgba(192,68,15,.4)} 50%{box-shadow:0 0 20px 4px rgba(192,68,15,.15)} 100%{box-shadow:0 0 0 0 rgba(192,68,15,0)} }
        .animate-twinkle-slow { animation: twinkle-slow 4s ease-in-out infinite; }
        .animate-twinkle-mid  { animation: twinkle-mid  3s ease-in-out infinite 0.5s; }
        .animate-twinkle-fast { animation: twinkle-fast 2.5s ease-in-out infinite 1s; }
        .animate-produce-glow { animation: produce-glow .6s ease-out; }
      `}</style>

      {/* Background layers */}
      <StarField />
      <MarsHorizon />
      <MarsPlanet />

      {/* Light-mode warm glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-200/20 via-transparent to-orange-300/10 dark:from-transparent dark:to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 px-4 pt-5 pb-6">
        {/* Header: TR + Generation */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-orange-600/70 dark:text-orange-300/70 mb-1">
                TR
              </span>
              <Stepper
                value={terraformRating}
                onDec={() => setTerraformRating((p) => Math.max(0, p - 1))}
                onInc={() => setTerraformRating((p) => p + 1)}
                color="#D97706"
                size="large"
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-orange-600/70 dark:text-orange-300/70 mb-1">
                Gen
              </span>
              <span className="text-2xl font-bold tabular-nums text-orange-700 dark:text-orange-200/90 h-10 flex items-center">
                {generation}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={produce}
              disabled={isProducing}
              className={`relative px-4 py-2.5 rounded-xl text-sm font-bold text-white overflow-hidden transition-all active:scale-95 select-none ${isProducing ? "opacity-70" : "active:brightness-110"}`}
              style={{ background: "linear-gradient(135deg, #C0440F 0%, #E05A20 100%)" }}
            >
              <span className="relative z-10">Produce</span>
              {isProducing && <span className="absolute inset-0 bg-white/20 animate-pulse" />}
            </button>
            <button
              onClick={reset}
              className="w-10 h-10 rounded-xl bg-black/[0.06] dark:bg-white/[0.07] active:bg-black/[0.12] dark:active:bg-white/[0.12] text-foreground/40 active:text-foreground/70 flex items-center justify-center transition-all active:scale-95 select-none"
              aria-label="Reset all"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M1 4v6h6" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
            </button>
          </div>
        </div>

        {/* Resource Grid */}
        <div
          ref={gridRef}
          className={`grid grid-cols-2 gap-2.5 ${isProducing ? "animate-produce-glow" : ""}`}
        >
          {RESOURCES.map((r) => {
            const v = values[r.key];
            const cls = RESOURCE_CLASSES[r.key];
            return (
              <div key={r.key} className={`rounded-xl p-3 border transition-colors ${cls.card}`}>
                <div className="flex items-center gap-1.5 mb-3">
                  {r.icon}
                  <span className={`text-xs font-bold uppercase tracking-wider ${cls.label}`}>
                    {r.name}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground/30">
                    Prod
                  </span>
                  <Stepper
                    value={v.production}
                    onDec={() => update(r.key, "production", -1)}
                    onInc={() => update(r.key, "production", 1)}
                    color={r.hex}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground/30">
                    Stock
                  </span>
                  <Stepper
                    value={v.stock}
                    onDec={() => update(r.key, "stock", -1)}
                    onInc={() => update(r.key, "stock", 1)}
                    color={r.hex}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-[11px] text-foreground/25 text-center leading-relaxed">
          Produce: Energy stock → Heat, then add production to each resource.
        </p>
      </div>
    </div>
  );
}
