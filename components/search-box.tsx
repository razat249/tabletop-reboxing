"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface SearchSuggestion {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface SearchBoxProps {
  onSearch: (query: string) => void;
  onChange?: (query: string) => void;
  suggestions?: SearchSuggestion[];
  placeholder?: string;
  compact?: boolean;
  variant?: "default" | "hero";
}

export default function SearchBox({
  onSearch,
  onChange,
  suggestions,
  placeholder = "Search board game components...",
  compact = false,
  variant = "default",
}: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = suggestions
    ? suggestions
        .filter(
          (item) =>
            query.length >= 1 &&
            (item.name.toLowerCase().includes(query.toLowerCase()) ||
              item.category.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, 6)
    : [];

  const showDropdown = isOpen && query.length >= 1 && filtered.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setActiveIndex(-1);
    setIsOpen(true);
    onChange?.(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeIndex >= 0 && activeIndex < filtered.length) {
      return;
    }
    if (query.trim()) {
      setIsOpen(false);
      onSearch(query);
    }
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!showDropdown) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
      } else if (e.key === "Escape") {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    },
    [showDropdown, filtered.length]
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const inputSizeClasses = compact
    ? "pl-9 pr-3 py-2 text-sm"
    : variant === "hero"
      ? "pl-14 pr-5 py-[1.125rem] text-base"
      : "pl-11 pr-4 py-3 text-sm";

  const iconSizeClasses = compact
    ? "left-3 w-4 h-4"
    : variant === "hero"
      ? "left-5 w-5 h-5"
      : "left-4 w-[1.125rem] h-[1.125rem]";

  const heroClasses =
    variant === "hero"
      ? "shadow-lg border-border/80 bg-background/95 backdrop-blur-sm focus:ring-primary/40 focus:border-primary/50 focus:shadow-xl focus:shadow-primary/5"
      : "shadow-card";

  return (
    <div ref={wrapperRef} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <Search
          className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground z-10 ${iconSizeClasses}`}
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          role="combobox"
          aria-expanded={showDropdown}
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined
          }
          className={`w-full bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 smooth-transition ${inputSizeClasses} ${heroClasses} ${
            showDropdown
              ? "rounded-t-xl rounded-b-none border-b-transparent"
              : "rounded-xl"
          }`}
        />
      </form>

      {/* Suggestions Dropdown */}
      {showDropdown && (
        <div
          role="listbox"
          className="absolute z-50 w-full bg-card border border-t-0 border-border rounded-b-xl shadow-card-hover overflow-hidden"
        >
          <ul className="py-1">
            {filtered.map((item, index) => (
              <li
                key={item.id}
                role="option"
                aria-selected={index === activeIndex}
              >
                <Link
                  id={`suggestion-${index}`}
                  href={`/products/${item.id}`}
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                  }}
                  className={`flex items-center gap-3 px-4 py-2.5 smooth-transition ${
                    index === activeIndex
                      ? "bg-secondary"
                      : "hover:bg-secondary/60"
                  }`}
                >
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-secondary">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {item.name}
                    </p>
                    <p className="text-2xs text-muted-foreground uppercase tracking-wider">
                      {item.category}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-foreground tabular-nums flex-shrink-0">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* View all results link */}
          <div className="border-t border-border/60">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onSearch(query);
              }}
              className="flex items-center justify-center gap-1.5 w-full px-4 py-2.5 text-xs font-medium text-primary hover:bg-secondary/60 smooth-transition"
            >
              View all results for &ldquo;{query}&rdquo;
              <ArrowRight size={12} strokeWidth={2} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
