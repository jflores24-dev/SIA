import app from "./app";

import { startIrrigationReportScheduler } from "./reports/irrigation-report-scheduler";

const port = 3000;

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);

  startIrrigationReportScheduler();
});
