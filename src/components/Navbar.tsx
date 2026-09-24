"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Trophy,
  BookOpen,
  Info,
  Home,
  Menu,
  X,
  Search,
  GraduationCap,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navSearch, setNavSearch] = useState("");

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/ranking", label: "Cumulative Ranking", icon: Trophy },
    { href: "/courses", label: "Course Explorer", icon: BookOpen },
    { href: "/about", label: "Source & About", icon: Info },
  ];

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = navSearch.trim();
    if (!q) return;

    if (/^\d{10}$/.test(q)) {
      window.location.href = `/student/${q}`;
      return;
    }

    try {
      const res = await fetch(`/api/students?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (data.students && data.students.length > 0) {
        window.location.href = `/student/${data.students[0].regNo}`;
        return;
      }
    } catch {
      // Fallback to ranking
    }
    window.location.href = `/ranking?q=${encodeURIComponent(q)}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Titles */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative w-12 h-14 flex-shrink-0 transition-transform group-hover:scale-105">
              <Image
                src="/sust-logo.png"
                alt="Shahjalal University of Science and Technology logo"
                fill
                sizes="48px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold tracking-wider uppercase text-sust-forest">
                  SUST CSE
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-sust-gold"></span>
                <span className="text-xs font-medium text-slate-500">
                  Batch 2024
                </span>
              </div>
              <span className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-sust-forest transition-colors leading-tight">
                Academic Result & Ranking Portal
              </span>
              <span className="text-xs text-slate-500 hidden sm:block">
                Department of Computer Science & Engineering
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-sust-forest text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-sust-gold" : "text-slate-400"}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action / Search Bar */}
          <div className="hidden md:flex items-center gap-3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Reg No (e.g. 2024331080)..."
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                className="w-56 pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-sust-forest/30 focus:border-sust-forest transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2 pointer-events-none" />
            </form>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <input
              type="text"
              placeholder="Search Reg No (e.g. 2024331080)..."
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sust-forest/30"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          </form>

          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-sust-forest text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-sust-gold" : "text-slate-400"}`} />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
