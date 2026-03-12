"use client";

import { MessageCircle, ArrowRight } from "lucide-react";

interface CustomRequestBarProps {
  onRequestClick: () => void;
}

export default function CustomRequestBar({ onRequestClick }: CustomRequestBarProps) {
  return (
    <div className="sticky top-16 md:top-[4.25rem] z-30 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-700 dark:via-teal-700 dark:to-cyan-700">
      <button
        onClick={onRequestClick}
        className="w-full page-container flex items-center justify-center gap-2 sm:gap-3 py-1.5 sm:py-2 group"
      >
        <MessageCircle size={14} strokeWidth={2} className="text-white/90 flex-shrink-0" />
        <span className="text-white/95 text-xs sm:text-sm font-medium truncate">
          <span className="sm:hidden">Need something custom? Let&apos;s make it</span>
          <span className="hidden sm:inline">Can&apos;t find what you&apos;re looking for? We&apos;d love to make it for you</span>
        </span>
        <ArrowRight
          size={13}
          strokeWidth={2.5}
          className="text-white/70 group-hover:text-white group-hover:translate-x-0.5 smooth-transition flex-shrink-0"
        />
      </button>
    </div>
  );
}
