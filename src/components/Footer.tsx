import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, BookOpen, GraduationCap, ExternalLink } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: University & Dept */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-12 flex-shrink-0">
                <Image
                  src="/sust-logo.png"
                  alt="Shahjalal University of Science and Technology logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-white font-bold text-base leading-snug">
                  Department of Computer Science & Engineering
                </h3>
                <p className="text-xs text-emerald-400 font-medium">
                  Shahjalal University of Science & Technology, Sylhet-3114
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-lg">
              Official academic results, semester tabulation breakdowns, and cumulative CGPA rankings for the B.Sc. (Engg.) cohort (Sessions 2024-2025 & 2023-2024). Verified against official departmental records.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/50 max-w-md">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>
                Data integrity strictly synchronized with official Examination Tabulation Sheets & Cumulative Ranking Documents.
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-sust-gold mb-4">
              Portal Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home & Cohort Overview
                </Link>
              </li>
              <li>
                <Link href="/ranking" className="hover:text-white transition-colors">
                  Cumulative CGPA Rankings (99 Students)
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white transition-colors">
                  Course Performance Explorer
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Source Tabulation Metadata
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Source Verification Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-sust-gold mb-4">
              Examination Audits
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="border-l-2 border-sust-forest pl-2.5">
                <span className="font-semibold text-slate-200 block">1st Semester (Jan-Jun 2025)</span>
                <span>Held: Nov 2025 | Published: 03-Mar-2026</span>
              </div>
              <div className="border-l-2 border-sust-gold pl-2.5">
                <span className="font-semibold text-slate-200 block">2nd Semester (Jul-Dec 2025)</span>
                <span>Held: Apr 2026 | Printed: 30-Jul-2026</span>
              </div>
              <div className="border-l-2 border-emerald-500 pl-2.5">
                <span className="font-semibold text-slate-200 block">Cumulative CGPA Record</span>
                <span>Official Departmental Ranking List</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © {new Date().getFullYear()} Department of CSE, Shahjalal University of Science and Technology. All rights reserved.
          </p>
          <p className="text-slate-400">
            Render Deployment Ready • SQLite + Prisma ORM • Next.js 15
          </p>
        </div>
      </div>
    </footer>
  );
};
