"use client";

import { MessageCircle, ArrowRight } from "lucide-react";

interface CustomRequestBarProps {
  onRequestClick: () => void;
}

export default function CustomRequestBar({ onRequestClick }: CustomRequestBarProps) {
  return (
    <div className="sticky top-16 md:top-[4.25rem] z-30 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/70 via-teal-500/60 to-cyan-500/70 dark:from-emerald-600/60 dark:via-teal-600/50 dark:to-cyan-600/60" />
      <div className="absolute inset-0 backdrop-blur-xl" />
      <div className="absolute inset-0 bg-white/10 dark:bg-white/5" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/30" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-black/10 dark:bg-black/20" />
      <button
        onClick={onRequestClick}
        className="relative w-full page-container flex items-center justify-center gap-2 sm:gap-3 py-1.5 sm:py-2 group"
      >
        <MessageCircle size={14} strokeWidth={2} className="text-white/90 flex-shrink-0 drop-shadow-sm" />
        <span className="text-white text-xs sm:text-sm font-medium truncate drop-shadow-sm">
          <span className="sm:hidden">Need something custom? Let&apos;s make it</span>
          <span className="hidden sm:inline">Can&apos;t find what you&apos;re looking for? We&apos;d love to make it for you</span>
        </span>
        <ArrowRight
          size={13}
          strokeWidth={2.5}
          className="text-white/80 group-hover:text-white group-hover:translate-x-0.5 smooth-transition flex-shrink-0 drop-shadow-sm"
        />
      </button>
    </div>
  );
}
