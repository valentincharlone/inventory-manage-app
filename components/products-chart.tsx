"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CharData {
  week: string;
  products: number;
}

export default function ProductsChart({ data }: { data: CharData[] }) {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorProducts" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(var(--primary))"
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor="hsl(var(--primary))"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            opacity={0.3}
          />
          <XAxis
            dataKey="week"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.75rem",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              padding: "12px",
            }}
            labelStyle={{
              color: "hsl(var(--foreground))",
              fontWeight: "600",
              marginBottom: "4px",
            }}
            itemStyle={{
              color: "hsl(var(--primary))",
              fontWeight: "500",
            }}
          />
          <Area
            type="monotone"
            dataKey="products"
            stroke="hsl(var(--primary))"
            fill="url(#colorProducts)"
            strokeWidth={3}
            dot={{
              fill: "hsl(var(--primary))",
              r: 4,
              strokeWidth: 2,
              stroke: "hsl(var(--card))",
            }}
            activeDot={{
              fill: "hsl(var(--primary))",
              r: 6,
              strokeWidth: 2,
              stroke: "hsl(var(--card))",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
