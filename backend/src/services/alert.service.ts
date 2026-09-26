import { and, gte, lte } from "drizzle-orm";

import db from "../db/client.js";
import { lecturesTable } from "../db/schema.js";

const N8N_WEBHOOK_URL = "https://gabbu.app.n8n.cloud/webhook-test/alert";

export async function sendRecentLecturesToN8n() {
  const now = new Date();

  const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);

  const lectures = await db
    .select()
    .from(lecturesTable)
    .where(
      and(
        gte(lecturesTable.fecha, oneMinuteAgo.toISOString()),
        lte(lecturesTable.fecha, now.toISOString()),
      ),
    );

  if (lectures.length === 0) {
    console.log("No new lectures in the last minute.");
    return;
  }

  const response = await fetch(N8N_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      timestamp: now.toISOString(),
      lectures,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `n8n webhook failed: ${response.status} ${response.statusText}`,
    );
  }

  console.log(`Sent ${lectures.length} lectures to n8n.`);
}
