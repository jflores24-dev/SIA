import { ChevronDown } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="mb-6 flex items-start justify-between">
      <div>
        <div className="flex items-center gap-3">
          <img
            src="/Logo.png"
            alt="HydroLeaf logo"
            className="h-11 w-11 object-contain"
          />

          <h1 className="text-4xl font-bold tracking-tight text-[#123C36]">
            HydroLeaf
          </h1>
        </div>

        <p className="mt-1 text-xl font-semibold text-[#123C36]">
          Reporte semanal
        </p>
      </div>

      <div className="text-right">
        <p className="text-lg font-semibold text-[#123C36]">
          Periodo del reporte
        </p>

        <button
          type="button"
          className="
            mt-1 flex items-center gap-2
            rounded-full
            bg-[#246B60]
            px-4 py-2
            text-sm font-medium text-white
            transition
            hover:bg-[#1D594F]
          "
        >
          <span>September 19 — September 25</span>
          <ChevronDown size={16} />
        </button>
      </div>
    </header>
  );
}
