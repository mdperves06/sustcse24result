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
  ReferenceLine,
  Cell,
} from "recharts";

interface SgpaComparisonChartProps {
  sem1Gpa: number | null;
  sem2Gpa: number | null;
  cgpa: number;
}

export const SgpaComparisonChart: React.FC<SgpaComparisonChartProps> = ({
  sem1Gpa,
  sem2Gpa,
  cgpa,
}) => {
  const data = [
    {
      name: "1st Semester",
      gpa: sem1Gpa ?? 0,
      fill: "#0A5C36",
    },
    {
      name: "2nd Semester",
      gpa: sem2Gpa ?? 0,
      fill: "#15803D",
    },
    {
      name: "Cumulative CGPA",
      gpa: cgpa,
      fill: "#D97706",
    },
  ];

  return (
    <div className="w-full h-64 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: -10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis
            dataKey="name"
            stroke="#64748B"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: "#CBD5E1" }}
          />
          <YAxis
            domain={[0, 4.0]}
            ticks={[0, 1.0, 2.0, 2.5, 3.0, 3.5, 4.0]}
            stroke="#64748B"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: "#CBD5E1" }}
          />
          <Tooltip
            cursor={{ fill: "rgba(10, 92, 54, 0.05)" }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className="bg-slate-900 text-white px-3 py-2 rounded-lg text-xs shadow-lg border border-slate-700">
                    <p className="font-semibold text-slate-300">{item.name}</p>
                    <p className="text-base font-bold text-amber-400 mt-0.5">
                      {item.gpa > 0 ? item.gpa.toFixed(2) : "N/A"}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="gpa" radius={[6, 6, 0, 0]} maxBarSize={60}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
