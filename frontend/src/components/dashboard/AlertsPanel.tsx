import { AlertTriangle, Droplets } from "lucide-react";

import type { Alert } from "../../utils/alerts";

interface AlertsPanelProps {
  alerts: Alert[];
}

export default function AlertsPanel({
  alerts,
}: AlertsPanelProps) {
  return (
    <article className="min-h-[625px] rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Alertas
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Alertas recientes del sistema
          </p>
        </div>

        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-500">
          {alerts.length} activas
        </span>
      </div>

      <div className="mt-6 space-y-3">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-500">
              <AlertTriangle size={22} />
            </div>

            <p className="mt-3 text-sm font-semibold text-slate-700">
              Sin alertas
            </p>

            <p className="mt-1 max-w-xs text-xs text-slate-400">
              Todos los sensores están dentro del rango adecuado.
            </p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={`${alert.sensor}-${alert.fecha}`}
              className="rounded-xl bg-red-50 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500">
                  <Droplets size={19} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-700">
                    Humedad baja
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Sensor {alert.sensor}
                  </p>

                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-slate-500">
                      Humedad:{" "}
                      <span className="font-medium text-slate-700">
                        {alert.humidity}%
                      </span>
                    </p>

                    <p className="text-xs text-slate-500">
                      Sequedad:{" "}
                      <span className="font-medium text-slate-700">
                        {alert.dryness}%
                      </span>
                    </p>
                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    {new Date(alert.fecha).toLocaleString(
                      "es-MX",
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </article>
  );
}