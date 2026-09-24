import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  badge?: string;
  color?: "green" | "gold" | "blue" | "emerald";
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  badge,
  color = "green",
}) => {
  const colorMap = {
    green: {
      bg: "bg-emerald-50 text-sust-forest border-emerald-100",
      accent: "text-sust-forest",
      badge: "bg-emerald-100 text-emerald-800",
    },
    gold: {
      bg: "bg-amber-50 text-amber-700 border-amber-100",
      accent: "text-sust-gold",
      badge: "bg-amber-100 text-amber-800",
    },
    blue: {
      bg: "bg-sky-50 text-sky-700 border-sky-100",
      accent: "text-sky-600",
      badge: "bg-sky-100 text-sky-800",
    },
    emerald: {
      bg: "bg-teal-50 text-teal-700 border-teal-100",
      accent: "text-teal-600",
      badge: "bg-teal-100 text-teal-800",
    },
  };

  const c = colorMap[color];

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 card-elevation relative overflow-hidden flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {value}
            </span>
            {badge && (
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${c.badge}`}
              >
                {badge}
              </span>
            )}
          </div>
        </div>
        <div className={`p-2.5 rounded-lg border ${c.bg}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {subtitle && (
        <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span>{subtitle}</span>
        </p>
      )}
    </div>
  );
};
