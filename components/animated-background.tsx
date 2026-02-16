"use client";

import { useEffect, useState, useRef } from "react";

export default function AnimatedBackground() {
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Meeple - top left, slow drift */}
      <svg
        className="absolute animate-float-slow"
        style={{
          top: "6%",
          left: "4%",
          transform: `translateY(${scrollY * 0.08}px)`,
          width: 72,
          height: 90,
        }}
        viewBox="0 0 84 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="42" cy="16" r="16" fill="#e85d5d" opacity="0.12" />
        <path
          d="M24,32 C24,32 30,18 42,18 C54,18 60,32 60,32 C60,32 72,62 72,78 C72,85 64,90 56,90 L54,100 L30,100 L28,90 C20,90 12,85 12,78 C12,62 24,32 24,32Z"
          fill="#e85d5d"
          opacity="0.12"
        />
      </svg>

      {/* Dice - top right, medium drift */}
      <svg
        className="absolute animate-float-medium"
        style={{
          top: "8%",
          right: "6%",
          transform: `translateY(${scrollY * -0.06}px) rotate(${scrollY * 0.02}deg)`,
          width: 56,
          height: 56,
        }}
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="52" height="52" rx="9" fill="#5b8dd9" opacity="0.1" />
        <circle cx="14" cy="14" r="4.5" fill="#5b8dd9" opacity="0.12" />
        <circle cx="38" cy="14" r="4.5" fill="#5b8dd9" opacity="0.12" />
        <circle cx="26" cy="26" r="4.5" fill="#5b8dd9" opacity="0.12" />
        <circle cx="14" cy="38" r="4.5" fill="#5b8dd9" opacity="0.12" />
        <circle cx="38" cy="38" r="4.5" fill="#5b8dd9" opacity="0.12" />
      </svg>

      {/* Hexagon - left middle */}
      <svg
        className="absolute animate-float-reverse"
        style={{
          top: "35%",
          left: "2%",
          transform: `translateY(${scrollY * 0.12}px) rotate(${scrollY * -0.015}deg)`,
          width: 80,
          height: 80,
        }}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="40,5 72,22 72,58 40,75 8,58 8,22"
          stroke="#4db88a"
          strokeWidth="1.5"
          fill="#4db88a"
          opacity="0.06"
        />
        <polygon
          points="40,15 62,28 62,52 40,65 18,52 18,28"
          stroke="#4db88a"
          strokeWidth="1"
          fill="none"
          opacity="0.06"
        />
      </svg>

      {/* Card - right middle */}
      <svg
        className="absolute animate-float-slow"
        style={{
          top: "42%",
          right: "3%",
          transform: `translateY(${scrollY * -0.1}px) rotate(${15 + scrollY * 0.01}deg)`,
          width: 44,
          height: 62,
        }}
        viewBox="0 0 34 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="34"
          height="48"
          rx="4"
          fill="#f0c04a"
          opacity="0.08"
          stroke="#f0c04a"
          strokeWidth="1"
          strokeOpacity="0.1"
        />
        <path
          d="M17,14 C17,14 10,8 10,12 C10,18 17,24 17,24 C17,24 24,18 24,12 C24,8 17,14 17,14Z"
          fill="#e85d5d"
          opacity="0.1"
        />
      </svg>

      {/* Star - upper center-left */}
      <svg
        className="absolute animate-twinkle"
        style={{
          top: "18%",
          left: "22%",
          transform: `translateY(${scrollY * 0.05}px)`,
          width: 28,
          height: 28,
        }}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8,0 L10,6 L16,8 L10,10 L8,16 L6,10 L0,8 L6,6Z"
          fill="#f0c04a"
          opacity="0.12"
        />
      </svg>

      {/* Meeple small - right, lower */}
      <svg
        className="absolute animate-float-medium"
        style={{
          top: "65%",
          right: "8%",
          transform: `translateY(${scrollY * 0.07}px)`,
          width: 48,
          height: 60,
        }}
        viewBox="0 0 84 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="42" cy="16" r="16" fill="#9b7ed8" opacity="0.1" />
        <path
          d="M24,32 C24,32 30,18 42,18 C54,18 60,32 60,32 C60,32 72,62 72,78 C72,85 64,90 56,90 L54,100 L30,100 L28,90 C20,90 12,85 12,78 C12,62 24,32 24,32Z"
          fill="#9b7ed8"
          opacity="0.1"
        />
      </svg>

      {/* Token ring - bottom left */}
      <svg
        className="absolute animate-float-reverse"
        style={{
          top: "72%",
          left: "5%",
          transform: `translateY(${scrollY * -0.08}px) rotate(${scrollY * 0.03}deg)`,
          width: 50,
          height: 50,
        }}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke="#e8944a"
          strokeWidth="2.5"
          fill="none"
          opacity="0.1"
        />
        <circle cx="20" cy="20" r="8" fill="#e8944a" opacity="0.06" />
      </svg>

      {/* Small dice - bottom center-right */}
      <svg
        className="absolute animate-float-slow"
        style={{
          top: "82%",
          right: "25%",
          transform: `translateY(${scrollY * 0.04}px) rotate(${-10 + scrollY * -0.02}deg)`,
          width: 36,
          height: 36,
        }}
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="34" height="34" rx="6" fill="#4ecdc4" opacity="0.08" />
        <circle cx="17" cy="17" r="4" fill="#4ecdc4" opacity="0.12" />
      </svg>

      {/* Star sparkle - upper right */}
      <svg
        className="absolute animate-twinkle-delayed"
        style={{
          top: "14%",
          right: "20%",
          transform: `translateY(${scrollY * -0.04}px)`,
          width: 22,
          height: 22,
        }}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8,0 L10,6 L16,8 L10,10 L8,16 L6,10 L0,8 L6,6Z"
          fill="#4ecdc4"
          opacity="0.12"
        />
      </svg>

      {/* Chess pawn - lower left */}
      <svg
        className="absolute animate-float-medium"
        style={{
          top: "55%",
          left: "8%",
          transform: `translateY(${scrollY * 0.09}px)`,
          width: 34,
          height: 50,
        }}
        viewBox="0 0 28 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="14" cy="8" r="7" fill="#e87bb5" opacity="0.09" />
        <path
          d="M8,15 C8,15 6,24 5,30 L23,30 C22,24 20,15 20,15Z"
          fill="#e87bb5"
          opacity="0.09"
        />
        <rect
          x="3"
          y="30"
          width="22"
          height="4"
          rx="2"
          fill="#e87bb5"
          opacity="0.09"
        />
        <rect
          x="0"
          y="34"
          width="28"
          height="5"
          rx="2.5"
          fill="#e87bb5"
          opacity="0.09"
        />
      </svg>

      {/* Puzzle piece - upper center-right */}
      <svg
        className="absolute animate-float-reverse"
        style={{
          top: "25%",
          right: "14%",
          transform: `translateY(${scrollY * 0.06}px) rotate(${-8 + scrollY * 0.01}deg)`,
          width: 46,
          height: 46,
        }}
        viewBox="0 0 52 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,12 L0,0 L38,0 L38,12 C38,12 45,6 52,12 C59,18 52,24 38,24 L38,38 L0,38 L0,24 C0,24 -7,18 0,12Z"
          fill="#4db88a"
          opacity="0.08"
        />
      </svg>

      {/* Coin stack - lower center-left */}
      <svg
        className="absolute animate-float-slow"
        style={{
          top: "78%",
          left: "20%",
          transform: `translateY(${scrollY * -0.05}px)`,
          width: 44,
          height: 36,
        }}
        viewBox="0 0 36 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          cx="18"
          cy="22"
          rx="18"
          ry="6"
          fill="#f0c04a"
          opacity="0.08"
        />
        <ellipse
          cx="18"
          cy="18"
          rx="18"
          ry="6"
          fill="#f0c04a"
          opacity="0.1"
        />
        <ellipse
          cx="18"
          cy="14"
          rx="18"
          ry="6"
          fill="#f0c04a"
          opacity="0.12"
        />
      </svg>

      {/* Tiny floating dots for depth */}
      <div
        className="absolute w-2 h-2 rounded-full bg-primary/10 animate-drift-1"
        style={{
          top: "30%",
          left: "35%",
          transform: `translateY(${scrollY * 0.03}px)`,
        }}
      />
      <div
        className="absolute w-1.5 h-1.5 rounded-full bg-[#e85d5d]/10 animate-drift-2"
        style={{
          top: "50%",
          right: "30%",
          transform: `translateY(${scrollY * -0.04}px)`,
        }}
      />
      <div
        className="absolute w-2.5 h-2.5 rounded-full bg-[#5b8dd9]/8 animate-drift-3"
        style={{
          top: "70%",
          left: "40%",
          transform: `translateY(${scrollY * 0.02}px)`,
        }}
      />
      <div
        className="absolute w-1.5 h-1.5 rounded-full bg-[#9b7ed8]/10 animate-drift-1"
        style={{
          top: "20%",
          left: "60%",
          transform: `translateY(${scrollY * -0.03}px)`,
        }}
      />
      <div
        className="absolute w-2 h-2 rounded-full bg-[#4ecdc4]/10 animate-drift-2"
        style={{
          top: "88%",
          right: "15%",
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      />
    </div>
  );
}
