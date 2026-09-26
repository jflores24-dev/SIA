import {
  AlertTriangle,
  Droplets,
  Thermometer,
} from "lucide-react";

const alerts = [
  {
    id: 1,
    title: "Humedad baja",
    sensor: "Sensor S-002",
    time: "Hoy, 08:42",
    severity: "high",
    icon: Droplets,
  },
  {
    id: 2,
    title: "Temperatura elevada",
    sensor: "Sensor S-004",
    time: "Ayer, 14:20",
    severity: "medium",
    icon: Thermometer,
  },
  {
    id: 3,
    title: "Humedad baja",
    sensor: "Sensor S-001",
    time: "Sep 23, 09:15",
    severity: "medium",
    icon: Droplets,
  },
  {
    id: 4,
    title: "Lectura fuera de rango",
    sensor: "Sensor S-003",
    time: "Sep 21, 17:30",
    severity: "low",
    icon: AlertTriangle,
  },
];

const severityStyles = {
  high: {
    container: "bg-red-50",
    icon: "bg-red-100 text-red-500",
    badge: "bg-red-100 text-red-600",
    label: "Alta",
  },
  medium: {
    container: "bg-amber-50",
    icon: "bg-amber-100 text-amber-500",
    badge: "bg-amber-100 text-amber-600",
    label: "Media",
  },
  low: {
    container: "bg-slate-50",
    icon: "bg-slate-100 text-slate-500",
    badge: "bg-slate-100 text-slate-600",
    label: "Baja",
  },
};

export default function AlertsPanel() {
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
        {alerts.map((alert) => {
          const Icon = alert.icon;
          const styles = severityStyles[alert.severity];

          return (
            <div
              key={alert.id}
              className={`rounded-xl p-4 ${styles.container}`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${styles.icon}`}
                >
                  <Icon size={19} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-700">
                      {alert.title}
                    </p>

                    <span
                      className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${styles.badge}`}
                    >
                      {styles.label}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    {alert.sensor}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    {alert.time}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}