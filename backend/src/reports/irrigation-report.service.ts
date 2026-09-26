import puppeteer from "puppeteer";
import fs from "node:fs/promises";
import path from "node:path";

import type { IrrigationReport } from "./types.ts";

export async function generateReport(data: IrrigationReport) {
  const reportsDir = path.resolve("./reports");

  await fs.mkdir(reportsDir, {
    recursive: true,
  });

  const fileName = `irrigation-report-${Date.now()}.pdf`;
  const filePath = path.join(reportsDir, fileName);

  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage();

    const maxMoisture = Math.max(
      ...data.moistureHistory.map((item) => item.moisture),
      100,
    );

    const chartPoints = data.moistureHistory
      .map((item, index) => {
        const x = (index / Math.max(data.moistureHistory.length - 1, 1)) * 700;

        const y = 180 - (item.moisture / maxMoisture) * 150;

        return `${x},${y}`;
      })
      .join(" ");

    const alertsHtml = data.alerts
      .map(
        (alert) => `
          <tr>
            <td>${alert.date}</td>
            <td>${alert.sensor}</td>
            <td>${alert.type}</td>
            <td>
              <span class="severity ${alert.severity}">
                ${alert.severity.toUpperCase()}
              </span>
            </td>
          </tr>
        `,
      )
      .join("");

    const sensorsHtml = data.sensors
      .map(
        (sensor) => `
          <tr>
            <td>${sensor.id}</td>
            <td>${sensor.zone}</td>
            <td>${sensor.averageMoisture}%</td>
            <td>
              <span class="status ${sensor.status}">
                ${sensor.status}
              </span>
            </td>
          </tr>
        `,
      )
      .join("");

    const html = `
      <!DOCTYPE html>

      <html>

      <head>

        <meta charset="UTF-8" />

        <style>

          * {
            box-sizing: border-box;
          }

          @page {
            size: A4;
            margin: 0;
          }

          body {
            margin: 0;
            font-family:
              Arial,
              Helvetica,
              sans-serif;

            color: #1e293b;
            background: #ffffff;
          }

          .page {
            padding: 40px 45px;
          }

          /* =========================
             HEADER
          ========================= */

          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;

            padding-bottom: 24px;

            border-bottom: 2px solid #e2e8f0;
          }

          .brand {
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 1.5px;

            color: #2563eb;
          }

          .title {
            margin-top: 8px;

            font-size: 28px;
            font-weight: 700;

            color: #0f172a;
          }

          .subtitle {
            margin-top: 6px;

            font-size: 13px;

            color: #64748b;
          }

          .report-date {
            text-align: right;

            font-size: 12px;
            color: #64748b;
          }

          .report-date strong {
            display: block;

            margin-bottom: 5px;

            font-size: 13px;

            color: #334155;
          }


          /* =========================
             SECTION
          ========================= */

          .section {
            margin-top: 28px;
          }

          .section-title {
            margin-bottom: 14px;

            font-size: 13px;
            font-weight: 700;

            letter-spacing: 0.8px;
            text-transform: uppercase;

            color: #64748b;
          }


          /* =========================
             KPI CARDS
          ========================= */

          .kpis {
            display: grid;

            grid-template-columns:
              repeat(4, 1fr);

            gap: 12px;
          }

          .kpi {
            padding: 18px;

            border: 1px solid #e2e8f0;

            border-radius: 10px;

            background: #f8fafc;
          }

          .kpi-label {
            font-size: 11px;

            color: #64748b;
          }

          .kpi-value {
            margin-top: 8px;

            font-size: 25px;
            font-weight: 700;

            color: #0f172a;
          }

          .kpi-unit {
            font-size: 14px;
            font-weight: 400;

            color: #64748b;
          }


          /* =========================
             CHART
          ========================= */

          .chart-card {
            padding: 20px;

            border: 1px solid #e2e8f0;

            border-radius: 10px;

            background: #ffffff;
          }

          .chart {
            width: 100%;
            height: 220px;
          }

          .chart-label {
            font-size: 10px;

            fill: #94a3b8;
          }

          .chart-line {
            fill: none;

            stroke: #2563eb;

            stroke-width: 3;

            stroke-linecap: round;
            stroke-linejoin: round;
          }

          .chart-grid {
            stroke: #e2e8f0;

            stroke-width: 1;
          }


          /* =========================
             TABLE
          ========================= */

          table {
            width: 100%;

            border-collapse: collapse;

            font-size: 12px;
          }

          th {
            padding: 10px;

            text-align: left;

            background: #f8fafc;

            color: #64748b;

            font-size: 10px;

            text-transform: uppercase;

            letter-spacing: 0.5px;
          }

          td {
            padding: 11px 10px;

            border-bottom: 1px solid #e2e8f0;
          }


          /* =========================
             STATUS
          ========================= */

          .status,
          .severity {
            display: inline-block;

            padding: 4px 8px;

            border-radius: 999px;

            font-size: 9px;

            font-weight: 700;

            text-transform: uppercase;
          }

          .normal {
            color: #166534;
            background: #dcfce7;
          }

          .warning {
            color: #92400e;
            background: #fef3c7;
          }

          .critical {
            color: #991b1b;
            background: #fee2e2;
          }

          .low {
            color: #166534;
            background: #dcfce7;
          }

          .medium {
            color: #92400e;
            background: #fef3c7;
          }

          .high {
            color: #991b1b;
            background: #fee2e2;
          }


          /* =========================
             RECOMMENDATIONS
          ========================= */

          .recommendation {
            padding: 14px 16px;

            margin-bottom: 10px;

            border-left: 4px solid #2563eb;

            background: #eff6ff;

            border-radius: 6px;

            font-size: 12px;
          }


          /* =========================
             FOOTER
          ========================= */

          .footer {
            margin-top: 35px;

            padding-top: 15px;

            border-top: 1px solid #e2e8f0;

            display: flex;
            justify-content: space-between;

            font-size: 9px;

            color: #94a3b8;
          }

        </style>

      </head>


      <body>

        <div class="page">


          <!-- HEADER -->

          <header class="header">

            <div>

              <div class="brand">
                SMART IRRIGATION
              </div>

              <div class="title">
                Weekly Monitoring Report
              </div>

              <div class="subtitle">
                Intelligent irrigation and soil
                moisture monitoring system
              </div>

            </div>


            <div class="report-date">

              <strong>REPORT PERIOD</strong>

              ${data.period.start}
              —
              ${data.period.end}

            </div>

          </header>


          <!-- KPIs -->

          <section class="section">

            <div class="section-title">
              Weekly Summary
            </div>


            <div class="kpis">


              <div class="kpi">

                <div class="kpi-label">
                  Average Moisture
                </div>

                <div class="kpi-value">
                  ${data.kpis.averageMoisture}
                  <span class="kpi-unit">%</span>
                </div>

              </div>


              <div class="kpi">

                <div class="kpi-label">
                  Minimum Moisture
                </div>

                <div class="kpi-value">
                  ${data.kpis.minMoisture}
                  <span class="kpi-unit">%</span>
                </div>

              </div>


              <div class="kpi">

                <div class="kpi-label">
                  Maximum Moisture
                </div>

                <div class="kpi-value">
                  ${data.kpis.maxMoisture}
                  <span class="kpi-unit">%</span>
                </div>

              </div>


              <div class="kpi">

                <div class="kpi-label">
                  Critical Alerts
                </div>

                <div class="kpi-value">
                  ${data.kpis.alerts}
                </div>

              </div>


            </div>

          </section>


          <!-- CHART -->

          <section class="section">

            <div class="section-title">
              Soil Moisture
            </div>

            <div class="chart-card">

              <svg
                class="chart"
                viewBox="0 0 700 220"
                preserveAspectRatio="none"
              >

                <!-- Grid -->

                <line
                  x1="0"
                  y1="30"
                  x2="700"
                  y2="30"
                  class="chart-grid"
                />

                <line
                  x1="0"
                  y1="80"
                  x2="700"
                  y2="80"
                  class="chart-grid"
                />

                <line
                  x1="0"
                  y1="130"
                  x2="700"
                  y2="130"
                  class="chart-grid"
                />

                <line
                  x1="0"
                  y1="180"
                  x2="700"
                  y2="180"
                  class="chart-grid"
                />


                <!-- Data -->

                <polyline
                  points="${chartPoints}"
                  class="chart-line"
                />

              </svg>

            </div>

          </section>


          <!-- SENSOR STATUS -->

          <section class="section">

            <div class="section-title">
              Sensor Status
            </div>

            <table>

              <thead>

                <tr>
                  <th>Sensor</th>
                  <th>Zone</th>
                  <th>Avg. Moisture</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody>

                ${sensorsHtml}

              </tbody>

            </table>

          </section>


          <!-- ALERTS -->

          <section class="section">

            <div class="section-title">
              Alerts
            </div>

            <table>

              <thead>

                <tr>
                  <th>Date</th>
                  <th>Sensor</th>
                  <th>Type</th>
                  <th>Severity</th>
                </tr>

              </thead>

              <tbody>

                ${alertsHtml}

              </tbody>

            </table>

          </section>


          <!-- RECOMMENDATIONS -->

          <section class="section">

            <div class="section-title">
              Recommendations
            </div>


            <div class="recommendation">
              Review irrigation levels in zones
              with moisture below the configured
              threshold.
            </div>


            <div class="recommendation">
              Inspect sensors reporting repeated
              critical moisture readings.
            </div>


          </section>


          <!-- FOOTER -->

          <footer class="footer">

            <span>
              Smart Irrigation System
            </span>

            <span>
              Generated automatically
            </span>

          </footer>


        </div>

      </body>

      </html>
    `;

    await page.setContent(html, {
      waitUntil: "load",
    });

    await page.pdf({
      path: filePath,

      format: "A4",

      printBackground: true,

      preferCSSPageSize: true,

      margin: {
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
      },

      displayHeaderFooter: false,
    });

    return filePath;
  } finally {
    await browser.close();
  }
}
