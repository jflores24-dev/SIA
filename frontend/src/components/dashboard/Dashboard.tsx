import { useEffect, useState } from "react";

import { ArrowDown, ArrowUp } from "lucide-react";

import DashboardHeader from "./DashboardHeader";
import MetricCard from "./MetricCard";
import MoistureCard from "./MoistureCard";
import MoistureChart from "./MoistureChart";
import AlertsPanel from "./AlertsPanel";

import { getLectures } from "../../services/api";
import type { Lecture } from "../../types/lecture";

import {
  calculateAverageMoisture,
  calculateMinMoisture,
  calculateMaxMoisture,
  calculateMinDryness,
  calculateMaxDryness,
} from "../../utils/dashboard";

import { generateAlerts } from "../../utils/alerts";

export default function Dashboard() {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLectures() {
      try {
        const data = await getLectures();

        setLectures(data);
      } catch (error) {
        console.error("Failed to load lectures:", error);
      } finally {
        setLoading(false);
      }
    }

    loadLectures();

    const interval = setInterval(() => {
      loadLectures();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const averageMoisture = calculateAverageMoisture(lectures);

  const minMoisture = calculateMinMoisture(lectures);

  const maxMoisture = calculateMaxMoisture(lectures);

  const minDryness = calculateMinDryness(lectures);

  const maxDryness = calculateMaxDryness(lectures);

  const alerts = generateAlerts(lectures);

  return (
    <main className="min-h-screen bg-[#d8f0f5]">
      <div className="mx-auto max-w-[1400px] px-8 py-6">
        <DashboardHeader />

        {loading ? (
          <p className="text-sm text-slate-500">Cargando datos...</p>
        ) : (
          <div className="grid grid-cols-12 gap-4">
            {/* Left side */}
            <section className="col-span-7">
              <div className="grid grid-cols-2 gap-4">
                <div className="row-span-2">
                  <MoistureCard value={Number(averageMoisture.toFixed(1))} />
                </div>

                <MetricCard
                  title="Humedad mínima"
                  value={minMoisture.toFixed(1)}
                  unit="%"
                  description="Nivel mínimo registrado"
                  icon={ArrowDown}
                />

                <MetricCard
                  title="Humedad máxima"
                  value={maxMoisture.toFixed(1)}
                  unit="%"
                  description="Nivel máximo registrado"
                  icon={ArrowUp}
                />

                <MetricCard
                  title="Sequedad mínima"
                  value={minDryness.toFixed(1)}
                  unit="%"
                  description="Nivel mínimo registrado"
                  icon={ArrowDown}
                />

                <MetricCard
                  title="Sequedad máxima"
                  value={maxDryness.toFixed(1)}
                  unit="%"
                  description="Nivel máximo registrado"
                  icon={ArrowUp}
                />
              </div>

              <div className="mt-4">
                <MoistureChart lectures={lectures} />
              </div>
            </section>

            {/* Right side */}
            <section className="col-span-5">
              <AlertsPanel alerts={alerts} />
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
