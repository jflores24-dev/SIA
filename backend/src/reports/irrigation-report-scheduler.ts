import cron from "node-cron";

import { generateReport } from "./irrigation-report.service";

export function startIrrigationReportScheduler() {
  cron.schedule(
    "* * * * *",
    async () => {
      try {
        console.log("Generating weekly irrigation report...");

        const filePath = await generateReport({
          period: {
            start: "September 19, 2026",
            end: "September 25, 2026",
          },

          kpis: {
            averageMoisture: 31.4,
            minMoisture: 17.2,
            maxMoisture: 48.7,
            alerts: 3,
            recommendedIrrigations: 4,
          },

          moistureHistory: [
            { date: "Sep 19", moisture: 35.2 },
            { date: "Sep 20", moisture: 32.8 },
            { date: "Sep 21", moisture: 29.4 },
            { date: "Sep 22", moisture: 27.8 },
            { date: "Sep 23", moisture: 33.1 },
            { date: "Sep 24", moisture: 30.6 },
            { date: "Sep 25", moisture: 31.4 },
          ],

          sensors: [
            {
              id: "S-001",
              zone: "North Field",
              averageMoisture: 34.2,
              status: "normal",
            },
            {
              id: "S-002",
              zone: "South Field",
              averageMoisture: 25.7,
              status: "warning",
            },
            {
              id: "S-003",
              zone: "Greenhouse",
              averageMoisture: 41.3,
              status: "normal",
            },
          ],

          alerts: [
            {
              date: "Sep 21, 08:42",
              sensor: "S-002",
              type: "Low Moisture",
              severity: "high",
            },
            {
              date: "Sep 23, 14:21",
              sensor: "S-002",
              type: "Low Moisture",
              severity: "medium",
            },
            {
              date: "Sep 24, 10:15",
              sensor: "S-001",
              type: "Low Moisture",
              severity: "medium",
            },
          ],
        });

        console.log(`Report generated ${filePath}`);
      } catch (error) {
        console.error("Failed to generate weekly irrigation report:", error);
      }
    },
    {
      timezone: "America/Chihuahua",
    },
  );
}
