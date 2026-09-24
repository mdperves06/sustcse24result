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
} from "recharts";

interface GradeDistributionChartProps {
  distribution: { [grade: string]: number };
}

export const GradeDistributionChart: React.FC<GradeDistributionChartProps> = ({
  distribution,
}) => {
  const gradeOrder = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "F"];

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

  const data = gradeOrder.map((grade) => ({
    grade,
    count: distribution[grade] || 0,
    color: gradeColors[grade] || "#64748B",
  }));

  const maxCount = Math.max(...data.map((d) => d.count), 5);

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: -20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
          <XAxis
            dataKey="grade"
            stroke="#64748B"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: "#E2E8F0" }}
          />
          <YAxis
            domain={[0, Math.ceil(maxCount * 1.15)]}
            stroke="#64748B"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: "#E2E8F0" }}
            allowDecimals={false}
          />
          <Tooltip
            cursor={{ fill: "rgba(0, 0, 0, 0.03)" }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className="bg-slate-900 text-white px-3 py-2 rounded-lg text-xs shadow-lg border border-slate-700">
                    <p className="font-semibold text-slate-300">Grade {item.grade}</p>
                    <p className="text-sm font-bold text-emerald-400 mt-0.5">
                      {item.count} Student{item.count !== 1 ? "s" : ""}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
