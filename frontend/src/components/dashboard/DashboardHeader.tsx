import { ChevronDown } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="mb-4 flex items-start justify-between">
      {/* Brand */}
      <div>
        <div className="flex items-center gap-3">
          <img
            src="/Logo.png"
            alt="HydroLeaf logo"
            className="h-11 w-11 object-contain"
          />

          <h1 className="text-4xl font-bold tracking-tight text-white">
            HydroLeaf
          </h1>
        </div>

        <p className="mt-1 text-xl font-semibold text-white">
          Reporte semanal
        </p>
      </div>

      {/* Report period */}
      <div className="text-right">
        <p className="text-lg font-semibold text-white">
          Periodo del reporte
        </p>

        <button
          type="button"
          className="
            mt-1
            flex
            items-center
            gap-2
            rounded-full
            bg-[#164e5c]
            px-3
            py-1
            text-sm
            font-medium
            text-white
            transition
            hover:bg-[#123f4a]
          "
        >
          <span>September 19 — September 25</span>

          <ChevronDown size={16} />
        </button>
      </div>
    </header>
  );
}