import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  description?: string;
  icon: LucideIcon;
}

export default function MetricCard({
  title,
  value,
  unit,
  description,
  icon: Icon,
}: MetricCardProps) {
  return (
    <article className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-bold text-slate-800">
              {value}
            </span>

            {unit && (
              <span className="text-sm font-medium text-slate-400">
                {unit}
              </span>
            )}
          </div>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d8f0f5] text-[#1685a3]">
          <Icon size={18} />
        </div>
      </div>

      {description && (
        <p className="mt-4 text-xs text-slate-400">
          {description}
        </p>
      )}
    </article>
  );
}