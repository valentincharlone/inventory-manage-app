"use client";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function ProductsPieChart({
  efficiencyData,
  inStockPercentage,
}: {
  efficiencyData: {
    name: string;
    value: number;
    color: string;
    percentage: number;
  }[];
  inStockPercentage: number;
}) {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="relative w-44 h-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={efficiencyData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              animationBegin={0}
              animationDuration={800}
            >
              {efficiencyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              position={{ x: 0, y: 0 }}
              wrapperStyle={{
                position: "absolute",
                top: "-60px",
                left: "50%",
                transform: "translateX(-50%)",
                pointerEvents: "none",
              }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                      <p className="text-sm font-semibold text-foreground">
                        {payload[0].name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {payload[0].value} products (
                        {payload[0].payload.percentage}%)
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-4xl font-bold text-foreground">
            {inStockPercentage}%
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            Healthy
          </div>
        </div>
      </div>
    </div>
  );
}
