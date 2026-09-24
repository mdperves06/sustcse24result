import React from "react";

interface GradeBadgeProps {
  grade: string;
  point?: number;
  showPoint?: boolean;
  size?: "sm" | "md" | "lg";
}

export const GradeBadge: React.FC<GradeBadgeProps> = ({
  grade,
  point,
  showPoint = false,
  size = "md",
}) => {
  const getGradeStyle = (letter: string) => {
    switch (letter) {
      case "A+":
        return "bg-emerald-100 text-emerald-800 border-emerald-300 ring-emerald-500/20";
      case "A":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/10";
      case "A-":
        return "bg-teal-50 text-teal-700 border-teal-200 ring-teal-500/10";
      case "B+":
        return "bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/10";
      case "B":
        return "bg-sky-50 text-sky-700 border-sky-200 ring-sky-500/10";
      case "B-":
        return "bg-indigo-50 text-indigo-700 border-indigo-200 ring-indigo-500/10";
      case "C+":
        return "bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/10";
      case "C":
        return "bg-yellow-50 text-yellow-800 border-yellow-200 ring-yellow-500/10";
      case "C-":
        return "bg-orange-50 text-orange-700 border-orange-200 ring-orange-500/10";
      case "F":
        return "bg-rose-100 text-rose-800 border-rose-300 ring-rose-500/20 font-bold";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200 ring-slate-500/10";
    }
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs font-medium",
    md: "px-2.5 py-1 text-xs font-semibold",
    lg: "px-3.5 py-1.5 text-sm font-bold",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border ring-1 ${getGradeStyle(
        grade
      )} ${sizeClasses[size]}`}
    >
      <span>{grade}</span>
      {showPoint && point !== undefined && (
        <span className="opacity-75 text-[0.85em]">({point.toFixed(2)})</span>
      )}
    </span>
  );
};
