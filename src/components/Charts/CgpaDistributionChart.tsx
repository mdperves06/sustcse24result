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

interface CgpaDistributionChartProps {
  students: { cgpa: number }[];
}

export const CgpaDistributionChart: React.FC<CgpaDistributionChartProps> = ({
  students,
}) => {
  const buckets = [
    { range: "3.75 - 4.00", min: 3.75, max: 4.0, count: 0, color: "#0A5C36" },
    { range: "3.50 - 3.74", min: 3.50, max: 3.749, count: 0, color: "#16A34A" },
    { range: "3.25 - 3.49", min: 3.25, max: 3.499, count: 0, color: "#2563EB" },
    { range: "3.00 - 3.24", min: 3.00, max: 3.249, count: 0, color: "#D97706" },
    { range: "< 3.00", min: 0, max: 2.999, count: 0, color: "#EA580C" },
  ];

  students.forEach((s) => {
    for (const b of buckets) {
      if (s.cgpa >= b.min && s.cgpa <= b.max) {
        b.count++;
        break;
      }
    }
  });

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={buckets}
          margin={{ top: 15, right: 15, left: -20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
          <XAxis
            dataKey="range"
            stroke="#64748B"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: "#E2E8F0" }}
          />
          <YAxis
            stroke="#64748B"
            fontSize={11}
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
                    <p className="font-semibold text-slate-300">CGPA: {item.range}</p>
                    <p className="text-sm font-bold text-amber-400 mt-0.5">
                      {item.count} Students ({((item.count / students.length) * 100).toFixed(1)}%)
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {buckets.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
