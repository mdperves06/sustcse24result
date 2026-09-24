"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Student } from "@/types";
import { GradeBadge } from "@/components/GradeBadge";
import {
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Trophy,
  Medal,
  Award,
  ChevronRight,
  Filter,
} from "lucide-react";

interface RankingTableProps {
  students: Student[];
}

type SortField =
  | "rank"
  | "regNo"
  | "name"
  | "sem1Gpa"
  | "sem2Gpa"
  | "cgpa"
  | "totalCompletedCredits";

export const RankingTable: React.FC<RankingTableProps> = ({ students }) => {
  const [search, setSearch] = useState("");
  const [cgpaFilter, setCgpaFilter] = useState<"all" | "3.75" | "3.50" | "3.00">(
    "all"
  );
  const [sessionFilter, setSessionFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("rank");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(25);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder(field === "rank" ? "asc" : "desc");
    }
  };

  const filteredAndSorted = useMemo(() => {
    return students
      .filter((s) => {
        // Search filter
        const q = search.toLowerCase().trim();
        const matchesSearch =
          !q ||
          s.regNo.toLowerCase().includes(q) ||
          s.name.toLowerCase().includes(q);

        // CGPA filter
        let matchesCgpa = true;
        if (cgpaFilter === "3.75") matchesCgpa = s.cgpa >= 3.75;
        else if (cgpaFilter === "3.50") matchesCgpa = s.cgpa >= 3.50;
        else if (cgpaFilter === "3.00") matchesCgpa = s.cgpa >= 3.00;

        // Session filter
        let matchesSession = true;
        if (sessionFilter !== "all") {
          matchesSession = s.session === sessionFilter;
        }

        return matchesSearch && matchesCgpa && matchesSession;
      })
      .sort((a, b) => {
        let valA: string | number = a[sortField] ?? 0;
        let valB: string | number = b[sortField] ?? 0;

        if (typeof valA === "string") {
          return sortOrder === "asc"
            ? (valA as string).localeCompare(valB as string)
            : (valB as string).localeCompare(valA as string);
        }

        return sortOrder === "asc"
          ? (valA as number) - (valB as number)
          : (valB as number) - (valA as number);
      });
  }, [students, search, cgpaFilter, sessionFilter, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredAndSorted.length / pageSize);
  const paginatedStudents = useMemo(() => {
    if (pageSize === -1) return filteredAndSorted;
    const start = (currentPage - 1) * pageSize;
    return filteredAndSorted.slice(start, start + pageSize);
  }, [filteredAndSorted, currentPage, pageSize]);

  const renderRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-sm">
          <Trophy className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
          1st
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-200 text-slate-800 border border-slate-300 shadow-sm">
          <Medal className="w-3.5 h-3.5 text-slate-600 fill-slate-400" />
          2nd
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-700/10 text-amber-900 border border-amber-600/30 shadow-sm">
          <Award className="w-3.5 h-3.5 text-amber-700 fill-amber-700" />
          3rd
        </span>
      );
    }
    return (
      <span className="font-semibold text-slate-700 text-sm pl-2">
        #{rank}
      </span>
    );
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3 h-3 text-slate-400 opacity-60" />;
    }
    return sortOrder === "asc" ? (
      <ArrowUp className="w-3 h-3 text-sust-forest" />
    ) : (
      <ArrowDown className="w-3 h-3 text-sust-forest" />
    );
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name or reg no..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sust-forest/30 focus:border-sust-forest transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* CGPA Filter Buttons */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-medium text-slate-600">
            <button
              onClick={() => {
                setCgpaFilter("all");
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-md transition-all ${
                cgpaFilter === "all"
                  ? "bg-white text-sust-forest font-bold shadow-sm"
                  : "hover:text-slate-900"
              }`}
            >
              All ({students.length})
            </button>
            <button
              onClick={() => {
                setCgpaFilter("3.75");
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-md transition-all ${
                cgpaFilter === "3.75"
                  ? "bg-sust-forest text-white font-bold shadow-sm"
                  : "hover:text-slate-900"
              }`}
            >
              ≥ 3.75
            </button>
            <button
              onClick={() => {
                setCgpaFilter("3.50");
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-md transition-all ${
                cgpaFilter === "3.50"
                  ? "bg-sust-forest text-white font-bold shadow-sm"
                  : "hover:text-slate-900"
              }`}
            >
              ≥ 3.50
            </button>
            <button
              onClick={() => {
                setCgpaFilter("3.00");
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-md transition-all ${
                cgpaFilter === "3.00"
                  ? "bg-sust-forest text-white font-bold shadow-sm"
                  : "hover:text-slate-900"
              }`}
            >
              ≥ 3.00
            </button>
          </div>

          {/* Session Selector */}
          <select
            value={sessionFilter}
            onChange={(e) => {
              setSessionFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-sust-forest/30"
          >
            <option value="all">All Sessions</option>
            <option value="2024-2025">Session 2024-2025 (96)</option>
            <option value="2023-2024">Session 2023-2024 (3)</option>
          </select>

          {/* Page Size */}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-sust-forest/30"
          >
            <option value="25">25 per page</option>
            <option value="50">50 per page</option>
            <option value="100">All (99)</option>
          </select>
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing{" "}
          <strong className="text-slate-800">
            {filteredAndSorted.length}
          </strong>{" "}
          of {students.length} students
        </span>
        {search && (
          <button
            onClick={() => setSearch("")}
            className="text-sust-forest hover:underline"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th
                  onClick={() => handleSort("rank")}
                  className="py-3 px-4 cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Rank</span>
                    {getSortIcon("rank")}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("regNo")}
                  className="py-3 px-4 cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Registration No</span>
                    {getSortIcon("regNo")}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("name")}
                  className="py-3 px-4 cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Student Name</span>
                    {getSortIcon("name")}
                  </div>
                </th>
                <th className="py-3 px-4">Session</th>
                <th
                  onClick={() => handleSort("sem1Gpa")}
                  className="py-3 px-4 cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Sem 1 SGPA</span>
                    {getSortIcon("sem1Gpa")}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("sem2Gpa")}
                  className="py-3 px-4 cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Sem 2 SGPA</span>
                    {getSortIcon("sem2Gpa")}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("cgpa")}
                  className="py-3 px-4 cursor-pointer hover:bg-slate-100 transition-colors bg-emerald-50/50"
                >
                  <div className="flex items-center gap-1.5 text-sust-forest">
                    <span>Cumulative CGPA</span>
                    {getSortIcon("cgpa")}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("totalCompletedCredits")}
                  className="py-3 px-4 cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Completed Credits</span>
                    {getSortIcon("totalCompletedCredits")}
                  </div>
                </th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    No student records match the current filters.
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((s) => (
                  <tr
                    key={s.regNo}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="py-3.5 px-4 font-semibold">
                      {renderRankBadge(s.rank)}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-800 text-xs">
                      {s.regNo}
                    </td>
                    <td className="py-3.5 px-4">
                      <Link
                        href={`/student/${s.regNo}`}
                        className="font-semibold text-slate-900 hover:text-sust-forest transition-colors flex items-center gap-1.5"
                      >
                        {s.name}
                        {s.gender === "Female" && (
                          <span
                            title="Female Student"
                            className="text-[10px] bg-rose-50 text-rose-600 border border-rose-200 px-1.5 py-0.2 rounded"
                          >
                            F
                          </span>
                        )}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">
                      {s.session}
                    </td>
                    <td className="py-3.5 px-4">
                      {s.sem1Gpa !== null ? (
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-slate-800">
                            {s.sem1Gpa.toFixed(2)}
                          </span>
                          {s.sem1Grade && (
                            <GradeBadge grade={s.sem1Grade} size="sm" />
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-400 text-xs">N/A</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {s.sem2Gpa !== null ? (
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-slate-800">
                            {s.sem2Gpa.toFixed(2)}
                          </span>
                          {s.sem2Grade && (
                            <GradeBadge grade={s.sem2Grade} size="sm" />
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-400 text-xs">N/A</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 bg-emerald-50/30">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-extrabold text-sust-forest">
                          {s.cgpa.toFixed(2)}
                        </span>
                        {s.cgpa >= 3.75 && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                            Distinction
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-medium text-slate-700">
                      <span className="inline-block bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {s.totalCompletedCredits.toFixed(2)} Cr
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/student/${s.regNo}`}
                        className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-sust-forest bg-emerald-50 hover:bg-sust-forest hover:text-white rounded-lg border border-emerald-200 transition-all"
                      >
                        Profile
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {paginatedStudents.length === 0 ? (
          <div className="bg-white p-8 rounded-xl text-center text-slate-400 border border-slate-200">
            No student records match the current filters.
          </div>
        ) : (
          paginatedStudents.map((s) => (
            <div
              key={s.regNo}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {renderRankBadge(s.rank)}
                    <span className="text-xs font-mono text-slate-500">
                      {s.regNo}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">
                    {s.name}
                  </h4>
                  <span className="text-xs text-slate-500">
                    Session: {s.session}
                  </span>
                </div>
                <div className="text-right bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sust-forest block">
                    CGPA
                  </span>
                  <span className="text-xl font-extrabold text-sust-forest">
                    {s.cgpa.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">
                    Sem 1 GPA
                  </span>
                  <span className="font-semibold text-slate-800">
                    {s.sem1Gpa?.toFixed(2) ?? "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">
                    Sem 2 GPA
                  </span>
                  <span className="font-semibold text-slate-800">
                    {s.sem2Gpa?.toFixed(2) ?? "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">
                    Credits
                  </span>
                  <span className="font-semibold text-slate-800">
                    {s.totalCompletedCredits.toFixed(2)} Cr
                  </span>
                </div>
              </div>

              <Link
                href={`/student/${s.regNo}`}
                className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-sust-forest bg-emerald-50 hover:bg-sust-forest hover:text-white rounded-lg border border-emerald-200 transition-all"
              >
                View Full Breakdown
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ))
        )}
      </div>

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="bg-white px-4 py-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span>
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded-lg font-medium transition-all ${
                  currentPage === page
                    ? "bg-sust-forest text-white font-bold"
                    : "hover:bg-slate-100"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
