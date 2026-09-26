import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  CloudRain,
} from "lucide-react";

import DashboardHeader from "./DashboardHeader";
import MetricCard from "./MetricCard";
import MoistureCard from "./MoistureCard";
import MoistureChart from "./MoistureChart";
import AlertsPanel from "./AlertsPanel";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#d8f0f5]">
      <div className="mx-auto max-w-[1400px] px-8 py-6">
        <DashboardHeader />

        <div className="grid grid-cols-12 gap-4">
          {/* Left side */}
          <section className="col-span-7">
            <div className="grid grid-cols-2 gap-4">
              {/* Average moisture */}
              <div className="row-span-2">
                <MoistureCard value={75} />
              </div>

              {/* Minimum moisture */}
              <MetricCard
                title="Humedad mínima"
                value={20.7}
                unit="%"
                description="Nivel mínimo registrado"
                icon={ArrowDown}
              />

              {/* Maximum moisture */}
              <MetricCard
                title="Humedad máxima"
                value={82.4}
                unit="%"
                description="Nivel máximo registrado"
                icon={ArrowUp}
              />

              {/* Alerts */}
              <MetricCard
                title="Alertas"
                value={3}
                description="Durante esta semana"
                icon={AlertTriangle}
              />

              {/* Recommended irrigations */}
              <MetricCard
                title="Riegos recomendados"
                value={4}
                description="Basado en las lecturas"
                icon={CloudRain}
              />
            </div>

            {/* Moisture history */}
            <div className="mt-4">
              <MoistureChart />
            </div>
          </section>

          {/* Right side */}
          <section className="col-span-5">
            <AlertsPanel />
          </section>
        </div>
      </div>
    </main>
  );
}