export interface IrrigationReport {
  period: {
    start: string;
    end: string;
  };

  kpis: {
    averageMoisture: number;
    minMoisture: number;
    maxMoisture: number;
    alerts: number;
    recommendedIrrigations: number;
  };

  moistureHistory: {
    date: string;
    moisture: number;
  }[];

  alerts: {
    date: string;
    sensor: string;
    type: string;
    severity: "low" | "medium" | "high";
  }[];

  sensors: {
    id: string;
    zone: string;
    averageMoisture: number;
    status: "normal" | "warning" | "critical";
  }[];
}
