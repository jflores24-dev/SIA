import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { Lecture } from "../../types/lecture";

interface MoistureChartProps {
  lectures: Lecture[];
}

export default function MoistureChart({
  lectures,
}: MoistureChartProps) {
  const data = lectures
    .filter((lecture) => lecture.humedad !== null)
    .map((lecture) => ({
      date: new Date(lecture.fecha).toLocaleDateString(
        "es-MX",
        {
          day: "2-digit",
          month: "short",
        },
      ),
      moisture: lecture.humedad,
    }));

  return (
    <article className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-800">
          Historial de humedad
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Evolución durante el periodo seleccionado
        </p>
      </div>

      <div className="h-[250px] w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="moistureGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#1685a3"
                  stopOpacity={0.25}
                />

                <stop
                  offset="100%"
                  stopColor="#1685a3"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
              }}
            />

            <YAxis
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
              }}
              tickFormatter={(value) => `${value}%`}
            />

            <Tooltip
              formatter={(value) => [
                `${value}%`,
                "Humedad",
              ]}
            />

            <Area
              type="monotone"
              dataKey="moisture"
              stroke="#1685a3"
              strokeWidth={3}
              fill="url(#moistureGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}