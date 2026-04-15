"use client";

import { useEffect, useRef, useState } from "react";

interface ModelViewerProps {
  src: string;
  alt?: string;
  className?: string;
}

const COLOR_MAP: Record<string, [number, number, number]> = {
  BLACK:  [0.10, 0.10, 0.10],
  WHITE:  [0.95, 0.95, 0.93],
  GRAY:   [0.50, 0.50, 0.50],
  RED:    [0.85, 0.05, 0.05],
  GREEN:  [0.00, 0.45, 0.10],
  BLUE:   [0.05, 0.10, 0.85],
  YELLOW: [0.92, 0.78, 0.10],
  ORANGE: [0.95, 0.55, 0.05],
  PURPLE: [0.50, 0.00, 0.50],
  BROWN:  [0.55, 0.27, 0.07],
};

function extractColor(src: string): [number, number, number] | null {
  const filename = src.split("/").pop()?.toUpperCase() ?? "";
  for (const [key, rgb] of Object.entries(COLOR_MAP)) {
    if (filename.includes(`-${key}`) || filename.includes(`_${key}`)) {
      return rgb;
    }
  }
  return null;
}

let scriptLoaded = false;
let scriptPromise: Promise<void> | null = null;

function loadModelViewerScript(): Promise<void> {
  if (scriptLoaded) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    if (customElements.get("model-viewer")) {
      scriptLoaded = true;
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://cdn.jsdelivr.net/npm/@google/model-viewer@4/dist/model-viewer.min.js";
    script.onload = () => {
      scriptLoaded = true;
      resolve();
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export default function ModelViewer({ src, alt = "3D Model", className = "" }: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadModelViewerScript().then(() => setReady(true));
  }, []);

  useEffect(() => {
    if (!ready || !containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = "";

    const mv = document.createElement("model-viewer") as HTMLElement & { model?: { materials: Array<{ pbrMetallicRoughness: { setBaseColorFactor: (c: number[]) => void } }> } };
    mv.setAttribute("src", src);
    mv.setAttribute("alt", alt);
    mv.setAttribute("auto-rotate", "");
    mv.setAttribute("auto-rotate-delay", "0");
    mv.setAttribute("rotation-per-second", "30deg");
    mv.setAttribute("camera-controls", "");
    mv.setAttribute("touch-action", "pan-y");
    mv.setAttribute("interaction-prompt", "auto");
    mv.setAttribute("shadow-intensity", "0");
    mv.setAttribute("exposure", "0.7");
    mv.setAttribute("environment-image", "neutral");
    mv.setAttribute("tone-mapping", "commerce");
    mv.setAttribute("max-camera-orbit", "auto 90deg auto");
    mv.style.width = "100%";
    mv.style.height = "100%";
    mv.style.display = "block";
    mv.style.setProperty("--poster-color", "transparent");

    const color = extractColor(src);
    if (color) {
      mv.addEventListener("load", () => {
        try {
          const materials = mv.model?.materials;
          if (materials) {
            for (const mat of materials) {
              mat.pbrMetallicRoughness.setBaseColorFactor([...color, 1]);
            }
          }
        } catch {
          // model API not available — render with default color
        }
      });
    }

    container.appendChild(mv);

    return () => {
      container.innerHTML = "";
    };
  }, [ready, src, alt]);

  if (!ready) {
    return (
      <div className={`${className} flex items-center justify-center bg-secondary`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">Loading 3D viewer...</p>
        </div>
      </div>
    );
  }

  return <div ref={containerRef} className={`${className} [&>model-viewer]:block`} />;
}
