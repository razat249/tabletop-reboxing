"use client";

import { useState, useCallback } from "react";
import { RotateCcw } from "lucide-react";

interface Resource {
  key: string;
  name: string;
  color: string;
  bgColor: string;
}

const RESOURCES: Resource[] = [
  { key: "mc", name: "MegaCredits", color: "text-yellow-600 dark:text-yellow-400", bgColor: "bg-yellow-500/15" },
  { key: "steel", name: "Steel", color: "text-orange-700 dark:text-orange-400", bgColor: "bg-orange-500/15" },
  { key: "titanium", name: "Titanium", color: "text-gray-600 dark:text-gray-300", bgColor: "bg-gray-500/15" },
  { key: "plants", name: "Plants", color: "text-green-600 dark:text-green-400", bgColor: "bg-green-500/15" },
  { key: "energy", name: "Energy", color: "text-purple-600 dark:text-purple-400", bgColor: "bg-purple-500/15" },
  { key: "heat", name: "Heat", color: "text-red-600 dark:text-red-400", bgColor: "bg-red-500/15" },
];

type Values = Record<string, { production: number; stock: number }>;

function initValues(): Values {
  const v: Values = {};
  RESOURCES.forEach((r) => {
    v[r.key] = { production: 0, stock: 0 };
  });
  return v;
}

export default function TerraformingMarsPlayerMat() {
  const [values, setValues] = useState<Values>(initValues);
  const [terraformRating, setTerraformRating] = useState(20);

  const update = useCallback(
    (key: string, field: "production" | "stock", delta: number) => {
      setValues((prev) => {
        const current = prev[key][field];
        const min = field === "production" ? -5 : 0;
        const next = Math.max(min, current + delta);
        return { ...prev, [key]: { ...prev[key], [field]: next } };
      });
    },
    []
  );

  const produce = useCallback(() => {
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
    setTerraformRating((prev) => prev + 1);
  }, []);

  const reset = useCallback(() => {
    setValues(initValues());
    setTerraformRating(20);
  }, []);

  return (
    <div className="p-4 sm:p-6">
      {/* TR + Actions */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              TR
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setTerraformRating((p) => Math.max(0, p - 1))}
                className="w-7 h-7 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground text-sm font-bold smooth-transition"
              >
                −
              </button>
              <span className="w-10 text-center text-lg font-bold text-foreground tabular-nums">
                {terraformRating}
              </span>
              <button
                onClick={() => setTerraformRating((p) => p + 1)}
                className="w-7 h-7 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground text-sm font-bold smooth-transition"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={produce}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-primary hover:bg-primary/90 smooth-transition"
          >
            Produce
          </button>
          <button
            onClick={reset}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary smooth-transition"
            aria-label="Reset"
          >
            <RotateCcw size={16} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {RESOURCES.map((r) => {
          const v = values[r.key];
          return (
            <div
              key={r.key}
              className={`rounded-xl border border-border/60 ${r.bgColor} p-3 sm:p-4`}
            >
              <p className={`text-xs font-semibold uppercase tracking-wider ${r.color} mb-3`}>
                {r.name}
              </p>

              {/* Production */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xs text-muted-foreground uppercase tracking-wider">
                  Prod
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => update(r.key, "production", -1)}
                    className="w-6 h-6 rounded-md bg-background/60 hover:bg-background text-foreground text-xs font-bold smooth-transition"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-foreground tabular-nums">
                    {v.production}
                  </span>
                  <button
                    onClick={() => update(r.key, "production", 1)}
                    className="w-6 h-6 rounded-md bg-background/60 hover:bg-background text-foreground text-xs font-bold smooth-transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Stock */}
              <div className="flex items-center justify-between">
                <span className="text-2xs text-muted-foreground uppercase tracking-wider">
                  Stock
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => update(r.key, "stock", -1)}
                    className="w-6 h-6 rounded-md bg-background/60 hover:bg-background text-foreground text-xs font-bold smooth-transition"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-foreground tabular-nums">
                    {v.stock}
                  </span>
                  <button
                    onClick={() => update(r.key, "stock", 1)}
                    className="w-6 h-6 rounded-md bg-background/60 hover:bg-background text-foreground text-xs font-bold smooth-transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-2xs text-muted-foreground text-center">
        Produce converts Energy → Heat, then adds production to each stock.
      </p>
    </div>
  );
}
