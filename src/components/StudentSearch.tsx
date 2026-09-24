"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Student } from "@/types";
import { Search, X, ChevronRight, User, Hash } from "lucide-react";

interface StudentSearchProps {
  students: Student[];
  variant?: "hero" | "navbar";
  placeholder?: string;
}

export const StudentSearch: React.FC<StudentSearchProps> = ({
  students,
  variant = "hero",
  placeholder = "Search student name or roll (e.g. 2024331080, Perves)...",
}) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter students based on query
  const trimmed = query.trim().toLowerCase();
  const matches = trimmed
    ? students
        .filter(
          (s) =>
            s.regNo.toLowerCase().includes(trimmed) ||
            s.name.toLowerCase().includes(trimmed)
        )
        .slice(0, 8)
    : [];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectStudent = (student: Student) => {
    setIsOpen(false);
    setQuery("");
    router.push(`/student/${student.regNo}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trimmed) return;

    // Check if an item is highlighted via keyboard navigation
    if (selectedIndex >= 0 && selectedIndex < matches.length) {
      handleSelectStudent(matches[selectedIndex]);
      return;
    }

    // 1. Exact registration number match
    const exactRegMatch = students.find(
      (s) => s.regNo.toLowerCase() === trimmed
    );
    if (exactRegMatch) {
      handleSelectStudent(exactRegMatch);
      return;
    }

    // 2. Partial matches found
    if (matches.length > 0) {
      // Direct jump to the first/best matched student's profile!
      handleSelectStudent(matches[0]);
      return;
    }

    // 3. Fallback to ranking page with filter query
    setIsOpen(false);
    router.push(`/ranking?q=${encodeURIComponent(query.trim())}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || matches.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < matches.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : matches.length - 1));
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  if (variant === "navbar") {
    return (
      <div ref={containerRef} className="relative w-64 md:w-72">
        <form onSubmit={handleSubmit} className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search student or roll..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setSelectedIndex(-1);
            }}
            onFocus={() => {
              if (query.trim()) setIsOpen(true);
            }}
            onKeyDown={handleKeyDown}
            className="w-full pl-9 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-sust-forest/30 focus:border-sust-forest transition-all"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setIsOpen(false);
              }}
              className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </form>

        {/* Navbar Live Dropdown */}
        {isOpen && trimmed && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 text-left">
            {matches.length === 0 ? (
              <div className="p-3 text-center text-xs text-slate-400">
                No matching student found.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                {matches.map((s, idx) => (
                  <button
                    key={s.regNo}
                    type="button"
                    onClick={() => handleSelectStudent(s)}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50/70 transition-colors ${
                      selectedIndex === idx ? "bg-emerald-50" : ""
                    }`}
                  >
                    <div>
                      <span className="font-bold text-slate-900 block truncate">
                        {s.name}
                      </span>
                      <span className="font-mono text-[11px] text-slate-500">
                        {s.regNo} • Rank #{s.rank}
                      </span>
                    </div>
                    <span className="font-extrabold text-sust-forest text-xs ml-2">
                      {s.cgpa.toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Hero variant (Full prominence)
  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center shadow-xl rounded-full overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 p-1.5 focus-within:ring-2 focus-within:ring-emerald-400"
      >
        <Search className="w-5 h-5 text-slate-300 ml-3.5 pointer-events-none flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-slate-300 focus:outline-none"
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="p-1.5 text-slate-300 hover:text-white mr-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <button
          type="submit"
          className="px-5 py-2.5 rounded-full bg-sust-forest hover:bg-emerald-600 text-white font-semibold text-xs transition-all shadow-md flex items-center gap-1.5 flex-shrink-0"
        >
          <span>Search</span>
        </button>
      </form>

      {/* Floating Suggestions Dropdown */}
      {isOpen && trimmed && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 text-left">
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            <span>Student Search Results</span>
            <span>{matches.length} Match{matches.length !== 1 ? "es" : ""}</span>
          </div>

          {matches.length === 0 ? (
            <div className="p-6 text-center text-sm text-slate-500">
              No students found for &ldquo;<span className="font-semibold text-slate-800">{query}</span>&rdquo;.
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    router.push(`/ranking?q=${encodeURIComponent(query.trim())}`);
                  }}
                  className="text-xs font-semibold text-sust-forest hover:underline"
                >
                  Search on Cumulative Rankings page →
                </button>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
              {matches.map((s, idx) => (
                <button
                  key={s.regNo}
                  type="button"
                  onClick={() => handleSelectStudent(s)}
                  className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-emerald-50/80 transition-colors group ${
                    selectedIndex === idx ? "bg-emerald-50" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-emerald-100 flex items-center justify-center text-slate-700 group-hover:text-sust-forest font-bold text-xs transition-colors">
                      {s.rank <= 3 ? `${s.rank}` : `#${s.rank}`}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-sust-forest transition-colors">
                        {s.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-mono">
                        {s.regNo} • Session: {s.session}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        CGPA
                      </span>
                      <span className="text-sm font-black text-sust-forest">
                        {s.cgpa.toFixed(2)}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-sust-forest group-hover:translate-x-0.5 transition-all" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {matches.length > 0 && (
            <div className="bg-slate-50 px-4 py-2 border-t border-slate-100 text-center">
              <span className="text-[11px] text-slate-500">
                Press <strong>Enter</strong> to open the student profile immediately
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
