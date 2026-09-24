"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";
import { CourseResultItem } from "@/types";

interface SemesterCourseChartProps {
  courses: CourseResultItem[];
  semesterName: string; // e.g. "1st Semester (1/1)"
  sgpa?: number | null;
}

export const SemesterCourseChart: React.FC<SemesterCourseChartProps> = ({
  courses,
  semesterName,
  sgpa,
}) => {
  const gradeColors: { [key: string]: string } = {
    "A+": "#059669",
    A: "#10B981",
    "A-": "#14B8A6",
    "B+": "#2563EB",
    B: "#0284C7",
    "B-": "#6366F1",
    "C+": "#D97706",
    C: "#EAB308",
    "C-": "#F97316",
    F: "#E11D48",
  };

  const data = courses.map((c) => {
    // Clean label combining dept prefix and identifier, e.g. "CSE 1143"
    const deptPrefix = c.courseCode.split(" ")[0];
    const shortLabel = `${deptPrefix} ${c.identifier}`;

    return {
      name: shortLabel,
      fullCode: c.courseCode,
      identifier: c.identifier,
      title: c.title,
      credit: c.credit,
      gradePoint: c.gradePoint,
      letterGrade: c.letterGrade,
      fill: gradeColors[c.letterGrade] || "#0A5C36",
    };
  });

  return (
    <div className="w-full bg-slate-50/50 p-4 rounded-xl border border-slate-200/80 space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
        <span className="font-bold text-slate-700">
          {semesterName} — Course Grade Point Breakdown
        </span>
        {sgpa !== undefined && sgpa !== null && (
          <span className="text-slate-500">
            Average SGPA: <strong className="text-sust-forest font-bold">{sgpa.toFixed(2)}</strong>
          </span>
        )}
      </div>

      <div className="w-full h-56 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 15, right: 15, left: -20, bottom: 25 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E2E8F0"
            />
            <XAxis
              dataKey="name"
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "#CBD5E1" }}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={35}
            />
            <YAxis
              domain={[0, 4.0]}
              ticks={[0, 1.0, 2.0, 2.5, 3.0, 3.5, 4.0]}
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "#CBD5E1" }}
            />
            <Tooltip
              cursor={{ fill: "rgba(10, 92, 54, 0.05)" }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="bg-slate-900 text-white px-3.5 py-2.5 rounded-xl text-xs shadow-xl border border-slate-700 space-y-1">
                      <p className="font-bold text-emerald-300">
                        {item.fullCode} ({item.identifier})
                      </p>
                      <p className="text-slate-200 max-w-xs">{item.title}</p>
                      <div className="flex items-center justify-between pt-1 border-t border-slate-700 text-[11px]">
                        <span className="text-slate-400">
                          {item.credit.toFixed(2)} Credits
                        </span>
                        <span className="font-black text-amber-300">
                          {item.gradePoint.toFixed(2)} ({item.letterGrade})
                        </span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            {sgpa !== undefined && sgpa !== null && sgpa > 0 && (
              <ReferenceLine
                y={sgpa}
                stroke="#0A5C36"
                strokeDasharray="4 4"
                label={{
                  value: `SGPA (${sgpa.toFixed(2)})`,
                  fill: "#0A5C36",
                  fontSize: 10,
                  position: "insideTopRight",
                }}
              />
            )}
            <Bar dataKey="gradePoint" radius={[4, 4, 0, 0]} maxBarSize={45}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
