import cron from "node-cron";

import { sendRecentLecturesToN8n } from "../services/alert.service.js";

export function startAlertScheduler() {
  cron.schedule(
    "* * * * *",
    async () => {
      try {
        console.log("Checking recent lectures...");

        await sendRecentLecturesToN8n();
      } catch (error) {
        console.error("Failed to send lectures to n8n:", error);
      }
    },
    {
      timezone: "America/Chihuahua",
    },
  );

  console.log("Alert scheduler started.");
}
